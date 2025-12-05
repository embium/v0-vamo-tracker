"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

export function HelpButton() {
  const { reopenOnboarding } = useAppStore()

  return (
    <Button
      onClick={reopenOnboarding}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="View onboarding again"
    >
      <HelpCircle className="h-6 w-6" />
    </Button>
  )
}
