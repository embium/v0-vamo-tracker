import prisma from './prisma';

export async function getChallenge(userId: string) {
  return await prisma.challenge.findUnique({
    where: { userId },
  });
}

export async function getOrCreateChallenge(userId: string) {
  let challenge = await getChallenge(userId);

  if (!challenge) {
    challenge = await prisma.challenge.create({
      data: {
        userId,
        startDate: BigInt(Date.now()),
        streak: 0,
        lastCommitDate: null,
        pineapples: 0,
        redditPageUnlocked: false,
        findCustomersUnlocked: false,
        dailyTaskCompleted: false,
        hasSeenOnboarding: false,
      },
    });
  }

  return challenge;
}

export async function updateChallenge(
  userId: string,
  updates: Partial<{
    startDate: bigint;
    streak: number;
    lastCommitDate: string | null;
    pineapples: number;
    redditPageUnlocked: boolean;
    findCustomersUnlocked: boolean;
    dailyTaskCompleted: boolean;
    hasSeenOnboarding: boolean;
  }>
) {
  return await prisma.challenge.update({
    where: { userId },
    data: updates,
  });
}

export async function resetChallenge(userId: string) {
  return await prisma.challenge.update({
    where: { userId },
    data: {
      startDate: BigInt(Date.now()),
      streak: 0,
      lastCommitDate: null,
      pineapples: 0,
      redditPageUnlocked: false,
      findCustomersUnlocked: false,
      dailyTaskCompleted: false,
    },
  });
}

export async function addPineapples(userId: string, amount: number) {
  const challenge = await getOrCreateChallenge(userId);

  return await prisma.challenge.update({
    where: { userId },
    data: {
      pineapples: challenge.pineapples + amount,
    },
  });
}

export async function deductPineapples(userId: string, amount: number) {
  // Use atomic update with WHERE clause to prevent race condition
  // This ensures the balance check and deduction happen atomically
  try {
    const challenge = await prisma.challenge.update({
      where: {
        userId,
        pineapples: {
          gte: amount, // Only update if balance is sufficient
        },
      },
      data: {
        pineapples: {
          decrement: amount,
        },
      },
    });

    return challenge;
  } catch (error) {
    // If update fails (insufficient balance or user not found), return null
    return null;
  }
}
