"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, Users, Search } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"
import { StreakCounter } from "./streak-counter"
import { PineappleCounter } from "./pineapple-counter"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/diary", label: "Diary", icon: BookOpen },
  { href: "/library", label: "Library", icon: Library },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/reddit", label: "Reddit", icon: Search },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold font-serif text-foreground">
              Vamo
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CountdownTimer />
            <StreakCounter />
            <PineappleCounter />
          </div>
        </div>
      </div>
    </nav>
  )
}
