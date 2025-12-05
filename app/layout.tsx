import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SidebarNav } from "@/components/sidebar-nav"
import { Toaster } from "@/components/ui/toaster"
import { HelpButton } from "@/components/help-button"
import "./globals.css"

// Updated fonts for warm, aspirational feel
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Vamo – 100 Days to 100K",
  description: "Get 10 paying customers in 100 days and unlock the $100K prize",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <SidebarNav />
        <main className="ml-64">{children}</main>
        <Toaster />
        <HelpButton />
        <Analytics />
      </body>
    </html>
  )
}
