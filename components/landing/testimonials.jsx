
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Developer',
    content: 'LearnHub transformed my career. The React course helped me land my dream job at a top tech company.',
    rating: 5,
    avatar: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Analyst',
    content: 'The Python courses are incredibly well-structured. I went from beginner to analyzing real datasets in just weeks.',
    rating: 5,
    avatar: 'MC',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    content: 'The design masterclass exceeded my expectations. Practical projects and expert feedback made all the difference.',
    rating: 5,
    avatar: 'ER',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Loved by Thousands of Learners
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our students have to say about their learning experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border border-border bg-background transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-4 text-muted-foreground">{`"${testimonial.content}"`}</p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
