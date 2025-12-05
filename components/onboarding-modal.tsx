"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Calendar, Lock, Sparkles, Users, TrendingUp } from "lucide-react"

const ONBOARDING_SCREENS = [
  {
    icon: Sparkles,
    title: "Welcome to Vamo",
    subtitle: "100 Days to 100K",
    description: "Your mission: Get your first 10 paying customers in 100 days.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Calendar,
    title: "Daily Upload Habit",
    subtitle: "Build your evidence library",
    description: "Upload a note, thought, screenshot, or image to your Diary every day to earn 🍍 pineapples.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Lock,
    title: "Unlocking Customer Discovery",
    subtitle: "10-day streak challenge",
    description: "If you upload to your Diary for 10 days straight, you unlock the Find Customers feature.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Using Pineapples",
    subtitle: "Reveal hidden opportunities",
    description: "Use the 🍍 pineapples you earn to reveal hidden potential customers on the Find Customers page.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Turning Leads Into Customers",
    subtitle: "Your path to $100K",
    description: "Any customer you reveal and choose can be added to your Leads CRM. Get 10 customers to win!",
    gradient: "from-pink-500 to-rose-500",
  },
]

export function OnboardingModal() {
  const { hasSeenOnboarding, completeOnboarding } = useAppStore()
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setCurrentScreen(0)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [hasSeenOnboarding])

  const handleNext = () => {
    if (currentScreen < ONBOARDING_SCREENS.length - 1) {
      setCurrentScreen((prev) => prev + 1)
    } else {
      completeOnboarding()
    }
  }

  const currentContent = ONBOARDING_SCREENS[currentScreen]
  const Icon = currentContent.icon

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
        <div className={`bg-gradient-to-br ${currentContent.gradient} p-12 text-white text-center`}>
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <Icon className="w-10 h-10" />
            </div>
          </div>

          <h2 className="text-4xl font-bold font-serif mb-2">{currentContent.title}</h2>
          <p className="text-xl text-white/90 font-medium">{currentContent.subtitle}</p>
        </div>

        <div className="p-8 text-center space-y-6">
          <p className="text-lg text-foreground leading-relaxed max-w-lg mx-auto">{currentContent.description}</p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {ONBOARDING_SCREENS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentScreen ? "w-8 bg-foreground" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <Button onClick={handleNext} size="lg" className="px-8">
            {currentScreen < ONBOARDING_SCREENS.length - 1 ? "Next" : "Start My Challenge"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
