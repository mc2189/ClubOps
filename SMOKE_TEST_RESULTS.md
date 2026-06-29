# Smoke test results — live demo

**URL:** https://club-ops-fawn.vercel.app  
**Date:** 2026-06-26 (v1.4.6j pre-deploy local checks)  
**Script:** `./scripts/smoke-test-demo.sh`

## Responsive check (v1.4.6j, local)

**Script:** `BASE_URL=http://localhost:3000 npm run responsive-check`  
**Result:** PASS (63/63)

Includes overflow checks for finance transactions, expenses, fundraising and layout switching for transactions/expenses mobile cards.

## Smoke test

Re-run after v1.4.6j deploy:

```bash
./scripts/smoke-test-demo.sh https://club-ops-fawn.vercel.app
```

## Prior production result (v1.4.6i)

PASS (31/31) on 2026-06-26.

See [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) and [TESTER_BRIEF.md](./TESTER_BRIEF.md).
