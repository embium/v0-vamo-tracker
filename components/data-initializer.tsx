'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function DataInitializer({ children }: { children: React.ReactNode }) {
  const initialize = useAppStore(state => state.initialize)
  const checkAndUpdateStreak = useAppStore(state => state.checkAndUpdateStreak)
  const initialized = useAppStore(state => state.initialized)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialize, initialized])

  useEffect(() => {
    // Check streak daily
    checkAndUpdateStreak()
    
    // Set up interval to check daily
    const interval = setInterval(() => {
      checkAndUpdateStreak()
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [checkAndUpdateStreak])

  return <>{children}</>
}
