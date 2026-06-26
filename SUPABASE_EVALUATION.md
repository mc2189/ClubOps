# Supabase Evaluation for ClubOps

**Verdict: Recommended** for live mode (not implemented in v1.3.0).

## Summary

Supabase provides auth, Postgres, Row Level Security, and private storage in one platform — strong alignment with ClubOps' relational finance, Gift Aid, audit and document requirements.

## Authentication features

- Email/password, magic link, OAuth providers
- JWT-based sessions; server validation via `@supabase/ssr`
- Suitable for volunteer secretaries/treasurers (magic link reduces password support burden)

## RBAC approach

- **Not** a turnkey org-RBAC product — ClubOps implements `roles`, `role_permissions`, `user_roles` tables
- **RLS policies** enforce club_id and role checks at database layer
- App layer (`liveProvider`) duplicates checks server-side — defence in depth
- Maps to existing demo permission matrix (v1.1.0)

## Server-side authorisation

- Next.js server actions verify Supabase session before queries
- Service role key **server-only** for admin tasks — never in client bundle
- Demo role switcher ignored in live mode

## Database fit

**Excellent.** Postgres supports:

- Member ↔ parent ↔ fee relationships
- Gift Aid declarations ↔ donations
- Finance transactions with reporting queries
- Append-only audit_events
- Committee export packs via SQL

## File storage fit

**Excellent.** Storage buckets with policies tied to auth; private documents and scanned notes; signed URLs for download with audit logging.

## Audit logging fit

**Good.** Custom append-only `audit_events` table; triggers or application inserts; not a built-in Supabase product feature — must be designed.

## Multi-club tenancy

`club_id` on all tables + RLS. Option: one Supabase project per club or multi-club with strict policies (prefer single-club per project initially for simplicity).

## Local development

- Supabase CLI (`supabase start`) for local Postgres/auth/storage
- Or hosted dev project with `.env.local` (gitignored)

## Vercel deployment

Well documented for Next.js App Router. Edge middleware for session refresh. No conflict with current demo deploy (no env vars).

## Cost profile

Free tier generous for small clubs; Pro ~$25/mo when scaling. Predictable vs per-MAU auth pricing.

## Vendor lock-in

Moderate. Postgres data exportable; auth/storage APIs Supabase-specific but migration paths exist.

## Migration risk

**Low** if schema follows DATA_MODEL.md from start; demo stays on demoProvider.

## Security maturity

Strong when RLS reviewed by someone who understands policy SQL. Main risk is **misconfiguration**, not platform weakness.

## Youth / safeguarding data suitability

**Good** with welfare-only RLS on medical tables, audit on every sensitive read, no public storage URLs.

## Mobile / tablet

Supabase JS client works in responsive web; same API for future native apps if needed.

## Demo Mode separation

Public Vercel: zero Supabase configuration. Live: separate Supabase + Vercel projects.

## What could go wrong

- RLS policy gap exposes rows
- Service role key leaked
- Demo and live env vars mixed on wrong Vercel project
- Skipping server-side checks and trusting RLS alone

## Recommended use

**Default choice for ClubOps live mode.**

## Avoid rationale

N/A — preferred path unless committee explicitly chooses alternative after reading decision pack.

## Matrix average: 4.5 / 5

See LIVE_STACK_OPTIONS.md for full matrix.
