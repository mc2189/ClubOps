# Firebase Evaluation for ClubOps

**Verdict: Possible alternative** — **not recommended** for ClubOps' current product shape.

## Summary

Firebase offers managed Auth, Firestore (NoSQL), and Storage with strong mobile SDKs. ClubOps is **finance-, audit-, and export-heavy** with a natural **relational** model — Firestore is a poor primary database for this use case.

## Authentication features

Email, social, phone auth; Firebase Admin SDK for server verification.

## RBAC approach

Firestore **security rules** + custom claims. Fine-grained module RBAC (treasurer vs welfare vs coach) becomes **complex and error-prone** compared to SQL + RLS.

## Server-side authorisation

Verify ID tokens in Next.js API routes or Cloud Functions.

## Database fit

**Weak for ClubOps.**

- Finance ledger, Gift Aid joins, committee export packs need relational queries
- Denormalised Firestore increases app complexity and read costs for reports
- Audit trail as tamper-resistant relational log is harder

## File storage fit

**Good** — Firebase Storage with security rules. Comparable to Supabase Storage if rules are correct.

## Audit logging fit

Custom Firestore collection — harder to enforce append-only semantics and relational reporting.

## Multi-club tenancy

Collection prefixes or separate Firebase projects per club.

## Local development

Firebase emulators available; different paradigm from SQL migrations.

## Vercel deployment

Works but **Google-centric**; less idiomatic alongside Next.js on Vercel than Supabase.

## Cost profile

Spark free tier; report/export read volume can **spike costs**.

## Vendor lock-in

**High** — migrating Firestore documents to Postgres later is expensive.

## Migration risk

**High** if core finance/audit built in Firestore then SQL reporting required.

## Security maturity

Google infrastructure mature; **rules complexity** is the risk surface.

## Youth / safeguarding data suitability

Possible with strict rules; **audit and export** harder than Postgres + RLS.

## Mobile / tablet

**Excellent** Firebase mobile SDKs — best fit if ClubOps pivoted mobile-first.

## Demo Mode separation

No Firebase on public demo.

## What could go wrong

- Report queries expensive at scale
- Business logic duplicated to compensate for NoSQL
- Locked into Firestore for finance data

## Recommended use

Mobile-first real-time apps with **simple document models** — not current ClubOps admin shape.

## Avoid rationale

Prefer **Postgres** for finance, Gift Aid, audit, and committee exports.

## Matrix average: 3.2 / 5
