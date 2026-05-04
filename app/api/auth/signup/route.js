import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // 1. Validation
    if (!name || !email || !password) {
      return Response.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user (DEFAULT ROLE = student)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
    });

    return Response.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}