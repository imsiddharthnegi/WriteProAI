# WriteProAI

> AI-powered writing assistant SaaS — write smarter, faster, better.

**Live Demo:** https://trywritepro.vercel.app/

---

## Overview

WriteProAI is a full-stack AI writing SaaS built with Next.js 14 App Router. It provides users with an intelligent writing editor, AI-powered suggestions, project management, and subscription-based billing — all in a clean, minimal dark UI.

---

## Features

- 🖊️ **AI Writing Editor** — Smart suggestions panel powered by Claude/Gemini
- 📁 **Project Management** — Create, organize, and filter writing projects
- 👤 **Auth System** — Secure signup/login with credentials (NextAuth.js + bcrypt)
- 💳 **Subscription Billing** — Free and Pro plans via Stripe
- 📊 **Dashboard** — Stats, recent projects, word count tracking
- ⚙️ **Settings** — Profile, password, preferences, danger zone
- 🔒 **Row Level Security** — All Supabase tables protected with RLS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Auth | NextAuth.js + bcryptjs |
| Payments | Stripe *(coming soon)* |
| AI | Claude API / OpenAI *(coming soon)* |
| Hosting | Vercel |

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Login page |
| `/signup` | Signup with rotating quotes panel |
| `/forgot-password` | Password reset with success state |
| `/dashboard` | Stats cards + recent projects |
| `/dashboard/write` | Editor + AI suggestions panel |
| `/dashboard/projects` | Project grid with filters |
| `/dashboard/billing` | Plan info + invoice history |
| `/dashboard/settings` | Profile, password, preferences |

---

## Database Schema

```
users               — id, email, password_hash, name, timestamps
subscriptions       — user_id, plan_type, status, stripe IDs, period dates
writing_projects    — user_id, title, content, word_count, writing_mode
user_usage          — user_id, month, words_used
```

All tables have **Row Level Security (RLS)** enabled on Supabase.

---

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm or npm
- Supabase account
- Vercel account (for deployment)

### 1. Clone the repo

```bash
git clone https://github.com/imsiddharthnegi/WriteProAI.git
cd WriteProAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Prisma
DATABASE_URL="postgresql://postgres:PASSWORD@db.your-project.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:PASSWORD@db.your-project.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
```

### 4. Push Prisma schema to database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
WriteProAI/
├── app/                  # Next.js App Router pages & API routes
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── prisma/               # Prisma schema
│   └── schema.prisma
├── public/               # Static assets
├── styles/               # Global CSS
└── .env.local            # Environment variables (not committed)
```

---

## Roadmap

- [x] Full frontend UI (all pages)
- [x] GitHub repo + Vercel deployment
- [x] Supabase database + RLS setup
- [x] Prisma schema
- [ ] NextAuth credentials provider
- [ ] Signup/Login API routes
- [ ] Route protection middleware
- [ ] Claude API integration (AI suggestions)
- [ ] Stripe subscription payments
- [ ] End-to-end testing

---

## Design System

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Card background | `#0f0f17` |
| Border | `#1e1e2e` |
| Primary accent | `#6366f1` (indigo) |
| Muted text | `#71717a` |
| Font | system-ui / Inter |
| Border radius | 4px max |

No gradients. No shadows. Sharp corners.

---

## License

MIT © [Siddharth Negi](https://github.com/imsiddharthnegi)
