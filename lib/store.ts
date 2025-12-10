'use client';

import { create } from 'zustand';
import { getEvidenceAction, addEvidenceAction } from '@/app/actions/evidence';
import {
  getLeadsAction,
  addLeadAction,
  updateLeadAction,
} from '@/app/actions/leads';
import {
  getPotentialCustomersAction,
  revealCustomerAction,
  addCustomerToLeadsAction,
} from '@/app/actions/customers';
import {
  getChallengeAction,
  startChallengeAction,
  checkStreakAction,
  completeOnboardingAction,
  reopenOnboardingAction,
} from '@/app/actions/challenge';

export interface Evidence {
  id: string;
  type: 'text' | 'image' | 'link' | 'screenshot' | 'note';
  content: string;
  date: string;
  timestamp: number;
}

export interface Lead {
  id: string;
  name: string;
  relationship: 'know-well' | 'talked-once' | 'dont-know';
  reason: string;
  stage:
    | 'setup-call'
    | 'discovery'
    | 'demo'
    | 'pricing'
    | 'secured'
    | 'did-not-close';
}

export interface PotentialCustomer {
  id: string;
  name: string;
  background: string;
  reason: string;
  revealed: boolean;
  addedToLeads?: boolean;
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface AppState {
  // User Profile
  userProfile: UserProfile | null;

  // Challenge data
  startDate: number | null;
  streak: number;
  lastCommitDate: string | null;
  pineapples: number;

  // Evidence
  evidence: Evidence[];

  // Leads
  leads: Lead[];

  potentialCustomers: PotentialCustomer[];

  // Unlocks
  redditPageUnlocked: boolean;
  findCustomersUnlocked: boolean;
  dailyTaskCompleted: boolean;
  hasSeenOnboarding: boolean;

  // Loading & Error states
  loading: boolean;
  error: string | null;
  initialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  startChallenge: () => Promise<void>;
  addEvidence: (evidence: Omit<Evidence, 'id' | 'timestamp'>) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id'>) => Promise<void>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  unlockRedditPage: () => void;
  checkAndUpdateStreak: () => Promise<void>;
  revealCustomer: (id: string) => Promise<boolean>;
  addCustomerToLeads: (customerId: string) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  checkDailyTask: () => void;
  reopenOnboarding: () => Promise<void>;
  refreshData: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (data: { name?: string; image?: string }) => Promise<void>;
}

export const useAppStore = create<AppState>()((set, get) => ({
  userProfile: null,
  startDate: null,
  streak: 0,
  lastCommitDate: null,
  pineapples: 0,
  evidence: [],
  leads: [],
  potentialCustomers: [],
  redditPageUnlocked: false,
  findCustomersUnlocked: false,
  dailyTaskCompleted: false,
  hasSeenOnboarding: false,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    const state = get();
    // Guard against double initialization or concurrent calls
    if (state.initialized || state.loading) return;

    set({ loading: true, error: null });
    try {
      const [challenge, evidence, leads, customers] = await Promise.all([
        getChallengeAction(),
        getEvidenceAction(),
        getLeadsAction(),
        getPotentialCustomersAction(),
      ]);

      set({
        startDate: challenge.startDate,
        streak: challenge.streak,
        lastCommitDate: challenge.lastCommitDate,
        pineapples: challenge.pineapples,
        redditPageUnlocked: challenge.redditPageUnlocked,
        findCustomersUnlocked: challenge.findCustomersUnlocked,
        dailyTaskCompleted: challenge.dailyTaskCompleted,
        hasSeenOnboarding: challenge.hasSeenOnboarding,
        evidence: evidence as Evidence[],
        leads: leads as Lead[],
        potentialCustomers: customers as PotentialCustomer[],
        loading: false,
        initialized: true,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load data',
        loading: false,
      });
    }
  },

  refreshData: async () => {
    set({ loading: true, error: null });
    try {
      const [challenge, evidence, leads, customers] = await Promise.all([
        getChallengeAction(),
        getEvidenceAction(),
        getLeadsAction(),
        getPotentialCustomersAction(),
      ]);

      set({
        startDate: challenge.startDate,
        streak: challenge.streak,
        lastCommitDate: challenge.lastCommitDate,
        pineapples: challenge.pineapples,
        redditPageUnlocked: challenge.redditPageUnlocked,
        findCustomersUnlocked: challenge.findCustomersUnlocked,
        dailyTaskCompleted: challenge.dailyTaskCompleted,
        hasSeenOnboarding: challenge.hasSeenOnboarding,
        evidence: evidence as Evidence[],
        leads: leads as Lead[],
        potentialCustomers: customers as PotentialCustomer[],
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to refresh data',
        loading: false,
      });
    }
  },

  startChallenge: async () => {
    set({ loading: true, error: null });
    try {
      const challenge = await startChallengeAction();

      set({
        startDate: challenge.startDate,
        streak: 0,
        lastCommitDate: null,
        pineapples: 0,
        evidence: [],
        leads: [],
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to start challenge',
        loading: false,
      });
    }
  },

  addEvidence: async (evidence) => {
    set({ loading: true, error: null });
    try {
      const result = await addEvidenceAction(evidence);

      set((state) => ({
        evidence: [result.evidence as Evidence, ...state.evidence],
        lastCommitDate: new Date().toDateString(),
        streak: result.newStreak,
        pineapples: result.newPineappleBalance,
        dailyTaskCompleted: true,
        findCustomersUnlocked:
          result.newStreak >= 10 ? true : state.findCustomersUnlocked,
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to add evidence',
        loading: false,
      });
      throw error;
    }
  },

  addLead: async (lead) => {
    set({ loading: true, error: null });
    try {
      const newLead = await addLeadAction(lead);

      set((state) => ({
        leads: [...state.leads, newLead as Lead],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add lead',
        loading: false,
      });
      throw error;
    }
  },

  updateLead: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updatedLead = await updateLeadAction(id, updates);

      set((state) => ({
        leads: state.leads.map((lead) =>
          lead.id === id ? (updatedLead as Lead) : lead
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update lead',
        loading: false,
      });
      throw error;
    }
  },

  unlockRedditPage: () => {
    const state = get();
    if (state.pineapples >= 30) {
      set({
        pineapples: state.pineapples - 30,
        redditPageUnlocked: true,
      });
    }
  },

  checkAndUpdateStreak: async () => {
    try {
      await checkStreakAction();
      await get().refreshData();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to check streak',
      });
    }
  },

  revealCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await revealCustomerAction(id);

      set((state) => ({
        pineapples: result.newPineappleBalance,
        potentialCustomers: state.potentialCustomers.map((customer) =>
          customer.id === id ? { ...customer, revealed: true } : customer
        ),
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to reveal customer',
        loading: false,
      });
      return false;
    }
  },

  addCustomerToLeads: async (customerId) => {
    set({ loading: true, error: null });
    try {
      const newLead = await addCustomerToLeadsAction(customerId);

      set((state) => ({
        leads: [...state.leads, newLead as Lead],
        // IMPORTANT: Also update the customer in potentialCustomers to mark as added
        potentialCustomers: state.potentialCustomers.map((customer) =>
          customer.id === customerId
            ? { ...customer, addedToLeads: true }
            : customer
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to add customer to leads',
        loading: false,
      });
      throw error;
    }
  },

  completeOnboarding: async () => {
    try {
      await completeOnboardingAction();
      set({ hasSeenOnboarding: true });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to complete onboarding',
      });
    }
  },

  checkDailyTask: () => {
    const state = get();
    const today = new Date().toDateString();

    if (state.lastCommitDate !== today) {
      set({ dailyTaskCompleted: false });
    }
  },

  reopenOnboarding: async () => {
    try {
      await reopenOnboardingAction();
      set({ hasSeenOnboarding: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to reopen onboarding',
      });
    }
  },

  fetchUserProfile: async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        set({ userProfile: data as UserProfile });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  },

  updateUserProfile: async (data: { name?: string; image?: string }) => {
    try {
      const response = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        set({ userProfile: updatedUser as UserProfile });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
}));
