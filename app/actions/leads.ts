'use server'

import { auth } from '@/lib/auth'
import { getLeads, createLead, updateLead } from '@/lib/db/leads'
import { revalidatePath } from 'next/cache'

export async function getLeadsAction() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  return await getLeads(session.user.id)
}

export async function addLeadAction(data: {
  name: string
  relationship: string
  reason: string
  stage: string
}) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const lead = await createLead(session.user.id, data)

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')

  return lead
}

export async function updateLeadAction(
  leadId: string,
  updates: Partial<{
    name: string
    relationship: string
    reason: string
    stage: string
  }>
) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const lead = await updateLead(session.user.id, leadId, updates)

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')

  return lead
}
