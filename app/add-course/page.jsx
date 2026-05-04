'use client';

/**
 * Add Course Page (Protected)
 * 
 * Form to create a new course. Only accessible to logged-in users.
 * Fields: title, short description, full description, price, level, image URL
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AddCoursePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    level: '',
    image: '',
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLevelChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      level: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Course created successfully!');
        router.push('/courses');
      } else {
        toast.error(data.error || 'Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
      <main className="flex-1 bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Course
              </CardTitle>
              <CardDescription>
                Fill in the details below to create a new course.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-foreground">
                    Course Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Complete React Development"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  <label htmlFor="shortDescription" className="text-sm font-medium text-foreground">
                    Short Description *
                  </label>
                  <Input
                    id="shortDescription"
                    name="shortDescription"
                    placeholder="Brief summary for course cards"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.shortDescription.length}/200 characters
                  </p>
                </div>

                {/* Full Description */}
                <div className="space-y-2">
                  <label htmlFor="fullDescription" className="text-sm font-medium text-foreground">
                    Full Description *
                  </label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    placeholder="Detailed course description including topics covered, what students will learn, etc."
                    value={formData.fullDescription}
                    onChange={handleChange}
                    required
                    rows={6}
                  />
                </div>

                {/* Price and Level Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Price */}
                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium text-foreground">
                      Price (USD) *
                    </label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="99"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Level */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Level *
                    </label>
                    <Select value={formData.level} onValueChange={handleLevelChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium text-foreground">
                    Image URL *
                  </label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/course-image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide a direct URL to an image (Unsplash, Pexels, etc.)
                  </p>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Course'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
