# Supabase RLS Plan

**Draft policies only — must be tested before real data.**

## Location

- `supabase/policies/010_rls_policy_drafts.sql`
- Referenced in migration list as 010

## Principles

1. **Enable RLS** on every club-scoped table
2. **Default deny** — no public access
3. **Tenant isolation** — users only see clubs in `club_memberships`
4. **Role checks** — map to ClubOps demo roles: secretary, treasurer, coach, welfare, admin
5. **Defence in depth** — RLS + server-side checks in `liveProvider`
6. **Service role** — trusted server tasks only; never in client

## Access patterns (draft)

| Data | Roles |
|------|-------|
| General member (non-medical) | Secretary, Admin; Coach limited |
| Medical / welfare | Welfare Officer, Admin |
| Finance, fees, expenses | Treasurer, Admin |
| Gift Aid | Treasurer, Admin |
| Documents | By sensitivity + category |
| Wage prep | Treasurer, Admin |
| Exports | Treasurer, Admin |
| Audit log | Admin; committee read-only summary (future) |

## audit_events

- INSERT via service role or SECURITY DEFINER function after server validation
- No UPDATE/DELETE for application roles (append-only)

## Before go-live

- [ ] Helper functions `user_club_ids`, `user_has_role` implemented and tested
- [ ] Policy review with security checklist
- [ ] Attempt bypass tests (wrong club_id, wrong role)

## UI

`/settings/supabase-prep`, `/settings/private-deployment`

## Related

- [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md)
