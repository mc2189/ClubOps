# ClubOps — Demo QA Checklist (v1.2.0)

Use this before sharing the Vercel demo link with a club secretary, treasurer or committee member.

## Final pre-share checklist (run on live Vercel URL)

Complete these on the **production demo URL** (not localhost):

- [ ] Open live Vercel URL — loads over HTTPS with demo banner visible
- [ ] Follow `/demo-script` steps 1–10 without broken links
- [ ] **Communications compose** — `/communications/compose` loads fully (not stuck on loading)
- [ ] **Gift Aid compose preset** — `/communications/compose?preset=gift-aid` selects group, template, form and shows preview
- [ ] **Unpaid fees preset** — `/communications/compose?preset=unpaid-fees` loads fee reminder template
- [ ] **Finance import review** — `/finance/import/review` shows match review demo
- [ ] **Attendance register** — mark Present/Absent on a session register
- [ ] **Reports export centre** — `/reports/export-centre` generates demo pack (no real file)
- [ ] Switch demo roles and verify permission preview messages (Coach on Finance, Treasurer on Gift Aid)
- [ ] Open `/settings/permissions` matrix
- [ ] **Architecture blueprint (v1.2.0)** — `/settings/live-readiness` loads checklist; `/settings/data-architecture` shows entities
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
- [ ] `/demo` (from banner link)

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

## Mobile checklist

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

- [ ] Amber demo banner visible on every page
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
