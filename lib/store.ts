"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Evidence {
  id: string
  type: "text" | "image" | "link" | "screenshot" | "note"
  content: string
  date: string
  timestamp: number
}

export interface Lead {
  id: string
  name: string
  relationship: "know-well" | "talked-once" | "dont-know"
  reason: string
  stage: "setup-call" | "discovery" | "demo" | "pricing" | "secured" | "did-not-close"
}

export interface PotentialCustomer {
  id: string
  name: string
  background: string
  reason: string
  revealed: boolean
}

interface AppState {
  // Challenge data
  startDate: number | null
  streak: number
  lastCommitDate: string | null
  pineapples: number

  // Evidence
  evidence: Evidence[]

  // Leads
  leads: Lead[]

  potentialCustomers: PotentialCustomer[]

  // Unlocks
  redditPageUnlocked: boolean
  findCustomersUnlocked: boolean
  dailyTaskCompleted: boolean
  hasSeenOnboarding: boolean

  // Actions
  startChallenge: () => void
  addEvidence: (evidence: Omit<Evidence, "id" | "timestamp">) => void
  addLead: (lead: Omit<Lead, "id">) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  unlockRedditPage: () => void
  checkAndUpdateStreak: () => void
  revealCustomer: (id: string) => boolean
  addCustomerToLeads: (customerId: string) => void
  completeOnboarding: () => void
  checkDailyTask: () => void
  reopenOnboarding: () => void
}

const MOCK_CUSTOMERS: Omit<PotentialCustomer, "revealed">[] = [
  {
    id: "1",
    name: "Sarah Chen",
    background: "Product Manager at TechCorp",
    reason: "Has expressed interest in productivity tools and manages a team of 15",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    background: "Founder of StartupXYZ",
    reason: "Recently tweeted about needing better customer tracking solutions",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    background: "Head of Sales at GrowthCo",
    reason: "Attended your webinar and asked follow-up questions",
  },
  {
    id: "4",
    name: "David Park",
    background: "Engineering Manager",
    reason: "Mentioned pain points that align with your product in a LinkedIn post",
  },
  {
    id: "5",
    name: "Priya Sharma",
    background: "CEO of DesignStudio",
    reason: "Your mutual connection recommended you reach out",
  },
  {
    id: "6",
    name: "Alex Thompson",
    background: "Director of Operations",
    reason: "Downloaded your lead magnet and engaged with 3+ emails",
  },
  {
    id: "7",
    name: "Lisa Wang",
    background: "VP of Marketing",
    reason: "Fits your ICP perfectly and has budget authority",
  },
  {
    id: "8",
    name: "James Miller",
    background: "Small Business Owner",
    reason: "Posted in a Facebook group asking for solutions like yours",
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      startDate: Date.now(),
      streak: 0,
      lastCommitDate: null,
      pineapples: 0,
      evidence: [],
      leads: [],
      potentialCustomers: MOCK_CUSTOMERS.map((c) => ({ ...c, revealed: false })),
      redditPageUnlocked: false,
      findCustomersUnlocked: false,
      dailyTaskCompleted: false,
      hasSeenOnboarding: false,

      startChallenge: () => {
        set({
          startDate: Date.now(),
          streak: 0,
          lastCommitDate: null,
          pineapples: 0,
          evidence: [],
          leads: [],
          potentialCustomers: MOCK_CUSTOMERS.map((c) => ({ ...c, revealed: false })),
        })
      },

      addEvidence: (evidence) => {
        const today = new Date().toDateString()
        const state = get()

        // Check if already committed today
        const alreadyCommittedToday = state.lastCommitDate === today

        const newEvidence: Evidence = {
          ...evidence,
          id: Date.now().toString(),
          timestamp: Date.now(),
        }

        const pineappleReward = alreadyCommittedToday ? 2 : 12 // 10 for daily task + 2 for streak
        const newStreak = alreadyCommittedToday ? state.streak : state.streak + 1

        set((state) => ({
          evidence: [newEvidence, ...state.evidence],
          lastCommitDate: today,
          streak: newStreak,
          pineapples: state.pineapples + pineappleReward,
          dailyTaskCompleted: true,
          findCustomersUnlocked: newStreak >= 10 ? true : state.findCustomersUnlocked,
        }))
      },

      addLead: (lead) => {
        const newLead: Lead = {
          ...lead,
          id: Date.now().toString(),
        }
        set((state) => ({
          leads: [...state.leads, newLead],
        }))
      },

      updateLead: (id, updates) => {
        set((state) => ({
          leads: state.leads.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)),
        }))
      },

      unlockRedditPage: () => {
        const state = get()
        if (state.pineapples >= 30) {
          set({
            pineapples: state.pineapples - 30,
            redditPageUnlocked: true,
          })
        }
      },

      checkAndUpdateStreak: () => {
        const state = get()
        const today = new Date().toDateString()
        const yesterday = new Date(Date.now() - 86400000).toDateString()

        if (state.lastCommitDate !== today && state.lastCommitDate !== yesterday) {
          // Streak broken
          set({ streak: 0 })
        }

        if (state.lastCommitDate !== today) {
          set({ dailyTaskCompleted: false })
        }
      },

      revealCustomer: (id) => {
        const state = get()
        const REVEAL_COST = 15

        if (state.pineapples >= REVEAL_COST) {
          set((state) => ({
            pineapples: state.pineapples - REVEAL_COST,
            potentialCustomers: state.potentialCustomers.map((customer) =>
              customer.id === id ? { ...customer, revealed: true } : customer,
            ),
          }))
          return true
        }
        return false
      },

      addCustomerToLeads: (customerId) => {
        const state = get()
        const customer = state.potentialCustomers.find((c) => c.id === customerId)

        if (customer && customer.revealed) {
          const newLead: Lead = {
            id: Date.now().toString(),
            name: customer.name,
            relationship: "dont-know",
            reason: customer.reason,
            stage: "setup-call",
          }
          set((state) => ({
            leads: [...state.leads, newLead],
          }))
        }
      },

      completeOnboarding: () => {
        set({ hasSeenOnboarding: true })
      },

      checkDailyTask: () => {
        const state = get()
        const today = new Date().toDateString()

        if (state.lastCommitDate !== today) {
          set({ dailyTaskCompleted: false })
        }
      },

      reopenOnboarding: () => {
        set({ hasSeenOnboarding: false })
      },
    }),
    {
      name: "vamo-storage",
    },
  ),
)
