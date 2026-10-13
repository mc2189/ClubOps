# ClubOps

ClubOps is a **portfolio/demo application for volunteer-run sports clubs**, built to explore how a small organisation could manage members, tasks, communications, finance workflows, safeguarding-related administration and operational reporting in one place.

It is a concept project, not a live club system. All demo records are fictional and the current public/demo branding should not be taken as endorsement by, or affiliation with, any real club.

## What it demonstrates

- Product thinking around a real operational problem
- Next.js 15 / React / TypeScript application development
- Role-based user journeys and permission concepts
- Structured operational dashboards and reporting
- Data modelling for members, tasks, documents, payments and club administration
- Supabase architecture planning, schema design and RLS/security considerations
- Separation between demo data and future live-data providers
- Mobile/tablet responsive design
- Accessibility and navigation work
- Production-readiness thinking, including authentication, storage, audit logging and privacy controls

## Why I built it

The idea came from looking at the amount of admin involved in running a volunteer sports club and thinking about how those separate jobs could be pulled into one simple interface.

Rather than treating it as a static mock-up, I used it to work through the wider questions that appear when a demo starts becoming a real product: data ownership, permissions, secure storage, auditability, role separation, safeguarding-sensitive information, deployment and migration from demo to live data.

## Tech stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS 4
- Supabase planning/scaffolding
- Vercel deployment workflow

## Demo architecture

The current application runs with fictional demo data. Pages fetch data through a provider layer so the UI is not tightly coupled to the demo dataset. A future live implementation can replace the demo provider with a secure backend without rewriting the whole application.

The repository includes design work for:

- authentication and role-based access
- Supabase schema planning
- row-level security (RLS)
- private file storage
- migration from demo to live data
- production audit logging
- deployment/security checks

## Useful files

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system layers and module map
- [`DATA_MODEL.md`](./DATA_MODEL.md) — entities and schema outline
- [`LIVE_MODE_PLAN.md`](./LIVE_MODE_PLAN.md) — demo vs live strategy
- [`PROVIDER_CONTRACTS.md`](./PROVIDER_CONTRACTS.md) — provider interface
- [`SECURITY_LIVE_REQUIREMENTS.md`](./SECURITY_LIVE_REQUIREMENTS.md) — production security checklist
- [`MIGRATION_PLAN.md`](./MIGRATION_PLAN.md) — staged migration plan
- [`SUPABASE_SCHEMA_PLAN.md`](./SUPABASE_SCHEMA_PLAN.md) — proposed backend schema
- [`SUPABASE_RLS_PLAN.md`](./SUPABASE_RLS_PLAN.md) — proposed row-level security model

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Project status

ClubOps is a personal concept/portfolio project. It is intentionally honest about the difference between a working demo and a production-ready system: demo role switching is **not** real authentication, and any real deployment would require the security controls described in the repository documentation.
