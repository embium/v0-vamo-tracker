'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md space-y-6 text-center">
        <div className="text-6xl">⚠️</div>
        <h2 className="text-3xl font-bold font-serif">Dashboard Error</h2>
        <p className="text-muted-foreground">
          {error.message === 'Unauthorized'
            ? 'Your session may have expired. Please log in again.'
            : error.message ||
              'Failed to load dashboard data. Please try again.'}
        </p>
        <div className="flex flex-col gap-3">
          <Button
            onClick={reset}
            className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            Try again
          </Button>
          {error.message === 'Unauthorized' && (
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full"
              >
                Go to Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
