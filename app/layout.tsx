import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Vamo – 100 Days to 100K',
  description: 'Get 10 paying customers in 100 days and unlock the $100K prize',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
