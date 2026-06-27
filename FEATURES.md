# ClubOps — Features

ClubOps v1.4.1 improves **clarity and accessibility** for non-technical volunteers. v1.4.0 adds **Supabase live foundation prep**. It remains a public demo — not production software.

## v1.4.2 — Mobile and tablet shell (current)

- [x] Hamburger menu and slide-out drawer with grouped navigation
- [x] Mobile bottom nav (Home, Members, Attendance, Messages, More)
- [x] Scrollable module sub-nav on mobile; Settings section dropdown
- [x] Touch targets ~44px on nav, filters, attendance buttons
- [x] Mobile card layouts (members simple, staff rota); TableScrollWrap for wide tables
- [x] Attendance register sticky save bar on mobile/tablet
- [x] Demo script tablet presentation tips
- [ ] RBAC content blocking preview (v1.4.3)

## v1.4.1 — Granny-friendly quick wins

- [x] Grouped sidebar navigation with section headings
- [x] Settings sub-nav: Club & volunteers vs Technical / going live
- [x] Dashboard Today’s priorities (max 3 + show all)
- [x] Plain-English club health labels and friendly recent activity
- [x] Demo banner plain language + About demo link
- [x] EmptyState with primary/secondary actions
- [x] Members Simple / Detailed list toggle
- [x] Accessibility: skip link, aria-current, aria-pressed, sidebar not h1
- [x] RBAC demo honesty wording; demo script/QA fixes
- [ ] Hard RBAC content blocking (v1.4.3)

## v1.4.0 — Supabase foundation prep

- [x] @supabase/supabase-js and @supabase/ssr installed (scaffold only)
- [x] .env.example with placeholder vars
- [x] src/lib/supabase/ client scaffold (not wired to demo)
- [x] Draft SQL migrations 001–011
- [x] RLS and storage policy drafts
- [x] Settings: supabase-prep, schema-plan, private-deployment
- [x] LIVE_PROVIDER_IMPLEMENTATION_PLAN and Supabase planning docs
- [ ] Private Supabase project (future)
- [ ] liveProvider implementation (future)

## v1.3.0 — Auth & live stack decision pack

- [x] Settings: auth decision pack (stack comparison)
- [x] Settings: live stack decision matrix (1–5 scores)
- [x] Settings: implementation options (Clerk, Auth.js, Firebase, custom)
- [x] Settings: recommended stack (provisional Supabase)
- [x] Decision docs: AUTH_DECISION_PACK, LIVE_STACK_OPTIONS, RECOMMENDED_LIVE_STACK, AUTH_IMPLEMENTATION_PLAN
- [x] Vendor evaluations: SUPABASE, CLERK, AUTHJS, FIREBASE
- [x] `stackDecisionData.ts` — matrix and comparison data for UI
- [x] Optional demo script step for stack decision
- [x] Supabase SDK packages installed (v1.4.0 — scaffold only, not connected to public demo)
- [ ] Real authentication (not in this release)

## v1.2.0 — Live-ready architecture blueprint

- [x] Settings: live readiness checklist
- [x] Settings: data architecture (entities + classifications)
- [x] Settings: provider model (demo vs live)
- [x] Settings: production roadmap (migration stages)
- [x] Architecture docs: ARCHITECTURE, DATA_MODEL, LIVE_MODE_PLAN, PROVIDER_CONTRACTS, SECURITY_LIVE_REQUIREMENTS, MIGRATION_PLAN
- [x] `liveProvider.stub.ts` — typed placeholder (not wired)
- [x] `architectureData.ts` — blueprint data for UI
- [x] Links from Settings, Security, Demo page, optional demo script step
- [ ] Real authentication (live mode — not in this release)
- [ ] Database (live mode — not in this release)

## v1.1.0 — Demo RBAC preview

- [x] Seven demo roles with permission matrix
- [x] Top-bar role switcher (session storage)
- [x] Settings: roles, permissions, security pages
- [x] Permission preview notices on sensitive modules
- [x] Optional demo script step for role switching
- [x] RBAC audit events (session-only)

## v1.0.2 — Final demo readiness

- [x] Communications composer loads reliably (no stuck “Loading composer…”)
- [x] Compose presets: Gift Aid, unpaid fees, sponsorship request
- [x] Outstanding fee counts aligned across dashboard, finance, communications and reports
- [x] Documentation and QA checklist updated for pre-share testing

## v1.0.1 — Demo QA polish

- [x] Full route review and link accuracy
- [x] Demo script aligned with current app
- [x] Consistent demo safety messaging
- [x] Empty states and mobile layout polish
- [x] `DEMO_QA_CHECKLIST.md` for pre-share testing

## v1.0.0 — Complete demo foundation

- [x] All core modules with demo data
- [x] Reports, Audit, Export Centre and demo script
- [x] GitHub → Vercel auto-deploy

---

## Demo implemented (v1.0.x)

### Members
- [x] Member list with search and filters
- [x] Member profile with tabs (Overview, Parents/Carers, Medical, Attendance, Finance, Documents, Notes, Audit)
- [x] Add / edit / archive demo flows (session-only state)
- [x] Parent/guardian linking on profile
- [x] Medical and emergency contact fields with sensitive data warnings

### Attendance
- [x] Attendance dashboard with today's sessions and alerts
- [x] Session/class selector with demo sessions
- [x] Mobile-friendly register marking
- [x] Mark all present and save register (session-only)
- [x] Attendance reports

### Calendar
- [x] Multi-module agenda view
- [x] Static automation/suggested action hints

### Finance
- [x] Treasurer dashboard with income, outgoings and fee summary
- [x] Fee tracking linked to members (paid, unpaid, partial, overdue, waived)
- [x] Bank import demo flow (CSV + PDF placeholder)
- [x] Auto-match with confidence scores and review screen
- [x] Expenses with categories and receipt status
- [x] Finance reports and export placeholders

### Gift Aid
- [x] Gift Aid dashboard with declaration and eligibility stats
- [x] Declarations page with demo actions
- [x] Eligible donations split by category with compliance warnings
- [x] Review workflow for uncertain items
- [x] Claim export placeholder with compliance checklist
- [x] Gift Aid rules page
- [x] Declaration request via Communications compose preset

### Communications
- [x] Compose with templates, groups and form attachments
- [x] Gift Aid, unpaid fees and sponsorship compose presets
- [x] Simulated send and draft (no real email)
- [x] Templates, groups, forms, inbox, history and routing rules pages
- [x] Form response inbox with auto-matching demo

### Documents
- [x] Documents dashboard with upload, assignment, scanned notes, missing, archive
- [x] Sensitivity labels and demo upload/assign flows (session-only)
- [x] Soft-archive demo

### Staff & Volunteers
- [x] Staff dashboard with rota, qualifications, wages, venues, outgoings, alerts
- [x] DBS and qualification tracking with expiry alerts
- [x] Session wage prep (not payroll)
- [x] Staff profile pages

### Fundraising
- [x] Campaigns, donors, businesses, sponsorships, donations, follow-ups, reports
- [x] Business CRM with demo pledge/donation actions
- [x] Gift Aid eligibility guidance on donations
- [x] Communications links for sponsorship and thank-you messages

### Reports & Audit
- [x] Reports dashboard with sensitivity labels
- [x] Finance, Committee, Gift Aid and Member packs
- [x] Export Centre with simulated Full Club Admin Pack
- [x] Audit overview, activity feed and security guidance
- [x] Cross-module audit log

### Settings & Demo
- [x] Settings page with demo mode guidance
- [x] Demo mode info page (`/demo`)
- [x] Demo script walkthrough (`/demo-script`)

---

## Live mode only (not in demo)

### Platform
- [x] Demo role switching and RBAC preview (v1.1.0 — not real auth)
- [ ] Real authentication (email/password or OAuth)
- [ ] Role-based access control (RBAC)
- [ ] Live data provider with secure database
- [ ] Secure file storage with defensive upload handling
- [ ] Production audit logging (tamper-resistant)
- [ ] Real PDF/CSV exports
- [ ] HMRC Gift Aid integration
- [ ] Real email delivery
- [ ] Real bank / Open Banking connections
- [ ] Real payment processing
- [ ] Persistent storage across sessions
- [ ] Demo/live mode toggle
- [ ] User management and club profile configuration

### Enhancements (post-live)
- [ ] Calendar month/week grid views and iCal export
- [ ] Recurring sessions and event editing
- [ ] Scheduled report generation
- [ ] WCAG 2.1 AA accessibility audit
- [ ] Member export and advanced reporting
