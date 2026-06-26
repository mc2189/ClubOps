# ClubOps — Deployment Guide

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient for demo)
- Node.js 18+ installed locally for development

## 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository (e.g. `clubops`)
3. Set visibility (public is fine for demo — all data is fake)
4. Do **not** initialise with a README (the project already has one)
5. Click **Create repository**

## 2. Push the project to GitHub

If Git is not yet initialised:

```bash
cd /path/to/ClubOps
git init
git add .
git commit -m "Initial ClubOps foundation"
```

Add the remote and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/clubops.git
git branch -M main
git push -u origin main
```

## 3. Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Vercel auto-detects Next.js — no configuration changes needed
5. Click **Deploy**

## 4. Automatic deployments

- **Production**: Vercel auto-deploys from the `main` branch on **every push**.
- **Preview**: Feature branches get preview deployment URLs automatically.
- The demo URL can be shared safely with committee members — all data is fake.
- No environment variables are required for the demo.
- **v1.2.0:** Architecture blueprint docs ship with the repo; settings pages at `/settings/live-readiness` etc. No database or auth is deployed.

## 5. Environment variables

**No environment variables are required for the demo version.**

When connecting live data in the future, secrets must be configured in the Vercel dashboard under **Settings → Environment Variables**. Never commit secrets to the repository. **Never add real data to the public demo deployment.**

## 6. Demo safety checklist

Before sharing the public URL, complete [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) — including the **final pre-share checklist** on the live Vercel URL.

Minimum checks:

- [ ] Demo role switcher visible in top bar — switch roles and verify permission previews
- [ ] Communications compose loads without getting stuck (test Gift Aid preset)
- [ ] Demo banner is visible on all pages
- [ ] All data is fake (no real member/financial/safeguarding data)
- [ ] `/demo-script` walkthrough completes without broken links
- [ ] No `.env` files are committed
- [ ] No API keys or secrets in the codebase
- [ ] Recipients understand this is not production software

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # lint check
npm run typecheck # type check
```

## Vercel CLI (optional)

The Vercel CLI is **not required**. The preferred path is Vercel's GitHub integration described above. If you prefer CLI deployment later:

```bash
npm i -g vercel
vercel
```
