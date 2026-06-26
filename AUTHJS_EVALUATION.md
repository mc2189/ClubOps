# Auth.js / NextAuth Evaluation for ClubOps

**Verdict: Higher implementation burden** — flexible but risky for small teams.

## Summary

Auth.js (NextAuth) is open-source and flexible — no auth SaaS fee. You own **every** security decision: adapters, sessions, CSRF, token rotation, user management, and integration with RBAC, audit, and storage.

## Authentication features

OAuth providers, credentials provider, email via adapters. Session strategies: JWT or database sessions. **Powerful but unopinionated.**

## RBAC approach

**Fully custom.** Map Auth.js user id to ClubOps roles in Postgres. No built-in org or module permissions.

## Server-side authorisation

`getServerSession` / Auth.js v5 equivalents in server components and actions. Must audit **every** route — easy to miss one.

## Database fit

Works with Postgres via official adapter — **same relational benefits as Supabase** once DB exists. Auth.js does not provide the database.

## File storage fit

Separate service required (S3, Supabase Storage, etc.).

## Audit logging fit

Fully custom `audit_events` pipeline.

## Multi-club tenancy

Custom middleware + DB design.

## Local development

Configure providers, callbacks, secrets in `.env.local` — more setup than managed auth.

## Vercel deployment

Common pattern; watch serverless session and edge compatibility for chosen session strategy.

## Cost profile

No auth license; pay for DB/hosting only. **Hidden cost: engineering and security maintenance.**

## Vendor lock-in

**Low** for auth; standard Postgres for data.

## Migration risk

**Medium-high** — under-implemented security is common.

## Security maturity

**Depends entirely on implementer.** Easy to ship vulnerabilities without expert review.

## Youth / safeguarding data suitability

**Acceptable only** with rigorous security review and experienced implementer — not ideal for volunteer-club project.

## Mobile / tablet

Web-first; native apps need separate token strategy.

## Demo Mode separation

No Auth.js on public demo.

## What could go wrong

- Session fixation / CSRF gaps
- Incomplete route protection
- Delayed security patches
- Volunteer maintainer burnout

## Recommended use

Team with **strong Next.js and auth security experience** wanting no auth SaaS and full control.

## Avoid rationale

ClubOps handles **child, medical, and financial data** — managed auth (Supabase or Clerk) reduces risk for small teams.

## Matrix average: 3.3 / 5
