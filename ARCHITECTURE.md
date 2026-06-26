# ClubOps — Architecture

## Overview

ClubOps is a **demo-first, live-ready** club management application. The public deployment runs in permanent **Demo Mode** with fake data. A future **Live Mode** will sit alongside it — not replace it.

```
┌─────────────────────────────────────────────────────────────┐
│                     UI (Next.js App Router)                  │
│  Shared pages, components, RBAC preview (client-side demo)   │
└───────────────────────────┬─────────────────────────────────┘
                            │ dataProvider (ClubOpsDataProvider)
              ┌─────────────┴─────────────┐
              ▼                           ▼
     ┌─────────────────┐        ┌─────────────────┐
     │  demoProvider   │        │  liveProvider   │
     │  (active now)   │        │  (future stub)  │
     └────────┬────────┘        └────────┬────────┘
              ▼                           ▼
     src/data/demo/*              Supabase (provisional):
     fake JSON/TS data            Auth + Postgres + RLS +
                                  Storage + server RBAC
```

## Core principle

| Mode | Purpose | Data | Auth |
|------|---------|------|------|
| **Demo** | Public demo, training, sales | Fake only | None |
| **Live** | Real club operations | Real, classified | Required |

Demo Mode is **permanent**. The public Vercel URL must always use `demoProvider`.

## Layers

### 1. UI layer (`src/app/`, `src/components/`)

- Pages render shared components.
- **Must not** import `src/data/demo/*` directly.
- **Must** call `dataProvider` or module-specific demo providers that wrap the contract.
- Demo RBAC (`DemoRoleProvider`) is a **presentation preview only** — not security.

### 2. Provider layer (`src/data/providers/`)

- **`ClubOpsDataProvider`** — shared TypeScript contract in `types.ts`.
- **`demoProvider`** — reads fake data; active in all deployments today.
- **`liveProvider.stub.ts`** — placeholder that throws; **not wired** to `index.ts`.
- **`index.ts`** — resolves provider via `resolveProvider()`; always returns demo today.

### 3. Demo data layer (`src/data/demo/`)

- Fake records per module.
- Architecture blueprint data (`architectureData.ts`) for settings UI only.
- Session-only state in React contexts (attendance marks, inbox status, etc.).

### 4. Future live layer (not implemented)

- Authentication provider (TBD: email/magic link/SSO).
- Relational database with migrations.
- Server actions / API routes with **server-side authorisation**.
- Private object storage for files.
- Append-only audit log store.

## Module map

| Module | Route prefix | Owner data |
|--------|--------------|------------|
| Dashboard | `/dashboard` | Aggregated |
| Members | `/members` | Member profiles |
| Attendance | `/attendance` | Sessions, registers |
| Finance | `/finance` | Transactions, fees |
| Gift Aid | `/gift-aid` | Declarations, donations |
| Communications | `/communications` | Messages, templates |
| Documents | `/documents` | Files, scanned notes |
| Staff | `/staff` | Volunteers, rota, wages |
| Fundraising | `/fundraising` | Campaigns, CRM |
| Reports & Audit | `/reports`, `/audit` | Exports, audit events |
| Settings | `/settings` | Club config, blueprint |

## Environment separation (future)

When live mode is built:

- **Demo deployment** — `PROVIDER_MODE=demo` (or default); public URL.
- **Live deployment** — separate private deployment; real auth; `liveProvider` only after security review.
- Never mix real data into the demo deployment.

## UI blueprint pages (v1.2.0 + v1.3.0)

Non-technical and technical audiences can review:

- `/settings/live-readiness` — checklist before real data
- `/settings/data-architecture` — entities and classifications
- `/settings/provider-model` — demo vs live providers
- `/settings/production-roadmap` — staged build order
- `/settings/auth-decision` — auth/stack comparison (v1.3.0)
- `/settings/live-stack` — decision matrix scores
- `/settings/implementation-options` — Clerk, Auth.js, Firebase alternatives
- `/settings/recommended-stack` — provisional Supabase recommendation

No SDK packages or env vars added in v1.3.0.

## Supabase scaffold (v1.4.0 — not active)

`src/lib/supabase/` — client helpers return null without env vars. Not imported by demo routes. See `supabase/` for draft migrations.

## Provisional live stack (v1.3.0 — not implemented)

See [RECOMMENDED_LIVE_STACK.md](./RECOMMENDED_LIVE_STACK.md):

- **Vercel** — hosting (separate live project)
- **Supabase Auth + Postgres + RLS + Storage** — live data layer target for `liveProvider`
- **demoProvider** — permanent public demo

No SDK packages or env vars added in v1.3.0.

## Related documents

- [DATA_MODEL.md](./DATA_MODEL.md) — entities and relationships
- [PROVIDER_CONTRACTS.md](./PROVIDER_CONTRACTS.md) — provider interface
- [LIVE_MODE_PLAN.md](./LIVE_MODE_PLAN.md) — live mode strategy
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) — staged migration
- [AUTH_DECISION_PACK.md](./AUTH_DECISION_PACK.md) — auth/stack decision pack (v1.3.0)
- [RECOMMENDED_LIVE_STACK.md](./RECOMMENDED_LIVE_STACK.md) — provisional Supabase stack

## Developer rules

1. UI → `dataProvider` only; no direct demo file imports in components.
2. Extend `types.ts` before adding live database tables.
3. Do not wire `liveProvider` until auth + server RBAC exist.
4. Sensitive fields need `TODO: RBAC` markers until server enforcement exists.
5. Every live mutation must produce an audit event (future).
