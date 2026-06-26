# ClubOps — Demo QA Checklist (v1.0.1)

Use this before sharing the Vercel demo link with a club secretary, treasurer or committee member.

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

## Pre-send-to-club checklist

- [ ] Run through demo script once without errors
- [ ] Confirm Vercel URL loads over HTTPS
- [ ] Confirm demo banner and `/demo` safety page are accurate
- [ ] Explain this is **not production software**
- [ ] Explain live use needs authentication, RBAC, secure database, secure storage, data protection policy and production audit controls
- [ ] Have `/demo-script` open in a second tab for reference

## Build verification (before deploy)

```bash
npm run lint
npm run typecheck
npm run build
```

All three must pass before pushing to `main` for Vercel auto-deploy.
