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

// Sample courses for when database is empty
const sampleCourses = {
  'sample-1': {
    _id: 'sample-1',
    title: 'Complete React Development',
    shortDescription: 'Master React from scratch with hooks, context, and modern patterns.',
    fullDescription: `This comprehensive React course takes you from beginner to advanced developer. You'll learn everything you need to build modern, scalable web applications with React.

Topics covered include:
- React fundamentals and JSX
- Component architecture and props
- State management with useState and useReducer
- Side effects with useEffect
- Context API for global state
- Custom hooks development
- Performance optimization
- Testing with React Testing Library
- Real-world project building

By the end of this course, you'll have the skills to build professional React applications and be ready for job interviews.`,
    price: 99,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    createdAt: new Date('2024-01-15'),
  },
  'sample-2': {
    _id: 'sample-2',
    title: 'Python for Data Science',
    shortDescription: 'Learn Python programming and data analysis with pandas and numpy.',
    fullDescription: `Dive into the world of data science with Python. This course covers everything from basic Python programming to advanced data analysis techniques.

What you'll learn:
- Python fundamentals and syntax
- Working with pandas DataFrames
- Numerical computing with NumPy
- Data visualization with Matplotlib and Seaborn
- Statistical analysis
- Machine learning basics with scikit-learn
- Real-world data projects

Perfect for beginners who want to start a career in data science or analysts looking to add Python to their toolkit.`,
    price: 79,
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
    createdAt: new Date('2024-02-01'),
  },
  'sample-3': {
    _id: 'sample-3',
    title: 'UI/UX Design Masterclass',
    shortDescription: 'Create stunning user interfaces and seamless user experiences.',
    fullDescription: `Become a professional UI/UX designer with this comprehensive masterclass. Learn the principles and tools used by top designers at leading tech companies.

Course highlights:
- Design thinking methodology
- User research and personas
- Information architecture
- Wireframing and prototyping
- Visual design principles
- Figma mastery
- Design systems
- Accessibility best practices
- Portfolio building

Graduate with a professional portfolio and the skills to land your dream design job.`,
    price: 129,
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    createdAt: new Date('2024-01-20'),
  },
  'sample-4': {
    _id: 'sample-4',
    title: 'Node.js Backend Development',
    shortDescription: 'Build scalable server-side applications with Node.js and Express.',
    fullDescription: `Master backend development with Node.js. This course teaches you how to build robust, scalable server applications from the ground up.

What's included:
- Node.js fundamentals
- Express.js framework
- RESTful API design
- Database integration (MongoDB, PostgreSQL)
- Authentication and authorization
- Error handling and validation
- Testing and debugging
- Deployment strategies
- Performance optimization

Build real-world APIs and backend services that power modern web applications.`,
    price: 89,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    createdAt: new Date('2024-02-10'),
  },
  'sample-5': {
    _id: 'sample-5',
    title: 'JavaScript Fundamentals',
    shortDescription: 'Learn the core concepts of JavaScript from variables to async programming.',
    fullDescription: `Start your programming journey with JavaScript, the language of the web. This beginner-friendly course covers all the essentials you need to know.

Topics include:
- Variables and data types
- Control flow and loops
- Functions and scope
- Objects and arrays
- DOM manipulation
- Event handling
- Asynchronous programming
- Promises and async/await
- Modern ES6+ features

Perfect for complete beginners who want to learn programming or web development.`,
    price: 49,
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
    createdAt: new Date('2024-01-05'),
  },
  'sample-6': {
    _id: 'sample-6',
    title: 'AWS Cloud Architecture',
    shortDescription: 'Design and deploy scalable cloud solutions using Amazon Web Services.',
    fullDescription: `Become a certified AWS architect with this advanced cloud computing course. Learn to design and implement highly available, scalable systems on AWS.

Covered services:
- EC2, Lambda, and compute options
- S3, EBS, and storage solutions
- VPC and networking
- RDS, DynamoDB, and databases
- CloudFormation and infrastructure as code
- Security best practices
- Cost optimization
- High availability patterns
- Real-world architecture examples

Prepare for the AWS Solutions Architect certification while building practical skills.`,
    price: 149,
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    createdAt: new Date('2024-02-15'),
  },
};

const levelColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-orange-100 text-orange-800',
};

async function getCourse(id) {
  // Try to fetch from API first
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL || 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/courses/${id}`, {
      cache: 'no-store',
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
  } catch (error) {
    console.error('Error fetching course from API:', error);
  }

  // Fallback to sample data
  if (sampleCourses[id]) {
    return sampleCourses[id];
  }

  return null;
}

export default async function CourseDetailsPage({ params }) {
  const { id } = await params;
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
