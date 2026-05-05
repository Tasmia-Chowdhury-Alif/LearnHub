import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background min-h-screen">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">

        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-transparent" />

        {/* Radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,119,198,0.35),transparent_60%)]" />

        {/* Grid pattern (Tailwind v4 safe) */}
        <div
          className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
        />

        {/* Glow blobs */}
        <div className="absolute top-[-100px] left-1/4 h-72 w-72 rounded-full bg-purple-500/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-100px] right-1/4 h-72 w-72 rounded-full bg-indigo-500/40 blur-3xl animate-pulse" />

      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:py-32">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              New courses every week
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
              Become Job-Ready with Real-World Skills
            </h1>

            {/* Highlight line */}
            {/* <p className="mt-4 font-medium text-indigo-500">
              Learn React, Python, UI/UX & more — from industry experts 🚀
            </p> */}

            <p className="mt-4 text-lg text-muted-foreground">
              Learn by building real projects, not just watching tutorials.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="gap-2 px-6 transition hover:scale-105 active:scale-95"
              >
                <Link href="/courses">
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 backdrop-blur hover:scale-105 active:scale-95"
              >
                <Link href="#">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              {[
                { value: '500+', label: 'Courses' },
                { value: '50k+', label: 'Students' },
                { value: '4.9', label: 'Rating' },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="text-3xl font-bold transition-transform group-hover:scale-110">
                    {item.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE FLOATING CARD */}
          <div className="relative hidden lg:block">

            <div className="absolute right-0 top-10 w-80 rounded-2xl border bg-card/80 p-5 shadow-2xl backdrop-blur transition hover:-translate-y-2">

              <p className="text-sm text-muted-foreground">
                🔥 Trending Course
              </p>

              <h4 className="mt-1 font-semibold">
                React Mastery
              </h4>

              <p className="mt-1 text-xs text-muted-foreground">
                12k students enrolled
              </p>

              {/* mini visual bar */}
              <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}