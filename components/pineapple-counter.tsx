"use client"

import { useAppStore } from "@/lib/store"

export function PineappleCounter() {
  const { pineapples } = useAppStore()

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-full border border-yellow-200/50 dark:border-yellow-800/50">
      <span className="text-xl">🍍</span>
      <span className="text-sm font-bold text-yellow-900 dark:text-yellow-100">{pineapples}</span>
    </div>
  )
}
