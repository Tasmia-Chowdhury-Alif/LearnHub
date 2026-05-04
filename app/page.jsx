import Navbar from '../components/navbar';
import Hero from './../components/landing/hero';
import Features from './../components/landing/features';
import PopularCourses from './../components/landing/popular-courses';
import Testimonials from './../components/landing/testimonials';
import CTABanner from './../components/landing/cta-banner';
import Footer from '../components/footer';


/*
 * Landing Page
 * 
 * The main entry point of the application featuring:
 * - Hero section with CTA
 * - Features section
 * - Popular courses grid
 * - Testimonials
 * - CTA banner
 */




export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <PopularCourses />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
