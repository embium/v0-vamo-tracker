'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid or missing verification token');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setError(data.error || 'Failed to verify email');
        }
      } catch (error) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

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
            {loading
              ? 'Verifying email...'
              : success
              ? 'Email verified!'
              : 'Verification failed'}
          </h1>
          <p className="text-muted-foreground">
            {loading
              ? 'Please wait while we verify your email address'
              : success
              ? 'Your account is now active'
              : 'There was a problem verifying your email'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg">
          {loading ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Loader2 className="h-16 w-16 text-emerald-600 animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Verifying your email address...
                </p>
              </div>
            </div>
          ) : success ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  Your email has been successfully verified. Welcome to Vamo!
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirecting to dashboard...
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-foreground">
                  Verification Failed
                </p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <div className="space-y-3">
                <Link href="/verify-email-pending">
                  <Button
                    className="w-full"
                    variant="outline"
                  >
                    Resend verification email
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="w-full">Back to Login</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
