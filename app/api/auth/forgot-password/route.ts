'use server';

import prisma from '@/lib/db/prisma';
import { generateToken, sendPasswordResetEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    // (don't reveal if email exists or not for security)
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Generate reset token
    const token = generateToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: `reset:${email.toLowerCase()}`,
        token,
        expires,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
