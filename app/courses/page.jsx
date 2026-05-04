'use client';

/**
 * Courses List Page
 * 
 * Displays all courses with search and filter functionality.
 * Features:
 * - Search by course title
 * - Filter by difficulty level
 * - Responsive grid layout
 */

import { useEffect, useState, useCallback } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CourseCard from '@/components/course-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';



export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (level && level !== 'All') params.set('level', level);

      const res = await fetch(`/api/courses?${params.toString()}`);
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        setCourses(data.data);
      } else {
        // Filter sample courses based on search and level
        let filtered = sampleCourses;
        if (search) {
          filtered = filtered.filter((c) =>
            c.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (level && level !== 'All') {
          filtered = filtered.filter((c) => c.level === level);
        }
        setCourses(filtered);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  }, [search, level]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const clearFilters = () => {
    setSearch('');
    setLevel('All');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Explore Our Courses
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover courses that will help you grow your skills and advance your career.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-10 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <div className="flex items-center gap-2">
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              {(search || level !== 'All') && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear filters</span>
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="mt-6 text-sm text-muted-foreground">
            {loading ? 'Loading...' : `Showing ${courses.length} courses`}
          </p>

          {/* Courses Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="aspect-video animate-pulse bg-muted" />
                    <div className="p-4">
                      <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                      <div className="mt-3 h-5 w-full animate-pulse rounded bg-muted" />
                      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="mt-4 h-6 w-16 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))
              : courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
          </div>

          {/* Empty State */}
          {!loading && courses.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
