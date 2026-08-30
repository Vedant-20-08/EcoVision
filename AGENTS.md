# AGENTS.md — EcoVision

This file briefs any agent (Antigravity's agent team, or a human) picking up this codebase.
Read this fully before writing code. It tells you what exists, how it's built, and the
conventions to follow when extending it.

---

## 1. Project Overview

**The Night's Watch** is a premium, hackathon-grade AI-powered Air Quality Intelligence &
Environmental Feasibility Platform for India. It serves three distinct roles — **Citizens**,
**Government Agencies**, and **Analysts/Builders** — each with their own dashboard,
navigation, KPIs, and workflows (not just re-skinned cards).

Visual bar: should feel like **Linear, Stripe Dashboard, Vercel, Notion Calendar** —
premium, restrained, elevated white cards on a soft off-white page. (The original brief
called for a dark "command center" look; the site was later re-themed light at the person's
request — see §3.) Frontend-only. No backend. All data is mocked but structured as if a real
API sits behind it.

Origin note: this maps to the person's real ISRO Bharatiya Antariksh Hackathon 2026 (PS-3)
project — satellite-based AQI and HCHO hotspot detection over India.

---

## 2. Tech Stack (already installed — do not swap)

React 19 · TypeScript · Vite 8 · Tailwind CSS 3 · Recharts · Framer Motion · Lucide React ·
React-Leaflet + Leaflet · Radix UI primitives (`@radix-ui/react-*`) · `class-variance-authority`
· `clsx` + `tailwind-merge` · React Router v6

Run it:
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build — must stay clean, zero errors
```

Path alias: `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

---

## 3. Design System (do not invent new tokens — reuse these)

Defined in `tailwind.config.js` and `src/index.css`. **The app is light-themed** — a soft
off-white page background with pure-white elevated cards (Stripe/Linear/Notion-style), not
the dark "command center" look from the original brief.

- **Backgrounds**: `night-900` (`#F5F6FA`, page background) up through `night-950`
  (`#FFFFFF`, elevated card surface). The naming is historical (kept from an earlier dark
  iteration) — don't be misled by "night", these are light values now.
- **Text**: `ink-100` (near-black, primary) down to `ink-500` (`#6E7488`, most muted —
  already tuned to clear 4.5:1 contrast on white).
- **The base Tailwind `white` token is remapped to `#10131C`** (dark ink) at the config
  level. This means `text-white`, `bg-white/[0.0N]`, and `border-white/NN` — used
  extensively throughout the component tree — automatically resolve to correct
  dark-on-light treatments (dark headline text, subtle dark-tinted hover surfaces, light
  gray hairline borders) without per-component overrides. **Do not "fix" a `text-white`
  utility by changing it to `text-ink-100`** — they're intentionally equivalent; changing
  `colors.white` in `tailwind.config.js` is the only supported way to globally retheme.
  The `Switch` thumb is the one deliberate exception (pinned to literal `#ffffff` via
  arbitrary value since it must stay white regardless of theme).
- **Signature accents**: `aurora` (deep teal, `#0B7D70`) is primary; `signal` (deep indigo,
  `#4F46E5`) is secondary/AI. Both were deepened from an earlier pastel dark-mode palette
  specifically to clear WCAG AA as text/icon color on white — don't lighten them back.
  `aurora-soft` / `signal-soft` still hold the original lighter tones for decorative tints.
- **AQI semantic scale — two parallel tracks, this is important**:
  - `AQI_CATEGORIES[...].color` / `aqiColor(aqi)` — the original vivid tones. Use ONLY for
    fills: map markers, chart line/area strokes, donut slices, low-alpha (`1A` hex suffix)
    badge/tile backgrounds.
  - `AQI_CATEGORIES[...].textColor` / `aqiTextColor(aqi)` — deepened AA-safe versions. Use
    for ANY literal text or icon foreground color (badge labels, KPI numbers, chart tooltip
    text). There's a matching Tailwind class pair too: `bg-aqi-good` / `border-aqi-good` (
    vivid, for fills) vs `text-aqiText-good` (deep, for text) — mirror this pattern for the
    other five severities. Getting this backwards (e.g. `text-aqi-moderate`, the pastel
    yellow, as literal text) reintroduces a real contrast bug — this exact mistake was
    caught and fixed once already; don't reintroduce it.
- **Type**: `font-display` (Space Grotesk, headings), `font-body` (Inter, default), `font-mono`
  (JetBrains Mono, for raw data-instrument readouts like timestamps/pollutant readings).
- **Utility classes**: `.glass` / `.glass-strong` — elevated white cards with a soft
  layered shadow (NOT true blur-glass; that doesn't read against a flat light background).
  `.card-hover` (hover lift + glow), `.skeleton` (shimmer loader), `.text-gradient-aurora`.
- **Motion**: use Framer Motion for entrances (`initial/animate/whileInView`, stagger via
  `delayIndex * 0.06`–`0.08`), and the existing keyframes (`animate-float`,
  `animate-pulse-glow`, `animate-fade-up`, `animate-marquee`, `animate-shimmer`) before adding
  new ones.
- **Theme switcher**: NOT light/dark — the site is light-only by design now. It toggles
  between two light accent variants — "Night Watch" (teal-forward) and "Eclipse"
  (violet-forward) — via `useTheme()` from `src/context/ThemeContext.tsx`. Keep this
  behavior; don't reintroduce a dark mode unless explicitly asked.
- **Recharts / Leaflet**: axis strokes, gridlines, tooltip backgrounds, and Leaflet's popup/
  control/attribution colors were all hand-updated for light backgrounds in
  `AqiTrendChart.tsx`, `RootCauseDonut.tsx`, and `index.css`'s Leaflet override block — these
  don't inherit from Tailwind classes since Recharts/Leaflet need literal hex/rgba values.
  If you add a new chart, match this pattern rather than copying old dark-mode hex values.

---

## 4. Architecture Conventions

- **UI primitives** (`src/components/ui/*`): hand-rolled shadcn-equivalents on Radix +
  `cva` — the shadcn CLI registry isn't reachable in this environment, so these were built to
  match shadcn's API shape exactly. Treat them as if they were shadcn: import from
  `@/components/ui/button`, `@/components/ui/card`, etc. Don't re-run `shadcn init`.
- **`cn()`** from `@/lib/utils` for all conditional/merged classNames.
- **Data layer** (`src/data/*`) is the single source of truth for mock data — components
  should never inline random numbers. See §7 for the full inventory. When wiring real APIs
  later, only these files (plus the hooks in `src/hooks/`) should need to change.
- **Types** live centrally in `src/types/index.ts`. Extend, don't duplicate.
- **Context**: `useAuth()` (`src/context/AuthContext.tsx`) holds `{ user, role, login,
  register, logout }`, persisted to `localStorage`. `useTheme()` as above.
- **Routing**: `src/App.tsx` is the route tree. Authenticated routes are nested under
  `<AppShell />` (sidebar + topbar + outlet). Role-scoped paths follow `/public/*`,
  `/government/*`, `/analyst/*`, matching `NAV_BY_ROLE` in `src/lib/navigation.ts`.
- **Every dashboard page** is a real, built page — see §6 for the full inventory of what's
  built. There are no `PlaceholderPage` stubs left anywhere in the route tree.

---

## 5. Access Control (real, not cosmetic)

`src/lib/roleAccess.ts` enforces two things — don't bypass or weaken either without being
asked:

1. **Email-domain validation per role**, checked in `AuthContext.login()` /
   `.register()` before a session is created:
   - `government` — email domain must match `/(^|\.)(gov\.in|nic\.in)$/i`.
   - `analyst` — email domain must NOT be a common free/personal provider (gmail, yahoo,
     hotmail, outlook, icloud, etc. — see `FREE_EMAIL_DOMAINS`).
   - `public` — any well-formed email.
   - `login`/`register` return `{ success, error? }`; the auth pages show `error` inline
     rather than navigating on failure. See `LoginPage.tsx` / `RegisterPage.tsx`.
2. **Route guards**, in `src/components/layout/RoleRoute.tsx`, nested inside `AppShell` in
   `App.tsx` — one `<RoleRoute allow="...">` wrapping each role's route group. An
   authenticated user whose role doesn't match the route group is redirected to their own
   dashboard (`roleHomePath(user.role)`), not to login — they're authenticated, just not
   authorized for that section. This blocks direct-URL access, not just hidden nav links.

Both were end-to-end tested with a headless browser (mismatched-domain rejection,
correct-domain acceptance, cross-role URL redirect) before this was considered done —
if you change either file, re-verify the same way rather than trusting the typecheck alone.

## 6. Current Status

### ✅ Done — all 10 original phases, plus the light theme and access control
Folder structure, design system, layout components, landing page, authentication, the
shared UI kit, and the mock data layer are all built (see §3–§4 for conventions, §7 for the
data layer inventory).

**Phases 6, 7, 8 (the three dashboards) are now fully built**, not placeholders:
- **Public** (`/public/*`): AQI Overview, Trend Analysis with pollutant breakdown, Timeline
  Explorer (searchable/filterable table), Interactive Map + animated Heatmap Timeline,
  AI Health Guidance, Alerts feed, Report Export Center.
- **Government** (`/government/*`): Regional Overview, Hotspot Map with layer toggles, Alert
  Management Center (filter/acknowledge), Email Alert System (compose/preview/send
  simulation + history), AI Recommendation Engine, Construction Suitability Analysis, a
  policy What-If Simulator, Report Export Center.
- **Analyst** (`/analyst/*`): Construction Feasibility Tool, Root Cause Analysis (donut +
  full historical range chart), Low AQI Zone Finder (map + ranked list), AI Site Advisor,
  Report Export Center.
- Plus a shared `SettingsPage` (profile, theme switcher, notification prefs) reused across
  all three `/*/settings` routes.

### Known trade-offs (deliberate, not oversights)
- No dark mode — see the Theme Switcher note in §3.
- No literal 3D globe / three.js — the CSS/SVG `WatchGlobe` is the intentional solution,
  and reads even better against the light page (dark "night" sphere as a deliberate focal
  object) than it did on the original dark background.
- Login/register accept any password ≥4 characters — there's no real backend, so password
  strength isn't the point; the email-domain-to-role check is the actual access control.
- Map tiles (`tile.openstreetmap.org`) and Google Fonts may 403 in network-restricted
  sandboxes — this is an environment restriction, not an app bug. Confirmed via a real
  Playwright run that there are zero JS exceptions anywhere in the app; only these two
  external domains ever fail, everywhere else loads clean.

## 7. Data Layer Quick Reference (use these, don't reinvent)

```ts
import { REGIONS, getRegion, DEFAULT_REGION } from "@/data/regions";
import { AQI_CATEGORIES, categoryForAqi, aqiColor } from "@/data/aqiCategories";
import { generateAqiSeries, RANGE_CONFIG, currentAqiFromSeries } from "@/data/generators";
import {
  TRAFFIC_DATA, FARM_ACTIVITY_DATA, WEATHER_DATA,
  CONSTRUCTION_ACTIVITY_DATA, INDUSTRIAL_ACTIVITY_DATA,
  trafficFor, farmActivityFor, weatherFor, constructionSitesFor, industrialSitesFor,
} from "@/data/environmentalDatasets";
import { TIMELINE_RECORDS } from "@/data/timeline";
import { ALERTS, EMAIL_HISTORY } from "@/data/alerts";
import {
  generateRecommendations, AI_RECOMMENDATIONS,
  healthGuidanceForCategory, generateSiteReports, AI_SITE_REPORTS,
  generateIncidentSummary,
} from "@/data/aiInsights";
import { rootCauseForRegion } from "@/data/rootCause";
import { evaluateSuitability, evaluateFeasibility, findLowAqiZones, LOW_AQI_ZONES } from "@/data/feasibility";
import { WHAT_IF_SCENARIOS } from "@/data/whatIf";
import { useAqiSeries } from "@/hooks/useAqiSeries";
```

---

## 8. Extending the App

All 10 original phases are built and shipped — this section is for adding *new* work, not
tracking what's left (there's no remaining task list; the codebase is feature-complete
against the original brief plus the light theme and access-control additions).

If asked to add a new dashboard widget or page, follow the pattern already established:
compose from the existing shared components first (`KpiCard`, `AiInsightCard`,
`AqiTrendChart`, `RootCauseDonut`, `AqiBadge`, `RangeTabs` + `SectionHeader`, the three map
components, `RegionSelector`, `ReportExportCenter`, `WhatIfSimulator`) rather than building a
new primitive from scratch. Most dashboard pages are ~80% assembly of these pieces plus a
small amount of page-specific logic pulled from `src/data/`.

### Definition of Done for any new page or widget
- Uses real mock data from `src/data/`, not inline fabricated numbers.
- Loading states use `Skeleton` or the `loading` flag from `useAqiSeries` — don't pop content
  in with no transition.
- Framer Motion entrance on cards (stagger via `delayIndex`), consistent with existing pages.
- Responsive at `sm`/`lg` breakpoints — check mobile via `useIsMobile()` if layout needs to
  branch, but prefer pure Tailwind responsive classes first.
- `npx tsc -b` and `npm run build` stay clean — treat any new TypeScript error as a blocker.
- Follows the two-track AQI color rule in §3 (`color` for fills, `textColor`/`aqiText-*` for
  literal text) — don't reintroduce the contrast bug that was already fixed once.
- If it touches auth or routing, re-verify role-gating end-to-end (§5) rather than trusting
  the typecheck alone — a route can typecheck fine while still leaking access.

---

## 9. Known Non-Goals (don't do these unless explicitly asked)
- No real backend/API calls, no auth server — everything is mocked by design. The
  role-gating in §5 is real client-side access control, but there's no server verifying it;
  don't present it as production-grade security if asked about the architecture.
- No dark mode — the app is light-only now (see §3's Theme Switcher note). Don't reintroduce
  a dark palette unless explicitly asked.
- No literal 3D globe / three.js — the CSS/SVG `WatchGlobe` is the intentional solution.
- Don't touch `src/components/ui/*` API shapes without checking all call sites — they're
  imported broadly.
