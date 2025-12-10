import type React from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SidebarNav } from '@/components/sidebar-nav';
import { Toaster } from '@/components/ui/toaster';
import { HelpButton } from '@/components/help-button';
import { DataInitializer } from '@/components/data-initializer';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db/prisma';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  // Check email verification for credential-based users
  if (session.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { emailVerified: true, accounts: { select: { provider: true } } },
    });

    // Only require verification for users who signed up with credentials (no OAuth)
    const hasOAuthAccount = user?.accounts.some(
      (account) => account.provider !== 'credentials'
    );

    if (user && !user.emailVerified && !hasOAuthAccount) {
      redirect('/verify-email-pending');
    }
  }

  return (
    <DataInitializer>
      <SidebarNav />
      <main className="ml-64">{children}</main>
      <Toaster />
      <HelpButton />
      <Analytics />
    </DataInitializer>
  );
}
