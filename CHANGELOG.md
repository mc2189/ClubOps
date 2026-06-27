# Changelog

All notable changes to ClubOps are documented here.

## [1.4.5d] — 2026-06-27

### Added

- `AppBrandMark` — compact CSS/vector AGC badge (emerald tile, sparkle, ribbon swoosh) for app shell UI
- `brandAssets` in branding config separating app mark, full logo, glam, and official reference paths

### Changed

- Sidebar and mobile drawer use compact app mark instead of raster logo tile
- Dashboard welcome card simplified: AGC badge + heading only (no full presentation logo)
- Full generated logo retained for `/demo`, `/reports`, export centre, and report pack headers only
- Settings club card uses compact app mark badge
- Report headers include visible club name text for accessibility (logo treated as decorative)

### Safety

- `PROVIDER_MODE` remains `"demo"`; no auth, database, or Supabase on public routes

## [1.4.5c] — 2026-06-27

### Added

- Web-friendly generated logo assets in `public/branding/` (clean icon/full/512, glam icon/full)
- `WebLogo`, `WebLogoFull`, `GlamLogoAccent` components with variant-based paths
- Official detailed PNGs moved to `public/branding/official/` for reference only

### Changed

- Sidebar and mobile drawer use clean icon on white tile (not official detailed logo)
- Dashboard welcome, demo/about hero, and report headers use full clean logo on light backgrounds
- Optional glam icon accent on dashboard and demo hero (decorative, not in nav/tables)
- `logoPaths` in branding config: clean/glam primary, official as fallback reference

### Safety

- `PROVIDER_MODE` remains `"demo"`; no auth, database, or Supabase on public routes

## [1.4.5a] — 2026-06-27

### Changed

- Logo presentation fix: white rounded tile on dark sidebar (no invert/filter)
- Sidebar reads as Arbroath Gymnastics Club + ClubOps demo with readable club name text
- Larger logo tiles: ~104px desktop sidebar, ~88px mobile drawer
- Dashboard, demo, and report headers use black logo on white tile; club name as primary text

## [1.4.5] — 2026-06-27

### Added

- `src/config/branding.ts` — club name, logo paths, colour tokens, tagline
- `ClubLogo`, `BrandMark`, `DashboardWelcomeCard`, `ReportBrandHeader` components
- SVG club logo at `public/branding/arbroath-logo.svg` (PNG can replace via same path)
- Branded welcome card on dashboard; strong branding on About demo page
- Report/export pack brand headers (Export Centre, Finance, Committee, Gift Aid, Member packs)

### Changed

- Public demo branded as **Arbroath Gymnastics Club** (was Riverside Gymnastics Club in user-facing copy)
- Theme palette: emerald green primary, charcoal text, soft green accents, subtle pink/lilac shimmer
- Sidebar, mobile nav, sub-nav pills, role switcher and shell use brand colours
- Communication templates and Gift Aid declaration preview use Arbroath club name
- Page metadata title references Arbroath Gymnastics Club demo

### Note

- Branded for demonstration purposes only — all data remains fake; not a live club system

## [1.4.4] — 2026-06-27

### Added

- `RestrictedContentPreview`, `PermissionLockedPanel`, `PermissionSummaryPanel`, `RoleAccessRequired`, `RestrictedExportButton`, `SensitiveDocumentPreview`
- `FinanceRestrictedSection` and `GiftAidRestrictedSection` module wrappers
- `src/lib/rbacCopy.ts` — consistent demo RBAC honesty wording
- `getPermissionPreviewLevel`, `view-summary` permission action, `SUGGESTED_ROLES_BY_MODULE`
- Demo script optional section: “Show permissions honestly”
- RBAC honesty QA checks in `DEMO_QA_CHECKLIST.md`

### Changed

- High-risk areas now show locked or summary-only previews by demo role: medical/welfare, finance, Gift Aid, wage prep, exports, sensitive documents
- Secretary/Admin and Demo Super Admin see full demo; Coach, Treasurer, Welfare Officer and Committee Read-Only see role-appropriate restrictions
- Fundraising Lead no longer has finance module view in permission matrix
- Committee Read-Only gets summary-only preview for Finance and Gift Aid
- Permission preview notices use standard “Demo permission preview only — not real security” wording
- Role switch buttons on locked panels (“Switch to Treasurer”, etc.)

### Security note

- This release improves **demo permission preview honesty** only — not real authentication or server-side RBAC
- Fake data may still exist in the client bundle; do not use real personal or club data in the public demo

## [1.4.3] — 2026-06-27

### Added

- `PageHeaderNav`, `BackButton`, and `PageBreadcrumbs` components with mobile-friendly shortened trails
- `src/lib/breadcrumbs.ts` — `MODULES`, `moduleBreadcrumb`, `moduleBackHref`, and trail helpers
- Breadcrumb navigation and back links on all module page headers (members, attendance, finance, Gift Aid, communications, documents, calendar, staff, fundraising, reports, audit, settings, demo/help)

### Changed

- `PageHeader` accepts optional `breadcrumbs` and `backHref` props
- Back button uses browser history when safe, otherwise falls back to parent route
- Mobile shows last two breadcrumb segments; desktop shows full path

## [1.4.2] — 2026-06-26

### Added

- Responsive mobile/tablet shell with hamburger menu and slide-out navigation drawer
- Mobile bottom navigation (Home, Members, Attendance, Messages, More)
- `MobileShellContext`, `AppShell`, `MobileDrawer`, `MobileBottomNav` layout components
- `ModuleSubNav` — horizontally scrollable sub-navigation on mobile
- `TableScrollWrap` — mobile scroll hint for wide tables
- Settings section dropdown on mobile
- Mobile card layouts for members list (simple view) and staff rota
- Sticky save/mark-all bar on attendance register (mobile/tablet)
- Demo script tablet/phone presentation tips

### Changed

- Desktop sidebar preserved at `lg` breakpoint; hidden on smaller screens
- Top bar: menu button, compact role switcher, truncated page title
- Demo banner shorter text on small screens
- Sub-nav pills and filter chips use ~44px touch targets on mobile
- Page headers scale down slightly on mobile
- Main content padding adjusted for bottom nav clearance

### Not included (by design)

- No new modules, auth, database or Supabase wiring
- `PROVIDER_MODE` remains `"demo"`

## [1.4.1] — 2026-06-26

### Added

- Grouped sidebar navigation (Day to day, Money & compliance, People & files, Committee, Help & demo, Settings)
- Settings sub-nav grouped into Club & volunteers vs Technical / going live with plain-English labels
- Dashboard “Today’s priorities” section (max 3 tasks + show all toggle)
- Plain-English club health labels (Good / Needs attention / Urgent)
- Human-friendly dashboard recent activity copy
- `EmptyState` primary and secondary action support
- Members list Simple / Detailed view toggle
- Skip-to-main-content link
- `SubNavLink` with `aria-current="page"` for module sub-navigation

### Changed

- Demo banner wording — plainer language about reload resetting demo changes; “About demo” link
- Settings overview page aligned with grouped sub-nav; technical planning visually secondary
- RBAC notices clarify permission preview vs public demo visibility
- Demo role switcher disclaimer always visible: “Demo role only — not a real login”
- Demo script and QA checklist RBAC examples (Coach on Finance, Committee Read-Only on Gift Aid, Coach on medical)
- Sidebar club name no longer uses `<h1>` (accessibility)
- Filter chips and view toggles use `aria-pressed` where relevant
- Removed unused `RoleRestrictionPreview` component

### Documentation

- README, PROJECT, FEATURES, ROADMAP, SECURITY, BUILD_NOTES, DEPLOYMENT, DEMO_QA_CHECKLIST updated
- Roadmap notes for v1.4.2 (mobile shell), v1.4.3 (RBAC honesty), v1.5.0 (private live auth scaffold)

### Not included (by design)

- No mobile drawer/sidebar redesign (v1.4.2)
- No hard RBAC content blocking (v1.4.3)
- `PROVIDER_MODE` remains `"demo"`; Supabase scaffold unused on public demo routes

## [1.4.0] — 2026-06-26

### Added

- **v1.4.0 Supabase live foundation prep (preparation only — not live)**
- `@supabase/supabase-js` and `@supabase/ssr` packages (scaffold not wired to demo)
- `.env.example` and `.env.local.example` with placeholder vars only
- `src/lib/supabase/` — config, client, server, middleware scaffold (inactive in public demo)
- `supabase/migrations/` draft SQL 001–011 (schema, RLS, storage)
- `supabase/policies/` and `supabase/storage/` policy drafts
- Settings pages: `/settings/supabase-prep`, `/settings/schema-plan`, `/settings/private-deployment`
- Docs: LIVE_PROVIDER_IMPLEMENTATION_PLAN, SUPABASE_SCHEMA_PLAN, SUPABASE_RLS_PLAN, SUPABASE_STORAGE_PLAN, SUPABASE_LOCAL_DEV, PRIVATE_DEPLOYMENT_CHECKLIST
- Provider safety helpers in `providerMode.ts`; `SupabasePrepSafetyNotice` component

### Changed

- Settings, Security, Live readiness, Recommended stack, Production roadmap link to Supabase prep
- `.gitignore` explicitly allows `.env.example` files
- Provider index comments reference v1.4.0 scaffold
- Architecture and migration docs updated for prep status

### Not included (by design)

- No Supabase project, keys, or live connection
- No root middleware.ts; no login pages
- `PROVIDER_MODE` remains `"demo"`; liveProvider not wired
- Public demo unchanged — fake data only

## [1.3.0] — 2026-06-26

### Added

- **v1.3.0 Auth and live stack decision pack**
- Settings pages: `/settings/auth-decision`, `/settings/live-stack`, `/settings/implementation-options`, `/settings/recommended-stack`
- Stack decision data (`src/data/demo/stackDecisionData.ts`) — options, decision matrix, Supabase plan, safety warnings
- `StackDecisionSafetyNotice` component
- Docs: AUTH_DECISION_PACK.md, LIVE_STACK_OPTIONS.md, RECOMMENDED_LIVE_STACK.md, AUTH_IMPLEMENTATION_PLAN.md
- Vendor evaluations: SUPABASE_EVALUATION.md, CLERK_EVALUATION.md, AUTHJS_EVALUATION.md, FIREBASE_EVALUATION.md
- Provisional recommendation: Supabase Auth + Postgres + RLS + Storage (not implemented)
- Optional demo script step for auth/stack decision
- `PROVISIONAL_LIVE_STACK` constant in providerMode.ts

### Changed

- Settings overview, Security, Live readiness, Production roadmap link to decision pack pages
- Settings sub-nav extended
- liveProvider.stub.ts and providers/index.ts comments reference Supabase provisional stack
- ARCHITECTURE, LIVE_MODE_PLAN, SECURITY_LIVE_REQUIREMENTS, MIGRATION_PLAN, ROADMAP, README, PROJECT, FEATURES, BUILD_NOTES, DEPLOYMENT, DEMO_QA_CHECKLIST updated

### Not included (by design)

- No auth SDK packages (Supabase, Clerk, Auth.js, Firebase)
- No environment variables, secrets, database, or real authentication
- `PROVIDER_MODE` remains `"demo"`; liveProvider not wired
- Demo behaviour unchanged except new settings links and docs

## [1.2.0] — 2026-06-26

### Added

- **v1.2.0 Live-ready data architecture blueprint**
- Settings pages: `/settings/live-readiness`, `/settings/data-architecture`, `/settings/provider-model`, `/settings/production-roadmap`
- Architecture blueprint data (`src/data/demo/architectureData.ts`) — entities, classifications, migration stages, readiness checklist
- `liveProvider.stub.ts` — future live provider placeholder (throws; not wired)
- `src/lib/providerMode.ts` — demo mode flag (`PROVIDER_MODE = "demo"`)
- Technical docs: ARCHITECTURE.md, DATA_MODEL.md, LIVE_MODE_PLAN.md, PROVIDER_CONTRACTS.md, SECURITY_LIVE_REQUIREMENTS.md, MIGRATION_PLAN.md
- Optional demo script step for live-ready architecture walkthrough

### Changed

- Settings overview and Security settings link to architecture blueprint pages
- Demo page links to live readiness and production roadmap
- Settings sub-nav extended with architecture pages
- Provider index comments and documentation references
- README, PROJECT, FEATURES, ROADMAP, SECURITY, BUILD_NOTES, DEPLOYMENT, DEMO_QA_CHECKLIST updated

### Not included (by design)

- No database, auth, Supabase/Firebase/Prisma/Neon, external APIs, or real file storage
- Demo behaviour unchanged except new settings links and docs

## [1.1.0] — 2026-06-26

### Added

- **v1.1.0 Demo role switching and RBAC foundation preview**
- Seven demo roles: Secretary/Admin, Treasurer, Coach, Welfare Officer, Fundraising Lead, Committee Read-Only, Demo Super Admin
- Central permissions model (`src/lib/permissions.ts`) with `can()`, `getModuleLevel()`, restriction messages
- `DemoRoleProvider` and top-bar role switcher (session storage persistence)
- Settings pages: `/settings/roles`, `/settings/permissions`, `/settings/security`
- `/demo-roles` intro page for role switching walkthrough
- Permission preview notices on finance, Gift Aid, medical, exports, communications, wage prep
- RBAC audit events merged into audit activity feed
- Optional demo script step for role switching
- Live-mode security requirements documentation

### Changed

- Settings page redesigned with RBAC links
- Demo page and audit security page link to role/permission pages
- Fundraising sponsorship compose links use `preset=sponsorship-request`

## [1.0.2] — 2026-06-26

### Fixed

- **Communications composer** — removed `useSearchParams` Suspense hang; search params passed from server page
- Compose presets load immediately: Gift Aid, unpaid fees, sponsorship request
- Gift Aid preset still selects group, template, form and shows preview
- Outstanding fee count derived from fee records (`DEMO_OUTSTANDING_FEE_COUNT = 4`) across dashboard, calendar, reports and communications group
- Member finance statuses aligned with fee records (Riley Chen and Avery Singh → overdue)
- Fundraising sponsorship links use `preset=sponsorship-request` for consistent group + template selection

### Changed

- Compose example recipients labelled “demo only”
- Form labels added for accessibility on compose fields
- `FEATURES.md` rewritten — demo-implemented modules marked complete; live-only items separated
- `DEMO_QA_CHECKLIST.md` expanded with final pre-share Vercel checklist and compose preset tests
- Documentation updated for v1.0.2 public demo readiness

## [1.0.1] — 2026-06-26

### Changed

- **v1.0.1 Demo QA & presentation polish** — full route review, link accuracy and UI consistency pass
- Dashboard tasks and quick actions link to precise module pages (import review, fees, qualifications, assignment)
- Club Health scores on dashboard are now clickable links to relevant modules
- Fundraising progress cards link to campaign detail pages; names aligned with fundraising module
- Demo script updated with secondary links (finance review, wage prep) and clearer volunteer-time emphasis
- Report cards without pack pages now link to module summary pages
- Unpaid fee counts aligned across dashboard, calendar and report packs (4 members)
- Jamie Hart compliance copy corrected (safeguarding, not first aid)
- Empty states added to inbox, history, transactions, missing documents and staff alerts
- Finance sub-nav highlights Dashboard consistently; finance pack export link corrected
- Demo banner and `/demo` page clarify session reset and simulated actions
- Shared demo wording in `src/lib/demoCopy.ts`
- Documentation updated; `DEMO_QA_CHECKLIST.md` added for pre-share testing

### Fixed

- Imprecise dashboard task hrefs (finance, documents, staff)
- Dead “Generate demo export” labels on report cards without actions
- Communications “View form replies” renamed to “View inbox”
- Inbox member records link to member profiles where matched

## [1.0.0] — 2026-06-26

### Added

- **v1.0.0 Reports, Audit & Export** — complete demo layer for committee and treasurer workflows
- Reports dashboard with 11 report categories and sensitivity labels
- Export Centre with Full Club Admin Pack (19 sections, simulated export)
- Finance Pack, Committee Pack, Gift Aid Pack and Member Admin Pack pages
- Audit overview, filterable activity feed and security guidance pages
- Cross-module audit log with 15 demo events from all modules
- Reusable Club Health summary with suggested actions and module links
- Demo script page (`/demo-script`) with 10-step presentation guide
- `ReportsAuditDemoProvider` for simulated exports and audit events
- Navigation updates: Reports, Audit Log, Demo Script descriptions

### Changed

- `/reports` and `/audit` redesigned from placeholders to full modules
- Extended audit events with module, risk level, status and linked pages
- Dashboard health metrics now include suggested actions and links
- Demo and Settings pages link to demo script
- Documentation updated for v1.0.0 demo-complete status

## [0.9.0] — 2026-06-26

### Added

- **Fundraising module v0.9.0** — dashboard, campaigns, donors, businesses, sponsorships, donations, follow-ups and reports
- Fundraising dashboard with raised totals, campaign progress, Gift Aid potential and quick actions
- 6 demo campaigns including Equipment Appeal, Competition Travel Fund and Hardship/Access Fund
- Campaign detail pages with linked donations, sponsors and Communications actions
- Donor CRM with types, Gift Aid status, thank-you and follow-up tracking
- Business CRM with pipeline statuses and demo actions (pledge, donation, status changes)
- Sponsorship tiers (Bronze through Competition Sponsor) with Gift Aid guidance
- Donations page with eligibility rules, finance/Gift Aid links and add demo donation
- Follow-ups page with task types and Communications compose links
- Reports page with 7 export placeholders and simulated export audit events
- `FundraisingDemoProvider` for session-only state and audit stubs
- Communications integration presets for sponsorship, thank-you, campaign update and renewal

### Changed

- `/fundraising` redesigned from placeholder table to full fundraising and donor CRM module
- Extended provider with `getFundraisingPageData()` and `getFundraisingCampaign()`

## [0.8.0] — 2026-06-26

### Added

- **Staff & Volunteers module v0.8.0** — dashboard, profiles, rota, qualifications, wages, venues, outgoings and alerts
- Staff dashboard with coaches, volunteers, compliance stats, wage/outgoing totals and quick actions
- Staff profile pages with contact, compliance, sessions, qualifications and linked documents
- Rota page with session assignments, gaps, conflicts and demo assign/confirm actions
- Qualifications & compliance tracking with expiry warnings and document links
- Wage preparation page (not payroll) with session rates and demo export
- Venues page with hall hire, recurring bookings and calendar links
- Outgoings page with hall hire, insurance, wages and demo add/mark paid actions
- Alerts page for qualifications, DBS, rota gaps, invoices and wage prep
- `StaffDemoProvider` for session-only rota, outgoings, alerts and audit stubs
- Security notices for staff RBAC, PVG/DBS, safeguarding and wage prep access

### Changed

- `/staff` redesigned from placeholder table to full operations module
- Extended provider with `getStaffPageData()` and `getStaffProfile()`

## [0.7.0] — 2026-06-26

### Added

- **Documents module v0.7.0** — dashboard, upload simulation, assignment, scanned notes, missing, archive, and rules
- Documents dashboard with totals, unassigned/sensitive/review counts, activity feed and quick actions
- Demo upload flow with fake examples, simulated extraction, category/record suggestions and audit events
- Assignment workflow with confidence scores, sensitivity levels, assign/change category/mark sensitive/archive actions
- Scanned notes digitisation workflow with member matching, note types and restricted content warnings
- Missing documents page linked to Members, Gift Aid, Finance, Staff and Fundraising
- Soft archive with restore — no permanent delete
- Document routing rules page (display only)
- 14 document categories including medical, Gift Aid, finance, coach qualification and safeguarding
- `DocumentsDemoProvider` for session-only uploads, assignments, scanned notes and audit stubs
- Security notices for encryption, virus scanning, RBAC and retention policies

### Changed

- `/documents` redesigned from placeholder table to full document management module
- Extended provider with `getDocumentsPageData()`

## [0.6.0] — 2026-06-26

### Added

- **Communications module v0.6.0** — dashboard, compose, templates, groups, history, forms, inbox, and rules
- Communications dashboard with draft/sent counts, campaign reminders, and quick actions
- Demo message composer with recipient groups, templates, form attachment, preview, draft save and simulated send
- 14 dynamic recipient groups derived from members, finance, Gift Aid, attendance, staff and fundraising demo data
- 10 message templates with placeholder preview (`{{parent_first_name}}`, `{{form_link}}`, etc.)
- 6 digital forms (Gift Aid, medical, emergency contact, consent, event permission, coach availability)
- Simulated inbox with auto-match, confidence scores, and review workflow
- Routing rules page with plain-English automation rules (display only)
- Message history with audit reference placeholders
- Gift Aid integration: "Request missing Gift Aid declarations" quick action and modal link to compose preset
- `CommunicationsDemoProvider` for session-only drafts, sends, inbox updates and audit stubs
- Security notices for bulk messaging RBAC, contact data protection, consent/unsubscribe and medical form access

### Changed

- `/communications` redesigned from placeholder table to full secretary-friendly module
- Gift Aid declaration request modal now links to Communications compose preset
- Extended provider with `getCommunicationsPageData()`

## [0.5.0] — 2026-06-26

### Added

- **Gift Aid module v0.5.0** — dashboard, declarations, eligible donations, review, claim export, and rules
- Gift Aid dashboard with declaration stats, eligible/ineligible income, reclaim estimates, and compliance warnings
- Declarations page with parent/carer records, demo actions (mark valid, returned, flag review, send request)
- Eligible donations page splitting income by eligibility with finance transaction links
- Review workflow for uncertain items (missing declaration, unclear reference, business donation, raffle, etc.)
- Claim export placeholder with checklist and simulated HMRC export (demo only)
- Gift Aid rules page with plain-English eligibility rules and compliance warnings
- Declaration request preview (links to future Communications module)
- `GiftAidDemoProvider` for session-only state and audit event stubs
- 11 demo declarations, 11 donation records, 6 review items linked to finance demo data

### Changed

- `/gift-aid` redesigned from placeholder table to full compliance-focused module
- Extended Gift Aid provider with `getGiftAidPageData()`

## [0.4.0] — 2026-06-26

### Added

- **Finance module v0.4.0** — treasurer dashboard, fee tracking, expenses, transactions, and bank import demo
- Bank import guided flow: CSV example, PDF placeholder, preview, normalise, auto-match, review, approve
- Deterministic transaction matching with confidence scores (surname, amount, reference, due date)
- 12 fake bank transactions with auto-match, suggested, unmatched, donation and expense scenarios
- 8 demo fee records linked to member profiles with paid/unpaid/partial/overdue/waived statuses
- Import review screen with approve match, change category, and approve import actions
- Expenses page with add expense demo form and receipt/payment status
- Finance reports page with 7 export placeholders (accountant pack, audit export, etc.)
- `FinanceDemoProvider` for session-only import state and audit event stubs
- Finance security notices for RBAC, bank data protection, and secure uploads (future live mode)

### Changed

- `/finance` redesigned from placeholder to full treasurer dashboard with quick actions
- Extended finance provider with dashboard, fees, expenses, import preview, and reports methods

## [0.3.0] — 2026-06-26

### Added

- **Attendance module v0.3.0** — dashboard, session selector, mobile-friendly register marking, and reports
- Attendance workflow: select session → mark Present/Absent/Late/Left Early/Trial → save register
- `AttendanceDemoProvider` for session-only register state and audit event stubs
- 6 demo sessions (Monday Beginners through Saturday Recreational)
- Attendance reports: by class, by member, repeated absences, low attendance, incomplete registers
- **Calendar module v0.3.0** — multi-module agenda view with automation hints
- Calendar items from attendance, finance, staff, Gift Aid, fundraising and competitions
- Static suggested actions (competition prep, incomplete register, absence follow-up, etc.)
- Medical flag on register with safeguarding notice (no detailed notes exposed)

### Changed

- `/attendance` redesigned from placeholder table to full dashboard
- `/calendar` redesigned from simple table to agenda + suggested actions view
- Extended `AttendanceRecord` with optional `mark` field
- Expanded calendar demo data with 10+ item types across modules

## [0.2.0] — 2026-06-26

### Added

- **Members module v0.2.0** — full member/gymnast management with linked parent/carer records
- Members list with search, 8 filter chips, and detailed columns (age, class, status, parent, emergency, medical, finance, Gift Aid, attendance)
- Member profile page with 8 tabs: Overview, Parents/Carers, Medical, Attendance, Finance, Documents, Notes, Audit
- Add member, edit member, and archive member demo flows (local React state only)
- `MembersDemoProvider` for demo-only CRUD with audit event stubs
- Extended `MemberProfile` type with parent/carer, emergency contact, medical, finance, and attendance data
- `getMemberProfiles()` and `getMemberProfile(id)` provider methods
- Sensitive data notices and RBAC TODO markers on medical, finance, and audit sections
- 9 demo member profiles with varied statuses, flags, and completeness levels

### Changed

- Members list page replaced placeholder with interactive client component
- Demo member data expanded from 6 to 9 profiles with full detail

## [0.1.0] — 2026-06-26

### Added

- **Dashboard v0.1.0** — volunteer-focused home screen with today's tasks, club health scores, finance/attendance/Gift Aid snapshots, fundraising progress bars, quick actions and recent activity feed
- Dashboard data provider method (`getDashboardData`) with dedicated demo data file
- Reusable dashboard components: TaskCard, HealthScoreCard, ProgressCard, SnapshotCard, RecentActivityList, QuickActionCard
- Demo mode information page at `/demo` explaining fake data, simulated integrations and public demo safety
- Demo banner "Learn more" link to `/demo` page

### Changed

- Dashboard page redesigned from basic stat cards to full secretary-focused overview
- Demo provider stats now derived from dashboard demo data for consistency

## [0.1.0-foundation] — 2026-06-26

### Added

- Initial project foundation with Next.js 15, TypeScript and Tailwind CSS 4
- Dashboard layout with sidebar navigation, top bar and demo mode banner
- Placeholder pages for all 13 modules (Dashboard, Members, Attendance, Finance, Gift Aid, Communications, Documents, Calendar, Staff & Volunteers, Fundraising, Reports, Audit Log, Settings)
- Data provider interface (`ClubOpsDataProvider`) and demo provider implementation
- Fake demo data for all modules (members, attendance, finance, gift aid, communications, documents, calendar, staff, fundraising, reports, audit)
- Shared UI components (Card, StatCard, DataTable, Badge, PageHeader, EmptyState, PlaceholderNotice)
- Documentation: README, PROJECT, FEATURES, ROADMAP, SECURITY, DEPLOYMENT, BUILD_NOTES
- Cursor rules file (`.cursor/rules/clubops.mdc`)
- npm scripts: dev, build, start, lint, typecheck
