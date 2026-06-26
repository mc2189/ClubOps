# Private Deployment Checklist

**Before any real club data on a live ClubOps deployment.**

Public demo Vercel project must **never** complete this checklist — it stays demo-only.

## Separate projects

- [ ] Private Supabase project created (not shared with demo)
- [ ] Private Vercel project created OR separate env scope on Vercel
- [ ] Public demo Vercel project has **no** Supabase env vars

## Environment variables (private only)

- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel (private project)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel (private project)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set — **server-only**, never in client
- [ ] `CLUBOPS_PROVIDER_MODE=live` only when liveProvider + auth ready
- [ ] No secrets committed to git
- [ ] `.env.local` gitignored locally

## Schema & security

- [ ] Migrations 001–009 applied and verified
- [ ] RLS enabled on all tables
- [ ] RLS policies tested (finance, welfare, tenant isolation)
- [ ] Storage buckets created — all private
- [ ] Storage policies tested
- [ ] `audit_events` append-only enforced

## Application

- [ ] Auth pages on private deploy only
- [ ] Middleware protects live routes only — **not** public demo URL
- [ ] `liveProvider` wired only on private deploy
- [ ] Server-side RBAC on every mutation and export
- [ ] Fake seed data tested before real data

## Operations

- [ ] Backups configured and restore tested
- [ ] Monitoring / alerts for failed auth
- [ ] Incident response documented
- [ ] Committee sign-off recorded

## Public demo verification (always)

- [ ] Public URL still uses `demoProvider`
- [ ] No login required on public demo
- [ ] `npm run build` succeeds without Supabase env vars
- [ ] DEMO_QA_CHECKLIST.md passes on public URL

## UI

`/settings/private-deployment`

## Related

- [LIVE_PROVIDER_IMPLEMENTATION_PLAN.md](./LIVE_PROVIDER_IMPLEMENTATION_PLAN.md)
- [AUTH_IMPLEMENTATION_PLAN.md](./AUTH_IMPLEMENTATION_PLAN.md)
