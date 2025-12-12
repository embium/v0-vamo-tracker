'use client';

import { useState, useMemo } from 'react';
import { useAppStore, type Lead } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trophy, CheckCircle2 } from 'lucide-react';
import { LeadsSkeleton } from '@/components/skeleton-loader';

// Relationship multipliers for conversion calculation
const relationshipData = {
  'know-well': {
    label: 'Know them well',
    multiplier: 1.2,
    color:
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  },
  'talked-once': {
    label: 'Talked once',
    multiplier: 1.0,
    color:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
  },
  'dont-know': {
    label: "Don't know them",
    multiplier: 0.8,
    color:
      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
  },
} as const;

// Stage base values for conversion calculation
const stageData = {
  'setup-call': {
    label: 'Set up call',
    baseValue: 20,
    color:
      'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600',
  },
  discovery: {
    label: 'Discovery call',
    baseValue: 40,
    color:
      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  },
  demo: {
    label: 'Demo',
    baseValue: 60,
    color:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700',
  },
  pricing: {
    label: 'Pricing call',
    baseValue: 80,
    color:
      'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 border-lime-300 dark:border-lime-700',
  },
  secured: {
    label: 'Secured',
    baseValue: 100,
    color:
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  },
  'did-not-close': {
    label: 'Did not close',
    baseValue: 0,
    color:
      'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-600',
  },
} as const;

const relationshipLabels = {
  'know-well': relationshipData['know-well'].label,
  'talked-once': relationshipData['talked-once'].label,
  'dont-know': relationshipData['dont-know'].label,
};

const stageLabels = {
  'setup-call': stageData['setup-call'].label,
  discovery: stageData.discovery.label,
  demo: stageData.demo.label,
  pricing: stageData.pricing.label,
  secured: stageData.secured.label,
  'did-not-close': stageData['did-not-close'].label,
};

// Calculate conversion percentage for a lead
// Formula: Base value (stage) × Multiplier (relationship)
// Special cases: Secured = 100%, Did Not Close = 0%
function calculateConversionPercentage(
  stage: Lead['stage'],
  relationship: Lead['relationship']
): number {
  // Special cases
  if (stage === 'secured') return 100;
  if (stage === 'did-not-close') return 0;

  // Calculate: base value × multiplier
  const baseValue = stageData[stage].baseValue;
  const multiplier = relationshipData[relationship].multiplier;
  const result = baseValue * multiplier;

  // Cap at 100% (e.g., pricing call with "know well" = 80 × 1.2 = 96%)
  return Math.min(Math.round(result), 100);
}

export default function LeadsPage() {
  const { leads, addLead, updateLead, loading, initialized } = useAppStore();
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: 'know-well' as Lead['relationship'],
    reason: '',
    stage: 'setup-call' as Lead['stage'],
  });

  const securedLeads = leads.filter((l) => l.stage === 'secured');
  const allSecured = securedLeads.length === 10;

  const statistics = useMemo(() => {
    const totalLeads = leads.length;
    const securedCount = leads.filter((l) => l.stage === 'secured').length;
    const lostCount = leads.filter((l) => l.stage === 'did-not-close').length;
    const closedDeals = securedCount + lostCount;

    const winRate =
      closedDeals > 0 ? Math.round((securedCount / closedDeals) * 100) : 0;

    const overallConversionRate =
      totalLeads > 0 ? Math.round((securedCount / totalLeads) * 100) : 0;

    const goalProgress = Math.round((securedCount / 10) * 100);

    const relationshipBreakdown = {
      'know-well':
        totalLeads > 0
          ? Math.round(
              (leads.filter((l) => l.relationship === 'know-well').length /
                totalLeads) *
                100
            )
          : 0,
      'talked-once':
        totalLeads > 0
          ? Math.round(
              (leads.filter((l) => l.relationship === 'talked-once').length /
                totalLeads) *
                100
            )
          : 0,
      'dont-know':
        totalLeads > 0
          ? Math.round(
              (leads.filter((l) => l.relationship === 'dont-know').length /
                totalLeads) *
                100
            )
          : 0,
    };

    const relationshipConversion: Record<string, number> = {};
    const relationshipTypes: Lead['relationship'][] = [
      'know-well',
      'talked-once',
      'dont-know',
    ];
    relationshipTypes.forEach((rel) => {
      const leadsWithRelationship = leads.filter((l) => l.relationship === rel);
      const securedWithRelationship = leadsWithRelationship.filter(
        (l) => l.stage === 'secured'
      ).length;
      relationshipConversion[rel] =
        leadsWithRelationship.length > 0
          ? Math.round(
              (securedWithRelationship / leadsWithRelationship.length) * 100
            )
          : 0;
    });

    const stageDistribution: Record<string, number> = {};
    const stageTypes: Lead['stage'][] = [
      'setup-call',
      'discovery',
      'demo',
      'pricing',
      'secured',
      'did-not-close',
    ];
    stageTypes.forEach((stage) => {
      const leadsAtStage = leads.filter((l) => l.stage === stage).length;
      stageDistribution[stage] =
        totalLeads > 0 ? Math.round((leadsAtStage / totalLeads) * 100) : 0;
    });

    return {
      winRate,
      overallConversionRate,
      goalProgress,
      relationshipBreakdown,
      relationshipConversion,
      stageDistribution,
    };
  }, [leads]);

  const handleSaveLead = async () => {
    if (!formData.name.trim()) return;

    setIsSaving(true);

    try {
      if (editingLead) {
        await updateLead(editingLead.id, formData);
      } else {
        await addLead(formData);
      }

      setFormData({
        name: '',
        relationship: 'know-well',
        reason: '',
        stage: 'setup-call',
      });
      setEditingLead(null);
      setIsAddingLead(false);
    } catch (error) {
      console.error('Failed to save lead:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddDialog = () => {
    setEditingLead(null);
    setFormData({
      name: '',
      relationship: 'know-well',
      reason: '',
      stage: 'setup-call',
    });
    setIsAddingLead(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      relationship: lead.relationship,
      reason: lead.reason,
      stage: lead.stage,
    });
    setIsAddingLead(true);
  };

  // Show skeleton while data is loading
  if (!initialized) {
    return <LeadsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
            Your Leads
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your journey to 10 paying customers
          </p>
        </div>

        {leads.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">Win Rate</CardDescription>
                <CardTitle className="text-3xl font-bold text-emerald-600">
                  {statistics.winRate}%
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">
                  Overall Conversion
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-blue-600">
                  {statistics.overallConversionRate}%
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">
                  Progress to Goal
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-purple-600">
                  {statistics.goalProgress}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        <Card className="mb-8 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-emerald-600" />
              Customer Progress
            </CardTitle>
            <CardDescription>
              {securedLeads.length}/10 customers secured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-6">
              {Array.from({ length: 10 }, (_, i) => {
                const customer = securedLeads[i];
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                      customer
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}
                    title={customer?.name}
                  >
                    {customer ? <CheckCircle2 className="h-6 w-6" /> : i + 1}
                  </div>
                );
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
          <Dialog
            open={isAddingLead}
            onOpenChange={setIsAddingLead}
          >
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                onClick={handleOpenAddDialog}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingLead ? 'Edit Lead' : 'Add New Lead'}
                </DialogTitle>
                <DialogDescription>
                  {editingLead
                    ? 'Update lead information'
                    : 'Add a potential customer to track through your sales process'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Customer name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        relationship: value as Lead['relationship'],
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    placeholder="What makes them a good fit for your product?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        stage: value as Lead['stage'],
                      })
                    }
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
                      <SelectItem value="did-not-close">
                        Did not close
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSaveLead}
                  className="w-full"
                  disabled={!formData.name.trim() || isSaving || loading}
                >
                  {isSaving
                    ? 'Saving...'
                    : editingLead
                    ? 'Save Changes'
                    : 'Add Lead'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {leads.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">No leads yet</h3>
            <p className="text-muted-foreground">
              Add your first potential customer to start tracking your progress
            </p>
          </Card>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-card border border-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Name</div>
                <div className="col-span-3">Warmth</div>
                <div className="col-span-3">Reason</div>
                <div className="col-span-3">Progress</div>
                <div className="col-span-1 text-right">Actual %</div>
              </div>

              <div className="divide-y">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => handleEditLead(lead)}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors hover:bg-muted/30 cursor-pointer ${
                      lead.stage === 'secured'
                        ? 'bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30'
                        : ''
                    }`}
                  >
                    <div className="col-span-2">
                      <div className="font-semibold flex items-center gap-2">
                        {lead.name}
                        {lead.stage === 'secured' && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          relationshipData[lead.relationship].color
                        }`}
                      >
                        {relationshipLabels[lead.relationship]}
                      </span>
                    </div>

                    <div className="col-span-3">
                      <p className="text-sm text-foreground line-clamp-2">
                        {lead.reason}
                      </p>
                    </div>

                    <div
                      className="col-span-3 flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Select
                        value={lead.stage}
                        onValueChange={(value) =>
                          updateLead(lead.id, { stage: value as Lead['stage'] })
                        }
                      >
                        <SelectTrigger className="h-auto border-0 p-0 hover:opacity-80 transition-opacity">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                              stageData[lead.stage].color
                            }`}
                          >
                            {stageLabels[lead.stage]}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="setup-call">
                            Set up call
                          </SelectItem>
                          <SelectItem value="discovery">
                            Discovery call
                          </SelectItem>
                          <SelectItem value="demo">Demo</SelectItem>
                          <SelectItem value="pricing">Pricing call</SelectItem>
                          <SelectItem value="secured">Secured ✅</SelectItem>
                          <SelectItem value="did-not-close">
                            Did not close
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-1 text-right">
                      <span
                        className={`text-sm font-semibold ${
                          calculateConversionPercentage(
                            lead.stage,
                            lead.relationship
                          ) >= 70
                            ? 'text-emerald-600'
                            : calculateConversionPercentage(
                                lead.stage,
                                lead.relationship
                              ) >= 40
                            ? 'text-yellow-600'
                            : calculateConversionPercentage(
                                lead.stage,
                                lead.relationship
                              ) >= 20
                            ? 'text-orange-600'
                            : 'text-red-600'
                        }`}
                      >
                        {calculateConversionPercentage(
                          lead.stage,
                          lead.relationship
                        )}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {leads.map((lead) => (
                <Card
                  key={lead.id}
                  onClick={() => handleEditLead(lead)}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    lead.stage === 'secured'
                      ? 'border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30'
                      : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {lead.name}
                        {lead.stage === 'secured' && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        )}
                      </CardTitle>
                      <span
                        className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          calculateConversionPercentage(
                            lead.stage,
                            lead.relationship
                          ) >= 70
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                            : calculateConversionPercentage(
                                lead.stage,
                                lead.relationship
                              ) >= 40
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {calculateConversionPercentage(
                          lead.stage,
                          lead.relationship
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          relationshipData[lead.relationship].color
                        }`}
                      >
                        {relationshipLabels[lead.relationship]}
                        <span className="text-[10px] opacity-75">
                          ×{relationshipData[lead.relationship].multiplier}
                        </span>
                      </span>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={lead.stage}
                          onValueChange={(value) =>
                            updateLead(lead.id, {
                              stage: value as Lead['stage'],
                            })
                          }
                        >
                          <SelectTrigger className="h-auto border-0 p-0 hover:opacity-80 transition-opacity">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                stageData[lead.stage].color
                              }`}
                            >
                              {stageLabels[lead.stage]}
                              <span className="text-[10px] opacity-75">
                                {stageData[lead.stage].baseValue}%
                              </span>
                            </span>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="setup-call">
                              Set up call (20%)
                            </SelectItem>
                            <SelectItem value="discovery">
                              Discovery call (40%)
                            </SelectItem>
                            <SelectItem value="demo">Demo (60%)</SelectItem>
                            <SelectItem value="pricing">
                              Pricing call (80%)
                            </SelectItem>
                            <SelectItem value="secured">
                              Secured ✅ (100%)
                            </SelectItem>
                            <SelectItem value="did-not-close">
                              Did not close (0%)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Reason
                      </p>
                      <p className="text-sm">{lead.reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
