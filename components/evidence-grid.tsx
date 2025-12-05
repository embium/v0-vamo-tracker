"use client"

import { useAppStore } from "@/lib/store"

export function EvidenceGrid() {
  const { evidence, startDate } = useAppStore()

  // Generate grid for 100 days
  const days = Array.from({ length: 100 }, (_, i) => {
    const date = new Date((startDate || Date.now()) + i * 24 * 60 * 60 * 1000)
    const dateString = date.toDateString()
    const count = evidence.filter((e) => new Date(e.date).toDateString() === dateString).length
    return { date: dateString, count }
  })

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800"
    if (count === 1) return "bg-emerald-200 dark:bg-emerald-900"
    if (count === 2) return "bg-emerald-400 dark:bg-emerald-700"
    if (count === 3) return "bg-emerald-500 dark:bg-emerald-600"
    return "bg-emerald-600 dark:bg-emerald-500"
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-grid grid-cols-20 gap-1.5 min-w-max">
        {days.map((day, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors hover:ring-2 hover:ring-emerald-500`}
            title={`${day.date}: ${day.count} evidence${day.count !== 1 ? "s" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}
