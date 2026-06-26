-- Draft only — review and test before applying to a real Supabase project.
-- ClubOps v1.4.0 — Row Level Security policy drafts
--
-- Prerequisites: helper functions for club membership and role checks (create in live iteration)
-- All policies assume auth.uid() is the authenticated user.

-- Example helper (draft — implement and test in live project):
-- CREATE OR REPLACE FUNCTION user_club_ids(uid UUID)
-- RETURNS SETOF UUID AS $$
--   SELECT club_id FROM club_memberships WHERE user_id = uid AND status = 'active';
-- $$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY clubs_member_select ON clubs FOR SELECT
--   USING (id IN (SELECT user_club_ids(auth.uid())));

-- === Tenant isolation (all club-scoped tables) ===
-- Pattern: club_id IN (SELECT club_id FROM club_memberships WHERE user_id = auth.uid() AND status = 'active')

-- === Finance (Treasurer / Admin only) ===
-- finance_transactions, fee_records, expenses, gift_aid_*, wage_prep_items:
-- USING (club_id IN (...) AND user_has_role(auth.uid(), club_id, ARRAY['treasurer', 'admin']))

-- === Gift Aid (Treasurer / Admin only) ===
-- gift_aid_declarations, gift_aid_donations: same as finance

-- === Medical / welfare (Welfare Officer / Admin only) ===
-- members.medical_summary, scanned_notes, documents WHERE sensitivity = 'medical':
-- USING (user_has_role(auth.uid(), club_id, ARRAY['welfare', 'admin']))

-- === Members (Secretary, Coach limited, Welfare limited) ===
-- members SELECT: secretary/admin full; coach: assigned sessions only (future join)
-- parent_carers: secretary, welfare (limited)

-- === Attendance ===
-- attendance_register_entries: coaches for assigned sessions; secretary/admin all

-- === Documents ===
-- documents: sensitivity + category based; medical → welfare/admin; finance → treasurer/admin

-- === Staff ===
-- staff_profiles, qualifications: admin, welfare (DBS); coaches see own record only

-- === Exports ===
-- report_exports INSERT/SELECT: treasurer, admin only; audit every export

-- === Audit ===
-- audit_events SELECT: admin, committee_readonly (summary view future)
-- audit_events INSERT: authenticated app via service role or SECURITY DEFINER function only
-- No UPDATE/DELETE policies for audit_events (append-only)

-- === Service role ===
-- Server-side liveProvider uses service role ONLY in trusted server actions after session validation
-- Never expose service role to client; never bypass RLS without explicit server-side RBAC check
