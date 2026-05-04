/**
 * NextAuth.js API Route Handler
 * 
 * This route handles all authentication requests:
 * - /api/auth/signin - Sign in page
 * - /api/auth/signout - Sign out
 * - /api/auth/callback/* - OAuth callbacks
 * - /api/auth/session - Get session
 */

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
