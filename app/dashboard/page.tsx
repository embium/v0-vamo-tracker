import { EvidenceGrid } from "@/components/evidence-grid"
import { DailyTaskCard } from "@/components/daily-task-card"
import { UnlockCustomersCard } from "@/components/unlock-customers-card"
import { OnboardingModal } from "@/components/onboarding-modal"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <OnboardingModal />

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-4">
              <Sparkles className="h-4 w-4" />
              Your Journey Starts Now
            </div>

            <h1 className="text-7xl md:text-9xl font-bold font-serif tracking-tight">
              <span className="text-foreground">100 Days to</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">$100K</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get 10 paying customers in 100 days, and unlock the{" "}
              <span className="font-semibold text-foreground">$100K prize</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <DailyTaskCard />
            <UnlockCustomersCard />
          </div>

          {/* Evidence Heatmap */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-serif mb-2">Your Progress</h2>
            <p className="text-sm text-muted-foreground mb-6">A visual representation of your daily evidence commits</p>
            <EvidenceGrid />
            <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm" />
                <div className="w-3 h-3 bg-emerald-200 dark:bg-emerald-900 rounded-sm" />
                <div className="w-3 h-3 bg-emerald-400 dark:bg-emerald-700 rounded-sm" />
                <div className="w-3 h-3 bg-emerald-500 dark:bg-emerald-600 rounded-sm" />
                <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-500 rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
