"use client"

import { useAppStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { FileText, ImageIcon, LinkIcon, Camera, Lightbulb } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const iconMap = {
  text: FileText,
  image: ImageIcon,
  link: LinkIcon,
  screenshot: Camera,
  note: Lightbulb,
}

export default function LibraryPage() {
  const { evidence } = useAppStore()
  const [filter, setFilter] = useState<string>("all")

  const filteredEvidence = filter === "all" ? evidence : evidence.filter((e) => e.type === filter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">Evidence Library</h1>
          <p className="text-lg text-muted-foreground">All your progress, collected in one place</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
            All ({evidence.length})
          </Button>
          {Object.entries(iconMap).map(([type, Icon]) => {
            const count = evidence.filter((e) => e.type === type).length
            return (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                onClick={() => setFilter(type)}
                size="sm"
              >
                <Icon className="h-4 w-4 mr-2" />
                {type} ({count})
              </Button>
            )
          })}
        </div>

        {/* Evidence Grid */}
        {filteredEvidence.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">No evidence yet</h3>
            <p className="text-muted-foreground">Start adding your progress in the Diary to build your library</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvidence.map((item) => {
              const Icon = iconMap[item.type]
              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground capitalize">{item.type}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
                    </div>

                    {item.type === "image" ? (
                      <img
                        src={item.content || "/placeholder.svg"}
                        alt="Evidence"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : item.type === "link" ? (
                      <a
                        href={item.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline break-all"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground leading-relaxed line-clamp-4">{item.content}</p>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
