# Supabase folder (v1.4.0)

**Draft schema and policies only — not connected to any Supabase project.**

## Contents

| Path | Purpose |
|------|---------|
| `migrations/` | Draft SQL schema files 001–011 (do not run without review) |
| `policies/` | RLS policy drafts |
| `storage/` | Bucket documentation and storage policy drafts |

## Status

- No Supabase project created
- No migrations applied
- No keys in repository
- Public demo uses `demoProvider` only

## Apply order (future private live project)

1. Create Supabase project (live only)
2. Run migrations 001–009 in order
3. Review and apply RLS from `policies/010_rls_policy_drafts.sql`
4. Create private buckets and apply storage policies from `011_storage_policy_drafts.sql`
5. Seed **fake training data only** — never real member data in seeds
6. Security review before any real club data

## Related docs

- `SUPABASE_SCHEMA_PLAN.md`
- `SUPABASE_RLS_PLAN.md`
- `SUPABASE_STORAGE_PLAN.md`
- `SUPABASE_LOCAL_DEV.md`
- `PRIVATE_DEPLOYMENT_CHECKLIST.md`
- `LIVE_PROVIDER_IMPLEMENTATION_PLAN.md`
