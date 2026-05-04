/**
 * Root Layout
 * 
 * This is the main layout that wraps all pages.
 * It includes:
 * - Inter font from Google Fonts
 * - SessionProvider for NextAuth
 * - Global styles
 */

import { Inter } from 'next/font/google';
import AuthSessionProvider from '@/components/providers/session-provider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'LearnHub - Master New Skills with Expert-Led Courses',
  description: 'Unlock your potential with our comprehensive learning platform. Access hundreds of courses, learn at your own pace, and join a community of lifelong learners.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <AuthSessionProvider>
          {children}
          <Toaster position="top-right" />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
