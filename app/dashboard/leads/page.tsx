"use client"

import { useState, useMemo } from "react"
import { useAppStore, type Lead } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trophy, CheckCircle2 } from "lucide-react"

const relationshipLabels = {
  "know-well": "Know them well",
  "talked-once": "Talked once",
  "dont-know": "Don't know them",
}

const stageLabels = {
  "setup-call": "Set up call",
  discovery: "Discovery call",
  demo: "Demo",
  pricing: "Pricing call",
  secured: "Secured",
  "did-not-close": "Did not close",
}

export default function LeadsPage() {
  const { leads, addLead, updateLead, loading } = useAppStore()
  const [isAddingLead, setIsAddingLead] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    relationship: "know-well" as Lead["relationship"],
    reason: "",
    stage: "setup-call" as Lead["stage"],
  })

  const securedLeads = leads.filter((l) => l.stage === "secured")
  const allSecured = securedLeads.length === 10

  const statistics = useMemo(() => {
    const totalLeads = leads.length
    const securedCount = leads.filter((l) => l.stage === "secured").length
    const lostCount = leads.filter((l) => l.stage === "did-not-close").length
    const closedDeals = securedCount + lostCount

    const winRate = closedDeals > 0 ? Math.round((securedCount / closedDeals) * 100) : 0

    const overallConversionRate = totalLeads > 0 ? Math.round((securedCount / totalLeads) * 100) : 0

    const goalProgress = Math.round((securedCount / 10) * 100)

    const relationshipBreakdown = {
      "know-well":
        totalLeads > 0
          ? Math.round((leads.filter((l) => l.relationship === "know-well").length / totalLeads) * 100)
          : 0,
      "talked-once":
        totalLeads > 0
          ? Math.round((leads.filter((l) => l.relationship === "talked-once").length / totalLeads) * 100)
          : 0,
      "dont-know":
        totalLeads > 0
          ? Math.round((leads.filter((l) => l.relationship === "dont-know").length / totalLeads) * 100)
          : 0,
    }

    const relationshipConversion: Record<string, number> = {}
    const relationshipTypes: Lead["relationship"][] = ["know-well", "talked-once", "dont-know"]
    relationshipTypes.forEach((rel) => {
      const leadsWithRelationship = leads.filter((l) => l.relationship === rel)
      const securedWithRelationship = leadsWithRelationship.filter((l) => l.stage === "secured").length
      relationshipConversion[rel] =
        leadsWithRelationship.length > 0
          ? Math.round((securedWithRelationship / leadsWithRelationship.length) * 100)
          : 0
    })

    const stageDistribution: Record<string, number> = {}
    const stageTypes: Lead["stage"][] = ["setup-call", "discovery", "demo", "pricing", "secured", "did-not-close"]
    stageTypes.forEach((stage) => {
      const leadsAtStage = leads.filter((l) => l.stage === stage).length
      stageDistribution[stage] = totalLeads > 0 ? Math.round((leadsAtStage / totalLeads) * 100) : 0
    })

    return {
      winRate,
      overallConversionRate,
      goalProgress,
      relationshipBreakdown,
      relationshipConversion,
      stageDistribution,
    }
  }, [leads])

  const handleSaveLead = async () => {
    if (!formData.name.trim()) return

    setIsSaving(true)

    try {
      if (editingLead) {
        await updateLead(editingLead.id, formData)
      } else {
        await addLead(formData)
      }

      setFormData({
        name: "",
        relationship: "know-well",
        reason: "",
        stage: "setup-call",
      })
      setEditingLead(null)
      setIsAddingLead(false)
    } catch (error) {
      console.error("Failed to save lead:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleOpenAddDialog = () => {
    setEditingLead(null)
    setFormData({
      name: "",
      relationship: "know-well",
      reason: "",
      stage: "setup-call",
    })
    setIsAddingLead(true)
  }

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
    setFormData({
      name: lead.name,
      relationship: lead.relationship,
      reason: lead.reason,
      stage: lead.stage,
    })
    setIsAddingLead(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">Your Leads</h1>
          <p className="text-lg text-muted-foreground">Track your journey to 10 paying customers</p>
        </div>

        {leads.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">Win Rate</CardDescription>
                <CardTitle className="text-3xl font-bold text-emerald-600">{statistics.winRate}%</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">Overall Conversion</CardDescription>
                <CardTitle className="text-3xl font-bold text-blue-600">{statistics.overallConversionRate}%</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">Progress to Goal</CardDescription>
                <CardTitle className="text-3xl font-bold text-purple-600">{statistics.goalProgress}%</CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        <Card className="mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-emerald-600" />
              Customer Progress
            </CardTitle>
            <CardDescription>{securedLeads.length}/10 customers secured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-6">
              {Array.from({ length: 10 }, (_, i) => {
                const customer = securedLeads[i]
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                      customer
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    }`}
                    title={customer?.name}
                  >
                    {customer ? <CheckCircle2 className="h-6 w-6" /> : i + 1}
                  </div>
                )
              })}
            </div>

            {allSecured && (
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold text-lg shadow-xl"
              >
                SUBMIT TO GET $100K REWARD
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="mb-6">
          <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600" onClick={handleOpenAddDialog}>
                <Plus className="h-5 w-5 mr-2" />
                Add New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingLead ? "Edit Lead" : "Add New Lead"}</DialogTitle>
                <DialogDescription>
                  {editingLead
                    ? "Update lead information"
                    : "Add a potential customer to track through your sales process"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Customer name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => setFormData({ ...formData, relationship: value as Lead["relationship"] })}
                  >
                    <SelectTrigger id="relationship">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="know-well">Know them well</SelectItem>
                      <SelectItem value="talked-once">Talked once</SelectItem>
                      <SelectItem value="dont-know">Don't know them</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Why are they a potential lead?</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="What makes them a good fit for your product?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) => setFormData({ ...formData, stage: value as Lead["stage"] })}
                  >
                    <SelectTrigger id="stage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="setup-call">Set up call</SelectItem>
                      <SelectItem value="discovery">Discovery call</SelectItem>
                      <SelectItem value="demo">Demo</SelectItem>
                      <SelectItem value="pricing">Pricing call</SelectItem>
                      <SelectItem value="secured">Secured</SelectItem>
                      <SelectItem value="did-not-close">Did not close</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveLead} className="w-full" disabled={!formData.name.trim() || isSaving || loading}>
                  {isSaving ? "Saving..." : editingLead ? "Save Changes" : "Add Lead"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {leads.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">No leads yet</h3>
            <p className="text-muted-foreground">Add your first potential customer to start tracking your progress</p>
          </Card>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b text-sm font-medium text-muted-foreground">
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Relationship</div>
              <div className="col-span-4">Reason</div>
              <div className="col-span-3">Stage</div>
              <div className="col-span-1 text-right">Conv %</div>
            </div>

            <div className="divide-y">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => handleEditLead(lead)}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors hover:bg-muted/30 cursor-pointer ${
                    lead.stage === "secured"
                      ? "bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30"
                      : ""
                  }`}
                >
                  <div className="col-span-2">
                    <div className="font-semibold flex items-center gap-2">
                      {lead.name}
                      {lead.stage === "secured" && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="text-sm text-muted-foreground">{relationshipLabels[lead.relationship]}</span>
                  </div>

                  <div className="col-span-4">
                    <p className="text-sm text-foreground line-clamp-2">{lead.reason}</p>
                  </div>

                  <div className="col-span-3" onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={lead.stage}
                      onValueChange={(value) => updateLead(lead.id, { stage: value as Lead["stage"] })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="setup-call">Set up call</SelectItem>
                        <SelectItem value="discovery">Discovery call</SelectItem>
                        <SelectItem value="demo">Demo</SelectItem>
                        <SelectItem value="pricing">Pricing call</SelectItem>
                        <SelectItem value="secured">Secured ✅</SelectItem>
                        <SelectItem value="did-not-close">Did not close</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        statistics.relationshipConversion[lead.relationship] >= 70
                          ? "text-emerald-600"
                          : statistics.relationshipConversion[lead.relationship] >= 40
                            ? "text-yellow-600"
                            : statistics.relationshipConversion[lead.relationship] >= 20
                              ? "text-orange-600"
                              : "text-red-600"
                      }`}
                    >
                      {statistics.relationshipConversion[lead.relationship]}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
