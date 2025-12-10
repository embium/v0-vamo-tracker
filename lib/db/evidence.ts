import prisma from './prisma'

export async function getEvidence(userId: string) {
  return await prisma.evidence.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' },
  })
}

export async function createEvidence(
  userId: string,
  data: {
    type: string
    content: string
    date: string
  }
) {
  const timestamp = Date.now()
  
  return await prisma.evidence.create({
    data: {
      userId,
      type: data.type,
      content: data.content,
      date: data.date,
      timestamp: BigInt(timestamp),
    },
  })
}

export async function getEvidenceCount(userId: string): Promise<number> {
  return await prisma.evidence.count({
    where: { userId },
  })
}

export async function getEvidenceByDate(
  userId: string,
  date: string
) {
  return await prisma.evidence.findMany({
    where: {
      userId,
      date,
    },
  })
}
