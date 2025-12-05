"use client"

import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export function DailyTaskCard() {
  const { dailyTaskCompleted } = useAppStore()
  const router = useRouter()

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        dailyTaskCompleted
          ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border-emerald-300 dark:border-emerald-700"
          : "hover:border-emerald-300"
      }`}
      onClick={() => router.push("/diary")}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              {dailyTaskCompleted ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  Daily Task Complete!
                </>
              ) : (
                <>
                  <Upload className="h-6 w-6" />
                  Daily Task
                </>
              )}
            </CardTitle>
            <CardDescription className="mt-2">
              {dailyTaskCompleted
                ? "You've earned 10 🍍 pineapples today!"
                : "Upload one piece of evidence to your Diary to earn 10 🍍 pineapples today."}
            </CardDescription>
          </div>
          {!dailyTaskCompleted && <div className="text-3xl">🍍</div>}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{dailyTaskCompleted ? "1" : "0"}/1</span>
          </div>
          <Progress value={dailyTaskCompleted ? 100 : 0} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
