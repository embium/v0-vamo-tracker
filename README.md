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
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Handling**: date-fns

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <your-repo-url>
cd vamo
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open your browser**
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

\`\`\`
vamo/
├── app/
│   ├── page.tsx              # Homepage with task cards
│   ├── diary/                # Daily evidence upload
│   ├── library/              # Visual grid of all uploads
│   ├── leads/                # CRM table for managing customers
│   └── find-customers/       # Customer discovery (unlocks at day 10)
├── components/
│   ├── sidebar-nav.tsx       # Left sidebar navigation
│   ├── chat-agent.tsx        # AI chat interface
│   ├── daily-task-card.tsx   # Homepage task card
│   ├── unlock-customers-card.tsx  # Unlock progress card
│   ├── reveal-customer-tile.tsx   # Customer reveal mechanic
│   ├── onboarding-modal.tsx  # First-time user tutorial
│   └── ui/                   # shadcn/ui components
├── lib/
│   └── store.ts              # Zustand state management
└── public/
    └── placeholder.svg       # Placeholder images
\`\`\`

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

All app state is managed with Zustand and persisted to localStorage:
- Daily task completion tracking
- Streak counting and date management
- Pineapple credit balance
- Evidence uploads library
- Leads CRM data
- Customer reveal states
- Onboarding completion status

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
