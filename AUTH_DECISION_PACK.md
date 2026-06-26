# ClubOps — Auth Decision Pack (v1.3.0)

**Status: Decision pack only — not implemented.**

This document helps choose a live-mode authentication and data foundation before any implementation. It is **technical guidance**, not legal or security certification.

## Current state

- Public demo: **no authentication**, `demoProvider`, fake data only
- `PROVIDER_MODE = "demo"` — must not change on public Vercel URL
- No auth SDKs, database packages, or environment variables in this release

## ClubOps requirements

Live auth and data must support:

| Need | Why it matters |
|------|----------------|
| Child/member records | Core club operations |
| Parent/carer linking | Communications, emergency contact |
| Finance & fees | Treasurer-only sensitive data |
| Gift Aid / tax records | HMRC compliance, restricted access |
| Medical/welfare summaries | Safeguarding — strict RBAC + audit |
| Staff/volunteer / DBS | Compliance tracking |
| Documents & scanned notes | Private file storage |
| Persistent audit log | Committee accountability |
| Module RBAC | Secretary, treasurer, coach, welfare roles |
| Permission-controlled exports | Prevent data leakage |
| Low cost | Volunteer-run small clubs |
| Small-team maintainability | Mike + Cursor, not a DevOps team |
| Vercel deployment | Current hosting |
| **Demo Mode separate** | Public URL stays fake forever |

## Options compared

| Option | Verdict | Summary |
|--------|---------|---------|
| **Supabase Auth + Postgres + RLS + Storage** | **Recommended** | One integrated stack; relational model fits finance/audit |
| Clerk + separate DB/storage | Possible alternative | Polished auth; more services to integrate |
| Auth.js + separate DB/storage | Higher burden | Flexible; you own all security decisions |
| Firebase Auth + Firestore/Storage | Possible alternative | Weak relational fit for ClubOps |
| Custom auth | **Not recommended** | High-risk unless unavoidable |

Full detail: [LIVE_STACK_OPTIONS.md](./LIVE_STACK_OPTIONS.md)

## Decision matrix

Scores 1–5 per criterion with justification — see [LIVE_STACK_OPTIONS.md](./LIVE_STACK_OPTIONS.md) and UI at `/settings/live-stack`.

**Provisional winner:** Supabase (highest average score for ClubOps needs).

## Provisional recommendation

See [RECOMMENDED_LIVE_STACK.md](./RECOMMENDED_LIVE_STACK.md):

- Vercel (Next.js) — demo + separate live project
- Supabase Auth, Postgres, RLS, Storage — live only
- `demoProvider` — public demo permanent
- `liveProvider` — future Supabase-backed implementation on private deploy

## Implementation sequence

See [AUTH_IMPLEMENTATION_PLAN.md](./AUTH_IMPLEMENTATION_PLAN.md) — **do not start until committee approves stack choice**.

## Per-vendor evaluations

- [SUPABASE_EVALUATION.md](./SUPABASE_EVALUATION.md)
- [CLERK_EVALUATION.md](./CLERK_EVALUATION.md)
- [AUTHJS_EVALUATION.md](./AUTHJS_EVALUATION.md)
- [FIREBASE_EVALUATION.md](./FIREBASE_EVALUATION.md)

## Safety reminders

- No real data in public demo
- No secrets in git
- Environment variables only in Vercel dashboard / `.env.local` (when implemented)
- RLS + server-side checks before any real member/medical/financial data
- Private file storage; persistent audit

## UI pages

- `/settings/auth-decision`
- `/settings/live-stack`
- `/settings/implementation-options`
- `/settings/recommended-stack`

## Related documents

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [LIVE_MODE_PLAN.md](./LIVE_MODE_PLAN.md)
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
- [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md)
