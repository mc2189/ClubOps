# ClubOps — Demo QA Checklist (v1.4.5)

Use this before sharing the Vercel demo link with a club secretary, treasurer or committee member.

**Tester handout:** [TESTER_BRIEF.md](./TESTER_BRIEF.md) — five tasks and feedback questions to send volunteers.

**Automated smoke test:** `./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app`

## RBAC honesty checks (v1.4.4)

With demo role switcher in the top bar:

- [ ] **Default Secretary/Admin** — full demo works normally (Finance, Medical, Gift Aid, Exports)
- [ ] **Coach on Finance** — `/finance` shows restricted/summary preview, not full payment detail
- [ ] **Coach on dashboard priorities** — finance and Gift Aid priority cards hidden; staff/members/comms remain
- [ ] **Committee Read-Only on dashboard** — finance/Gift Aid cards show summary note for role
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
- [ ] **Unpaid fees preset** — `/communications/compose?preset=unpaid-fees` shows fee reminder template, recipient reason, Finance source, and preview
- [ ] **Gift Aid preset** — `/communications/compose?preset=gift-aid` shows declaration request, recipient reason and Gift Aid source
- [ ] **Missing forms preset** — `/communications/compose?preset=missing-forms` loads consent form request with Documents source
- [ ] **Communications compose (v1.4.6d)** — recipient count and why-included visible; simulated-send warning clear; message preview readable
- [ ] **Communications landing** — Start here panel with compose CTA and “does not send real emails or texts” wording
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

## Finance guided statement review (v1.4.6a)

On live URL with **Treasurer** role (or Secretary):

- [ ] `/finance` — **Start here** panel visible; “Use sample statement” is the primary action
- [ ] Copy states no real bank connected; secondary tools (Fees, Transactions) are not equal prominence
- [ ] `/finance/import` — 4-step wizard; sample PDF/CSV only; upload disabled with warning
- [ ] “Do not upload real bank statements” warning visible
- [ ] Step 2 shows payment summary (counts + estimated fee/donation totals)
- [ ] `/finance/import/review` — tabs: Ready to confirm, Needs checking, Unmatched, Confirmed
- [ ] Each card shows amount, date, reference, match type, confidence (High/Medium/Low), reason
- [ ] **Confirm match**, **Not this member**, **Mark unknown** actions work with clear result messages
- [ ] Member fee cards show fee impact preview (before/after/balance)
- [ ] Unmatched queue shows why unmatched + demo next-step buttons
- [ ] “How matching works” panel visible on import/review
- [ ] Communications follow-up links present (simulated — no real send)
- [ ] Mobile (390px): review cards stack; action buttons full width; no page horizontal scroll

## Member profile summary (v1.4.6b)

On live URL:

- [ ] `/members` — status badges on cards (Fees, Attendance, Documents, Gift Aid) with text labels
- [ ] Quick filters: Needs attention, Missing forms, Owes fees, Low attendance
- [ ] `/members/mem-002` (Jordan Reeves) — summary panel with status tiles and recent activity
- [ ] `/members/mem-005` or `/members/mem-008` — **Needs attention** section with plain-English actions
- [ ] Parent/contact section shows demo safety wording; no real data prompt
- [ ] Quick links to Finance, Attendance, Communications (simulated), Documents, Gift Aid
- [ ] **Coach role** on medical-flag member — medical summary shows restricted message, not full notes
- [ ] **Welfare Officer role** — full medical detail visible on Medical tab
- [ ] Mobile (390px): list badges wrap; profile summary stacks; action buttons full width

## Mobile-first demo polish (v1.4.7 / v1.4.5j)

Test on phone or narrow browser at **360px**, **390px**, and **430px** on the **live Vercel URL**. Also spot-check **768px** (tablet).

See [scripts/mobile-viewport-check.md](./scripts/mobile-viewport-check.md) for DevTools steps, screenshot checklist, and optional Playwright commands.

**Note:** Automated smoke tests do not validate visual mobile layout — use this section for that.

### Scroll and sticky behaviour (v1.4.5j)

- [ ] **Top banner not sticky on mobile** — dashboard hero, page headers and amber demo banner scroll away; only bottom nav stays fixed
- [ ] Top bar (menu + role switcher) scrolls with content on phone; sticky top bar only on desktop (`lg`)

### Layout checklist

- [ ] **360px dashboard** — compact hero; Today's priorities visible without excessive scroll
- [ ] **390px dashboard** — same
- [ ] **430px dashboard** — same
- [ ] **Dashboard priority cards (v1.4.6c)** — each card shows why it matters, suggested action, linked modules, and action button
- [ ] **Priority card links** — Review payments → `/finance/import/review`; members → `/members?filter=needs-attention`; Draft reminder → `/communications/compose?preset=unpaid-fees`; Gift Aid → `/gift-aid`
- [ ] **Mobile priority buttons** — full-width, no horizontal overflow; bottom nav does not cover card actions
- [ ] **Members mobile** — compact header (~96–140px); list/cards readable; actions don't overflow
- [ ] **Attendance mobile** — register controls tappable; sticky save bar above bottom nav
- [ ] **Communications compose mobile** — form stacks; reason panel readable; Simulate send full width; warning clear
- [ ] **Reports / export mobile** — export button reachable; safety copy visible
- [ ] **Demo page mobile** — intro not too tall; safety wording scannable
- [ ] **No horizontal scroll** at 360px, 390px, 430px on key routes
- [ ] **No content hidden** behind bottom nav
- [ ] **Bottom nav** — active item obvious; 56px touch targets
- [ ] **Demo banner** — single wording on module pages: "Demo mode — fake data only. Reloading the page resets demo changes." (dashboard uses hero panel instead)
- [ ] Menu drawer, role switcher, skip link still work
- [ ] Desktop layout unchanged at `lg` width (sidebar visible, no bottom nav)

## Mobile-first demo polish (v1.4.7 — superseded by section above)

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
