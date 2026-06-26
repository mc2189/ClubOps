/**
 * Live-ready architecture blueprint data — documentation for UI pages only.
 * Demo mode uses fake data; this describes future live implementation.
 */

export type DataClassificationId =
  | "public-demo"
  | "internal-admin"
  | "parent-contact"
  | "child-member"
  | "medical-welfare"
  | "financial"
  | "gift-aid"
  | "staff-volunteer"
  | "documents-files"
  | "audit-security";

export interface DataClassification {
  id: DataClassificationId;
  name: string;
  examples: string;
  whoShouldAccess: string;
  exportRestrictions: string;
  retentionConcerns: string;
  auditRequirements: string;
}

export interface EntityDefinition {
  name: string;
  purpose: string;
  sensitiveFields: string;
  ownerModule: string;
  relatedEntities: string;
  liveAccessControls: string;
  retention: string;
}

export interface EntityGroup {
  id: string;
  title: string;
  entities: EntityDefinition[];
}

export interface MigrationStage {
  stage: number;
  title: string;
  summary: string;
  deliverables: string[];
  risks: string[];
  dependencies: string[];
}

export interface ProductionRoadmapItem {
  order: number;
  title: string;
  description: string;
  dependsOn: string;
  riskIfSkipped: string;
}

export interface LiveReadinessCheckItem {
  id: string;
  label: string;
  status: "ready" | "partial" | "not-started";
  notes: string;
}

export const demoModeStatus = {
  currentMode: "Demo",
  dataSource: "demoProvider — fake data only",
  authentication: "None (public demo)",
  database: "None",
  fileStorage: "Simulated only",
  auditPersistence: "Session-only (resets on refresh)",
  rbac: "Client-side preview only (v1.1.0)",
};

export const liveReadinessChecklist: LiveReadinessCheckItem[] = [
  { id: "lr-01", label: "Demo mode works with fake data only", status: "ready", notes: "Permanent public demo — do not remove." },
  { id: "lr-02", label: "Shared ClubOpsDataProvider contract", status: "ready", notes: "All pages use provider layer." },
  { id: "lr-03", label: "Type definitions for all modules", status: "ready", notes: "src/data/providers/types.ts" },
  { id: "lr-04", label: "Demo RBAC preview documented", status: "ready", notes: "Not real security — v1.1.0." },
  { id: "lr-05", label: "Real authentication", status: "not-started", notes: "Required before any real data." },
  { id: "lr-06", label: "Server-side authorisation", status: "not-started", notes: "Every API route and export." },
  { id: "lr-07", label: "Relational database with migrations", status: "not-started", notes: "PostgreSQL or similar recommended." },
  { id: "lr-08", label: "Secure object storage for files", status: "not-started", notes: "Private buckets, signed URLs." },
  { id: "lr-09", label: "Persistent append-only audit log", status: "not-started", notes: "Tamper-resistant, retained." },
  { id: "lr-10", label: "Tenant/club isolation", status: "not-started", notes: "Multi-club if needed later." },
  { id: "lr-11", label: "Backups and recovery tested", status: "not-started", notes: "Before go-live." },
  { id: "lr-12", label: "Data retention and deletion policy", status: "not-started", notes: "GDPR / safeguarding aligned." },
  { id: "lr-13", label: "Public demo never contains real data", status: "ready", notes: "Policy — always use demoProvider on public URL." },
];

export const dataClassifications: DataClassification[] = [
  {
    id: "public-demo",
    name: "Public / demo",
    examples: "Fake member names, demo bank amounts, sample documents",
    whoShouldAccess: "Anyone viewing the public demo URL",
    exportRestrictions: "Demo exports generate no real files",
    retentionConcerns: "Reset on session refresh — no retention",
    auditRequirements: "Simulated events only",
  },
  {
    id: "internal-admin",
    name: "Internal club admin",
    examples: "Club settings, class lists, non-sensitive reports",
    whoShouldAccess: "Secretary, admin volunteers",
    exportRestrictions: "Role-gated exports with audit log",
    retentionConcerns: "While club is active; archive on member leave",
    auditRequirements: "View and export logged",
  },
  {
    id: "parent-contact",
    name: "Parent / member contact",
    examples: "Parent email, phone, address, emergency contacts",
    whoShouldAccess: "Secretary, welfare (limited), coaches (session contact only)",
    exportRestrictions: "No bulk export for non-admin roles",
    retentionConcerns: "GDPR — delete when no longer needed",
    auditRequirements: "Access and export logged",
  },
  {
    id: "child-member",
    name: "Child / member data",
    examples: "DOB, class group, attendance, membership status",
    whoShouldAccess: "Secretary, coaches (assigned sessions), welfare (as needed)",
    exportRestrictions: "Restricted exports; no public sharing",
    retentionConcerns: "Retention policy when member leaves club",
    auditRequirements: "Profile views and edits logged",
  },
  {
    id: "medical-welfare",
    name: "Medical / welfare / safeguarding",
    examples: "Allergy plans, medical notes, safeguarding records, injury notes",
    whoShouldAccess: "Welfare officer, authorised admin only",
    exportRestrictions: "Highly restricted; summary only for most roles",
    retentionConcerns: "Longer retention may apply — legal advice required",
    auditRequirements: "Every view, edit and export logged with sensitivity flag",
  },
  {
    id: "financial",
    name: "Financial data",
    examples: "Bank transactions, fees, expenses, wage prep",
    whoShouldAccess: "Treasurer, authorised admin",
    exportRestrictions: "Treasurer/admin only; accountant packs audited",
    retentionConcerns: "Typically 6+ years for accounts — accountant guidance",
    auditRequirements: "All finance actions and exports logged",
  },
  {
    id: "gift-aid",
    name: "Gift Aid / tax-related",
    examples: "Declarations, eligible donations, HMRC claim data",
    whoShouldAccess: "Treasurer, authorised admin",
    exportRestrictions: "Claim exports treasurer-only",
    retentionConcerns: "HMRC record-keeping requirements",
    auditRequirements: "Claim preparation and exports logged",
  },
  {
    id: "staff-volunteer",
    name: "Staff / volunteer data",
    examples: "DBS status, qualifications, rota, contact details",
    whoShouldAccess: "Admin, welfare (DBS), coaches (own record)",
    exportRestrictions: "No public export of DBS details",
    retentionConcerns: "Delete when volunteer leaves; DBS retention rules",
    auditRequirements: "Qualification and DBS access logged",
  },
  {
    id: "documents-files",
    name: "Documents / files",
    examples: "Policies, medical forms, scanned notes, receipts",
    whoShouldAccess: "Role-based per document category",
    exportRestrictions: "Download via signed URL; logged",
    retentionConcerns: "Archive/soft-delete; retention per category",
    auditRequirements: "Upload, view, download, delete logged",
  },
  {
    id: "audit-security",
    name: "Audit / security data",
    examples: "Audit log, login events, role changes, export records",
    whoShouldAccess: "Admin, committee read-only (summary)",
    exportRestrictions: "Admin-only full export",
    retentionConcerns: "Append-only; long retention for compliance",
    auditRequirements: "Meta-audit for audit access itself",
  },
];

export const entityGroups: EntityGroup[] = [
  {
    id: "core",
    title: "Club & access",
    entities: [
      { name: "Club", purpose: "Tenant organisation — name, settings, branding", sensitiveFields: "Billing contact (future)", ownerModule: "Settings", relatedEntities: "User, Role", liveAccessControls: "Admin only", retention: "Active while subscribed" },
      { name: "User", purpose: "Volunteer login identity linked to a club", sensitiveFields: "Email, auth identifiers", ownerModule: "Auth (future)", relatedEntities: "Role, Audit Event", liveAccessControls: "Self + admin", retention: "Delete on account closure" },
      { name: "Role", purpose: "RBAC role assignment per user", sensitiveFields: "Permission grants", ownerModule: "Settings / Auth", relatedEntities: "User, Permission", liveAccessControls: "Admin approval for changes", retention: "Audit trail permanent" },
      { name: "Permission", purpose: "Module/action grants for a role", sensitiveFields: "Sensitive module flags", ownerModule: "Settings", relatedEntities: "Role", liveAccessControls: "Platform + club admin", retention: "Versioned with audit" },
    ],
  },
  {
    id: "members",
    title: "Members & families",
    entities: [
      { name: "Member", purpose: "Junior or adult club member record", sensitiveFields: "DOB, class, status", ownerModule: "Members", relatedEntities: "Parent/Carer, Attendance, Fee", liveAccessControls: "Secretary, coach (limited)", retention: "Policy on leave/archive" },
      { name: "Parent/Carer", purpose: "Primary contact for a member", sensitiveFields: "Email, phone", ownerModule: "Members", relatedEntities: "Member, Communication", liveAccessControls: "Secretary, welfare (limited)", retention: "GDPR deletion requests" },
      { name: "Emergency Contact", purpose: "Emergency contact details", sensitiveFields: "Phone, relationship", ownerModule: "Members", relatedEntities: "Member", liveAccessControls: "Secretary, welfare", retention: "While member active" },
      { name: "Authorised Pickup", purpose: "Who may collect a child", sensitiveFields: "Names, notes", ownerModule: "Members", relatedEntities: "Member", liveAccessControls: "Secretary, coaches (register day)", retention: "While member active" },
      { name: "Medical/Welfare Note", purpose: "Medical flags and safeguarding notes", sensitiveFields: "Full medical notes, allergies", ownerModule: "Members", relatedEntities: "Member, Document", liveAccessControls: "Welfare officer, admin", retention: "Safeguarding policy" },
    ],
  },
  {
    id: "operations",
    title: "Attendance & staff",
    entities: [
      { name: "Attendance Session", purpose: "Scheduled training session or class", sensitiveFields: "None typically", ownerModule: "Attendance", relatedEntities: "Register, Staff", liveAccessControls: "Coaches, secretary", retention: "Historical reports" },
      { name: "Attendance Register", purpose: "Present/absent marks for a session", sensitiveFields: "Member attendance patterns", ownerModule: "Attendance", relatedEntities: "Member, Session", liveAccessControls: "Assigned coaches", retention: "Season + archive" },
      { name: "Staff/Volunteer", purpose: "Coach or volunteer record", sensitiveFields: "Contact, DBS ref", ownerModule: "Staff", relatedEntities: "Qualification, Rota", liveAccessControls: "Admin, welfare (DBS)", retention: "On volunteer exit" },
      { name: "Qualification", purpose: "Coaching cert, DBS, safeguarding training", sensitiveFields: "Expiry, certificate refs", ownerModule: "Staff", relatedEntities: "Staff, Document", liveAccessControls: "Admin, welfare", retention: "Compliance period" },
      { name: "Rota Entry", purpose: "Staff assigned to a session", sensitiveFields: "None", ownerModule: "Staff", relatedEntities: "Staff, Session", liveAccessControls: "Admin, coaches", retention: "Operational" },
      { name: "Wage Prep Item", purpose: "Session payment due to coach — not payroll", sensitiveFields: "Amounts", ownerModule: "Staff", relatedEntities: "Staff, Finance", liveAccessControls: "Treasurer, admin", retention: "Finance retention" },
      { name: "Venue", purpose: "Hall or training location", sensitiveFields: "Hire costs linked", ownerModule: "Staff", relatedEntities: "Outgoing, Calendar", liveAccessControls: "Admin, treasurer", retention: "While active" },
      { name: "Outgoing", purpose: "Hall hire, insurance, operational costs", sensitiveFields: "Amounts, payees", ownerModule: "Staff / Finance", relatedEntities: "Finance, Document", liveAccessControls: "Treasurer", retention: "Finance retention" },
    ],
  },
  {
    id: "finance",
    title: "Finance & Gift Aid",
    entities: [
      { name: "Finance Transaction", purpose: "Income or expense ledger entry", sensitiveFields: "Amounts, bank refs", ownerModule: "Finance", relatedEntities: "Member, Donation", liveAccessControls: "Treasurer", retention: "6+ years typical" },
      { name: "Fee Record", purpose: "Member membership fee status", sensitiveFields: "Outstanding amounts", ownerModule: "Finance", relatedEntities: "Member", liveAccessControls: "Treasurer, secretary (summary)", retention: "While member active" },
      { name: "Expense", purpose: "Club outgoing with receipt status", sensitiveFields: "Amounts, receipts", ownerModule: "Finance", relatedEntities: "Document", liveAccessControls: "Treasurer", retention: "Accounts retention" },
      { name: "Gift Aid Declaration", purpose: "Parent HMRC declaration on file", sensitiveFields: "Taxpayer details", ownerModule: "Gift Aid", relatedEntities: "Member, Donation", liveAccessControls: "Treasurer", retention: "HMRC rules" },
      { name: "Gift Aid Donation", purpose: "Eligible donation linked to declaration", sensitiveFields: "Amounts", ownerModule: "Gift Aid", relatedEntities: "Finance, Declaration", liveAccessControls: "Treasurer", retention: "HMRC rules" },
    ],
  },
  {
    id: "comms-docs",
    title: "Communications & documents",
    entities: [
      { name: "Communication Message", purpose: "Email/notice sent or drafted", sensitiveFields: "Recipient groups", ownerModule: "Communications", relatedEntities: "Template, Member", liveAccessControls: "Secretary (send)", retention: "Comms history policy" },
      { name: "Communication Template", purpose: "Reusable message template", sensitiveFields: "None", ownerModule: "Communications", relatedEntities: "Message", liveAccessControls: "Secretary, admin", retention: "While active" },
      { name: "Digital Form", purpose: "Form attached to communications", sensitiveFields: "Form fields", ownerModule: "Communications", relatedEntities: "Form Response", liveAccessControls: "Secretary", retention: "Per form purpose" },
      { name: "Form Response", purpose: "Incoming parent/form reply", sensitiveFields: "Matched member data", ownerModule: "Communications", relatedEntities: "Member, Inbox", liveAccessControls: "Secretary, welfare", retention: "While relevant" },
      { name: "Document", purpose: "Club file metadata", sensitiveFields: "Category, sensitivity", ownerModule: "Documents", relatedEntities: "Member, Staff", liveAccessControls: "Role per category", retention: "Archive policy" },
      { name: "Scanned Note", purpose: "Digitised paper note linked to member", sensitiveFields: "Note content", ownerModule: "Documents", relatedEntities: "Member, Document", liveAccessControls: "Welfare, admin", retention: "Safeguarding policy" },
    ],
  },
  {
    id: "fundraising-reports",
    title: "Fundraising, reports & audit",
    entities: [
      { name: "Fundraising Campaign", purpose: "Fundraising target and progress", sensitiveFields: "None", ownerModule: "Fundraising", relatedEntities: "Donor, Donation", liveAccessControls: "Fundraising lead, admin", retention: "Campaign end + archive" },
      { name: "Donor", purpose: "Individual donor CRM record", sensitiveFields: "Contact details", ownerModule: "Fundraising", relatedEntities: "Donation", liveAccessControls: "Fundraising lead", retention: "CRM policy" },
      { name: "Business Lead", purpose: "Local business sponsor pipeline", sensitiveFields: "Contact details", ownerModule: "Fundraising", relatedEntities: "Sponsorship", liveAccessControls: "Fundraising lead", retention: "CRM policy" },
      { name: "Sponsorship", purpose: "Sponsor tier and benefits", sensitiveFields: "Contract refs", ownerModule: "Fundraising", relatedEntities: "Business Lead", liveAccessControls: "Fundraising lead, treasurer", retention: "Contract period" },
      { name: "Follow-Up", purpose: "Fundraising task/chase item", sensitiveFields: "None", ownerModule: "Fundraising", relatedEntities: "Donor, Business", liveAccessControls: "Fundraising lead", retention: "Until complete" },
      { name: "Report Export", purpose: "Generated pack or CSV/PDF export", sensitiveFields: "Depends on pack", ownerModule: "Reports", relatedEntities: "Audit Event", liveAccessControls: "Role-gated", retention: "Export log permanent" },
      { name: "Audit Event", purpose: "Who did what, when, on which record", sensitiveFields: "Action details", ownerModule: "Audit", relatedEntities: "All modules", liveAccessControls: "Admin, committee read-only", retention: "Append-only, long retention" },
    ],
  },
];

export const providerModelExplanation = {
  demoProvider: {
    name: "demoProvider",
    status: "Active — public demo",
    description: "Reads fake data from src/data/demo/*. Never connects to a database or external API.",
    usedBy: "All pages via dataProvider export in src/data/providers/index.ts",
    permanent: true,
  },
  liveProvider: {
    name: "liveProvider",
    status: "Not implemented — placeholder only",
    description: "Future implementation will use secure database, server-side RBAC, and authenticated sessions. See liveProvider.stub.ts.",
    usedBy: "Will replace demoProvider only in private live deployments — public demo keeps demoProvider.",
    permanent: false,
  },
  contract: {
    name: "ClubOpsDataProvider",
    description: "Shared TypeScript interface in types.ts. UI components must only call provider methods — never import demo data files directly.",
    methods: "getMembers, getFinanceDashboard, getReportsAuditPageData, etc.",
  },
};

export const migrationStages: MigrationStage[] = [
  {
    stage: 1,
    title: "Current state — public demo",
    summary: "Fake data, session-only changes, client-side RBAC preview.",
    deliverables: ["demoProvider", "Public Vercel demo", "Demo script and QA checklist"],
    risks: ["Accidentally loading real data into demo"],
    dependencies: [],
  },
  {
    stage: 2,
    title: "Live foundation",
    summary: "Real auth, server-side route protection, database, real RBAC enforcement.",
    deliverables: ["Auth provider", "liveProvider skeleton", "Server actions/API with auth checks", "Environment separation (demo vs live)"],
    risks: ["Client-only RBAC mistaken for security"],
    dependencies: ["Stage 1 contract stable"],
  },
  {
    stage: 3,
    title: "Core live records",
    summary: "Members, parents, attendance, staff, document metadata in database.",
    deliverables: ["CRUD for members/attendance/staff", "Migrations", "Seed data for training only"],
    risks: ["Schema changes without migrations"],
    dependencies: ["Stage 2"],
  },
  {
    stage: 4,
    title: "Sensitive modules",
    summary: "Medical/welfare, documents, finance, Gift Aid, persistent audit.",
    deliverables: ["Secure file storage", "Append-only audit", "Sensitive field encryption if required", "Export controls"],
    risks: ["Safeguarding data exposure", "Finance data breach"],
    dependencies: ["Stage 3", "RBAC enforced server-side"],
  },
  {
    stage: 5,
    title: "Integrations",
    summary: "Email delivery, bank import (if used), exports, optional payments.",
    deliverables: ["Email provider", "File virus scan", "Export pipeline", "Webhook security"],
    risks: ["Third-party data leakage"],
    dependencies: ["Stage 4"],
  },
  {
    stage: 6,
    title: "Production hardening",
    summary: "Backups, monitoring, incident response, retention, committee controls.",
    deliverables: ["Backup/restore tested", "Monitoring/alerts", "DPA and retention docs", "Go-live checklist"],
    risks: ["No recovery plan", "Non-compliance with GDPR/safeguarding"],
    dependencies: ["Stage 5"],
  },
];

export const productionRoadmap: ProductionRoadmapItem[] = [
  { order: 1, title: "Freeze provider contract", description: "Ensure ClubOpsDataProvider covers all modules; document in PROVIDER_CONTRACTS.md.", dependsOn: "v1.2.0 blueprint", riskIfSkipped: "UI rewrites when live data shape differs" },
  { order: 2, title: "Choose auth strategy", description: "Email/password, magic link, or club SSO — document decision.", dependsOn: "Security review", riskIfSkipped: "Wrong auth model for volunteers" },
  { order: 3, title: "Database schema v1", description: "Design tables from DATA_MODEL.md; add migrations tooling.", dependsOn: "Provider contract", riskIfSkipped: "Ad-hoc schema drift" },
  { order: 4, title: "Server-side RBAC middleware", description: "Replace client preview with enforced checks on every server action.", dependsOn: "Auth + schema", riskIfSkipped: "Permission bypass" },
  { order: 5, title: "liveProvider — read path", description: "Implement read methods against database for one module (e.g. members).", dependsOn: "Schema + RBAC", riskIfSkipped: "Big-bang integration" },
  { order: 6, title: "liveProvider — write path + audit", description: "Mutations with append-only audit log.", dependsOn: "Read path", riskIfSkipped: "No accountability" },
  { order: 7, title: "Secure file storage", description: "Private bucket, signed URLs, upload scan.", dependsOn: "RBAC", riskIfSkipped: "Public document leaks" },
  { order: 8, title: "Sensitive modules", description: "Finance, Gift Aid, medical with extra controls.", dependsOn: "Audit + storage", riskIfSkipped: "Compliance failure" },
  { order: 9, title: "Integrations & exports", description: "Email, exports, optional bank import.", dependsOn: "Core live", riskIfSkipped: "Manual workarounds persist" },
  { order: 10, title: "Production hardening", description: "Backups, monitoring, go-live sign-off.", dependsOn: "All above", riskIfSkipped: "Data loss or breach" },
];

export const architectureBlueprintLinks = {
  docs: [
    { href: "/ARCHITECTURE.md", label: "ARCHITECTURE.md", external: false, repo: true },
    { href: "/DATA_MODEL.md", label: "DATA_MODEL.md", external: false, repo: true },
    { href: "/LIVE_MODE_PLAN.md", label: "LIVE_MODE_PLAN.md", external: false, repo: true },
    { href: "/PROVIDER_CONTRACTS.md", label: "PROVIDER_CONTRACTS.md", external: false, repo: true },
    { href: "/SECURITY_LIVE_REQUIREMENTS.md", label: "SECURITY_LIVE_REQUIREMENTS.md", external: false, repo: true },
    { href: "/MIGRATION_PLAN.md", label: "MIGRATION_PLAN.md", external: false, repo: true },
  ],
};
