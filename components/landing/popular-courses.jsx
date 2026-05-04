'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

// Fallback courses for display when no courses exist in DB
const fallbackCourses = [
  {
    _id: '1',
    title: 'Complete React Development',
    shortDescription: 'Master React from scratch with hooks, context, and modern patterns.',
    price: 99,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
  },
  {
    _id: '2',
    title: 'Python for Data Science',
    shortDescription: 'Learn Python programming and data analysis with pandas and numpy.',
    price: 79,
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
  },
  {
    _id: '3',
    title: 'UI/UX Design Masterclass',
    shortDescription: 'Create stunning user interfaces and seamless user experiences.',
    price: 129,
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
  },
  {
    _id: '4',
    title: 'Node.js Backend Development',
    shortDescription: 'Build scalable server-side applications with Node.js and Express.',
    price: 89,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
  },
];

const levelColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-orange-100 text-orange-800',
};

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setCourses(data.data.slice(0, 4));
        } else {
          setCourses(fallbackCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses(fallbackCourses);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Popular Courses
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Explore our most popular courses loved by thousands of students.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/courses">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video animate-pulse bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                    <div className="mt-3 h-5 w-full animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="mt-4 h-6 w-16 animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              ))
            : courses.map((course) => (
                <Card
                  key={course._id}
                  className="group overflow-hidden border border-border transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className={levelColors[course.level]}>
                      {course.level}
                    </Badge>
                    <h3 className="mt-3 line-clamp-1 text-lg font-semibold text-foreground">
                      {course.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {course.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">${course.price}</span>
                      <Button asChild variant="ghost" size="sm" className="gap-1">
                        <Link href={`/courses/${course._id}`}>
                          View Details
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
