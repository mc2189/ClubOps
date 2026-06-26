# Clerk Evaluation for ClubOps

**Verdict: Possible alternative** — not the provisional recommendation.

## Summary

Clerk delivers polished authentication, MFA, and organization management with excellent Next.js/Vercel DX. ClubOps would still need a **separate** Postgres database, file storage, audit system, and custom module RBAC.

## Authentication features

**Excellent** — pre-built UI, MFA, social login, session management, user profiles.

## RBAC approach

Clerk **Organizations** provide coarse roles. ClubOps module matrix (treasurer vs welfare vs coach) requires **custom tables in your database** — Clerk does not replace ClubOps permissions model.

## Server-side authorisation

Clerk middleware on Next.js routes; verify session server-side. Database RLS still your responsibility if using Postgres.

## Database fit

Clerk is not a database. Pair with Neon, Supabase (DB-only), PlanetScale, or RDS. **Good fit** if Postgres chosen — same as Supabase path but +1 vendor.

## File storage fit

Requires S3, Supabase Storage, UploadThing, etc. — separate integration and access policy design.

## Audit logging fit

Clerk webhooks cover auth events (login, MFA). ClubOps audit (member edits, medical views, exports) needs **custom audit table**.

## Multi-club tenancy

Clerk Organizations map to clubs; data isolation still enforced in your DB.

## Local development

Easy for auth; full stack needs DB + storage running too.

## Vercel deployment

**Excellent** — first-class Clerk + Vercel integration.

## Cost profile

Free tier limited; **MAU-based pricing** can grow with parent volunteer accounts — watch cost vs Supabase bundle.

## Vendor lock-in

Higher for auth UX; club data portable in standard Postgres.

## Migration risk

**Medium** — coordinating Clerk user IDs with DB records and permission sync.

## Security maturity

**Strong for auth**; overall system security depends on your DB and storage layers.

## Youth / safeguarding data suitability

**Acceptable** if DB layer implements strict welfare/finance separation — Clerk alone does not protect member records.

## Mobile / tablet

Clerk SDKs for web and mobile.

## Demo Mode separation

No Clerk keys on public demo Vercel project.

## What could go wrong

- Auth "done" but RBAC/audit/storage deferred
- Cost surprise as user count grows
- Split-brain between Clerk org roles and DB permissions

## Recommended use

When **auth UX and MFA** are the top priority and the team accepts **multi-vendor** architecture.

## Avoid rationale

Skip if minimising cost, integration work, and vendor count for a small volunteer club.

## Matrix average: 3.6 / 5
