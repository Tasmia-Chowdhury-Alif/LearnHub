'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, Plus, Settings, LogOut, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/features', label: 'Features' },
    { href: '/testimonials', label: 'Testimonials' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">

      {/* ===== FLOATING NAVBAR CONTAINER ===== */}
      <nav className="relative w-[95%] max-w-6xl">

        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl px-4 py-2 shadow-lg">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              LearnHub
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/5 p-1 border border-white/10">

            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                    ${
                      active
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}

          </div>

          {/* AUTH */}
          <div className="hidden md:flex items-center gap-3">

            {status === 'loading' ? (
              <div className="h-8 w-20 animate-pulse rounded-full bg-muted" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 gap-2 rounded-full border-white/10 bg-white/5 backdrop-blur hover:bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate text-sm">
                      {session.user?.name || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl">

                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{session.user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {session.user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/add-course" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Course
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/manage-courses" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Manage Courses
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-background/80 backdrop-blur-xl p-4 md:hidden space-y-3">

            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition
                    ${
                      active
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}

            {!session && (
              <Button
                asChild
                className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              >
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
              </Button>
            )}

          </div>
        )}

      </nav>
    </div>
  );
}