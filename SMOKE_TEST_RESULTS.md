# Smoke test results — live demo

**URL:** https://club-ops-fawn.vercel.app  
**Date:** 2026-06-26 (v1.4.6i pre-deploy)  
**Script:** `./scripts/smoke-test-demo.sh`

## Result: PASS (31/31) — prior deploy (v1.4.6h)

Re-run after v1.4.6i deploy to verify production.

## Responsive check (v1.4.6i, local)

**Script:** `BASE_URL=http://localhost:3000 npm run responsive-check`  
**Result:** PASS (46/46)

| Check | Result |
|-------|--------|
| No horizontal overflow at 360/390/430px (10 priority routes) | PASS (30) |
| Mobile cards below md (members, fees, missing) | PASS (12) |
| Desktop layout at 1280px (members, fees, missing) | PASS (4) |

### Routes verified for overflow

- `/members`, `/members?filter=needs-attention`
- `/finance/fees`, `/documents/missing`, `/staff`, `/reports/export-centre`
- `/attendance`, `/attendance/register/ses-mon-beginners`
- `/communications/compose?preset=unpaid-fees`, `/settings`

### Layout switching verified

- Members: mobile cards / desktop simple or table at md+
- Finance fees: mobile cards / desktop table at md+
- Documents missing: mobile cards / desktop table at md+

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
BASE_URL=http://localhost:3000 npm run responsive-check
```
