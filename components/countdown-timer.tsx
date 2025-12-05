"use client"

import { useEffect, useState } from "react"
import { useAppStore } from "@/lib/store"

export function CountdownTimer() {
  const { startDate } = useAppStore()
  const [timeLeft, setTimeLeft] = useState({ days: 100, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!startDate) return

    const calculateTimeLeft = () => {
      const endDate = startDate + 100 * 24 * 60 * 60 * 1000 // 100 days from start
      const now = Date.now()
      const difference = endDate - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [startDate])

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{timeLeft.days}d</span>
        <span className="text-emerald-400">:</span>
        <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{timeLeft.hours}h</span>
        <span className="text-emerald-400">:</span>
        <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{timeLeft.minutes}m</span>
        <span className="text-emerald-400">:</span>
        <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{timeLeft.seconds}s</span>
      </div>
    </div>
  )
}
