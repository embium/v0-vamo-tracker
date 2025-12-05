"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppStore, type PotentialCustomer } from "@/lib/store"
import { Eye, UserPlus, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RevealCustomerTileProps {
  customer: PotentialCustomer
}

export function RevealCustomerTile({ customer }: RevealCustomerTileProps) {
  const { pineapples, revealCustomer, addCustomerToLeads } = useAppStore()
  const { toast } = useToast()
  const [showReward, setShowReward] = useState(false)
  const REVEAL_COST = 15

  const handleReveal = () => {
    const success = revealCustomer(customer.id)
    if (success) {
      setShowReward(true)
      setTimeout(() => setShowReward(false), 2000)
      toast({
        title: "Customer Revealed!",
        description: `You discovered ${customer.name} as a potential lead.`,
      })
    }
  }

  const handleAddToLeads = () => {
    addCustomerToLeads(customer.id)
    toast({
      title: "Added to Leads",
      description: `${customer.name} has been added to your Leads CRM.`,
    })
  }

  if (!customer.revealed) {
    return (
      <Card className="relative overflow-hidden bg-muted/50 border-2 border-dashed">
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50" />
        <CardContent className="relative p-6 flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Eye className="h-8 w-8 text-muted-foreground" />
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">Hidden Customer</h3>
            <p className="text-sm text-muted-foreground">Reveal to discover potential lead</p>
          </div>

          <Button
            onClick={handleReveal}
            disabled={pineapples < REVEAL_COST}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            Reveal for {REVEAL_COST} 🍍
          </Button>

          {pineapples < REVEAL_COST && (
            <p className="text-xs text-muted-foreground">Need {REVEAL_COST - pineapples} more 🍍 pineapples</p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden border-2 border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
      {showReward && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 animate-pulse pointer-events-none flex items-center justify-center">
          <Sparkles className="h-12 w-12 text-yellow-500" />
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {customer.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground">{customer.name}</h3>
            <p className="text-sm text-muted-foreground">{customer.background}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Why they're a potential lead:</p>
          <p className="text-sm text-foreground">{customer.reason}</p>
        </div>

        <Button onClick={handleAddToLeads} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
          <UserPlus className="h-4 w-4 mr-2" />
          Add to Leads Page
        </Button>
      </CardContent>
    </Card>
  )
}
