import prisma from './prisma'

const MOCK_CUSTOMERS_POOL = [
  {
    name: "Sarah Chen",
    background: "Product Manager at TechCorp",
    reason: "Has expressed interest in productivity tools and manages a team of 15",
  },
  {
    name: "Marcus Johnson",
    background: "Founder of StartupXYZ",
    reason: "Recently tweeted about needing better customer tracking solutions",
  },
  {
    name: "Elena Rodriguez",
    background: "Head of Sales at GrowthCo",
    reason: "Attended your webinar and asked follow-up questions",
  },
  {
    name: "David Park",
    background: "Engineering Manager",
    reason: "Mentioned pain points that align with your product in a LinkedIn post",
  },
  {
    name: "Priya Sharma",
    background: "CEO of DesignStudio",
    reason: "Your mutual connection recommended you reach out",
  },
  {
    name: "Alex Thompson",
    background: "Director of Operations",
    reason: "Downloaded your lead magnet and engaged with 3+ emails",
  },
  {
    name: "Lisa Wang",
    background: "VP of Marketing",
    reason: "Fits your ICP perfectly and has budget authority",
  },
  {
    name: "James Miller",
    background: "Small Business Owner",
    reason: "Posted in a Facebook group asking for solutions like yours",
  },
]

export async function getPotentialCustomers(userId: string) {
  return await prisma.potentialCustomer.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  })
}

export async function initializeCustomers(userId: string) {
  // Check if user already has customers
  const existing = await prisma.potentialCustomer.count({
    where: { userId },
  })

  if (existing > 0) {
    return await getPotentialCustomers(userId)
  }

  // Create initial customer pool
  const customers = await prisma.potentialCustomer.createMany({
    data: MOCK_CUSTOMERS_POOL.map(customer => ({
      userId,
      ...customer,
      revealed: false,
      addedToLeads: false,
    })),
  })

  return await getPotentialCustomers(userId)
}

export async function revealCustomer(
  userId: string,
  customerId: string
) {
  return await prisma.potentialCustomer.update({
    where: {
      id: customerId,
      userId,
    },
    data: {
      revealed: true,
    },
  })
}

export async function markCustomerAddedToLeads(
  userId: string,
  customerId: string
) {
  return await prisma.potentialCustomer.update({
    where: {
      id: customerId,
      userId,
    },
    data: {
      addedToLeads: true,
    },
  })
}
