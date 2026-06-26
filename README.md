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

This application runs in permanent demo mode with **fake data only**. A banner is displayed at the top of every page:

> Demo Mode — fake data only

No real member, financial or safeguarding data is used.

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

## License

Private — not for public distribution without review.
