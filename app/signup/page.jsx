'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Credentials Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Signup failed');
        return;
      }

      toast.success('Account created successfully!');

      // Optional: auto-login after signup
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result?.error) {
        router.push('/');
        router.refresh();
      } else {
        router.push('/login');
      }

    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Signup (same as login)
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      toast.error('Failed to sign up with Google.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border border-border">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
          </Link>

          <CardTitle className="mt-4 text-2xl">Create account</CardTitle>
          <CardDescription>
            Sign up to start learning with us
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          
          {/* ✅ Google Signup */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* ✅ Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          {/* Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-foreground underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}








// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { BookOpen, Loader2 } from 'lucide-react';
// import { toast } from 'sonner';

// export default function SignupPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || 'Signup failed');
//         return;
//       }

//       toast.success('Account created successfully!');
//       router.push('/login');
//     } catch (error) {
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <Link href="/" className="mx-auto flex items-center gap-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//               <BookOpen className="h-6 w-6 text-primary-foreground" />
//             </div>
//           </Link>

//           <CardTitle className="mt-4 text-2xl">Create account</CardTitle>
//           <CardDescription>
//             Sign up to start learning with us
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSignup} className="space-y-4">
            
//             {/* Name */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Name</label>
//               <Input
//                 name="name"
//                 placeholder="Your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Email</label>
//               <Input
//                 name="email"
//                 type="email"
//                 placeholder="example@email.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Password</label>
//               <Input
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Submit */}
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 'Create account'
//               )}
//             </Button>
//           </form>

//           {/* Link to login */}
//           <p className="mt-4 text-center text-sm text-muted-foreground">
//             Already have an account?{' '}
//             <Link href="/login" className="text-foreground underline">
//               Sign in
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }