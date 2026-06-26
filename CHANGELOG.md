# Changelog

All notable changes to ClubOps are documented here.

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
