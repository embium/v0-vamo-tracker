import nodemailer from 'nodemailer';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // false for port 587, true for port 465
  requireTLS: true, // Use STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // Allow connections to servers with self-signed certificates
    rejectUnauthorized: false,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Verify your email - Vamo',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; padding: 20px 0; }
              .logo { font-size: 48px; }
              .title { font-size: 24px; font-weight: bold; margin: 20px 0; }
              .button { display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #059669, #0d9488); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
              .footer { color: #666; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🍍</div>
                <h1>Vamo</h1>
              </div>
              <h2 class="title">Verify your email address</h2>
              <p>Thanks for signing up! Please verify your email address to start your 100-day journey to $100K.</p>
              <p>Click the button below to verify your email:</p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #059669;">${verificationUrl}</p>
              <div class="footer">
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create an account with Vamo, you can safely ignore this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Reset your password - Vamo',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; padding: 20px 0; }
              .logo { font-size: 48px; }
              .title { font-size: 24px; font-weight: bold; margin: 20px 0; }
              .button { display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #059669, #0d9488); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
              .footer { color: #666; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
              .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🍍</div>
                <h1>Vamo</h1>
              </div>
              <h2 class="title">Reset your password</h2>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #059669;">${resetUrl}</p>
              <div class="warning">
                <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </div>
              <div class="footer">
                <p>For security, this link can only be used once.</p>
                <p>If you're having trouble, please contact support.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return { success: false, error };
  }
}

export function generateToken(): string {
  // Generate a secure random token
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}
