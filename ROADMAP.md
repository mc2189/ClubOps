# ClubOps — Roadmap

## Phase 0 — Foundation

**Status: Complete (v1.4.0 Supabase foundation prep — not live)**

- Project scaffold and tooling
- Dashboard layout shell
- Demo data provider
- All core module pages
- Documentation and deployment readiness
- **v1.0.0** — Reports, Audit, Export Centre and demo script
- **v1.0.1** — Demo QA, link check and presentation polish
- **v1.0.2** — Final demo readiness fixes (composer, data consistency)
- **v1.1.0** — Demo role switching and RBAC foundation preview
- **v1.2.0** — Live-ready data architecture blueprint (docs + settings UI; no DB/auth)
- **v1.3.0** — Auth and live stack decision pack (Supabase provisional recommendation; no SDKs active on demo)
- **v1.4.0** — Supabase scaffold, draft schema/RLS/storage, env docs (no connection)

## Phase 1 — Core CRUD

**Status: Complete (demo) — stack decision documented; live auth next (Stage 2)**

- [x] Member management
- [x] Session and attendance register
- [x] Finance module with bank import demo
- [x] Gift Aid module
- [x] Communications module
- [x] Documents module
- [x] Staff & volunteers module
- [x] Fundraising module
- [x] Reports and Audit module
- [x] Demo role switching and RBAC preview (v1.1.0)
- [ ] Real authentication and server-side RBAC (live mode)

## Phase 2 — Communications & Documents

- [x] Email/notice composition and sending (demo simulation)
- [x] Document upload and management (demo simulation)
- [x] Calendar with recurring sessions

## Phase 3 — Finance & Compliance

- Gift Aid declaration workflow
- Fee tracking and reminders
- Financial reports
- Audit log auto-generation on data changes

## Phase 4 — Staff & Fundraising

- [x] Staff/volunteer records with DBS tracking (demo)
- [x] Fundraising campaign management (demo)
- [ ] Safeguarding record management (RBAC-protected)

## Phase 5 — Live-ready

- [x] Architecture blueprint and migration plan (v1.2.0)
- [x] Provider contract documented
- [x] Data model and classification documented
- [x] Auth/stack decision pack (v1.3.0)
- [x] Supabase client scaffold and draft migrations (v1.4.0)
- [ ] Private Supabase project + env on private Vercel only
- [ ] Live data provider with database
- [ ] Real authentication
- [ ] Production security hardening
- [ ] Performance optimisation
- [ ] Accessibility audit

## Phase 6 — Multi-club

- Club switching / multi-tenancy
- White-label configuration
- Generic club templates beyond gymnastics
