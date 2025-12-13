'use server';

import { auth } from '@/lib/auth';
import {
  getOrCreateChallenge,
  updateChallenge,
  resetChallenge,
} from '@/lib/db/challenge';
import { revalidatePath } from 'next/cache';

export async function getChallengeAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const challenge = await getOrCreateChallenge(session.user.id);

  // Convert BigInt to number for client serialization
  return {
    ...challenge,
    startDate: Number(challenge.startDate),
  };
}

export async function startChallengeAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const challenge = await resetChallenge(session.user.id);

  revalidatePath('/dashboard');

  return {
    ...challenge,
    startDate: Number(challenge.startDate),
  };
}

export async function checkStreakAction(localDate: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  const challenge = await getOrCreateChallenge(userId);

  // Use client-provided local date
  // This prevents timezone bugs where server (UTC) has a different "today" than the user
  const referenceDate = new Date(localDate);
  const today = referenceDate.toDateString();
  const yesterday = new Date(referenceDate.getTime() - 86400000).toDateString();

  // Check if streak should be broken
  if (
    challenge.lastCommitDate !== today &&
    challenge.lastCommitDate !== yesterday
  ) {
    // Streak broken - reset to 0
    await updateChallenge(userId, {
      streak: 0,
    });
  }

  // Reset daily task if it's a new day
  if (challenge.lastCommitDate !== today) {
    await updateChallenge(userId, {
      dailyTaskCompleted: false,
    });
  }

  revalidatePath('/dashboard');
}

export async function completeOnboardingAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const challenge = await updateChallenge(session.user.id, {
    hasSeenOnboarding: true,
  });

  revalidatePath('/dashboard');

  return {
    ...challenge,
    startDate: Number(challenge.startDate),
  };
}

export async function reopenOnboardingAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const challenge = await updateChallenge(session.user.id, {
    hasSeenOnboarding: false,
  });

  revalidatePath('/dashboard');

  return {
    ...challenge,
    startDate: Number(challenge.startDate),
  };
}
