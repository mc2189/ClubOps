# ClubOps — Auth Implementation Plan

**Status: Plan only — v1.4.0 adds draft schema and scaffold; do not implement until stack approved.**

See also: [LIVE_PROVIDER_IMPLEMENTATION_PLAN.md](./LIVE_PROVIDER_IMPLEMENTATION_PLAN.md), [PRIVATE_DEPLOYMENT_CHECKLIST.md](./PRIVATE_DEPLOYMENT_CHECKLIST.md)

Provisional stack: **Supabase Auth + Postgres + RLS + Storage** on a **private** Vercel deployment. Public demo unchanged.

## Phase 0 — Prerequisites (complete)

- [x] v1.2.0 architecture blueprint (DATA_MODEL, MIGRATION_PLAN)
- [x] v1.3.0 auth/stack decision pack
- [ ] Committee approval of recommended stack
- [ ] Live security review scheduled

## Phase 1 — Project setup (future)

1. Create **Supabase project** for live deployment only — not linked to public demo.
2. Create **separate Vercel project** for live (or live branch with env isolation).
3. Document env vars (do not commit):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only)
4. Add `@supabase/ssr` and `@supabase/supabase-js` in a **future implementation iteration** — not v1.3.0.
5. Add `supabase/migrations/` to repo for SQL version control.

## Phase 2 — Auth (future)

1. Enable Supabase Auth — email magic link recommended for volunteers.
2. Disable open public signup; use invite or admin-created users.
3. Configure redirect URLs for live Vercel domain only.
4. Implement Next.js middleware to refresh session (`@supabase/ssr`).
5. Add login/logout pages on **live deploy only** — not on public demo.
6. Map `auth.users` → `profiles` table with display name.

## Phase 3 — Schema foundation (future)

Tables (minimum for auth + RBAC):

```sql
-- Illustrative — not applied in v1.3.0
clubs (id, name, settings, created_at)
profiles (id FK auth.users, full_name, ...)
user_club_memberships (user_id, club_id, status)
roles (id, club_id, name, ...)
role_permissions (role_id, module, level)
user_roles (user_id, club_id, role_id, approved_by, approved_at)
audit_events (id, club_id, actor_id, action, module, record_id, sensitivity, created_at)
```

Enable **RLS on every table** before any seed with real-looking data.

## Phase 4 — RLS policies (future)

1. Default deny — no public access.
2. Policies filter by `club_id` from membership.
3. Welfare/medical tables: welfare role + admin only.
4. Finance/Gift Aid: treasurer + admin only.
5. Test policies with automated tests and manual penetration checklist.

## Phase 5 — liveProvider (future)

1. Implement read methods against Supabase for Members module first.
2. Verify session on every server action.
3. Write path + `audit_events` insert on mutations.
4. Replace stub in `liveProvider.stub.ts` — wire in `index.ts` **only on live deploy**.
5. Keep `PROVIDER_MODE=demo` on public Vercel forever.

## Phase 6 — Storage (future)

1. Create private buckets: `documents`, `scanned-notes`, `receipts`.
2. Storage policies mirror RLS roles.
3. Upload via server action; virus scan before accept (Stage 5 migration).
4. Download via signed URLs; log access in `audit_events`.

## Phase 7 — Go-live gate (future)

- RLS review sign-off
- Backup/restore tested
- No secrets in client bundle
- Public demo QA checklist still passes on demo URL
- DEMO_QA_CHECKLIST.md live section complete

## Demo separation rules

| Rule | Enforcement |
|------|-------------|
| Public demo no Supabase keys | Vercel env scoped to live project |
| demoProvider always on public | `PROVIDER_MODE=demo` in public build |
| No real data in seeds | Dev seeds fake only |
| liveProvider not wired publicly | `index.ts` resolveProvider unchanged on demo |

## Alternatives path

If committee chooses Clerk or Auth.js instead:

- Replace Phase 2 auth steps with chosen provider docs.
- Keep Postgres + RLS recommendation (can use Supabase DB without Supabase Auth).
- Revisit AUTH_DECISION_PACK.md decision matrix.

## Related documents

- [RECOMMENDED_LIVE_STACK.md](./RECOMMENDED_LIVE_STACK.md)
- [SUPABASE_EVALUATION.md](./SUPABASE_EVALUATION.md)
- [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md)
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
