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
- [x] Attendance dashboard with today's sessions and alerts
- [x] Session/class selector with 6 demo sessions
- [x] Mobile-friendly register marking (Present, Absent, Late, Left Early, Trial)
- [x] Mark all present and save register (demo state)
- [x] Attendance reports (by class, by member, absences, incomplete registers)
- [ ] Attendance export (PDF/CSV)
- [ ] Persistent storage (live provider)

### Calendar
- [x] Multi-module agenda view (sessions, competitions, finance, staff, Gift Aid, fundraising)
- [x] Static automation/suggested action hints
- [ ] Month/week/day grid views
- [ ] Recurring session support
- [ ] Event creation and editing
- [ ] iCal export

### Finance
- [x] Treasurer dashboard with income, outgoings, and fee summary
- [x] Fee tracking linked to members (paid, unpaid, partial, overdue, waived)
- [x] Bank import demo flow (CSV + PDF placeholder)
- [x] Auto-match with confidence scores and review screen
- [x] Expenses page with categories and receipt status
- [x] Finance reports and export placeholders
- [ ] Real file export (PDF/CSV)
- [ ] Persistent storage (live provider)

### Gift Aid
- [x] Gift Aid dashboard with declaration and eligibility stats
- [x] Declarations page with parent/carer records and demo actions
- [x] Eligible donations split (fees, donations, raffle, business, grants, review)
- [x] Review workflow for uncertain items
- [x] Claim export placeholder with compliance checklist
- [x] Gift Aid rules page with plain-English compliance warnings
- [x] Declaration request preview (Communications placeholder)
- [ ] HMRC integration (not planned for demo)
- [ ] Real declaration storage (live provider)

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
