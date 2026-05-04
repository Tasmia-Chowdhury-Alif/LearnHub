import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">New courses added weekly</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Master New Skills with Expert-Led Courses
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Unlock your potential with our comprehensive learning platform. Access hundreds of courses, 
            learn at your own pace, and join a community of lifelong learners.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 px-8">
              <Link href="/courses">
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/#features">
                <Play className="h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8">
            <div>
              <p className="text-3xl font-bold text-foreground">500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">50k+</p>
              <p className="mt-1 text-sm text-muted-foreground">Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">4.9</p>
              <p className="mt-1 text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
