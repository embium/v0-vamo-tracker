'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Home,
  BookOpen,
  Library,
  Users,
  Search,
  User,
  LogOut,
  Bot,
  Menu,
  X,
} from 'lucide-react';
import { CountdownTimer } from './countdown-timer';
import { StreakCounter } from './streak-counter';
import { PineappleCounter } from './pineapple-counter';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/diary', label: 'Diary', icon: BookOpen },
  { href: '/dashboard/library', label: 'Library', icon: Library },
  { href: '/dashboard/leads', label: 'Leads', icon: Users },
  {
    href: '/dashboard/find-customers',
    label: 'Find Customers',
    icon: Search,
    requiresUnlock: true,
  },
  { href: '/dashboard/assistant', label: 'Assistant', icon: Bot },
];

export function SidebarNav() {
  const pathname = usePathname();
  const {
    findCustomersUnlocked,
    checkAndUpdateStreak,
    userProfile,
    fetchUserProfile,
  } = useAppStore();
  const [profileLoading, setProfileLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAndUpdateStreak();
    fetchUserProfile().finally(() => setProfileLoading(false));
  }, [checkAndUpdateStreak, fetchUserProfile]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-card border border-border rounded-lg shadow-lg hover:bg-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-3xl font-bold font-serif text-foreground"
            >
              Vamo
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              100 Days to $100K
            </p>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isLocked = item.requiresUnlock && !findCustomersUnlocked;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100'
                    : isLocked
                    ? 'text-muted-foreground/50 opacity-75'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
                {isLocked && (
                  <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                    🔒
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Stats Section */}
        <div className="p-4 space-y-3 border-t border-border">
          <CountdownTimer />
          <StreakCounter />
          <PineappleCounter />
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {profileLoading ? (
              <div className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/dashboard/profile">
                <div className="flex items-center gap-3 px-3 py-3 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center overflow-hidden">
                    {userProfile?.image ? (
                      <Image
                        src={userProfile.image}
                        alt={userProfile.name || 'User'}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {userProfile?.name || 'User'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      View profile
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div className="border-t border-border">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground hover:text-red-600 hover:bg-accent/30 transition-colors w-full"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
