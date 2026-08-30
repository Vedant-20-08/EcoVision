# EcoVision

AI-powered Air Quality Intelligence & Environmental Feasibility Platform for India.

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS · Recharts · Framer Motion · Lucide React ·
React-Leaflet · Radix UI (shadcn-style primitives, hand-rolled) · React Router

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## Status: feature-complete

All three role dashboards (Citizen, Government, Analyst/Builder) are fully built, along with
the landing page, authentication, and shared UI kit. See `AGENTS.md` for the full
architecture brief, conventions, and file inventory if you're extending this codebase
(with an AI coding agent or by hand).

## Signing in

This is a frontend-only demo — there's no backend — but access is genuinely role-gated on
the client:

- **Citizens** — any valid email works.
- **Government** — requires an official `.gov.in` or `.nic.in` email address.
- **Analyst / Builder** — requires a company/organization email (personal Gmail, Yahoo,
  Outlook, etc. are rejected).

A signed-in user can only reach their own role's dashboard — direct URL access to another
role's pages redirects back to their own dashboard, it doesn't just hide the nav link.

## Design notes

- **Light theme by design**: soft off-white page background with elevated white cards
  (Stripe/Linear/Notion-style), not the dark "command center" look a lot of admin dashboards
  default to. Every accent and severity color was tuned to clear WCAG AA contrast on white,
  not just carried over from a dark palette.
- **Theme switcher**: toggles between two light accent variants — "Night Watch" (teal) and
  "Eclipse" (violet) — rather than light/dark, since the whole site is light-only.
- **shadcn/ui**: the shadcn CLI registry isn't reachable from this build environment, so the
  primitives in `src/components/ui` are hand-built on the same underlying stack shadcn uses
  (Radix UI + Tailwind + `class-variance-authority`), matching its conventions and API shape.
- All data is mocked in `src/data/*` — no backend calls. Swap in real API calls in `src/data`
  and the hooks in `src/hooks` (`useAqiSeries`, etc.) without touching UI components.
