/**
 * NextAuth.js Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Generate a secret for NextAuth:
 *    Run: openssl rand -base64 32
 *    Add to .env.local: NEXTAUTH_SECRET=your_generated_secret
 * 
 * 2. Set your app URL:
 *    Add to .env.local: NEXTAUTH_URL=http://localhost:3000
 * 
 * 3. For Google OAuth:
 *    a. Go to Google Cloud Console (https://console.cloud.google.com)
 *    b. Create a new project or select existing
 *    c. Go to APIs & Services > Credentials
 *    d. Create OAuth 2.0 Client ID (Web application)
 *    e. Add authorized redirect URI: http://localhost:3000/api/auth/callback/google
 *    f. Add to .env.local:
 *       GOOGLE_CLIENT_ID=your_client_id
 *       GOOGLE_CLIENT_SECRET=your_client_secret
 * 
 * 4. For Credentials (Demo/Mock):
 *    This uses a simple mock user for testing.
 *    In production, replace with proper database user validation.
 */



import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions = {
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider (MongoDB validation)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // 1. Connect MongoDB (YOUR EXISTING FUNCTION)
          await dbConnect();

          // 2. Find user
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            return null;
          }

          // 3. Validate password (hashed)
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            return null;
          }

          // 4. Return safe user object
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error('NextAuth authorize error:', error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role; // ADD ROLE
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};







// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// export const authOptions = {
//   providers: [
//     // Google OAuth Provider
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
    
//     // Credentials Provider (for demo/testing)
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email', placeholder: 'demo@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // Mock user for demonstration
//         // In production, validate against your database
//         const mockUsers = [
//           {
//             id: '1',
//             name: 'Demo User',
//             email: 'demo@example.com',
//             password: 'demo123',
//           },
//           {
//             id: '2',
//             name: 'Admin User',
//             email: 'admin@example.com',
//             password: 'admin123',
//           },
//         ];

//         const user = mockUsers.find(
//           (u) =>
//             u.email === credentials?.email && u.password === credentials?.password
//         );

//         if (user) {
//           // Return user object without password
//           return {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//           };
//         }

//         return null;
//       },
//     }),
//   ],
  
//   pages: {
//     signIn: '/login',
//   },
  
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
  
//   session: {
//     strategy: 'jwt',
//   },
  
//   secret: process.env.NEXTAUTH_SECRET,
// };
