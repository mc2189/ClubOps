-- Draft only — review before applying to a real Supabase project.
-- ClubOps v1.4.0 — Storage bucket and object policy drafts
-- See supabase/storage/README.md for bucket documentation.

-- All buckets: public = false

-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES
--   ('member-documents', 'member-documents', false, 10485760, ARRAY['application/pdf','image/jpeg','image/png']),
--   ('medical-welfare-documents', 'medical-welfare-documents', false, 10485760, NULL),
--   ('finance-documents', 'finance-documents', false, 10485760, NULL),
--   ('gift-aid-declarations', 'gift-aid-declarations', false, 5242880, NULL),
--   ('staff-qualification-evidence', 'staff-qualification-evidence', false, 10485760, NULL),
--   ('sponsor-documents', 'sponsor-documents', false, 10485760, NULL),
--   ('exports', 'exports', false, 52428800, NULL);

-- Object policies: club_id as first path segment; role checks per bucket (see 010_rls_policy_drafts.sql patterns)
-- Downloads: generate signed URL server-side; insert audit_events row

-- NO public read policy on any bucket containing child/member data
