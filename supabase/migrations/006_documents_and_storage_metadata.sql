-- Draft only — review before applying to a real Supabase project.
-- ClubOps v1.4.0 — documents and scanned notes (metadata; binaries in Storage)

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  sensitivity TEXT NOT NULL DEFAULT 'internal' CHECK (sensitivity IN ('public', 'internal', 'parent', 'medical', 'finance', 'staff')),
  storage_bucket TEXT,
  storage_path TEXT,
  member_id UUID REFERENCES members(id),
  staff_profile_id UUID,
  uploaded_by UUID REFERENCES profiles(id),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ,
  archived_by UUID REFERENCES profiles(id),
  archive_reason TEXT
);

CREATE TABLE IF NOT EXISTS scanned_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id),
  note_summary TEXT,
  assigned_by UUID REFERENCES profiles(id),
  assigned_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'unassigned',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_documents_club_category ON documents(club_id, category);
CREATE INDEX IF NOT EXISTS idx_scanned_notes_member ON scanned_notes(member_id);
