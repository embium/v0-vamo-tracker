'use server';

import { auth } from '@/lib/auth';
import { getLeads, createLead, updateLead } from '@/lib/db/leads';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Zod schemas for validation
const relationshipSchema = z.enum(['know-well', 'talked-once', 'dont-know']);
const stageSchema = z.enum([
  'setup-call',
  'discovery',
  'demo',
  'pricing',
  'secured',
  'did-not-close',
]);

const leadDataSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Lead name is required')
    .max(200, 'Lead name must be less than 200 characters'),
  relationship: relationshipSchema,
  reason: z
    .string()
    .trim()
    .max(1000, 'Reason must be less than 1000 characters'),
  stage: stageSchema,
});

const leadUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Lead name cannot be empty')
    .max(200, 'Lead name must be less than 200 characters')
    .optional(),
  relationship: relationshipSchema.optional(),
  reason: z
    .string()
    .trim()
    .max(1000, 'Reason must be less than 1000 characters')
    .optional(),
  stage: stageSchema.optional(),
});

export async function getLeadsAction() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await getLeads(session.user.id);
  } catch (error) {
    console.error('Error getting leads:', error);
    throw error;
  }
}

export async function addLeadAction(data: {
  name: string;
  relationship: string;
  reason: string;
  stage: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Validate input with Zod
    const validatedData = leadDataSchema.parse(data);

    const lead = await createLead(session.user.id, validatedData);

    revalidatePath('/dashboard/leads');
    revalidatePath('/dashboard');

    return lead;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue: z.ZodIssue) => issue.message)
        .join(', ');
      throw new Error(`Validation error: ${errorMessage}`);
    }
    console.error('Error adding lead:', error);
    throw error;
  }
}

export async function updateLeadAction(
  leadId: string,
  updates: Partial<{
    name: string;
    relationship: string;
    reason: string;
    stage: string;
  }>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Validate lead ID
    if (!leadId || typeof leadId !== 'string') {
      throw new Error('Invalid lead ID');
    }

    // Validate updates with Zod
    const validatedUpdates = leadUpdateSchema.parse(updates);

    const lead = await updateLead(session.user.id, leadId, validatedUpdates);

    revalidatePath('/dashboard/leads');
    revalidatePath('/dashboard');

    return lead;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue: z.ZodIssue) => issue.message)
        .join(', ');
      throw new Error(`Validation error: ${errorMessage}`);
    }
    console.error('Error updating lead:', error);
    throw error;
  }
}
