# Mobile viewport check (manual)

Automated smoke tests (`./scripts/smoke-test-demo.sh`) verify HTTP routes and demo safety copy — they do **not** validate visual mobile layout, touch targets, horizontal scroll, or sticky header behaviour.

## Quick manual check (Chrome DevTools)

1. Open https://club-ops-fawn.vercel.app (or `npm run dev` locally)
2. Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
3. Test widths: **360px**, **390px**, **430px**, and **768px** (tablet)

## Screenshot checklist (v1.4.5j)

Capture or visually verify at each width. Save screenshots to a local folder if sharing feedback with volunteers.

| Width | Route | Verify |
|-------|-------|--------|
| 360px | `/dashboard` | Compact hero; priorities visible; hero scrolls away (not sticky) |
| 390px | `/dashboard` | Same as 360px |
| 430px | `/dashboard` | Same as 360px |
| 390px | `/members` | Compact page header; list readable |
| 390px | `/attendance/register` | Sticky save bar above bottom nav |
| 390px | `/communications/compose` | Full-width buttons; simulated-send warning |
| 390px | `/reports/export-centre` | Export button reachable |

### Pass criteria (all widths)

- [ ] No horizontal page scroll
- [ ] No content hidden behind bottom nav
- [ ] Top glam hero/page headers scroll away — **only bottom nav stays fixed**
- [ ] Amber demo banner scrolls with page on mobile (not frozen at top)
- [ ] Active bottom nav item obvious
- [ ] Role switcher usable in top bar

## Optional screenshots (Playwright — not installed by default)

One-off capture without adding Playwright to the project:

```bash
npx --yes playwright@1.49.0 install chromium

# Dashboard at common phone widths
for W in 360 390 430; do
  npx --yes playwright@1.49.0 screenshot \
    --viewport-size=${W},844 \
    "https://club-ops-fawn.vercel.app/dashboard" \
    "/tmp/clubops-dashboard-${W}.png"
done

# Other key pages at 390px
npx --yes playwright@1.49.0 screenshot --viewport-size=390,844 \
  https://club-ops-fawn.vercel.app/members /tmp/clubops-members-390.png
npx --yes playwright@1.49.0 screenshot --viewport-size=390,844 \
  https://club-ops-fawn.vercel.app/communications/compose /tmp/clubops-compose-390.png
npx --yes playwright@1.49.0 screenshot --viewport-size=390,844 \
  https://club-ops-fawn.vercel.app/reports/export-centre /tmp/clubops-export-390.png
```

Repeat after deploy when testing local changes (`http://localhost:3000/...`).
