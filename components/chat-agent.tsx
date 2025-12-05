"use client"

import { useState, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const placeholders = [
  "how do i get my first paying customer",
  "are there articles that address a need for my product",
  "is there anyone in my network that may be a potential lead",
]

export function ChatAgent() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [input, setInput] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-card to-secondary/20 border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-serif">AI Assistant</h3>
          <p className="text-xs text-muted-foreground">Ask me anything about your journey</p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-muted-foreground/60"
        />
        <Button
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Get personalized advice to reach your first 10 customers
      </p>
    </div>
  )
}
