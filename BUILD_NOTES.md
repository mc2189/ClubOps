# ClubOps — Build Notes

## Iteration 9 — Fundraising & Donor CRM (2026-06-26)

### What was built

- Fundraising dashboard with progress bars and Gift Aid potential
- Campaign list and detail pages
- Donor and business CRM with demo actions
- Sponsorship tiers with renewal tracking
- Donations with Gift Aid eligibility rules
- Follow-ups and reports with simulated export

### New routes

- `/fundraising`, `/fundraising/campaigns`, `/fundraising/campaigns/[id]`
- `/fundraising/donors`, `/fundraising/businesses`, `/fundraising/sponsorships`
- `/fundraising/donations`, `/fundraising/follow-ups`, `/fundraising/reports`

### Security

- Demo-only notices — no real payments or donor data
- Gift Aid guidance on business/sponsorship ineligibility
- Fundraising data protection with RBAC and consent TODOs

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

Authentication/RBAC foundation or Reports/Audit module next.

---

## Iteration 8 — Staff, Volunteers & Operations (2026-06-26)

### What was built

- Staff dashboard with operational stats and quick actions
- Staff profile pages for coaches, volunteers and committee
- Rota with assign, conflict flag and confirm actions
- Qualifications/compliance with expiry tracking
- Wage prep (not payroll) with demo export
- Venues, outgoings and alerts pages

### New routes

- `/staff`, `/staff/[id]`, `/staff/rota`, `/staff/qualifications`
- `/staff/wages`, `/staff/venues`, `/staff/outgoings`, `/staff/alerts`

### Security

- Demo-only notices on all staff pages
- Wage prep warning — not payroll, no HMRC submission
- Staff data protection with RBAC, PVG/DBS and safeguarding TODOs

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

Fundraising module or authentication/RBAC foundation next.

---

## Iteration 7 — Documents & Scanned Notes (2026-06-26)

### What was built

- Documents dashboard with stats, activity feed and quick actions
- Upload simulation with disabled file input and demo document examples
- Assignment page for unassigned documents with confidence and sensitivity
- Scanned notes workflow for digitising paper gymnast notes
- Missing documents tracker with cross-module suggested actions
- Soft archive with restore (no permanent delete)
- Routing rules page (display only)

### New routes

- `/documents`, `/documents/upload`, `/documents/assignment`
- `/documents/scanned-notes`, `/documents/missing`, `/documents/archive`, `/documents/rules`

### Security

- Demo-only notices — no real files uploaded or stored
- Restricted content warnings for medical/safeguarding/injury notes
- Documents data protection warning with encryption, virus scan and RBAC TODOs

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

Staff/volunteer module or authentication/RBAC foundation next.

---

## Iteration 6 — Communications & Forms (2026-06-26)

### What was built

- Communications dashboard with campaign reminders and quick actions
- Compose page with group/template/form selectors, preview panel, draft and simulated send
- Templates, recipient groups, forms, inbox, history and routing rules pages
- Gift Aid declaration request wired from Gift Aid module to Communications compose preset
- Simulated inbox responses with auto-match confidence and review actions

### New routes

- `/communications`, `/communications/compose`, `/communications/templates`
- `/communications/groups`, `/communications/history`, `/communications/forms`
- `/communications/inbox`, `/communications/rules`

### Security

- Demo-only notices on all communications pages — no real email sent
- Communications data protection warning with RBAC, consent and medical form access TODOs
- No external APIs, Gmail, Outlook, SMS or real form processing

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

Documents module or authentication/RBAC foundation next.

---

## Iteration 5 — Gift Aid Module (2026-06-26)

### What was built

- Gift Aid dashboard with reclaim estimates and compliance warnings
- Declarations management with demo actions and audit stubs
- Eligible donations split by category with finance links
- Review workflow and claim export placeholder
- Rules page encoding HMRC-style eligibility in plain English

### New routes

- `/gift-aid`, `/gift-aid/declarations`, `/gift-aid/eligible-donations`
- `/gift-aid/review`, `/gift-aid/claim-export`, `/gift-aid/rules`

### Compliance

- Strong warnings against claiming on fees, raffles, business donations
- "Do not claim Gift Aid on this income type" on ineligible rows
- No HMRC connection — demo only

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

Communications module next.

---

## Iteration 4 — Finance & Bank Import Demo (2026-06-26)

### What was built

- Treasurer dashboard with income, outgoings, fees, matching stats
- Fee tracking table linked to member profiles
- Bank import flow (CSV + PDF placeholder) with auto-match and review
- Matching logic: amount, surname, parent surname, reference, due date, duplicates
- Expenses CRUD (demo state), transactions list, reports/export placeholders

### New routes

- `/finance` — dashboard
- `/finance/import` — guided import flow
- `/finance/import/review` — match review and approve
- `/finance/fees`, `/finance/transactions`, `/finance/expenses`, `/finance/reports`

### Security

- Demo-only notices on all finance pages
- Finance data protection warning with RBAC TODOs
- No real uploads or bank processing

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

Communications module or Gift Aid workflow next.

---

## Iteration 3 — Attendance & Calendar (2026-06-26)

### What was built

- Attendance dashboard with today's sessions, stats, absence alerts, low attendance
- Session selector and register marking UI (large mobile-friendly buttons)
- Mark all present (with confirmation) and save register flows
- Attendance reports page with export placeholder
- Calendar agenda view with multi-module items and automation hints
- AttendanceDemoProvider for demo register state

### New routes

- `/attendance` — dashboard
- `/attendance/register` — session selector
- `/attendance/register/[sessionId]` — register marking
- `/attendance/reports` — reports
- `/calendar` — agenda + suggested actions

### Security

- Medical flags visible on register; detailed notes not shown
- "Medical information available — restricted access required in live mode" notice
- RBAC TODO on medical data in register context

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

Finance module or Communications module next.

---

## Iteration 2 — Members & Parent Records (2026-06-26)

### What was built

- Members list with search and 8 filters
- Member profile with 8 tabs and avatar placeholder
- Add / edit / archive demo flows (local state, resets on refresh)
- MembersDemoProvider for session-only CRUD + audit stubs
- Sensitive data warnings on medical, finance, audit tabs
- 9 fake member profiles with realistic variety

### New routes

- `/members` — list with search/filter
- `/members/new` — add member form
- `/members/[id]` — profile with tabs
- `/members/[id]/edit` — edit form

### Security

- Medical/welfare sections marked sensitive with RBAC TODOs
- Archive uses soft-delete language (status → archived)
- Internal IDs not shown in UI
- Demo-only notice on all CRUD flows

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

See ROADMAP.md — Attendance register or Finance module next.

---

## Iteration 1 — Dashboard & Demo Mode (2026-06-26)

### What was built

- Full dashboard redesign for volunteer club secretaries
- Today's tasks section with 6 priority task cards (payments, Gift Aid, fees, competition, compliance, documents)
- Club health summary with 6 scored metrics (Finance, Attendance, Communications, Fundraising, Compliance, Staff)
- Finance, Attendance and Gift Aid snapshot panels
- Fundraising progress bars for active campaigns
- Quick action grid (6 actions linking to module pages)
- Recent activity feed using audit events
- Demo mode information page at `/demo`
- Dashboard demo data file (`src/data/demo/dashboard.ts`)
- `getDashboardData()` provider method

### New components

- `TaskCard`, `HealthScoreCard`, `ProgressCard`, `SnapshotCard`, `SnapshotRow`
- `RecentActivityList`, `QuickActionCard`

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

See ROADMAP.md Phase 1 — Core CRUD (Members module first).

---

## Iteration 0 — Foundation (2026-06-26)

### What was built

- Next.js 15 project with TypeScript, Tailwind CSS 4, App Router
- Dashboard layout: sidebar navigation, top bar, demo mode banner
- 13 module placeholder pages with demo data tables
- Data provider layer (`ClubOpsDataProvider` interface + `demoProvider`)
- 11 demo data files with fake records
- Shared UI components (Card, StatCard, DataTable, Badge, PageHeader, etc.)
- Full documentation set and Cursor rules

### Commands run

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

### Structure decisions

- Used `src/` directory for all application code
- Data provider pattern allows swapping demo → live without UI changes
- Server Components used for all data-fetching pages
- Client Components limited to Sidebar (pathname) and TopBar (pathname)
- Tailwind CSS 4 with `@import "tailwindcss"` in globals.css

### Known limitations

- No authentication or RBAC yet (TODO markers in place)
- No CRUD operations — read-only demo data
- Sidebar not collapsible on mobile (future enhancement)
- Settings page is static placeholder

### Next steps

See ROADMAP.md Phase 1 — Core CRUD.
