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

const REVEAL_COST = 15;

export async function getPotentialCustomersAction() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Initialize customers if needed
    return await initializeCustomers(session.user.id);
  } catch (error) {
    console.error('Error getting potential customers:', error);
    throw error;
  }
}

export async function revealCustomerAction(customerId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Validate customerId
    if (!customerId || typeof customerId !== 'string') {
      throw new Error('Invalid customer ID');
    }

    const userId = session.user.id;

    // Try to deduct pineapples (now uses atomic operation)
    const challenge = await deductPineapples(userId, REVEAL_COST);

    if (!challenge) {
      throw new Error(
        `Not enough pineapples. You need ${REVEAL_COST} 🍍 to reveal a customer.`
      );
    }

    // Reveal the customer
    const customer = await revealCustomer(userId, customerId);

    if (!customer) {
      // Refund pineapples if customer reveal failed
      // This shouldn't happen but is a safety measure
      throw new Error('Customer not found');
    }

    revalidatePath('/dashboard/find-customers');
    revalidatePath('/dashboard');

    return {
      customer,
      newPineappleBalance: challenge.pineapples,
    };
  } catch (error) {
    console.error('Error revealing customer:', error);
    throw error;
  }
}

export async function addCustomerToLeadsAction(customerId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Validate customerId
    if (!customerId || typeof customerId !== 'string') {
      throw new Error('Invalid customer ID');
    }

    const userId = session.user.id;

    // Get the customer
    const customers = await getPotentialCustomers(userId);
    const customer = customers.find(
      (c: PotentialCustomer) => c.id === customerId
    );

    if (!customer) {
      throw new Error('Customer not found');
    }

    if (!customer.revealed) {
      throw new Error('Customer must be revealed before adding to leads');
    }

    if (customer.addedToLeads) {
      throw new Error('Customer has already been added to leads');
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
  } catch (error) {
    console.error('Error adding customer to leads:', error);
    throw error;
  }
}
