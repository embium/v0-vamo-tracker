"use client"

import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Lock, Unlock, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function UnlockCustomersCard() {
  const { streak, findCustomersUnlocked } = useAppStore()
  const router = useRouter()
  const REQUIRED_STREAK = 10

  const progressPercent = Math.min((streak / REQUIRED_STREAK) * 100, 100)

  return (
    <Card
      className={`transition-all ${
        findCustomersUnlocked
          ? "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-blue-300 dark:border-blue-700 hover:shadow-lg cursor-pointer"
          : "bg-muted/50 opacity-75"
      }`}
      onClick={() => findCustomersUnlocked && router.push("/dashboard/find-customers")}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              {findCustomersUnlocked ? (
                <>
                  <Unlock className="h-6 w-6 text-blue-600" />
                  Find Customers Unlocked!
                </>
              ) : (
                <>
                  <Lock className="h-6 w-6 text-muted-foreground" />
                  Unlock Finding Customers
                </>
              )}
            </CardTitle>
            <CardDescription className="mt-2">
              {findCustomersUnlocked
                ? "Discover and reveal potential early customers"
                : "Maintain a 10-day streak to unlock the ability to find potential early customers."}
            </CardDescription>
          </div>
          {!findCustomersUnlocked && <Lock className="h-8 w-8 text-muted-foreground" />}
          {findCustomersUnlocked && <Users className="h-8 w-8 text-blue-600" />}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!findCustomersUnlocked ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Streak Progress</span>
              <span className="font-semibold">
                {streak}/{REQUIRED_STREAK} days
              </span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        ) : (
          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            Go to Find Customers Page
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
