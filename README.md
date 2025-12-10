# 🍍 Vamo - Founder Progress Tracker

**100 Days to $100K Challenge**

Vamo is a motivational web app designed specifically for first-time founders working toward their first 10 paying customers. Built with a unique blend of gamification, progress tracking, and emotional motivation, Vamo feels like a vision board × diary × Duolingo streak system.

![Vamo Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

---

## ✨ Features

### 🎯 Core Tracking

- **100-Day Countdown Timer**: Track your journey to $100K with a visual countdown
- **Daily Streak System**: Maintain momentum with Duolingo-style streak tracking
- **Pineapple Credits**: Gamified currency system that rewards consistent daily uploads

### 📝 Daily Evidence Upload

- Upload daily proof of progress (screenshots, metrics, learnings)
- Build a visual library of your entrepreneurial journey
- Reflects back your progress like a digital diary

### 🔓 Progressive Unlock System

- **Day 1-9**: Focus on daily uploads and building your streak
- **Day 10+**: Unlock "Find Customers" feature to discover potential leads
- Duolingo-style progression keeps you motivated

### 🔍 Find Customers (Unlocks at 10-Day Streak)

- Reveal potential customer profiles using pineapple credits
- Each reveal costs 15 🍍 and shows you a potential lead
- Add discovered customers to your Leads CRM

### 📊 Leads Management

- Compact table view for managing 20-50 leads
- Track customer status: Reached Out, In Conversation, Secured
- Visual progress bar fills as you secure your first 10 customers
- Secured customers highlighted in green

### 🤖 AI Chat Agent

- Get guidance on finding your first paying customer
- Ask questions about product-market fit
- Discover potential leads in your network
- Rotating placeholder prompts for inspiration

### 📚 Visual Library

- Pinterest-style grid of all your daily uploads
- Filter and search through your progress
- Export and share your journey

### 📊 Relationship Tags (Warmth Score)

**Know them well = 70-80%**

- This is a warm lead, you have an existing relationship
- They trust you already, much more likely to buy
- Color: Green or dark green

**Talked once = 40-50%**

- Medium warmth, there's some connection but not strong
- They know who you are but relationship is new
- Color: Yellow or orange

**Don't know them = 15-25%**

- Cold lead, no existing relationship or trust built yet
- Hardest to convert, lowest likelihood
- Color: Red or light red

### 📈 Stage Tags (Progress Score)

**Set up call = 20%**

- Just starting, very early stage
- Most leads drop off here
- Color: Light gray or pale blue

**Discovery call = 35-40%**

- Made it past first contact, showing interest
- Still early but better than setup stage
- Color: Blue

**Demo = 55-60%**

- Invested enough time to see a demo, serious interest
- Over halfway there
- Color: Purple or medium blue

**Pricing call = 75-80%**

- Very close to closing, discussing money means they're serious
- High likelihood of conversion
- Color: Yellow-green or lime

**Secured = 100%**

- Done deal, paying customer
- Color: Bright green

**Did not close = 0%**

- Lost the deal
- Color: Red or gray

### 🎯 How to Use Both Together

The **relationship tag** tells you the baseline probability based on how well you know them.

The **stage tag** tells you how far along they are in the buying process.

You could even combine them: If someone is "Know them well" (70%) AND at "Demo" stage (60%), that's a very strong lead with high conversion likelihood. But if they're "Don't know them" (20%) and only at "Set up call" (20%), that's much riskier.

The colors help you visually scan and see which leads are "hot" (green/yellow) versus "cold" (red/gray).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **State Management**: Zustand (synced with database)
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Architecture

**Hybrid State Management**: Zustand + Prisma

- Client-side state managed by Zustand for reactive UI updates
- All data persisted to SQLite database via Prisma
- Server Actions handle database mutations
- Multi-user support with authentication

**Data Flow**:

1. User actions trigger Zustand store methods
2. Store methods call Next.js Server Actions
3. Server Actions interact with Prisma/database
4. Database updates are reflected back to Zustand store
5. UI reactively updates from Zustand state

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd vamo
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://vamo.com
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
SMTP_HOST="your-smtp-host"
SMTP_PORT="your-smtp-port"
SMTP_SECURE="true"
SMTP_USER="your-smtp-user"
SMTP_PASSWORD="your-smtp-password"
SMTP_FROM="your-smtp-from"
```

4. **Set up the database**

```bash
pnpm prisma generate
pnpm prisma db push
```

5. **Run the development server**

```bash
pnpm dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 How to Use Vamo

### First Time Setup

1. **Onboarding**: Complete the 5-screen tutorial explaining the challenge
2. **Start Day 1**: Begin your 100-day journey
3. **Daily Upload**: Add evidence of your progress each day

### Daily Routine

1. **Upload Evidence**: Visit the Diary page and upload screenshots, metrics, or learnings
2. **Earn Pineapples**: Receive 10 🍍 for daily upload + 2 🍍 for maintaining streak
3. **Track Progress**: Watch your streak counter and countdown timer

### After 10 Days

1. **Unlock Find Customers**: Access the customer discovery feature
2. **Reveal Leads**: Spend 15 🍍 to uncover potential customer profiles
3. **Add to CRM**: Move discovered customers to your Leads page
4. **Convert**: Reach out, have conversations, and secure your first 10 customers

### Reach Your Goal

- Secure 10 paying customers
- Complete the 100-day challenge
- Celebrate hitting $100K milestone!

---

## 📁 Project Structure

```
vamo/
├── app/
│   ├── actions/                     # Server Actions
│   │   ├── challenge.ts             # Challenge/streak logic
│   │   ├── customers.ts             # Customer discovery actions
│   │   ├── evidence.ts              # Evidence upload actions
│   │   └── leads.ts                 # Leads CRM actions
│   ├── api/                         # API Routes
│   │   ├── auth/                    # NextAuth endpoints
│   │   ├── chat/                    # AI chat route
│   │   └── user/                    # User profile endpoints
│   ├── dashboard/                   # Protected dashboard pages
│   │   ├── assistant/               # AI chat assistant page
│   │   ├── diary/                   # Daily evidence upload
│   │   ├── find-customers/          # Customer discovery (unlocks day 10)
│   │   ├── leads/                   # CRM table
│   │   ├── library/                 # Evidence grid view
│   │   ├── profile/                 # User profile page
│   │   ├── error.tsx                # Dashboard error boundary
│   │   ├── loading.tsx              # Dashboard loading state
│   │   ├── layout.tsx               # Dashboard layout with auth
│   │   └── page.tsx                 # Dashboard homepage
│   ├── forgot-password/             # Password recovery
│   ├── login/                       # Login page
│   ├── reset-password/              # Password reset page
│   ├── signup/                      # Sign up page
│   ├── verify-email/                # Email verification
│   ├── verify-email-pending/        # Email verification pending
│   ├── error.tsx                    # Global error boundary
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Landing page
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── attachment.tsx               # File attachment component
│   ├── chat-agent.tsx               # AI chat interface
│   ├── countdown-timer.tsx          # 100-day countdown
│   ├── daily-task-card.tsx          # Daily task card
│   ├── data-initializer.tsx         # Zustand store initializer
│   ├── evidence-grid.tsx            # Evidence heatmap
│   ├── help-button.tsx              # Onboarding help button
│   ├── markdown-text.tsx            # Markdown renderer
│   ├── nav.tsx                      # Top navigation
│   ├── onboarding-modal.tsx         # First-time tutorial
│   ├── pineapple-counter.tsx        # Pineapple credit display
│   ├── providers.tsx                # App providers wrapper
│   ├── reveal-customer-tile.tsx     # Customer reveal mechanic
│   ├── sidebar-nav.tsx              # Left sidebar navigation
│   ├── streak-counter.tsx           # Streak display
│   ├── theme-provider.tsx           # Dark mode provider
│   ├── thread-list.tsx              # Chat thread list
│   ├── thread.tsx                   # Chat thread component
│   ├── tool-fallback.tsx            # Chat tool fallback
│   ├── tooltip-icon-button.tsx      # Tooltip button
│   └── unlock-customers-card.tsx    # Find customers unlock card
├── lib/
│   ├── db/                          # Database operations
│   │   ├── challenge.ts             # Challenge database queries
│   │   ├── customers.ts             # Customer database queries
│   │   ├── evidence.ts              # Evidence database queries
│   │   ├── leads.ts                 # Leads database queries
│   │   └── prisma.ts                # Prisma client instance
│   ├── generated/                   # Prisma generated types
│   ├── auth.ts                      # NextAuth configuration
│   ├── email.ts                     # Email sending utilities
│   ├── store.ts                     # Zustand state management
│   └── utils.ts                     # Utility functions
├── prisma/
│   └── schema.prisma                # Database schema
├── public/
│   ├── file.svg                     # File icon
│   ├── globe.svg                    # Globe icon
│   └── window.svg                   # Window icon
├── hooks/
│   └── use-toast.ts                 # Toast hook
├── styles/
│   └── globals.css                  # Additional global styles
├── middleware.ts                    # Next.js middleware
├── next.config.mjs                  # Next.js configuration
├── postcss.config.mjs               # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
└── pnpm-lock.yaml                   # pnpm lock file
```

---

## 🎨 Design Philosophy

Vamo avoids corporate dashboard aesthetics in favor of:

- **Warm, Inviting Colors**: Soft gradients and gentle greens for success
- **Personal Touch**: Feels like your private journal, not a business tool
- **Emotional Motivation**: Fire emojis, pineapples, and visual progress bars
- **Duolingo-Inspired**: Familiar gamification patterns that work
- **Vision Board Aesthetic**: Pinterest-style grids and aspirational design

---

## 🔄 State Management

Vamo uses a hybrid approach combining **Zustand** for client-side state and **Prisma** for database persistence:

### Client State (Zustand)

- Reactive state management for UI updates
- Optimistic updates for better UX
- Loading and error states
- No localStorage - all data in SQLite database

### Server Layer (Prisma + Server Actions)

- SQLite database for data persistence
- Prisma ORM for type-safe database operations
- Next.js Server Actions for mutations
- Multi-user support with authentication

### What's Stored:

- User challenge progress (streak, pineapples, dates)
- Evidence uploads library
- Leads CRM data
- Potential customer pool
- Feature unlock states
- Onboarding completion status

All user data is tied to their authenticated account and accessible across devices.

---

## 🤝 Contributing

This is a personal project for first-time founders. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 💡 Inspiration

Vamo combines the best aspects of:

- **Duolingo**: Streak system and progressive unlocks
- **Notion**: Clean, personal workspace aesthetic
- **Pinterest**: Visual inspiration and grid layouts
- **Y Combinator**: First-time founder mentality and goal focus

---

## 🎯 The Challenge

**100 Days. 10 Customers. $100K.**

Every great company starts with one paying customer. Vamo is your companion on the journey from zero to ten.

Upload daily. Build streaks. Find customers. Secure them. Win.

---

## 📞 Support

Need help? Click the question mark button in the bottom-right corner to replay the onboarding tutorial.

---

**Built with ❤️ for first-time founders everywhere**
