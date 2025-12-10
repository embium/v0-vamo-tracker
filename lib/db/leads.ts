import prisma from './prisma'

export async function getLeads(userId: string) {
  return await prisma.lead.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createLead(
  userId: string,
  data: {
    name: string
    relationship: string
    reason: string
    stage: string
  }
) {
  return await prisma.lead.create({
    data: {
      userId,
      name: data.name,
      relationship: data.relationship,
      reason: data.reason,
      stage: data.stage,
    },
  })
}

export async function updateLead(
  userId: string,
  leadId: string,
  updates: Partial<{
    name: string
    relationship: string
    reason: string
    stage: string
  }>
) {
  return await prisma.lead.update({
    where: {
      id: leadId,
      userId, // Ensure user owns this lead
    },
    data: updates,
  })
}

export async function deleteLead(userId: string, leadId: string): Promise<void> {
  await prisma.lead.delete({
    where: {
      id: leadId,
      userId,
    },
  })
}

export async function getSecuredLeadsCount(userId: string): Promise<number> {
  return await prisma.lead.count({
    where: {
      userId,
      stage: 'secured',
    },
  })
}
