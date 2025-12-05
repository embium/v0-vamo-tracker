"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { Home, BookOpen, Library, Users, Search, User } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"
import { StreakCounter } from "./streak-counter"
import { PineappleCounter } from "./pineapple-counter"
import { useAppStore } from "@/lib/store"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/diary", label: "Diary", icon: BookOpen },
  { href: "/library", label: "Library", icon: Library },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/find-customers", label: "Find Customers", icon: Search, requiresUnlock: true },
]

export function SidebarNav() {
  const pathname = usePathname()
  const { findCustomersUnlocked, checkAndUpdateStreak } = useAppStore()

  useEffect(() => {
    checkAndUpdateStreak()
  }, [checkAndUpdateStreak])

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="text-3xl font-bold font-serif text-foreground">
          Vamo
        </Link>
        <p className="text-xs text-muted-foreground mt-1">100 Days to $100K</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isLocked = item.requiresUnlock && !findCustomersUnlocked

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100"
                  : isLocked
                    ? "text-muted-foreground/50 cursor-not-allowed opacity-50"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
              onClick={(e) => {
                if (isLocked) e.preventDefault()
              }}
            >
              <Icon className="h-5 w-5" />
              {item.label}
              {isLocked && <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">🔒</span>}
            </Link>
          )
        })}
      </nav>

      {/* Stats Section */}
      <div className="p-4 space-y-3 border-t border-border">
        <CountdownTimer />
        <StreakCounter />
        <PineappleCounter />
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">Founder</div>
            <div className="text-xs text-muted-foreground">View profile</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
