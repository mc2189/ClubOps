/**
 * Auth & live stack decision pack — UI data only (v1.3.0).
 * No real auth, database or SDKs. Compares options for future live mode.
 */

export type StackOptionId =
  | "supabase"
  | "clerk"
  | "authjs"
  | "firebase"
  | "custom";

export type DecisionCriterionId =
  | "securityFit"
  | "dataModelFit"
  | "rbacFit"
  | "auditFit"
  | "fileStorageFit"
  | "simplicity"
  | "costSuitability"
  | "maintainability"
  | "vercelCompatibility"
  | "smallClubSuitability";

export interface StackSafetyWarning {
  id: string;
  title: string;
  body: string;
}

export interface StackComparisonField {
  label: string;
  value: string;
}

export interface StackOption {
  id: StackOptionId;
  name: string;
  tagline: string;
  badge: "recommended" | "possible-alternative" | "higher-burden" | "not-recommended";
  badgeLabel: string;
  summary: string;
  authenticationFeatures: string;
  rbacApproach: string;
  serverSideAuth: string;
  databaseFit: string;
  fileStorageFit: string;
  auditLoggingFit: string;
  multiClubTenancy: string;
  localDevComplexity: string;
  vercelDeployment: string;
  costProfile: string;
  vendorLockIn: string;
  migrationRisk: string;
  securityMaturity: string;
  youthDataSuitability: string;
  mobileTabletFit: string;
  demoModeSeparation: string;
  whatCouldGoWrong: string;
  recommendedUse: string;
  avoidRationale: string;
}

export interface DecisionMatrixScore {
  stackId: StackOptionId;
  criterionId: DecisionCriterionId;
  score: 1 | 2 | 3 | 4 | 5;
  justification: string;
}

export interface DecisionCriterion {
  id: DecisionCriterionId;
  name: string;
  description: string;
}

export interface SupabasePlanStep {
  order: number;
  title: string;
  description: string;
  notes: string;
}

export interface RecommendedStackItem {
  layer: string;
  choice: string;
  status: "recommended" | "not-implemented";
  rationale: string;
}

export const stackDecisionSafetyWarnings: StackSafetyWarning[] = [
  {
    id: "no-real-data",
    title: "No real data yet",
    body: "ClubOps public demo uses fake data only. Do not enter real member, medical or financial records.",
  },
  {
    id: "no-real-auth",
    title: "No real auth yet",
    body: "This release compares options — it does not implement login, sessions or user accounts.",
  },
  {
    id: "decision-only",
    title: "Decision pack only",
    body: "Scores and recommendations are technical guidance, not legal or security certification.",
  },
  {
    id: "demo-separate",
    title: "Demo remains separate",
    body: "Public Vercel demo keeps demoProvider permanently. Live stack applies only to a future private deployment.",
  },
  {
    id: "private-deploy",
    title: "Live mode needs private deployment",
    body: "Real club data must not share the public demo URL or repository secrets.",
  },
  {
    id: "secrets",
    title: "Secrets must never be committed",
    body: "When implemented, API keys go in Vercel dashboard or local .env.local only — never in git.",
  },
  {
    id: "rls-required",
    title: "RLS / server checks required",
    body: "Database row-level security and server-side authorisation must be verified before any real data.",
  },
  {
    id: "private-files",
    title: "File storage must be private",
    body: "Child/member documents need private buckets with signed URLs — no public file links.",
  },
  {
    id: "audit-persistent",
    title: "Audit must be persistent",
    body: "Live audit is append-only and survives restarts — unlike demo session audit.",
  },
];

export const decisionCriteria: DecisionCriterion[] = [
  { id: "securityFit", name: "Security fit", description: "Auth maturity, encryption, policy enforcement for youth/safeguarding data." },
  { id: "dataModelFit", name: "Data model fit", description: "Relational finance, Gift Aid, reporting and audit relationships." },
  { id: "rbacFit", name: "RBAC fit", description: "Secretary, treasurer, coach, welfare role separation." },
  { id: "auditFit", name: "Audit fit", description: "Append-only audit log, export logging, role change tracking." },
  { id: "fileStorageFit", name: "File storage fit", description: "Private documents, scanned notes, virus scan integration." },
  { id: "simplicity", name: "Simplicity", description: "Fewer moving parts for a volunteer-led small team." },
  { id: "costSuitability", name: "Cost suitability", description: "Affordable at small-club scale (tens to low hundreds of members)." },
  { id: "maintainability", name: "Maintainability", description: "Sustainable by Mike + Cursor without a dedicated DevOps team." },
  { id: "vercelCompatibility", name: "Vercel compatibility", description: "Works cleanly with Next.js on Vercel hosting." },
  { id: "smallClubSuitability", name: "Small-club suitability", description: "Appropriate for volunteer-run sports clubs." },
];

export const stackOptions: StackOption[] = [
  {
    id: "supabase",
    name: "Supabase Auth + Postgres + RLS + Storage",
    tagline: "Integrated auth, relational database, row-level security and private file storage.",
    badge: "recommended",
    badgeLabel: "Recommended",
    summary: "Single platform covering auth, Postgres, RLS policies and private storage — strong fit for ClubOps' relational finance/audit model and low-cost small clubs.",
    authenticationFeatures: "Email/password, magic link, OAuth providers; JWT sessions; server-side validation via service role or user JWT.",
    rbacApproach: "App roles in Postgres (roles, user_roles) + RLS policies per table using auth.uid() and club_id. Complements ClubOps permission matrix.",
    serverSideAuth: "Next.js server actions/API routes verify Supabase session; never trust client demo role switcher.",
    databaseFit: "Excellent — Postgres matches members, fees, Gift Aid, audit_events, relational exports.",
    fileStorageFit: "Built-in private buckets with storage policies mirroring RLS.",
    auditLoggingFit: "Append-only audit_events table; triggers or app layer; export events logged.",
    multiClubTenancy: "club_id on all tables + RLS — one Supabase project per live deployment or multi-club with strict policies.",
    localDevComplexity: "Moderate — Supabase CLI for local stack optional; can use hosted dev project.",
    vercelDeployment: "Well documented — @supabase/ssr with Next.js App Router (add in future iteration only).",
    costProfile: "Generous free tier; predictable Pro pricing for small clubs.",
    vendorLockIn: "Moderate — Postgres is portable; auth/storage APIs are Supabase-specific.",
    migrationRisk: "Low if schema follows DATA_MODEL.md; demo stays on demoProvider.",
    securityMaturity: "Strong when RLS policies reviewed; requires live security review before real data.",
    youthDataSuitability: "Good with strict RLS, welfare-only medical access, audit on sensitive reads.",
    mobileTabletFit: "Supabase client works on web/tablet; same API for future native apps.",
    demoModeSeparation: "Public demo: no Supabase keys. Live: separate Vercel project + Supabase project + liveProvider.",
    whatCouldGoWrong: "Misconfigured RLS exposes rows; service role key leaked in client bundle; demo and live keys mixed.",
    recommendedUse: "Default recommendation for ClubOps live mode — one stack, relational data, RLS, private storage.",
    avoidRationale: "N/A — preferred path unless committee chooses otherwise after review.",
  },
  {
    id: "clerk",
    name: "Clerk + separate database/storage",
    tagline: "Polished auth and user management; ClubOps data lives elsewhere.",
    badge: "possible-alternative",
    badgeLabel: "Possible alternative",
    summary: "Fast, polished sign-in UX and org management, but you still build Postgres (or other DB), RBAC, audit and file storage separately.",
    authenticationFeatures: "Excellent UI components, MFA, social login, session management, organization roles.",
    rbacApproach: "Clerk org roles for coarse access; ClubOps module RBAC still custom in your database.",
    serverSideAuth: "Clerk middleware on Next.js routes; verify session server-side.",
    databaseFit: "Good if you add Neon/Supabase Postgres/RDS separately — Clerk does not store club records.",
    fileStorageFit: "Requires S3, Supabase Storage, or UploadThing — separate integration.",
    auditLoggingFit: "Custom audit table in your DB; Clerk webhooks for auth events only.",
    multiClubTenancy: "Clerk Organizations map to clubs; data isolation still your DB responsibility.",
    localDevComplexity: "Low for auth; medium overall with second service for data.",
    vercelDeployment: "Excellent Clerk + Vercel integration.",
    costProfile: "Free tier limited; MAU-based pricing can grow with parent accounts.",
    vendorLockIn: "Higher for auth UX; club data portable if in standard Postgres.",
    migrationRisk: "Medium — two vendors to coordinate; demo unchanged.",
    securityMaturity: "Strong auth product; overall security depends on your DB layer.",
    youthDataSuitability: "Acceptable if DB layer enforces welfare/finance separation.",
    mobileTabletFit: "Clerk supports web/mobile SDKs.",
    demoModeSeparation: "No Clerk on public demo; live deployment adds Clerk env vars only there.",
    whatCouldGoWrong: "Auth solved but RBAC/audit forgotten; cost surprise at scale; split-brain between Clerk roles and DB permissions.",
    recommendedUse: "When polished auth UX and MFA are top priority and team accepts managing DB + storage separately.",
    avoidRationale: "Skip if you want one integrated stack and minimal cost for small clubs.",
  },
  {
    id: "authjs",
    name: "Auth.js / NextAuth + separate database/storage",
    tagline: "Flexible open-source auth — more engineering decisions required.",
    badge: "higher-burden",
    badgeLabel: "Higher implementation burden",
    summary: "Maximum flexibility and no auth vendor fee, but you own sessions, user tables, RBAC, audit, storage and security patches.",
    authenticationFeatures: "OAuth, credentials, email providers via adapters; session strategy (JWT or database).",
    rbacApproach: "Fully custom — roles in Postgres linked to Auth.js user id.",
    serverSideAuth: "getServerSession in server components/actions; must harden every route.",
    databaseFit: "Any SQL DB via adapter — Postgres recommended for ClubOps.",
    fileStorageFit: "Separate S3-compatible or Supabase Storage.",
    auditLoggingFit: "Fully custom audit_events table and middleware.",
    multiClubTenancy: "Custom club_id + middleware checks.",
    localDevComplexity: "Higher — configure providers, adapters, session security yourself.",
    vercelDeployment: "Supported; watch serverless session edge cases.",
    costProfile: "No auth license; pay for DB/hosting only.",
    vendorLockIn: "Low for auth; standard Postgres.",
    migrationRisk: "Medium-high — easy to under-implement security.",
    securityMaturity: "Depends entirely on implementer — high risk for small teams.",
    youthDataSuitability: "Acceptable only with rigorous review and experienced implementer.",
    mobileTabletFit: "Web-first; mobile apps need separate token strategy.",
    demoModeSeparation: "No Auth.js on public demo.",
    whatCouldGoWrong: "Session bugs, missing CSRF protection, incomplete RBAC, delayed security updates.",
    recommendedUse: "When you need full control, have strong Next.js/auth experience, and want to avoid auth SaaS fees.",
    avoidRationale: "Not ideal for volunteer-club project with sensitive child data unless team has security expertise.",
  },
  {
    id: "firebase",
    name: "Firebase Auth + Firestore/Storage",
    tagline: "Google-managed auth and NoSQL — less natural for finance and audit reporting.",
    badge: "possible-alternative",
    badgeLabel: "Possible alternative",
    summary: "Fast to prototype real-time apps, but Firestore is a poor fit for relational finance, Gift Aid joins and committee export packs.",
    authenticationFeatures: "Email, social, phone auth; Firebase Admin SDK on server.",
    rbacApproach: "Firestore security rules + custom claims — complex for fine-grained module RBAC.",
    serverSideAuth: "Verify ID tokens in Cloud Functions or Next.js API routes.",
    databaseFit: "Weak for ClubOps — finance/audit/Gift Aid need relational queries and transactions.",
    fileStorageFit: "Firebase Storage with security rules — workable for documents.",
    auditLoggingFit: "Custom collection; harder to guarantee append-only tamper resistance.",
    multiClubTenancy: "Collection prefixes or separate projects per club.",
    localDevComplexity: "Emulators available; different mental model from SQL.",
    vercelDeployment: "Works but Google-centric; less idiomatic on Vercel than Supabase.",
    costProfile: "Spark free tier; can spike with reads/writes on reports.",
    vendorLockIn: "High — Firestore data model hard to migrate to SQL later.",
    migrationRisk: "High if finance/audit built in Firestore then needs SQL reporting.",
    securityMaturity: "Mature Google infra; rules complexity is the risk.",
    youthDataSuitability: "Possible with strict rules; harder to audit and export than SQL.",
    mobileTabletFit: "Excellent Firebase mobile SDKs.",
    demoModeSeparation: "No Firebase on public demo.",
    whatCouldGoWrong: "Report queries expensive; relational logic in app code; vendor lock-in.",
    recommendedUse: "If ClubOps pivoted to mobile-first real-time with simpler data — not current product shape.",
    avoidRationale: "Prefer Postgres for finance-heavy, audit-heavy club admin software.",
  },
  {
    id: "custom",
    name: "Custom auth (roll your own)",
    tagline: "Build passwords, sessions and MFA yourself — high risk.",
    badge: "not-recommended",
    badgeLabel: "Not recommended",
    summary: "Only consider if regulatory or integration constraints block all managed auth. High security and maintenance burden.",
    authenticationFeatures: "You implement everything — password hashing, reset flows, MFA, breach response.",
    rbacApproach: "Fully custom.",
    serverSideAuth: "Fully custom.",
    databaseFit: "Your choice — Postgres still recommended.",
    fileStorageFit: "Your choice.",
    auditLoggingFit: "Your choice.",
    multiClubTenancy: "Your choice.",
    localDevComplexity: "Very high.",
    vercelDeployment: "Possible but you own all security patches.",
    costProfile: "No SaaS auth fees; high hidden cost in engineering and incidents.",
    vendorLockIn: "Low vendor lock-in; high maintenance lock-in.",
    migrationRisk: "Extreme — security vulnerabilities likely.",
    securityMaturity: "Typically low unless dedicated security team.",
    youthDataSuitability: "Poor — safeguarding data needs proven auth.",
    mobileTabletFit: "Custom token work for any client.",
    demoModeSeparation: "Never on public demo.",
    whatCouldGoWrong: "Credential leaks, weak sessions, no MFA, failed audits, volunteer burnout.",
    recommendedUse: "Almost never for ClubOps.",
    avoidRationale: "Building secure authentication is high-risk; use managed auth (Supabase, Clerk, Auth.js, Firebase).",
  },
];

export const decisionMatrix: DecisionMatrixScore[] = [
  // Supabase
  { stackId: "supabase", criterionId: "securityFit", score: 4, justification: "RLS + managed auth strong; policy mistakes are the main risk — needs live review." },
  { stackId: "supabase", criterionId: "dataModelFit", score: 5, justification: "Postgres matches finance, Gift Aid, joins and committee exports." },
  { stackId: "supabase", criterionId: "rbacFit", score: 4, justification: "RLS + role tables align with ClubOps permission matrix; not turnkey org RBAC." },
  { stackId: "supabase", criterionId: "auditFit", score: 4, justification: "Append-only audit_events table is straightforward; not a built-in product feature." },
  { stackId: "supabase", criterionId: "fileStorageFit", score: 5, justification: "Private buckets with storage policies integrated with auth." },
  { stackId: "supabase", criterionId: "simplicity", score: 4, justification: "One vendor for auth+DB+files; RLS learning curve." },
  { stackId: "supabase", criterionId: "costSuitability", score: 5, justification: "Free tier suits small volunteer clubs; predictable upgrade path." },
  { stackId: "supabase", criterionId: "maintainability", score: 4, justification: "Single dashboard; Mike + Cursor can manage with documented policies." },
  { stackId: "supabase", criterionId: "vercelCompatibility", score: 5, justification: "Official Next.js + Supabase SSR patterns." },
  { stackId: "supabase", criterionId: "smallClubSuitability", score: 5, justification: "Low cost, managed ops, no DBA required for small scale." },
  // Clerk
  { stackId: "clerk", criterionId: "securityFit", score: 5, justification: "Excellent auth product; overall system still depends on your DB security." },
  { stackId: "clerk", criterionId: "dataModelFit", score: 4, justification: "Good with separate Postgres; extra integration work." },
  { stackId: "clerk", criterionId: "rbacFit", score: 3, justification: "Org roles help; module-level RBAC still custom in DB." },
  { stackId: "clerk", criterionId: "auditFit", score: 3, justification: "Auth events via webhooks; club audit is custom." },
  { stackId: "clerk", criterionId: "fileStorageFit", score: 3, justification: "Requires third-party storage." },
  { stackId: "clerk", criterionId: "simplicity", score: 3, justification: "Two+ services to operate." },
  { stackId: "clerk", criterionId: "costSuitability", score: 3, justification: "MAU pricing may exceed Supabase for parent-heavy clubs." },
  { stackId: "clerk", criterionId: "maintainability", score: 4, justification: "Great DX for auth; more moving parts overall." },
  { stackId: "clerk", criterionId: "vercelCompatibility", score: 5, justification: "First-class Vercel integration." },
  { stackId: "clerk", criterionId: "smallClubSuitability", score: 3, justification: "Polished but cost and split stack weigh against small clubs." },
  // Auth.js
  { stackId: "authjs", criterionId: "securityFit", score: 4, justification: "Can be secure if expertly implemented — easy to get wrong." },
  { stackId: "authjs", criterionId: "dataModelFit", score: 4, justification: "Works with Postgres adapter." },
  { stackId: "authjs", criterionId: "rbacFit", score: 3, justification: "All RBAC is custom engineering." },
  { stackId: "authjs", criterionId: "auditFit", score: 3, justification: "Fully custom audit pipeline." },
  { stackId: "authjs", criterionId: "fileStorageFit", score: 3, justification: "Separate storage service required." },
  { stackId: "authjs", criterionId: "simplicity", score: 2, justification: "Many decisions: adapters, sessions, CSRF, rotation." },
  { stackId: "authjs", criterionId: "costSuitability", score: 4, justification: "No auth SaaS fee; engineering time is the cost." },
  { stackId: "authjs", criterionId: "maintainability", score: 3, justification: "Ongoing security maintenance burden on small team." },
  { stackId: "authjs", criterionId: "vercelCompatibility", score: 4, justification: "Common pattern; edge session caveats." },
  { stackId: "authjs", criterionId: "smallClubSuitability", score: 3, justification: "Better for teams with dedicated auth experience." },
  // Firebase
  { stackId: "firebase", criterionId: "securityFit", score: 4, justification: "Mature Google auth; Firestore rules are error-prone at fine granularity." },
  { stackId: "firebase", criterionId: "dataModelFit", score: 2, justification: "NoSQL poor fit for finance, Gift Aid and relational audit." },
  { stackId: "firebase", criterionId: "rbacFit", score: 3, justification: "Custom claims + rules — hard to mirror ClubOps matrix." },
  { stackId: "firebase", criterionId: "auditFit", score: 3, justification: "Possible but non-relational; export/report friction." },
  { stackId: "firebase", criterionId: "fileStorageFit", score: 4, justification: "Storage is solid; rules must match welfare sensitivity." },
  { stackId: "firebase", criterionId: "simplicity", score: 3, justification: "Simple for CRUD apps; complex for ClubOps reporting model." },
  { stackId: "firebase", criterionId: "costSuitability", score: 4, justification: "Free tier generous; report read costs can surprise." },
  { stackId: "firebase", criterionId: "maintainability", score: 3, justification: "Different paradigm from rest of Next/SQL ecosystem." },
  { stackId: "firebase", criterionId: "vercelCompatibility", score: 3, justification: "Works but less native than Supabase on Vercel." },
  { stackId: "firebase", criterionId: "smallClubSuitability", score: 3, justification: "Better for mobile-first simple apps than club finance admin." },
  // Custom
  { stackId: "custom", criterionId: "securityFit", score: 2, justification: "High risk of vulnerabilities without security specialists." },
  { stackId: "custom", criterionId: "dataModelFit", score: 3, justification: "DB choice independent; auth does not help data model." },
  { stackId: "custom", criterionId: "rbacFit", score: 2, justification: "Everything built from scratch." },
  { stackId: "custom", criterionId: "auditFit", score: 2, justification: "Easy to skip or implement incorrectly." },
  { stackId: "custom", criterionId: "fileStorageFit", score: 2, justification: "No integrated solution." },
  { stackId: "custom", criterionId: "simplicity", score: 1, justification: "Maximum complexity and liability." },
  { stackId: "custom", criterionId: "costSuitability", score: 3, justification: "No SaaS fees; engineering and incident cost dominates." },
  { stackId: "custom", criterionId: "maintainability", score: 1, justification: "Unsustainable for volunteer-club software team." },
  { stackId: "custom", criterionId: "vercelCompatibility", score: 3, justification: "Possible but irrelevant — problem is auth security." },
  { stackId: "custom", criterionId: "smallClubSuitability", score: 1, justification: "Inappropriate for sensitive youth club data." },
];

export const recommendedStackItems: RecommendedStackItem[] = [
  { layer: "Hosting", choice: "Vercel (Next.js App Router)", status: "recommended", rationale: "Current demo host; live deployment as separate Vercel project." },
  { layer: "Demo data", choice: "demoProvider (permanent)", status: "recommended", rationale: "Public URL never switches away from fake data." },
  { layer: "Live auth", choice: "Supabase Auth", status: "not-implemented", rationale: "Managed auth with JWT; magic link suits volunteers." },
  { layer: "Live database", choice: "Supabase Postgres", status: "not-implemented", rationale: "Relational model for finance, Gift Aid, audit." },
  { layer: "Access control", choice: "Row Level Security (RLS) + app roles", status: "not-implemented", rationale: "Defence in depth with server-side checks in liveProvider." },
  { layer: "File storage", choice: "Supabase Storage (private buckets)", status: "not-implemented", rationale: "Documents and scanned notes with storage policies." },
  { layer: "Live data layer", choice: "liveProvider → Supabase (private deploy only)", status: "not-implemented", rationale: "Implements ClubOpsDataProvider against Supabase — not wired yet." },
];

export const supabaseImplementationPlan: SupabasePlanStep[] = [
  { order: 1, title: "Create Supabase project (live only)", description: "New project in Supabase dashboard — not linked to public demo.", notes: "Do not add keys to this repo. Configure in Vercel env later." },
  { order: 2, title: "Environment variables (later)", description: "NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (server only).", notes: "Document in DEPLOYMENT.md; never commit values." },
  { order: 3, title: "Auth setup", description: "Enable email magic link; disable open signup or require invite; configure redirect URLs for live Vercel domain.", notes: "No auth on public demo project." },
  { order: 4, title: "profiles table", description: "Link auth.users to display name, club membership, active role.", notes: "FK to auth.users id." },
  { order: 5, title: "clubs table", description: "Tenant record: name, settings JSON, created_at.", notes: "club_id on all club-scoped tables." },
  { order: 6, title: "memberships + roles", description: "user_club_memberships, roles, role_permissions mirroring demo RBAC matrix.", notes: "Admin approval workflow for role changes." },
  { order: 7, title: "RLS policies", description: "Enable RLS on every table; policies use auth.uid() and club_id; welfare/medical tables most restrictive.", notes: "Requires live security review before real data." },
  { order: 8, title: "Storage buckets", description: "Private buckets: documents, scanned-notes, receipts — no public access.", notes: "Signed URLs; virus scan before accept (Stage 5)." },
  { order: 9, title: "audit_events table", description: "Append-only: actor, action, module, record_id, sensitivity, payload summary.", notes: "No UPDATE/DELETE for app role; admin export only." },
  { order: 10, title: "Migrations", description: "Supabase SQL migrations in repo supabase/migrations/ (future); versioned schema from DATA_MODEL.md.", notes: "Seed fake data only in dev — never production member data in seeds." },
  { order: 11, title: "Demo separation", description: "Public Vercel: no Supabase env vars. Live Vercel project: Supabase keys + liveProvider.", notes: "PROVIDER_MODE stays demo on public deployment." },
  { order: 12, title: "Local development", description: "supabase start CLI or hosted dev project; .env.local gitignored.", notes: "Add @supabase/ssr in future implementation iteration only." },
  { order: 13, title: "liveProvider implementation", description: "Replace stub methods with Supabase queries; enforce session on every server path.", notes: "See AUTH_IMPLEMENTATION_PLAN.md." },
];

export const authDecisionClubOpsNeeds = [
  "Child/member records with parent/carer linking",
  "Finance and fee tracking with treasurer-only access",
  "Gift Aid / tax-related declarations and donations",
  "Medical/welfare/safeguarding summaries (strict RBAC)",
  "Staff/volunteer DBS and qualification tracking",
  "Private documents and scanned notes",
  "Persistent append-only audit logging",
  "Module RBAC (secretary, treasurer, coach, welfare, etc.)",
  "Permission-controlled exports and committee packs",
  "Low cost for small volunteer clubs",
  "Maintainable by a small team on Vercel",
  "Demo Mode permanently separate on public URL",
];

export function getMatrixScore(stackId: StackOptionId, criterionId: DecisionCriterionId): DecisionMatrixScore | undefined {
  return decisionMatrix.find((s) => s.stackId === stackId && s.criterionId === criterionId);
}

export function getStackAverageScore(stackId: StackOptionId): number {
  const scores = decisionMatrix.filter((s) => s.stackId === stackId).map((s) => s.score);
  if (scores.length === 0) return 0;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
}

export function getStackOption(id: StackOptionId): StackOption | undefined {
  return stackOptions.find((s) => s.id === id);
}
