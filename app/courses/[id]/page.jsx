/**
 * Course Details Page
 * 
 * Displays full information about a single course including:
 * - Large banner image
 * - Full description
 * - Price and level
 * - Back navigation
 */

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, BarChart3, DollarSign } from 'lucide-react';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';


const levelColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-orange-100 text-orange-800',
};

async function getCourse(id) {
  try {
    await dbConnect();
    const course = await Course.findById(id).lean();

    if (course) return course;
  } catch (error) {
    console.error(error);
  }

  if (sampleCourses[id]) {
    return sampleCourses[id];
  }

  return null;
}

export default async function CourseDetailsPage({ params }) {
  const { id } = params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  const formattedDate = course.createdAt
    ? new Date(course.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'Recently added';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Hero Banner */}
        <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="-mt-8 relative z-10">
            <Button asChild variant="outline" className="gap-2 bg-card">
              <Link href="/courses">
                <ArrowLeft className="h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
          </div>

          {/* Course Info Card */}
          <Card className="mt-6 border border-border">
            <CardContent className="p-6 sm:p-8">
              {/* Badge and Title */}
              <Badge variant="secondary" className={levelColors[course.level]}>
                {course.level}
              </Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                {course.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{course.shortDescription}</p>

              {/* Meta Info */}
              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-2xl font-bold text-foreground">${course.price}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-5 w-5" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-8 border-border" />

              {/* Full Description */}
              <div className="prose prose-gray max-w-none">
                <h2 className="text-xl font-semibold text-foreground">About This Course</h2>
                <div className="mt-4 whitespace-pre-line text-muted-foreground leading-relaxed">
                  {course.fullDescription}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="flex-1 sm:flex-none">
                  Enroll Now - ${course.price}
                </Button>
                <Button variant="outline" size="lg">
                  Add to Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spacer */}
        <div className="h-16" />
      </main>
      <Footer />
    </div>
  );
}
