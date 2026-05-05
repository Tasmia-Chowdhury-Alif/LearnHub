import { BookOpen, Users, Award, Clock, Laptop, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: BookOpen,
    title: 'Expert-Led Content',
    description: 'Learn from industry professionals with years of real-world experience.',
  },
  {
    icon: Clock,
    title: 'Learn at Your Pace',
    description: 'Access courses anytime, anywhere. Study on your schedule.',
  },
  {
    icon: Award,
    title: 'Certificates',
    description: 'Earn recognized certificates to showcase your achievements.',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Join a vibrant community of learners and get help when you need it.',
  },
  {
    icon: Laptop,
    title: 'Hands-On Projects',
    description: 'Apply what you learn with practical, real-world projects.',
  },
  {
    icon: Shield,
    title: 'Lifetime Access',
    description: 'Once enrolled, access your courses forever with all future updates.',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform provides all the tools and resources you need to achieve your learning goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
