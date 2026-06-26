/**
 * Supabase live foundation prep — UI data only (v1.4.0).
 * No real Supabase project, keys, or live connections.
 */

export interface PrepCheckItem {
  id: string;
  label: string;
  status: "ready" | "partial" | "not-started" | "not-active";
  notes: string;
}

export interface SchemaMigrationFile {
  file: string;
  title: string;
  tables: string;
}

export interface PrivateDeployStep {
  order: number;
  title: string;
  description: string;
  demoSafe: boolean;
}

export const supabasePrepSafetyBanner =
  "Supabase foundation files exist in the codebase, but the public demo still uses fake data only.";

export const supabasePrepNotActive = [
  "No Supabase project connected",
  "No auth enabled on public demo",
  "No real storage enabled",
  "No real database connected",
  "No live provider active",
  "No real data permitted",
] as const;

export const supabasePrepCompleted: PrepCheckItem[] = [
  { id: "p1", label: "@supabase/supabase-js and @supabase/ssr installed", status: "ready", notes: "Scaffold only — not wired to demo routes." },
  { id: "p2", label: ".env.example with placeholder vars", status: "ready", notes: "No real keys committed." },
  { id: "p3", label: "src/lib/supabase/ client scaffold", status: "ready", notes: "Returns null without env vars." },
  { id: "p4", label: "Draft SQL migrations 001–011", status: "ready", notes: "Not applied to any project." },
  { id: "p5", label: "RLS policy drafts", status: "ready", notes: "Must be tested before real data." },
  { id: "p6", label: "Storage bucket policy drafts", status: "ready", notes: "Private buckets only." },
  { id: "p7", label: "Provider mode stays demo", status: "ready", notes: "PROVIDER_MODE = demo; liveProvider not wired." },
  { id: "p8", label: "No root middleware.ts", status: "ready", notes: "Public demo does not require login." },
];

export const supabasePrepNotYet: PrepCheckItem[] = [
  { id: "n1", label: "Create private Supabase project", status: "not-started", notes: "Live deployment only." },
  { id: "n2", label: "Configure Vercel env vars (private project)", status: "not-started", notes: "Never on public demo Vercel." },
  { id: "n3", label: "Apply migrations to Supabase", status: "not-started", notes: "After security review." },
  { id: "n4", label: "Auth pages and middleware", status: "not-started", notes: "Private live routes only." },
  { id: "n5", label: "liveProvider Supabase implementation", status: "not-started", notes: "Read path Members first." },
  { id: "n6", label: "Real club data", status: "not-started", notes: "Only after full security review." },
];

export const schemaMigrationFiles: SchemaMigrationFile[] = [
  { file: "001_core_auth_and_clubs.sql", title: "Core auth & clubs", tables: "clubs, profiles, club_memberships, roles, role_permissions, user_roles" },
  { file: "002_members_and_contacts.sql", title: "Members & contacts", tables: "members, parent_carers, member_parent_links, emergency_contacts, authorised_pickups" },
  { file: "003_attendance.sql", title: "Attendance", tables: "attendance_sessions, attendance_register_entries" },
  { file: "004_finance_and_gift_aid.sql", title: "Finance & Gift Aid", tables: "finance_transactions, fee_records, expenses, gift_aid_declarations, gift_aid_donations" },
  { file: "005_communications_and_forms.sql", title: "Communications", tables: "communication_templates, communication_messages, digital_forms, form_responses" },
  { file: "006_documents_and_storage_metadata.sql", title: "Documents", tables: "documents, scanned_notes" },
  { file: "007_staff_operations.sql", title: "Staff & operations", tables: "staff_profiles, qualifications, venues, rota_entries, wage_prep_items, outgoings" },
  { file: "008_fundraising.sql", title: "Fundraising", tables: "fundraising_campaigns, donors, business_leads, sponsorships, follow_ups" },
  { file: "009_reports_and_audit.sql", title: "Reports & audit", tables: "report_exports, audit_events" },
  { file: "010_rls_policy_drafts.sql", title: "RLS drafts", tables: "policies/ — tenant, finance, welfare, audit" },
  { file: "011_storage_policy_drafts.sql", title: "Storage drafts", tables: "7 private buckets — see storage/README.md" },
];

export const privateDeploymentSteps: PrivateDeployStep[] = [
  { order: 1, title: "Create private Supabase project", description: "Separate from public demo; dev/staging/live naming documented.", demoSafe: true },
  { order: 2, title: "Create private Vercel project", description: "Do not add Supabase keys to public demo Vercel project.", demoSafe: true },
  { order: 3, title: "Add env vars to private Vercel only", description: "NEXT_PUBLIC_SUPABASE_* and SUPABASE_SERVICE_ROLE_KEY; CLUBOPS_PROVIDER_MODE=live when ready.", demoSafe: true },
  { order: 4, title: "Apply core schema migrations", description: "001–009 in order; fake seed data only for testing.", demoSafe: true },
  { order: 5, title: "Apply and test RLS policies", description: "010 drafts — penetration checklist before real data.", demoSafe: true },
  { order: 6, title: "Create private storage buckets", description: "011 drafts; no public buckets.", demoSafe: true },
  { order: 7, title: "Implement auth pages", description: "Login/logout on private deploy only.", demoSafe: true },
  { order: 8, title: "Wire middleware (private only)", description: "Never protect public demo URL routes.", demoSafe: false },
  { order: 9, title: "liveProvider read-only Members", description: "First live module; audit on reads of sensitive fields.", demoSafe: true },
  { order: 10, title: "Security review sign-off", description: "Committee + technical review before real data.", demoSafe: true },
];

export const liveProviderBuildOrder = [
  "Create private Supabase project",
  "Configure private Vercel environment",
  "Add Supabase env vars only to private deployment",
  "Implement auth pages",
  "Implement server-side auth middleware for private live routes",
  "Apply core schema",
  "Apply RLS policies",
  "Implement profiles/clubs/memberships",
  "Implement persistent audit events",
  "Implement liveProvider read-only Members path",
  "Test with fake seed data only",
  "Add write paths (later)",
  "Real club data only after security review",
] as const;

export const publicDemoSafetyChecks = [
  "App builds without Supabase env vars",
  "PROVIDER_MODE remains demo",
  "dataProvider resolves to demoProvider",
  "No root middleware.ts blocking routes",
  "No login required on public demo",
  "Demo role switcher still works",
  "No .env.local or real keys in git",
] as const;
