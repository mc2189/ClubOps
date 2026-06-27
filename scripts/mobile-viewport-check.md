# Mobile viewport check (manual)

Automated smoke tests (`./scripts/smoke-test-demo.sh`) verify HTTP routes and demo safety copy — they do **not** validate visual mobile layout, touch targets, or horizontal scroll.

## Quick manual check (Chrome DevTools)

1. Open https://club-ops-fawn.vercel.app (or `npm run dev` locally)
2. Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
3. Test widths: **360px**, **390px**, **430px**, and **768px** (tablet)

### Pages to spot-check

| Route | What to verify |
|-------|----------------|
| `/dashboard` | Compact hero; priorities visible below fold |
| `/members` | Thin header; list cards readable |
| `/attendance/register` | Sticky save bar above bottom nav |
| `/communications/compose` | Form stacks; simulated-send obvious |
| `/reports` | Header compact |
| `/reports/export-centre` | Export buttons tappable |
| `/demo` | Demo safety copy clear |

### Pass criteria

- [ ] No horizontal scrolling
- [ ] Bottom nav does not cover primary actions
- [ ] Active bottom nav item obvious
- [ ] Role switcher usable in top bar
- [ ] Dashboard hero does not fill entire viewport

## Optional screenshots (Playwright — not installed by default)

One-off capture without adding Playwright to the project:

```bash
npx --yes playwright@1.49.0 install chromium
npx --yes playwright@1.49.0 screenshot \
  --viewport-size=390,844 \
  https://club-ops-fawn.vercel.app/dashboard \
  /tmp/clubops-dashboard-390.png
```

Repeat for other routes as needed.
