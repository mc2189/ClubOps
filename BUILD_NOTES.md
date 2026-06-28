# ClubOps — Build Notes

## Iteration 35 — v1.4.6d Communications reason-based flow (2026-06-27)

### What was built

- Communications Start here panel and reason-based preset list
- Compose reason panel, source module links, recipient why-included copy
- Enhanced groups/templates metadata; simulate send confirmation wording
- `lib/communicationsCompose.ts` — preset configs and compose context helpers

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```

---

## Iteration 34 — v1.4.6c Dashboard priority explanations (2026-06-27)

### What was built

- Rich priority cards: severity label, why it matters, suggested action, linked module tags, CTA button, what happens next
- Role-filtered priorities and Committee Read-Only summary note on finance tasks
- Recently resolved demo examples; members URL filter `?filter=needs-attention`

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```

---

## Iteration 33 — v1.4.6b Member profile summary (2026-06-27)

### What was built

- Member list scan badges and attention filters
- Profile summary panel, needs-attention section, activity timeline, cross-module links

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```

---

## Iteration 32 — v1.4.6a Finance guided statement review (2026-06-27)

### What was built

- Finance Start here panel and 4-step import wizard
- Guided review with tabs, confidence/reason cards, confirm/reject/unknown actions
- Unmatched queue and Communications follow-up links (simulated)

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```

---

## Iteration 31 — v1.4.5j Final mobile banner and layout polish (2026-06-27)

### What was built

- Mobile unified scroll (no frozen top banner); compact dashboard hero and page headers
- Bottom nav safe-area padding; export/compose mobile button sizing

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```

---

## Iteration 30 — v1.4.7 Mobile-first demo polish (2026-06-27)

### What was built

- Compact mobile dashboard hero and internal page headers
- Bottom nav active state + safe-area padding fixes
- Unified demo banner copy; mobile QA checklist section

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```

---

## Iteration 29 — v1.4.6 Demo tester brief and smoke test (2026-06-27)

### What was built

- [TESTER_BRIEF.md](./TESTER_BRIEF.md) for volunteer feedback rounds
- `scripts/smoke-test-demo.sh` — 31 automated checks on production URL

### Commands run

```bash
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 28 — v1.4.5h Reference banner art integration (2026-06-27)

### What was built

- Dashboard and page headers use supplied reference PNG banner art as the visual layer
- Real HTML text/buttons overlaid on left; glam logo and ribbons show from reference on right

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 27 — v1.4.5g Rectangular glam banner system (2026-06-27)

### What was built

- Wide dashboard glam hero banner with integrated cropped logo art
- Reusable `GlamPageHeader` for major module landing pages
- Shared `GlamBannerDecor` ribbon/sparkle/emerald band styling

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 26 — v1.4.5f Glam dashboard hero redesign (2026-06-27)

### What was built

- `GlamDashboardHero` component — mockup-aligned hero with glam logo, CTAs, demo shield panel, CSS sparkles
- Dashboard demo banner deduplicated; global banner hidden on dashboard route

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 25 — v1.4.5e Restore generated logo brand (2026-06-27)

### What was built

- Generated clean logo restored as primary identity (sidebar, dashboard, demo, reports)
- Web header logo asset for sidebar; simplified welcome/report copy to avoid name duplication
- AGC `AppBrandMark` demoted to compact fallback; mobile top bar uses clean icon

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 24 — v1.4.5d App brand mark refinement (2026-06-27)

### What was built

- `AppBrandMark` component: emerald AGC badge with sparkle and ribbon swoosh (CSS/SVG, no raster in nav)
- Sidebar/mobile drawer and dashboard welcome use compact mark; presentation logos only on demo/reports
- `brandAssets` config: appMark, fullLogo, glamLogo, officialLogo roles

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 23 — v1.4.5c Arbroath web logo replacement (2026-06-27)

### What was built

- Copied five web-friendly PNGs to `public/branding/`; official logos in `public/branding/official/`
- `WebLogo` variant system: clean icon (sidebar tile), clean full (dashboard/demo/reports), optional glam accent
- No logo inversion; icons on dark sidebar stay on white tile

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 22 — v1.4.5a Logo presentation fix (2026-06-27)

### What was built

- `LogoTile` and `ClubLogoImage` — white rounded tile, black transparent logo, no CSS inversion
- Sidebar: 88–104px logo tile + “Arbroath Gymnastics Club” + “ClubOps demo” text
- Dashboard welcome, demo hero, report headers updated for readability on mobile

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Iteration 21 — v1.4.5 Arbroath branding refresh (2026-06-27)

### What was built

- Central branding config (`src/config/branding.ts`) and SVG logo asset
- Branded shell: sidebar logo + club name, green/charcoal theme, mobile nav accents
- Dashboard welcome card, demo/about hero, settings club card, report brand headers
- User-facing club name: Arbroath Gymnastics Club (communication templates, Gift Aid preview)

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- v1.5.0 — private live auth scaffold after private Supabase/Vercel setup
- Optional: replace `public/branding/arbroath-logo.svg` with supplied PNG if available

---

## Iteration 20 — v1.4.4 RBAC honesty and restricted previews (2026-06-27)

### What was built

- Reusable RBAC preview components: `RestrictedContentPreview`, `PermissionLockedPanel`, `PermissionSummaryPanel`, `RoleAccessRequired`, `RestrictedExportButton`, `SensitiveDocumentPreview`
- Module wrappers: `FinanceRestrictedSection`, `GiftAidRestrictedSection`
- `src/lib/rbacCopy.ts` and `getPermissionPreviewLevel` in `permissions.ts`
- Locked/summary previews applied to medical, finance, Gift Aid, wages, exports, sensitive scanned notes
- Demo script optional “Show permissions honestly”; RBAC QA checklist section
- Permission matrix alignment: Secretary/Admin full medical detail; Committee summary-only Finance/Gift Aid; Fundraising Lead no finance view

### Security note

- Demo-only permission preview — not real authentication or server-side RBAC
- Real protection requires auth, server-side RBAC and RLS on a private deployment

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- v1.5.0 — private live auth scaffold after private Supabase/Vercel setup

---

## Iteration 19 — v1.4.3 Breadcrumb navigation (2026-06-27)

### What was built

- Added `breadcrumbs` and `backHref` props to all remaining `PageHeader` components using `@/lib/breadcrumbs` helpers
- Module roots use `moduleBreadcrumb(MODULES.*)` with `backHref="/dashboard"`
- Sub-pages use module-specific trails (`attendanceTrail`, `giftAidTrail`, `communicationsTrail`, etc.) or `moduleBreadcrumb` + `moduleBackHref`
- Demo/help pages use `helpTrail`; settings pages use `settingsTrail`
- Skipped root dashboard (`app/dashboard/page.tsx`) and pages already wired

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- v1.4.4 — RBAC honesty / restricted-content preview
- v1.5.0 — private live auth scaffold after private Supabase/Vercel setup

---

## Iteration 18 — v1.4.2 Mobile and Tablet Shell (2026-06-26)

### What was built

- Responsive shell: drawer sidebar, hamburger menu, bottom nav on mobile/tablet
- ModuleSubNav scrollable sub-navigation; Settings mobile dropdown
- Touch target improvements; TableScrollWrap for wide tables
- Mobile cards: members simple list, staff rota; attendance sticky action bar
- Demo script tablet tips; mobile QA checklist section

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- v1.4.3 — RBAC honesty / restricted-content preview
- v1.5.0 — private live auth scaffold after private Supabase/Vercel setup

---

## Iteration 17 — v1.4.1 Granny-Friendly Quick Wins (2026-06-26)

### What was built

- Grouped sidebar navigation and settings sub-nav with plain-English labels
- Dashboard priorities (max 3 tasks), health score labels, friendly recent activity
- Demo banner wording; EmptyState actions; Members Simple/Detailed toggle
- Accessibility: skip link, aria-current on sub-nav, aria-pressed on filters, sidebar not h1
- RBAC demo honesty wording; demo script/QA fixes; removed RoleRestrictionPreview

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- v1.4.2 — mobile/tablet shell (drawer sidebar)
- v1.4.3 — RBAC honesty / restricted-content preview
- v1.5.0 — private live auth scaffold after private Supabase/Vercel setup

---

## Iteration 16 — v1.4.0 Supabase Live Foundation Prep (2026-06-26)

### What was built

- Supabase SSR packages installed; client scaffold in src/lib/supabase/
- Draft SQL migrations, RLS and storage policy files in supabase/
- .env.example placeholders; provider mode safety helpers
- Settings: supabase-prep, schema-plan, private-deployment pages
- Six Supabase/live provider planning documents

### New routes

- `/settings/supabase-prep`
- `/settings/schema-plan`
- `/settings/private-deployment`

### Commands run

```bash
npm install @supabase/supabase-js @supabase/ssr
npm run lint
npm run typecheck
npm run build
```

### Next steps

- Committee approval; create private Supabase + Vercel projects
- Apply schema + RLS; implement auth and liveProvider Members read path

---

## Iteration 15 — v1.3.0 Auth & Live Stack Decision Pack (2026-06-26)

### What was built

- Auth decision, live stack matrix, implementation options and recommended stack settings pages
- Stack comparison data and 1–5 decision matrix with justifications
- Provisional Supabase recommendation (not implemented)
- Eight decision/evaluation markdown documents
- Safety warnings component; links from Settings, Security, Live readiness, Production roadmap, demo script

### New routes

- `/settings/auth-decision`
- `/settings/live-stack`
- `/settings/implementation-options`
- `/settings/recommended-stack`

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- Committee approval of provisional Supabase stack
- Stage 2: Supabase project (live only), SDK add, auth + liveProvider members read path on private deploy

---

## Iteration 14 — v1.2.0 Live-Ready Data Architecture Blueprint (2026-06-26)

### What was built

- Live readiness, data architecture, provider model and production roadmap settings pages
- Architecture blueprint data (entities, classifications, migration stages, checklist)
- `liveProvider.stub.ts` placeholder (not wired)
- `providerMode.ts` demo flag
- Six technical architecture documents
- Links from Settings, Security, Demo page, optional demo script step

### New routes

- `/settings/live-readiness`
- `/settings/data-architecture`
- `/settings/provider-model`
- `/settings/production-roadmap`

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- Stage 2 migration: choose auth strategy, database schema, server-side RBAC
- Implement liveProvider read path for members module (private deployment only)

---

## Iteration 13 — v1.1.0 Demo Role Switching & RBAC Foundation (2026-06-26)

### What was built

- Demo role switcher in top bar with 7 roles
- Permissions matrix and role cards in Settings
- Security requirements educational page
- Permission preview notices on sensitive modules
- RBAC session audit events
- Optional demo script step

### New routes

- `/settings/roles`, `/settings/permissions`, `/settings/security`
- `/demo-roles`

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- Real authentication and server-side RBAC for live mode
- Live data provider with secure storage

---

## Iteration 12 — v1.0.2 Final Demo Readiness Fixes (2026-06-26)

### What was built

- Fixed Communications compose loading (server-passed search params, no Suspense stall)
- Compose preset support: gift-aid, unpaid-fees, sponsorship-request
- Single source of truth for outstanding fee count in `fees.ts`
- Member finance status alignment with fee records
- FEATURES.md documentation tidy and expanded QA checklist

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- **v1.1.0** — Authentication and RBAC foundation for live mode

---

## Iteration 11 — v1.0.1 Demo QA & Presentation Polish (2026-06-26)

### What was built

- Full route and link audit across all 68 app routes
- Dashboard link accuracy (tasks, health scores, fundraising progress)
- Demo script accuracy with secondary navigation links
- Empty states for list pages that can become empty in session
- Consistent demo safety wording and session-reset messaging
- `DEMO_QA_CHECKLIST.md` for pre-share testing
- Shared demo copy constants in `src/lib/demoCopy.ts`

### QA focus

- Broken links: none found; imprecise links corrected
- Demo data alignment: fundraising names, unpaid fees, Jamie Hart safeguarding
- Mobile: horizontal scroll preserved on tables; card layouts verified
- Accessibility: meaningful link text, health score links, inbox member links

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- Authentication and RBAC foundation for live mode
- Live data provider with secure storage

---

## Iteration 10 — v1.0.0 Audit, Reports & Demo Polish (2026-06-26)

### What was built

- Reports dashboard with export categories and sensitivity levels
- Export Centre — Full Club Admin Pack with 19 sections
- Finance, Committee, Gift Aid and Member packs
- Audit activity feed with filters and security guidance
- Demo script for 10–15 minute club presentation
- Club Health summary reusable component
- Navigation and documentation polish

### New routes

- `/reports/finance-pack`, `/reports/committee-pack`, `/reports/gift-aid-pack`
- `/reports/member-pack`, `/reports/export-centre`
- `/audit/activity`, `/audit/security`
- `/demo-script`

### Security

- Export restrictions documented for live mode
- Sensitive summary only for medical/member packs
- Audit tamper-resistance and RBAC guidance

### Commands run

```bash
npm run lint
npm run typecheck
npm run build
```

### Next steps

- Authentication and RBAC foundation for live mode
- Live data provider with secure storage

---

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
