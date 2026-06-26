# Supabase Storage Plan

**Draft only — v1.4.0. No buckets created.**

## Location

- `supabase/storage/README.md`
- `supabase/migrations/011_storage_policy_drafts.sql`

## Private buckets (draft)

| Bucket | Roles | Sensitivity |
|--------|-------|-------------|
| member-documents | Secretary, Admin | Parent/member |
| medical-welfare-documents | Welfare, Admin | Safeguarding |
| finance-documents | Treasurer, Admin | Financial |
| gift-aid-declarations | Treasurer, Admin | Tax/Gift Aid |
| staff-qualification-evidence | Admin, Welfare | Staff/DBS |
| sponsor-documents | Fundraising, Admin | CRM |
| exports | Treasurer, Admin | Variable |

## Rules

- **All buckets private** — `public: false`
- **No public child/member files**
- **Signed URLs** for download — short expiry
- **Audit** every upload, view, download, delete → `audit_events`
- **Path pattern:** `{club_id}/{category}/{record_id}/{filename}`
- **Virus scan** on upload before accept (Stage 5 migration)

## Metadata

File metadata in `documents` table; binary in Storage only.

## Related

- [SUPABASE_RLS_PLAN.md](./SUPABASE_RLS_PLAN.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
