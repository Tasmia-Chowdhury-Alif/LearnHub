import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const levelColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-orange-100 text-orange-800',
};

export default function CourseCard({ course }) {
  return (
    <Card className="group overflow-hidden border border-border transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
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
  );
}
