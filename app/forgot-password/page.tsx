'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
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
            {submitted ? 'Check your email' : 'Forgot password?'}
          </h1>
          <p className="text-muted-foreground">
            {submitted
              ? 'If an account exists, we sent password reset instructions'
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg">
          {submitted ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  We've sent a password reset link to{' '}
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  The link will expire in 1 hour for security reasons.
                </p>
              </div>
              <Link href="/login">
                <Button
                  className="w-full"
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
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

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-11"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-base"
              >
                {loading ? 'Sending...' : 'Send reset instructions'}
              </Button>

              <Link href="/login">
                <Button
                  className="w-full"
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Button>
              </Link>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
