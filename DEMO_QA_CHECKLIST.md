# ClubOps — Demo QA Checklist (v1.4.5)

Use this before sharing the Vercel demo link with a club secretary, treasurer or committee member.

**Tester handout:** [TESTER_BRIEF.md](./TESTER_BRIEF.md) — five tasks and feedback questions to send volunteers.

**Automated smoke test:** `./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app`

## RBAC honesty checks (v1.4.4)

With demo role switcher in the top bar:

- [ ] **Default Secretary/Admin** — full demo works normally (Finance, Medical, Gift Aid, Exports)
- [ ] **Coach on Finance** — `/finance` shows restricted/summary preview, not full payment detail
- [ ] **Coach on Medical tab** — member profile Medical tab hides detailed notes/allergies content
- [ ] **Treasurer on Finance** — `/finance` shows full finance dashboard
- [ ] **Treasurer on Medical tab** — detailed medical notes hidden (locked preview)
- [ ] **Welfare Officer on Medical tab** — full medical/welfare detail visible
- [ ] **Committee Read-Only on Gift Aid** — `/gift-aid` shows summary-only preview, not donor claim details
- [ ] **Coach on Staff Wages** — `/staff/wages` shows locked wage prep preview
- [ ] **Export Centre** — Coach/Committee see locked export; Secretary/Treasurer can generate demo export
- [ ] Restricted previews show “Demo permission preview only — not real security”
- [ ] “Switch to …” role buttons work from locked panels
- [ ] `/demo-script` optional “Show permissions honestly” section matches behaviour

## Final pre-share checklist (run on live Vercel URL)

Complete these on the **production demo URL** (not localhost):

- [ ] Open live Vercel URL — loads over HTTPS ([https://club-ops-fawn.vercel.app](https://club-ops-fawn.vercel.app))
- [ ] Demo messaging visible: amber banner on module pages **or** dashboard glam hero + demo info panel on `/dashboard`
- [ ] Follow `/demo-script` steps 1–10 without broken links
- [ ] **Communications compose** — `/communications/compose` loads fully (not stuck on loading)
- [ ] **Gift Aid compose preset** — `/communications/compose?preset=gift-aid` selects group, template, form and shows preview
- [ ] **Unpaid fees preset** — `/communications/compose?preset=unpaid-fees` loads fee reminder template
- [ ] **Finance import review** — `/finance/import/review` shows match review demo
- [ ] **Attendance register** — mark Present/Absent on a session register
- [ ] **Reports export centre** — `/reports/export-centre` generates demo pack (no real file)
- [ ] Switch demo roles and verify **restricted content previews** (not just banner notices) on Finance, Medical, Gift Aid, Wages and Exports
- [ ] RBAC notices explain demo-only preview — not real security
- [ ] Open `/settings/permissions` matrix
- [ ] **Architecture blueprint (v1.2.0)** — `/settings/live-readiness` loads checklist; `/settings/data-architecture` shows entities
- [ ] **Supabase prep (v1.4.0)** — `/settings/supabase-prep` shows “not connected”; no login on public demo
- [ ] Build succeeds without Supabase env vars (Vercel production)
- [ ] Confirm no real uploads, emails, banking, payments or HMRC actions occur
- [ ] Refresh page — session-only changes reset
- [ ] Explain: **not production software** — live use needs auth, RBAC, secure DB, secure storage and audit controls

## Route checklist

Confirm each sidebar link loads without error:

- [ ] `/dashboard`
- [ ] `/members` and `/members/mem-002`
- [ ] `/attendance` and `/attendance/register`
- [ ] `/finance` and `/finance/import/review`
- [ ] `/gift-aid` and `/gift-aid/eligible-donations`
- [ ] `/communications` and `/communications/compose`
- [ ] `/documents` and `/documents/assignment`
- [ ] `/calendar`
- [ ] `/staff` and `/staff/qualifications`
- [ ] `/fundraising` and `/fundraising/businesses`
- [ ] `/reports` and `/reports/export-centre`
- [ ] `/audit` and `/audit/activity`
- [ ] `/demo-script`
- [ ] `/settings`
- [ ] `/settings/live-readiness`, `/settings/data-architecture`, `/settings/provider-model`, `/settings/production-roadmap` (v1.2.0)
- [ ] `/settings/auth-decision`, `/settings/recommended-stack` (v1.3.0)
- [ ] `/settings/supabase-prep`, `/settings/schema-plan`, `/settings/private-deployment` (v1.4.0)
- [ ] `/demo` (from banner “About demo” link)
- [ ] Sidebar grouped sections load (Day to day, Money & compliance, etc.)
- [ ] Settings grouped sub-nav (Club & volunteers vs Technical / going live)
- [ ] Dashboard shows Today’s priorities (max 3) with show-all toggle
- [ ] Members list Simple / Detailed toggle works

Spot-check sub-navigation within Finance, Gift Aid, Communications, Documents, Staff, Fundraising, Reports and Audit.

## Demo flow checklist

Follow `/demo-script` steps 1–10 in order:

- [ ] Step 1 — Dashboard tasks and clickable Club Health scores
- [ ] Step 2 — Member profile (Jordan Reeves) with parent/carer and medical flag
- [ ] Step 3 — Attendance register with large Present/Absent buttons
- [ ] Step 4 — Bank import, then Review matches (secondary link)
- [ ] Step 5 — Gift Aid eligible vs ineligible donations
- [ ] Step 6 — Gift Aid declaration compose (simulated send)
- [ ] Step 7 — Scanned notes assignment
- [ ] Step 8 — Staff qualifications, then Wage prep (secondary link)
- [ ] Step 9 — Fundraising business CRM
- [ ] Step 10 — Export Centre demo pack generation

## Communications compose presets

- [ ] `/communications/compose` — blank compose loads immediately
- [ ] `/communications/compose?preset=gift-aid` — group, template, form pre-selected; preview visible
- [ ] `/communications/compose?preset=unpaid-fees` — unpaid fees group and fee reminder template
- [ ] `/communications/compose?preset=sponsorship-request` — business follow-up group and sponsorship template
- [ ] `/communications/compose?template=tpl-competition` — competition template loads
- [ ] Simulated send shows success message; no real email sent

## Mobile-first demo polish (v1.4.7)

Test on phone or narrow browser at **360px**, **390px**, and **430px** on the **live Vercel URL**. Also spot-check **768px** (tablet).

See [scripts/mobile-viewport-check.md](./scripts/mobile-viewport-check.md) for DevTools steps and optional Playwright screenshots.

**Note:** Automated smoke tests do not validate visual mobile layout — use this section for that.

- [ ] **Dashboard (iPhone-sized)** — compact glam hero; demo badge + CTAs readable; Today's priorities visible below hero (not full viewport)
- [ ] **Members** — thin page header; breadcrumb compact; add member button does not overflow
- [ ] **Attendance** — register present/absent controls usable; sticky save bar sits above bottom nav
- [ ] **Communications compose** — recipients/template controls stack; simulated-send messaging obvious; no hang or overflow
- [ ] **Finance / Gift Aid** — restricted role previews readable; cards/tables stack (horizontal scroll OK for wide tables only)
- [ ] **Reports / export centre** — export buttons and warnings usable on phone
- [ ] **Bottom nav** — Home, Members, Attendance, Messages, More; active item obvious; no content hidden behind nav
- [ ] **No horizontal scroll** at 360px, 390px, 430px on key routes above
- [ ] **Demo banner** — single wording on module pages: "Demo mode — fake data only. Reloading the page resets demo changes." (dashboard uses hero panel instead)
- [ ] Menu button opens drawer; drawer closes on link tap / outside / Escape
- [ ] Role switcher usable; "Not a real login" visible
- [ ] Skip to main content link works
- [ ] Desktop layout unchanged at `lg` width (sidebar visible, no bottom nav)

## Mobile and tablet checklist (v1.4.2 — superseded by section above)

- [ ] Demo banner readable (short text on mobile)
- [ ] Menu button (top left) opens and closes navigation drawer
- [ ] Drawer closes when tapping a link, outside the drawer, or Escape
- [ ] Bottom nav works: Home, Members, Attendance, Messages, More
- [ ] Role switcher usable; “Not a real login” visible
- [ ] Dashboard readable; Today’s priorities visible
- [ ] Members list usable (simple view cards on mobile)
- [ ] Attendance session picker and register usable one-handed
- [ ] Attendance sticky Save / Mark all present bar visible above bottom nav
- [ ] Communications compose page usable
- [ ] Finance import review cards and buttons tappable
- [ ] Reports export centre readable
- [ ] Settings section dropdown works on mobile
- [ ] Skip to main content link works
- [ ] Desktop layout unchanged at `lg` width (sidebar visible, no bottom nav)

## Mobile content checklist

Test on phone or narrow browser window (~375px):

- [ ] Dashboard cards stack cleanly
- [ ] Members list and profile readable
- [ ] Attendance register buttons usable
- [ ] Finance import/review tables scroll horizontally
- [ ] Gift Aid donation cards readable
- [ ] Communications compose form usable
- [ ] Documents assignment table scrolls
- [ ] Staff rota and qualifications readable
- [ ] Fundraising dashboard quick actions wrap
- [ ] Reports export centre buttons accessible

## Data safety checklist

- [ ] Amber demo banner visible on module pages (dashboard uses hero demo panel instead)
- [ ] `/demo` page states fake data and session reset
- [ ] No real emails sent when using “Simulated send”
- [ ] No real files generated on export buttons
- [ ] Finance import shows “Demo only — no real bank data”
- [ ] Gift Aid shows compliance warnings (no HMRC submission)
- [ ] Refresh resets session-only changes

## Build verification (before deploy)

```bash
npm run lint
npm run typecheck
npm run build
```

All three must pass before pushing to `main` for Vercel auto-deploy.

## Latest automated smoke test

Run: `./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app`

See [SMOKE_TEST_RESULTS.md](./SMOKE_TEST_RESULTS.md) for the most recent run.

**Mobile layout:** Smoke tests verify routes and copy only — not visual mobile layout. Use the [mobile-first section](./DEMO_QA_CHECKLIST.md#mobile-first-demo-polish-v147) and [mobile-viewport-check.md](./scripts/mobile-viewport-check.md).
