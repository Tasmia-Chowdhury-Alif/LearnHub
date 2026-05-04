/**
 * Database Seed Script
 * 
 * Run this script to populate your MongoDB database with sample courses.
 * 
 * Usage:
 *   1. Make sure your .env.local has MONGODB_URI set
 *   2. Run: node scripts/seed.js
 * 
 * Note: This script requires the dotenv package to be installed.
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Course Schema (duplicated for standalone script)
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  price: { type: Number, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

// Sample courses data
const sampleCourses = [
  {
    title: 'Complete React Development',
    shortDescription: 'Master React from scratch with hooks, context, and modern patterns for building dynamic web applications.',
    fullDescription: `This comprehensive React course takes you from beginner to advanced developer. You'll learn everything you need to build modern, scalable web applications with React.

Topics covered include:
- React fundamentals and JSX
- Component architecture and props
- State management with useState and useReducer
- Side effects with useEffect
- Context API for global state
- Custom hooks development
- Performance optimization
- Testing with React Testing Library
- Real-world project building

By the end of this course, you'll have the skills to build professional React applications and be ready for job interviews.`,
    price: 99,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  },
  {
    title: 'Python for Data Science',
    shortDescription: 'Learn Python programming and data analysis with pandas, numpy, and visualization libraries.',
    fullDescription: `Dive into the world of data science with Python. This course covers everything from basic Python programming to advanced data analysis techniques.

What you'll learn:
- Python fundamentals and syntax
- Working with pandas DataFrames
- Numerical computing with NumPy
- Data visualization with Matplotlib and Seaborn
- Statistical analysis
- Machine learning basics with scikit-learn
- Real-world data projects

Perfect for beginners who want to start a career in data science or analysts looking to add Python to their toolkit.`,
    price: 79,
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
  },
  {
    title: 'UI/UX Design Masterclass',
    shortDescription: 'Create stunning user interfaces and seamless user experiences with industry-standard tools.',
    fullDescription: `Become a professional UI/UX designer with this comprehensive masterclass. Learn the principles and tools used by top designers at leading tech companies.

Course highlights:
- Design thinking methodology
- User research and personas
- Information architecture
- Wireframing and prototyping
- Visual design principles
- Figma mastery
- Design systems
- Accessibility best practices
- Portfolio building

Graduate with a professional portfolio and the skills to land your dream design job.`,
    price: 129,
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
  },
  {
    title: 'Node.js Backend Development',
    shortDescription: 'Build scalable server-side applications with Node.js, Express, and MongoDB.',
    fullDescription: `Master backend development with Node.js. This course teaches you how to build robust, scalable server applications from the ground up.

What's included:
- Node.js fundamentals
- Express.js framework
- RESTful API design
- Database integration (MongoDB, PostgreSQL)
- Authentication and authorization
- Error handling and validation
- Testing and debugging
- Deployment strategies
- Performance optimization

Build real-world APIs and backend services that power modern web applications.`,
    price: 89,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
  },
  {
    title: 'JavaScript Fundamentals',
    shortDescription: 'Learn the core concepts of JavaScript from variables to async programming.',
    fullDescription: `Start your programming journey with JavaScript, the language of the web. This beginner-friendly course covers all the essentials you need to know.

Topics include:
- Variables and data types
- Control flow and loops
- Functions and scope
- Objects and arrays
- DOM manipulation
- Event handling
- Asynchronous programming
- Promises and async/await
- Modern ES6+ features

Perfect for complete beginners who want to learn programming or web development.`,
    price: 49,
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
  },
  {
    title: 'AWS Cloud Architecture',
    shortDescription: 'Design and deploy scalable cloud solutions using Amazon Web Services.',
    fullDescription: `Become a certified AWS architect with this advanced cloud computing course. Learn to design and implement highly available, scalable systems on AWS.

Covered services:
- EC2, Lambda, and compute options
- S3, EBS, and storage solutions
- VPC and networking
- RDS, DynamoDB, and databases
- CloudFormation and infrastructure as code
- Security best practices
- Cost optimization
- High availability patterns
- Real-world architecture examples

Prepare for the AWS Solutions Architect certification while building practical skills.`,
    price: 149,
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    console.log('Clearing existing courses...');
    await Course.deleteMany({});

    // Insert sample courses
    console.log('Inserting sample courses...');
    const result = await Course.insertMany(sampleCourses);
    console.log(`Successfully inserted ${result.length} courses`);

    // List inserted courses
    console.log('\nInserted courses:');
    result.forEach((course, index) => {
      console.log(`  ${index + 1}. ${course.title} (${course.level}) - $${course.price}`);
    });

    console.log('\nDatabase seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
