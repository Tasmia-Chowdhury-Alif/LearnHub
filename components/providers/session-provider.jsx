'use client';

/**
 * Session Provider Component
 * 
 * Wraps the app with NextAuth SessionProvider to enable
 * useSession hook and session context throughout the app.
 */

import { SessionProvider } from 'next-auth/react';

export default function AuthSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
