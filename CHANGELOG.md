# Changelog

All notable changes to ClubOps are documented here.

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
