/**
 * Courses API Route
 * 
 * Handles GET and POST requests for courses.
 * 
 * GET /api/courses
 *   - Returns all courses
 *   - Supports query params:
 *     - search: Filter by title (case-insensitive regex)
 *     - level: Filter by difficulty level
 *   - Example: /api/courses?search=react&level=Beginner
 * 
 * POST /api/courses
 *   - Creates a new course
 *   - Requires JSON body with course fields
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';

// GET - Fetch all courses with optional search and filter
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const level = searchParams.get('level');

    // Build query object
    let query = {};

    // Add search filter (case-insensitive regex on title)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Add level filter
    if (level && level !== 'All') {
      query.level = level;
    }

    // Fetch courses sorted by creation date (newest first)
    const courses = await Course.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST - Create a new course
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Create course document
    const course = await Course.create(body);

    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
