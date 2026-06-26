# Changelog

All notable changes to ClubOps are documented here.

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
