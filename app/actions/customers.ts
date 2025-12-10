'use server';

import { auth } from '@/lib/auth';
import {
  getPotentialCustomers,
  initializeCustomers,
  revealCustomer,
  markCustomerAddedToLeads,
} from '@/lib/db/customers';
import { createLead } from '@/lib/db/leads';
import { deductPineapples, getOrCreateChallenge } from '@/lib/db/challenge';
import { revalidatePath } from 'next/cache';
import type { PotentialCustomer } from '@/lib/generated/prisma/client';

export async function getPotentialCustomersAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Initialize customers if needed
  return await initializeCustomers(session.user.id);
}

export async function revealCustomerAction(customerId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  const REVEAL_COST = 15;

  // Try to deduct pineapples
  const challenge = await deductPineapples(userId, REVEAL_COST);

  if (!challenge) {
    throw new Error('Not enough pineapples');
  }

  // Reveal the customer
  const customer = await revealCustomer(userId, customerId);

  revalidatePath('/dashboard/find-customers');
  revalidatePath('/dashboard');

  return {
    customer,
    newPineappleBalance: challenge.pineapples,
  };
}

export async function addCustomerToLeadsAction(customerId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  // Get the customer
  const customers = await getPotentialCustomers(userId);
  const customer = customers.find(
    (c: PotentialCustomer) => c.id === customerId
  );

  if (!customer || !customer.revealed) {
    throw new Error('Customer not found or not revealed');
  }

  // Create a lead from the customer
  const lead = await createLead(userId, {
    name: customer.name,
    relationship: 'dont-know',
    reason: customer.reason,
    stage: 'setup-call',
  });

  // Mark customer as added to leads
  await markCustomerAddedToLeads(userId, customerId);

  revalidatePath('/dashboard/find-customers');
  revalidatePath('/dashboard/leads');
  revalidatePath('/dashboard');

  return lead;
}
