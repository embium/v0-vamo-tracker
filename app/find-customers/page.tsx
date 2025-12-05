"use client"

import { useAppStore } from "@/lib/store"
import { RevealCustomerTile } from "@/components/reveal-customer-tile"

export default function FindCustomersPage() {
  const { findCustomersUnlocked, potentialCustomers, streak } = useAppStore()

  if (!findCustomersUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 rounded-3xl p-8 shadow-2xl border-2 border-orange-200 dark:border-orange-800">
          <div className="text-center space-y-6">
            <div className="text-7xl animate-pulse">🔥</div>
            <h2 className="text-3xl font-bold font-serif bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Keep Your Streak Alive!
            </h2>
            <p className="text-lg text-foreground/80">
              Unlock <span className="font-bold text-orange-600 dark:text-orange-400">Find Customers</span> by
              maintaining a <span className="font-bold">10-day streak</span>
            </p>
            <div className="bg-white/50 dark:bg-black/30 rounded-2xl p-6 space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Current Streak</div>
              <div className="text-5xl font-bold text-orange-600 dark:text-orange-400">{streak}</div>
              <div className="text-sm text-muted-foreground">
                {streak < 10 ? `${10 - streak} more days to unlock` : "Unlocked!"}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload evidence daily to build your streak and unlock this powerful feature
            </p>
          </div>
        </div>
      </div>
    )
  }

  const revealedCount = potentialCustomers.filter((c) => c.revealed).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">Find Customers</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Use your 🍍 pineapples to reveal potential customers and add them to your leads
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-sm font-medium">
            Revealed: {revealedCount}/{potentialCustomers.length}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {potentialCustomers.map((customer) => (
            <RevealCustomerTile key={customer.id} customer={customer} />
          ))}
        </div>
      </div>
    </div>
  )
}
