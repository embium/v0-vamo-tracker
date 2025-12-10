'use server';

import { auth } from '@/lib/auth';
import { createEvidence, getEvidence } from '@/lib/db/evidence';
import { getOrCreateChallenge, updateChallenge } from '@/lib/db/challenge';
import { revalidatePath } from 'next/cache';
import type { Evidence } from '@/lib/generated/prisma/client';

export async function getEvidenceAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const evidence = await getEvidence(session.user.id);

  // Convert BigInt to number for client serialization
  return evidence.map((e: Evidence) => ({
    ...e,
    timestamp: Number(e.timestamp),
  }));
}

export async function addEvidenceAction(data: {
  type: string;
  content: string;
  date: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  const today = new Date().toDateString();

  // Get current challenge state
  const challenge = await getOrCreateChallenge(userId);
  const alreadyCommittedToday = challenge.lastCommitDate === today;

  // Create the evidence
  const evidence = await createEvidence(userId, data);

  // Calculate rewards
  const pineappleReward = alreadyCommittedToday ? 2 : 12; // 10 for daily task + 2 for streak
  const newStreak = alreadyCommittedToday
    ? challenge.streak
    : challenge.streak + 1;

  // Update challenge
  const updatedChallenge = await updateChallenge(userId, {
    lastCommitDate: today,
    streak: newStreak,
    pineapples: challenge.pineapples + pineappleReward,
    dailyTaskCompleted: true,
    findCustomersUnlocked:
      newStreak >= 10 ? true : challenge.findCustomersUnlocked,
  });

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/diary');

  return {
    evidence: {
      ...evidence,
      timestamp: Number(evidence.timestamp),
    },
    newPineappleBalance: updatedChallenge.pineapples,
    newStreak: updatedChallenge.streak,
    pineappleReward,
    wasAlreadyCompleted: alreadyCommittedToday,
  };
}
