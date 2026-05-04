/**
 * Single Course API Route
 * 
 * Handles operations on individual courses by ID.
 * 
 * GET /api/courses/[id]
 *   - Returns a single course by ID
 * 
 * DELETE /api/courses/[id]
 *   - Deletes a course by ID
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';

// GET - Fetch single course by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const course = await Course.findById(id);

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// DELETE - Remove course by ID
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedCourse });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
