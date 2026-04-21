# AI Booking & Inquiry Manager

A production-ready SaaS application for managing customer bookings and inquiries
with real AI analysis (OpenAI), a Supabase database, and a premium admin dashboard.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app runs in **demo mode** by default,
using in-memory mock data with a keyword-based AI fallback.

---

## Demo Credentials

| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@bookingai.com`  |
| Password | `demo1234`             |

---

## Connect Real Services (optional)

### 1. Supabase (database)

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration in `supabase/migrations/001_create_requests.sql` via the SQL Editor
3. Copy your Project URL and Anon Key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DEMO_MODE=false
```

### 2. OpenAI (real AI analysis)

```env
OPENAI_API_KEY=sk-...
```

The app automatically uses GPT-4o mini when the key is present. If not, it falls
back to a keyword-based analysis engine — no configuration required.

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (SaaS marketing) |
| `/book` | Public booking form |
| `/success` | Submission confirmation |
| `/admin/login` | Admin sign-in |
| `/admin/dashboard` | Main dashboard with stats & AI insights |
| `/admin/requests` | Searchable, filterable requests table |
| `/admin/requests/[id]` | Request detail — AI panel, status controls, notes |
| `/admin/calendar` | Visual month calendar with booking blocks |
| `/admin/settings` | Business settings, notifications, AI config |

---

## Architecture

```
app/
  api/requests/          # REST API — GET/POST list, GET/PATCH/DELETE by ID
  admin/                 # Protected admin pages (client-side auth check)
  book/, success/        # Public booking flow
context/
  ToastContext.tsx       # Global toast notification system
hooks/
  useRequests.ts         # Shared data hook (fetch + optimistic mutations)
lib/
  ai.ts                  # OpenAI integration with keyword fallback
  db.ts                  # Supabase CRUD with demo-mode fallback
  supabase.ts            # Client factory (browser + server)
components/
  admin/                 # RequestsTable, AIInsightsPanel, UpcomingBookings
  landing/               # Hero, Features, HowItWorks, Testimonials, FAQ, CTA
  layout/                # AdminSidebar, AdminHeader, AdminLayout, PublicHeader
  ui/                    # Badge, Button, Card, Skeleton, StatsCard, Toast
data/
  mockRequests.ts        # 12 realistic demo requests (restaurant → legal)
supabase/
  migrations/            # SQL migration for the requests table
types/index.ts           # BookingRequest, RequestStatus, RequestCategory…
utils/                   # cn(), formatDate, formatTime, timeAgo, getInitials…
```

---

## Data Flow

```
Customer fills form  (/book)
  ↓
POST /api/requests
  ↓ validates fields
  ↓ calls generateAIAnalysis() → OpenAI or keyword engine
  ↓ persists to Supabase (or demo store)
  ↓ returns { request }
Success page shows AI summary + category + priority

Admin opens dashboard
  ↓ useRequests() → GET /api/requests
  ↓ reads from Supabase (or demo store)
  ↓ renders stats, table, AI insights

Admin updates status / notes
  ↓ PATCH /api/requests/:id  (optimistic update)
  ↓ toast confirmation
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Database | Supabase (PostgreSQL) |
| AI | OpenAI `gpt-4o-mini` via native fetch |
| Notifications | Custom toast system (zero deps) |
