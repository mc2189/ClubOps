# ClubOps — Build Notes

## Iteration 0 — Foundation (2026-06-26)

### What was built

- Next.js 15 project with TypeScript, Tailwind CSS 4, App Router
- Dashboard layout: sidebar navigation, top bar, demo mode banner
- 13 module placeholder pages with demo data tables
- Data provider layer (`ClubOpsDataProvider` interface + `demoProvider`)
- 11 demo data files with fake records
- Shared UI components (Card, StatCard, DataTable, Badge, PageHeader, etc.)
- Full documentation set and Cursor rules

### Commands run

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

### Structure decisions

- Used `src/` directory for all application code
- Data provider pattern allows swapping demo → live without UI changes
- Server Components used for all data-fetching pages
- Client Components limited to Sidebar (pathname) and TopBar (pathname)
- Tailwind CSS 4 with `@import "tailwindcss"` in globals.css

### Known limitations

- No authentication or RBAC yet (TODO markers in place)
- No CRUD operations — read-only demo data
- Sidebar not collapsible on mobile (future enhancement)
- Settings page is static placeholder

### Next steps

See ROADMAP.md Phase 1 — Core CRUD.
