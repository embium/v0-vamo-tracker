"use client"

import { useAppStore } from "@/lib/store"
import { Flame } from "lucide-react"

export function StreakCounter() {
  const { streak } = useAppStore()

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-full border border-orange-200/50 dark:border-orange-800/50">
      <Flame className={`h-5 w-5 ${streak > 0 ? "text-orange-500" : "text-gray-400"}`} />
      <span className="text-sm font-semibold text-orange-900 dark:text-orange-100">
        {streak} day{streak !== 1 ? "s" : ""}
      </span>
    </div>
  )
}
