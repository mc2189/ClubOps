# Storage bucket policy drafts (v1.4.0)

**Draft only — review before creating buckets in a real Supabase project.**

All buckets are **private**. No public child/member files. Downloads via signed URLs with audit logging.

## Buckets

| Bucket | Access roles | Sensitivity | Retention | Audit |
|--------|--------------|-------------|-----------|-------|
| `member-documents` | Secretary, Admin | Parent/member | While member active | Upload, view, download, delete |
| `medical-welfare-documents` | Welfare Officer, Admin | Medical/safeguarding | Safeguarding policy | Every access logged with sensitivity flag |
| `finance-documents` | Treasurer, Admin | Financial | 6+ years typical | All actions logged |
| `gift-aid-declarations` | Treasurer, Admin | Gift Aid/tax | HMRC rules | Claim prep and download logged |
| `staff-qualification-evidence` | Admin, Welfare (DBS) | Staff/volunteer | Compliance period | Qualification access logged |
| `sponsor-documents` | Fundraising Lead, Admin | Internal CRM | Contract period | View/download logged |
| `exports` | Treasurer, Admin (role-gated) | Depends on pack | Export log permanent | Generate and download logged |

## Policy principles

1. **No public buckets** for any club/member content.
2. **Storage policies** mirror RLS role checks — use `auth.uid()` and club membership.
3. **Signed URLs** for download — short expiry; log in `audit_events`.
4. **Upload** via server action only in live mode; virus scan before accept (Stage 5).
5. **Path convention:** `{club_id}/{category}/{record_id}/{filename}` — no guessable public paths.

## Example draft (SQL — apply in Supabase dashboard or migration)

```sql
-- Draft only — not applied
-- INSERT INTO storage.buckets (id, name, public) VALUES ('member-documents', 'member-documents', false);

-- CREATE POLICY member_docs_select ON storage.objects FOR SELECT
--   USING (
--     bucket_id = 'member-documents'
--     AND (storage.foldername(name))[1]::uuid IN (SELECT user_club_ids(auth.uid()))
--     AND user_has_role(auth.uid(), (storage.foldername(name))[1]::uuid, ARRAY['secretary', 'admin'])
--   );
```

See `supabase/migrations/011_storage_policy_drafts.sql` for SQL companion file.
