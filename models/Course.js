/**
 * Course Mongoose Schema
 * 
 * This schema defines the structure of course documents in MongoDB.
 * Fields:
 * - title: Course name (required)
 * - shortDescription: Brief summary for cards (required)
 * - fullDescription: Detailed course description (required)
 * - price: Course price in USD (required)
 * - level: Difficulty level - Beginner/Intermediate/Advanced (required)
 * - image: URL to course thumbnail image (required)
 * - createdAt: Timestamp of creation (auto-generated)
 */

import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
    maxlength: [200, 'Short description cannot be more than 200 characters'],
  },
  fullDescription: {
    type: String,
    required: [true, 'Please provide a full description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  level: {
    type: String,
    required: [true, 'Please specify the course level'],
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model recompilation error in development
export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
