'use server';

import { auth } from '@/lib/auth';
import { createEvidence, getEvidence } from '@/lib/db/evidence';
import { getOrCreateChallenge, updateChallenge } from '@/lib/db/challenge';
import { revalidatePath } from 'next/cache';
import type { Evidence } from '@/lib/generated/prisma/client';
import { z } from 'zod';

// Zod schema for evidence validation
const evidenceTypeSchema = z.enum([
  'text',
  'image',
  'link',
  'screenshot',
  'note',
]);
const evidenceDataSchema = z
  .object({
    type: evidenceTypeSchema,
    content: z.string().min(1, 'Content is required'),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
  })
  .refine(
    (data) => {
      if (data.type === 'image' || data.type === 'screenshot') {
        return data.content.length <= 15000000; // ~10MB base64
      }
      return data.content.length <= 50000;
    },
    {
      message: 'Content too large',
      path: ['content'],
    }
  );

export async function getEvidenceAction() {
  try {
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
  } catch (error) {
    console.error('Error getting evidence:', error);
    throw error;
  }
}

export async function addEvidenceAction(data: {
  type: string;
  content: string;
  date: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Validate input with Zod
    const validatedData = evidenceDataSchema.parse(data);

    const userId = session.user.id;
    const today = new Date().toDateString();

    // Get current challenge state
    const challenge = await getOrCreateChallenge(userId);
    const alreadyCommittedToday = challenge.lastCommitDate === today;

    // Create the evidence
    const evidence = await createEvidence(userId, validatedData);

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
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue: z.ZodIssue) => issue.message)
        .join(', ');
      throw new Error(`Validation error: ${errorMessage}`);
    }
    console.error('Error adding evidence:', error);
    throw error;
  }
}
