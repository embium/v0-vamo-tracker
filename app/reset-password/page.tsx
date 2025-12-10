'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle } from 'lucide-react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'Failed to reset password');
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
            {success ? 'Password reset!' : 'Reset password'}
          </h1>
          <p className="text-muted-foreground">
            {success
              ? 'Your password has been successfully reset'
              : 'Enter your new password below'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg">
          {success ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  You can now log in with your new password.
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirecting to login...
                </p>
              </div>
              <Link href="/login">
                <Button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                  Go to login
                </Button>
              </Link>
            </div>
          ) : error && !token ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-foreground">
                  Invalid Reset Link
                </p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <Link href="/forgot-password">
                <Button
                  className="w-full"
                  variant="outline"
                >
                  Request new reset link
                </Button>
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="h-11"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading || !token}
                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-base"
              >
                {loading ? 'Resetting password...' : 'Reset password'}
              </Button>

              <Link href="/login">
                <Button
                  className="w-full"
                  variant="outline"
                >
                  Back to login
                </Button>
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
