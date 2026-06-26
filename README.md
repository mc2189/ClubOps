# ClubOps

Demo-first, live-ready club management application for volunteer-run sports clubs.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app redirects to the dashboard.

## Tech stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS 4**

## Demo mode

**v1.2.0 adds live-ready data architecture blueprint — still demo only, no database.**

**v1.1.0 adds demo role switching and RBAC preview — not real authentication.**

This application runs in permanent demo mode with **fake data only**. Use the **demo role switcher** in the top bar to preview permissions (session storage — persists on refresh in the same tab).

No real member, financial or safeguarding data is used. Live use requires authentication, RBAC, a secure database, secure file storage, production audit logging and data protection controls.

See [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) before sharing the public demo link.

## Architecture documentation (v1.2.0)

- [ARCHITECTURE.md](./ARCHITECTURE.md) — system layers and module map
- [DATA_MODEL.md](./DATA_MODEL.md) — entities, classifications, schema outline
- [LIVE_MODE_PLAN.md](./LIVE_MODE_PLAN.md) — demo vs live strategy
- [PROVIDER_CONTRACTS.md](./PROVIDER_CONTRACTS.md) — `ClubOpsDataProvider` contract
- [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md) — production security checklist
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) — staged migration stages 1–6

Settings UI: `/settings/live-readiness`, `/settings/data-architecture`, `/settings/provider-model`, `/settings/production-roadmap`

## Project structure

```
src/
├── app/              # Next.js pages (one per module)
├── components/
│   ├── layout/       # Sidebar, top bar, demo banner
│   └── ui/           # Shared UI components
├── config/           # Navigation and app config
├── data/
│   ├── demo/         # Fake demo data files
│   └── providers/    # Data provider interface and implementations
└── lib/              # Utilities
```

## Data architecture

All pages fetch data through the provider layer (`src/data/providers/`). To switch from demo to live data, implement `liveProvider` (see `liveProvider.stub.ts`) and update `src/data/providers/index.ts` — **only on a private live deployment**. Public demo must always use `demoProvider`.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run start`   | Start production server  |
| `npm run lint`    | Run ESLint               |
| `npm run typecheck` | Run TypeScript check   |

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — system architecture
- [DATA_MODEL.md](./DATA_MODEL.md) — domain model
- [LIVE_MODE_PLAN.md](./LIVE_MODE_PLAN.md) — live mode strategy
- [PROVIDER_CONTRACTS.md](./PROVIDER_CONTRACTS.md) — provider interface
- [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md) — live security requirements
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) — migration stages
- [PROJECT.md](./PROJECT.md) — project overview
- [FEATURES.md](./FEATURES.md) — feature list
- [ROADMAP.md](./ROADMAP.md) — development roadmap
- [SECURITY.md](./SECURITY.md) — security guidelines
- [DEPLOYMENT.md](./DEPLOYMENT.md) — GitHub and Vercel deployment
- [BUILD_NOTES.md](./BUILD_NOTES.md) — build history
- [CHANGELOG.md](./CHANGELOG.md) — change log
- [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) — pre-share QA checklist

## License

Private — not for public distribution without review.
