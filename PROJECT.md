# ClubOps — Project Overview

## Purpose

ClubOps reduces volunteer admin workload for sports clubs. The first demonstration target is a gymnastics club, but the product is designed to remain generic for other club types.

## Core modules

| Module             | Purpose                                      |
| ------------------ | -------------------------------------------- |
| Dashboard          | Overview metrics and recent activity         |
| Members            | Member records and membership management     |
| Attendance         | Session attendance tracking                  |
| Finance            | Income, expenses and fee tracking            |
| Gift Aid           | Declarations and HMRC claim support          |
| Communications     | Emails, notices and member messaging         |
| Documents          | Policies, forms and file storage             |
| Calendar           | Sessions, competitions and events            |
| Staff & Volunteers | Coaches, DBS and safeguarding records        |
| Fundraising        | Campaigns and donation tracking              |
| Reports            | Exports, committee packs and admin reports   |
| Audit Log          | Cross-module activity and evidence trail     |
| Demo Script        | Guided presentation walkthrough              |
| Settings           | Club configuration                           |

## Design principles

1. **Demo-first, live-ready** — works with fake data now, swappable to live data later.
2. **Volunteer-friendly** — simple UI for non-technical users (v1.4.1: grouped nav, dashboard priorities, plain language).
3. **Security-conscious** — RBAC, audit trails, soft-delete, no real sensitive data in demo.
4. **Modular** — each module is independent and reusable.
5. **Accessible** — responsive, keyboard-navigable, screen-reader friendly (v1.4.1: skip link, aria-current, aria-pressed).

## Current release

**v1.4.2** — Mobile/tablet shell (drawer navigation, bottom nav, touch targets). Still demo-only.

**v1.4.1** — UX/clarity polish (grouped navigation, settings simplification, dashboard priorities, RBAC demo honesty wording). Still demo-only.

## Demo club

The demo uses **Riverside Gymnastics Club** with entirely fictional members, staff and records.

## Data provider pattern

```
UI Page → dataProvider.getX() → demoProvider (now) / liveProvider (future)
```

All data access goes through `ClubOpsDataProvider` interface defined in `src/data/providers/types.ts`.

## v1.4.0 status

ClubOps v1.4.0 adds **Supabase live foundation prep** — draft schema, RLS/storage policies, client scaffold, env documentation. **No Supabase project, keys, or live connection.** Public demo unchanged (`demoProvider`, no login).

Prep pages: `/settings/supabase-prep`, `/settings/schema-plan`, `/settings/private-deployment`.

## v1.3.0 status

ClubOps v1.3.0 adds an **auth and live stack decision pack** comparing Supabase, Clerk, Auth.js, Firebase and custom auth. **Provisional recommendation: Supabase Auth + Postgres + RLS + Storage** on a private live deployment. No SDK packages, env vars, or real auth implemented. Public demo unchanged.

Decision pages: `/settings/auth-decision`, `/settings/live-stack`, `/settings/implementation-options`, `/settings/recommended-stack`.

## v1.2.0 status

ClubOps v1.2.0 adds a **live-ready data architecture blueprint** — documentation and settings UI for moving from demo to live without messy rewrites. **No database, auth, or live integrations are added.** Demo Mode remains permanent.

Blueprint pages: `/settings/live-readiness`, `/settings/data-architecture`, `/settings/provider-model`, `/settings/production-roadmap`.

Technical docs: ARCHITECTURE.md, DATA_MODEL.md, LIVE_MODE_PLAN.md, PROVIDER_CONTRACTS.md, SECURITY_LIVE_REQUIREMENTS.md, MIGRATION_PLAN.md.

## v1.1.0 status

ClubOps v1.1.0 adds **demo role switching and RBAC preview** — a presentation tool showing how secretary, treasurer, coach and welfare roles would restrict access in live mode. This is **not real authentication** and does not protect real data. The demo remains publicly accessible without login.

The next phase after v1.4.0 is private Supabase project creation, auth pages, RLS application, and liveProvider Members read path — on a **private** deployment only.
