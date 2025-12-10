'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Target, TrendingUp, Users, Zap, Award } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function LandingPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🍍</div>
              <span className="text-xl font-bold font-serif">Vamo</span>
            </div>
            <div className="flex items-center gap-4">
              {status === 'loading' ? (
                <div className="h-10 w-24 animate-pulse bg-muted rounded-md" />
              ) : session ? (
                <Link href="/dashboard">
                  <Button className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Log In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-sm font-medium text-emerald-900 dark:text-emerald-100">
            <Sparkles className="h-4 w-4" />
            Your Journey to $100K Starts Now
          </div>

          <h1 className="text-6xl md:text-8xl font-bold font-serif tracking-tight">
            <span className="text-foreground">100 Days to</span>
            <br />
            <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              $100K
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The motivational tracker designed for first-time founders. Get your
            first{' '}
            <span className="font-semibold text-foreground">
              10 paying customers
            </span>{' '}
            in <span className="font-semibold text-foreground">100 days</span>{' '}
            and unlock the $100K milestone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg px-8 py-6"
              >
                Start Your Challenge
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            Everything You Need to Win
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vamo combines proven gamification with practical tools to keep you
            motivated every single day
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">
              100-Day Countdown
            </h3>
            <p className="text-muted-foreground">
              Track your journey with a visual countdown timer. Every day counts
              toward your $100K goal.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">Daily Streaks</h3>
            <p className="text-muted-foreground">
              Duolingo-style streak system keeps you building momentum. Miss a
              day, lose your streak.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">
              Pineapple Credits
            </h3>
            <p className="text-muted-foreground">
              Earn credits for daily uploads. Spend them to unlock customer
              discovery features.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">
              Evidence Library
            </h3>
            <p className="text-muted-foreground">
              Upload screenshots, metrics, and learnings daily. Build a visual
              story of your progress.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">
              Find Customers
            </h3>
            <p className="text-muted-foreground">
              Unlock at day 10. Discover potential leads and add them to your
              personal CRM.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">Leads CRM</h3>
            <p className="text-muted-foreground">
              Track your first 10 customers from cold outreach to secured
              payment.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30 rounded-3xl my-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            Your Path to Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, proven system that works
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="h-16 w-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-2xl font-bold font-serif mb-3">
              Upload Daily Evidence
            </h3>
            <p className="text-muted-foreground">
              Take a screenshot, share a metric, or document a learning.
              Consistency builds momentum.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-2xl font-bold font-serif mb-3">
              Find & Track Customers
            </h3>
            <p className="text-muted-foreground">
              Use pineapple credits to discover leads. Move them through your
              sales pipeline.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-2xl font-serif mb-3">Secure 10 Customers</h3>
            <p className="text-muted-foreground">
              Get your first paying customers. Hit $100K. Celebrate your win.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            The Challenge Every Founder Needs
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Every great company starts with one paying customer. Vamo is your
            companion on the journey from zero to ten.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
            >
              Start Your 100 Days Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🍍</div>
              <span className="text-lg font-bold font-serif">Vamo</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Built with ❤️ for first-time founders everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
