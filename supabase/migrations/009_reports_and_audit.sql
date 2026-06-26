-- Draft only — review before applying to a real Supabase project.
-- ClubOps v1.4.0 — reports and audit (append-only audit_events)

CREATE TABLE IF NOT EXISTS report_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  export_type TEXT NOT NULL,
  requested_by UUID REFERENCES profiles(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  storage_bucket TEXT,
  storage_path TEXT,
  sensitivity TEXT NOT NULL DEFAULT 'internal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Append-only audit log — no UPDATE/DELETE for application roles in live mode
CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  record_type TEXT,
  record_id UUID,
  sensitivity TEXT NOT NULL DEFAULT 'internal',
  summary TEXT,
  payload JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_events_club_created ON audit_events(club_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_events_module ON audit_events(club_id, module, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_report_exports_club ON report_exports(club_id, created_at DESC);

-- Optional: prevent updates/deletes on audit_events (apply in live after review)
-- CREATE RULE audit_events_no_update AS ON UPDATE TO audit_events DO INSTEAD NOTHING;
-- CREATE RULE audit_events_no_delete AS ON DELETE TO audit_events DO INSTEAD NOTHING;
