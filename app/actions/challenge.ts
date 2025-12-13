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

export async function checkStreakAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  const challenge = await getOrCreateChallenge(userId);

  // Get all evidence to calculate actual streak
  const { getEvidence } = await import('@/lib/db/evidence');
  const allEvidence = await getEvidence(userId);

  // If no evidence, reset streak to 0
  if (allEvidence.length === 0) {
    if (challenge.streak !== 0) {
      await updateChallenge(userId, { streak: 0 });
    }
    revalidatePath('/dashboard');
    return;
  }

  // Get unique dates of evidence submissions (in user's local timezone)
  // The evidence dates are stored as ISO strings which preserve the user's submission time
  const uniqueDates = [
    ...new Set(allEvidence.map((e) => new Date(e.date).toDateString())),
  ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Use the most recent evidence date to determine "today" in user's timezone
  // This prevents server timezone from affecting streak calculation
  const mostRecentDate = uniqueDates[0];
  const todayTime = new Date(mostRecentDate).getTime();

  // Calculate actual streak by counting consecutive days backwards from most recent evidence
  let actualStreak = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    const expectedTime = todayTime - i * 24 * 60 * 60 * 1000;
    const expectedDate = new Date(expectedTime).toDateString();

    if (uniqueDates.includes(expectedDate)) {
      actualStreak++;
    } else {
      break; // Gap found - streak ends
    }
  }

  // Update streak if it changed
  if (actualStreak !== challenge.streak) {
    await updateChallenge(userId, {
      streak: actualStreak,
      lastCommitDate: mostRecentDate,
    });
  }

  // Reset daily task if last commit date has changed
  if (challenge.lastCommitDate !== mostRecentDate) {
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
