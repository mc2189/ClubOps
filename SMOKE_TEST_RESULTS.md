# Smoke test results — live demo

**URL:** https://club-ops-fawn.vercel.app  
**Date:** 2026-06-28 (pre-deploy check for v1.4.6h local build)  
**Script:** `./scripts/smoke-test-demo.sh`

## Result: PASS (31/31)

Note: Run again after v1.4.6h deploy to verify mobile usability changes on production.

| Area | Result |
|------|--------|
| Core routes (/, dashboard, demo, demo-script) | PASS |
| Demo script steps 1–10 | PASS (all HTTP 200) |
| Module dashboards (12 routes) | PASS |
| Demo safety content checks | PASS |

### Routes verified

- `/dashboard`, `/demo`, `/demo-script`
- `/members/mem-002`, `/attendance/register`
- `/finance/import`, `/finance/import/review`
- `/gift-aid/eligible-donations`
- `/communications/compose?preset=gift-aid`
- `/documents/scanned-notes`, `/staff/qualifications`
- `/fundraising/businesses`, `/reports/export-centre`
- `/members`, `/attendance`, `/finance`, `/gift-aid`, `/communications`, `/documents`, `/staff`, `/fundraising`, `/reports`, `/settings`, `/calendar`, `/audit`

### Content checks

- `/demo` — fake data and simulated integrations mentioned
- `/finance/import` — demo notice present
- `/reports/export-centre` — export UI loads

## Manual checks still recommended

Automated smoke test does **not** replace human verification of:

- Role switcher / RBAC previews (Coach vs Treasurer vs Secretary)
- Communications compose interactive flow (not stuck loading)
- **Mobile layout** — visual checks at 360/390/430px; top banners must scroll away (not sticky). See [mobile-viewport-check.md](./scripts/mobile-viewport-check.md).
- Attendance register mark Present/Absent
- Export centre generate button (simulated success message)

See [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) and [TESTER_BRIEF.md](./TESTER_BRIEF.md).

## Re-run

```bash
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```
