# ClubOps — Features

## Foundation (v0.1) — Complete

- [x] Next.js + TypeScript + Tailwind CSS project scaffold
- [x] Dashboard layout with sidebar navigation and top bar
- [x] Demo mode banner ("Demo Mode — fake data only")
- [x] **v0.1.0 Dashboard** — today's tasks, club health scores, finance/attendance/Gift Aid snapshots, fundraising progress, quick actions, recent activity
- [x] **Demo mode page** (`/demo`) explaining fake data and simulated integrations
- [x] Dashboard components: TaskCard, HealthScoreCard, ProgressCard, RecentActivityList, QuickActionCard
- [x] Placeholder pages for all 13 modules
- [x] Data provider interface and demo provider
- [x] Fake demo data for all modules
- [x] Shared UI components (Card, StatCard, DataTable, Badge, etc.)
- [x] Documentation and Cursor rules
- [x] GitHub and Vercel deployment readiness

## Planned features

### Members
- [x] Member list with search and filters
- [x] Member profile with tabs (Overview, Parents/Carers, Medical, Attendance, Finance, Documents, Notes, Audit)
- [x] Add / edit / archive demo flows (local state)
- [x] Parent/guardian linking on profile
- [x] Medical and emergency contact fields with sensitive data warnings
- [ ] Member export
- [ ] Persistent storage (live provider)

### Attendance
- [ ] Session templates and scheduling
- [ ] Quick attendance register (mobile-friendly)
- [ ] Attendance reports by member/session
- [ ] Absence notifications

### Finance
- [ ] Transaction entry and categorisation
- [ ] Fee tracking and reminders
- [ ] Budget vs actual reporting
- [ ] Export for accountant

### Gift Aid
- [ ] Declaration capture and renewal
- [ ] Eligible donation tracking
- [ ] HMRC claim report generation

### Communications
- [ ] Email template builder
- [ ] Group/segment targeting
- [ ] Send history and delivery status
- [ ] Notice board for members

### Documents
- [ ] File upload with defensive handling
- [ ] Category and tag management
- [ ] Version history
- [ ] Soft-delete / archive

### Calendar
- [ ] Month/week/day views
- [ ] Recurring session support
- [ ] Event creation and editing
- [ ] iCal export

### Staff & Volunteers
- [ ] DBS check tracking and expiry alerts
- [ ] Qualification records
- [ ] Safeguarding training log
- [ ] Role assignment

### Fundraising
- [ ] Campaign creation and tracking
- [ ] Donation recording
- [ ] Progress visualisation
- [ ] Gift Aid linkage

### Reports
- [ ] Pre-built report templates
- [ ] Custom date range filtering
- [ ] PDF/CSV export
- [ ] Scheduled report generation

### Audit Log
- [ ] Automatic audit event creation on all data changes
- [ ] Filter by actor, action, resource, date
- [ ] Export for compliance review

### Settings
- [ ] Club profile configuration
- [ ] Role-based access control (RBAC)
- [ ] User management
- [ ] Demo/live mode toggle

### Platform
- [ ] Authentication (email/password or OAuth)
- [ ] Live data provider implementation
- [ ] Database integration
- [ ] Mobile-responsive refinements
- [ ] Accessibility audit (WCAG 2.1 AA)
