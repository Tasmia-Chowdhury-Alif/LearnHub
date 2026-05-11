'use client';

/**
 * Manage Courses Page (Protected)
 * 
 * Displays all courses in a table/grid with options to view or delete.
 * Only accessible to logged-in users.
 */

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, Plus, Eye, Trash2, Settings } from 'lucide-react';
import { toast } from 'sonner';

const levelColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-orange-100 text-orange-800',
};

export default function ManageCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      fetchCourses();
    }
  }, [session, fetchCourses]);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Course deleted successfully');
        setCourses((prev) => prev.filter((course) => course._id !== id));
      } else {
        toast.error(data.error || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  // Show loading while checking auth
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-26">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card className="border border-border">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Manage Courses
                </CardTitle>
                <CardDescription>
                  View, edit, or delete your courses
                </CardDescription>
              </div>
              <Button asChild className="gap-2">
                <Link href="/add-course">
                  <Plus className="h-4 w-4" />
                  Add Course
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : courses.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No courses found.</p>
                  <Button asChild className="mt-4">
                    <Link href="/add-course">Create Your First Course</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/5 sm:flex-row sm:items-center"
                    >
                      {/* Image */}
                      <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-32">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {course.title}
                          </h3>
                          <Badge variant="secondary" className={levelColors[course.level]}>
                            {course.level}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                          {course.shortDescription}
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          ${course.price}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="gap-1">
                          <Link href={`/courses/${course._id}`}>
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              disabled={deleting === course._id}
                            >
                              {deleting === course._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Course</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{course.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(course._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
