# Live Provider Implementation Plan

**v1.4.0 — preparation only. liveProvider is not active.**

## Current state

- `demoProvider` — active on public demo
- `liveProvider.stub.ts` — throws; not wired in `index.ts`
- `src/lib/supabase/` — scaffold; not imported by demo routes
- `PROVIDER_MODE = "demo"` — hardcoded for public safety

## Future build order

1. Create private Supabase project
2. Configure private Vercel environment
3. Add Supabase env vars **only** to private deployment
4. Implement auth pages (private deploy)
5. Implement server-side auth middleware for private live routes
6. Apply core schema (`supabase/migrations/001–009`)
7. Apply RLS policies (`supabase/policies/`)
8. Implement profiles / clubs / memberships
9. Implement persistent `audit_events` inserts
10. Implement `liveProvider` **read-only** Members path
11. Test with **fake seed data only**
12. Add write paths (later iterations)
13. Real club data **only after security review**

## liveProvider method rollout (suggested)

| Phase | Methods | Notes |
|-------|---------|-------|
| 1 | `getMembers`, `getMemberById` | Read-only; RLS enforced |
| 2 | Member writes + audit | Server actions only |
| 3 | Attendance | Session registers |
| 4 | Finance, Gift Aid | Treasurer RLS |
| 5 | Documents + Storage | Signed URLs |
| 6 | Remaining modules | Per MIGRATION_PLAN.md |

## Supabase integration rules

- Use `@supabase/ssr` for server/client — not deprecated auth helpers
- Service role **server-only** after session + RBAC check
- Never trust client demo role switcher
- Every sensitive read/write → `audit_events`

## Related

- [PRIVATE_DEPLOYMENT_CHECKLIST.md](./PRIVATE_DEPLOYMENT_CHECKLIST.md)
- [SUPABASE_LOCAL_DEV.md](./SUPABASE_LOCAL_DEV.md)
- [PROVIDER_CONTRACTS.md](./PROVIDER_CONTRACTS.md)
