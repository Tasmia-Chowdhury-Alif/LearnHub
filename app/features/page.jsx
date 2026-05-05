import Features from '@/components/landing/features';
import Navbar from '@/components/navbar';
import Footer from './../../components/footer';

export const metadata = {
  title: 'Features | LearnHub',
  description: 'Explore LearnHub features and learning tools.',
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background mt-8">
        {/* <section className="py-6 border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground">Features</h1>       
          </div>
        </section> */}

        <Features />      
      </main>
      
      <Footer />
    </>

  );
}