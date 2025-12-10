'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, LogOut } from 'lucide-react';

export default function VerifyEmailPendingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleResendEmail = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    setError('');
    setSent(false);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (response.ok) {
        setSent(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="text-4xl">🍍</div>
            <span className="text-2xl font-bold font-serif">Vamo</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
            Verify your email
          </h1>
          <p className="text-muted-foreground">
            Please check your inbox to verify your account
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                We sent a verification email to
              </p>
              <p className="font-semibold text-foreground">
                {session?.user?.email}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Click the link in the email to verify your account and start
                your 100-day journey to $100K.
              </p>
            </div>

            {sent && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  ✓ Verification email sent! Please check your inbox.
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                disabled={loading || sent}
                className="w-full"
                variant="outline"
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                />
                {loading
                  ? 'Sending...'
                  : sent
                  ? 'Email sent!'
                  : 'Resend verification email'}
              </Button>

              <Button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full"
                variant="ghost"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Didn't receive the email? Check your spam folder or try
                resending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
