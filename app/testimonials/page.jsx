import Testimonials from '@/components/landing/testimonials';
import Navbar from './../../components/navbar';
import Footer from './../../components/footer';

export const metadata = {
  title: 'Testimonials | LearnHub',
  description: 'What our students say about LearnHub.',
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background mt-8">
        {/* Reuse existing component */}
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}