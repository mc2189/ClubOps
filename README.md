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

**v1.1.0 adds demo role switching and RBAC preview — not real authentication.**

This application runs in permanent demo mode with **fake data only**. Use the **demo role switcher** in the top bar to preview permissions (session storage — persists on refresh in the same tab).

No real member, financial or safeguarding data is used. Live use requires authentication, RBAC, a secure database, secure file storage, production audit logging and data protection controls.

See [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) before sharing the public demo link.

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

All pages fetch data through the provider layer (`src/data/providers/`). To switch from demo to live data, implement `liveProvider.ts` and update `src/data/providers/index.ts`.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run start`   | Start production server  |
| `npm run lint`    | Run ESLint               |
| `npm run typecheck` | Run TypeScript check   |

## Documentation

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
