# ClubOps — Recommended Live Stack

**Status: Provisional recommendation — not implemented.**

This is a **technical recommendation** for ClubOps live mode. It is not legal or security certification. No real data should be entered until secure configuration, RLS policies, backups and testing are complete.

## Recommendation summary

| Layer | Choice | Status |
|-------|--------|--------|
| Hosting | **Vercel** (Next.js App Router) | Demo active; live = separate Vercel project |
| Demo data | **`demoProvider`** | Permanent on public URL |
| Live auth | **Supabase Auth** | Not implemented |
| Live database | **Supabase Postgres** | Not implemented |
| Access control | **RLS + app role tables** | Not implemented |
| File storage | **Supabase Storage** (private buckets) | Not implemented |
| Live data layer | **`liveProvider` → Supabase** | Stub only; not wired |

## Why Supabase for ClubOps

1. **Relational Postgres** matches members, fees, Gift Aid, finance transactions and audit relationships.
2. **RLS** provides defence-in-depth for youth/safeguarding and treasurer-only finance data.
3. **Integrated storage** for documents and scanned notes with policy-aligned access.
4. **Low cost** free tier suits small volunteer clubs.
5. **Vercel compatibility** — documented Next.js App Router integration (add SDK in future iteration only).
6. **Single vendor** reduces operational burden for a small team.
7. **Demo stays separate** — public deployment needs zero Supabase keys.

## Why not the alternatives (for ClubOps)

| Alternative | Main drawback for ClubOps |
|-------------|---------------------------|
| Clerk | Excellent auth but separate DB + storage + audit integration |
| Auth.js | More security decisions; higher risk for small team |
| Firebase | Firestore weak for finance/audit/reporting |
| Custom auth | Unacceptable risk for child/safeguarding data |

See individual evaluations: CLERK_EVALUATION.md, AUTHJS_EVALUATION.md, FIREBASE_EVALUATION.md.

## Deployment model

```
Public Vercel (permanent)
  └── demoProvider + fake data + no login

Private Vercel (future)
  └── liveProvider + Supabase project + real auth
  └── PROVIDER_MODE=live (only after security review)
  └── Never the same URL as public demo
```

## Before go-live checklist

- [ ] Supabase project created (live only)
- [ ] Env vars in Vercel live project only — never committed
- [ ] Auth: invite-only or admin-approved signup
- [ ] RLS enabled on every table — welfare/medical most restrictive
- [ ] Storage buckets private — signed URLs
- [ ] `audit_events` append-only
- [ ] Backups configured and restore tested
- [ ] Live security review completed
- [ ] Public demo unchanged

## UI

`/settings/recommended-stack` — committee-friendly summary + Supabase plan steps.

## Related documents

- [SUPABASE_EVALUATION.md](./SUPABASE_EVALUATION.md)
- [AUTH_IMPLEMENTATION_PLAN.md](./AUTH_IMPLEMENTATION_PLAN.md)
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
