# Supabase client scaffold (v1.4.0)

**Status: Scaffold only — not active in public demo.**

## Purpose

Prepare safe Supabase client helpers for a future **private** live deployment. The public Vercel demo does **not** use these files.

## Files

| File | Purpose |
|------|---------|
| `config.ts` | Env detection; fails safe when vars missing |
| `client.ts` | Browser client — returns `null` without env |
| `server.ts` | Server client — returns `null` without env |
| `middleware.ts` | Session refresh helper — **not wired** (no root `middleware.ts`) |

## Rules

1. **Public demo** — no Supabase env vars; build must succeed without them.
2. **Do not import** from `demoProvider`, dashboard pages, or settings demo flows yet.
3. **Service role key** — server-only; never in client bundle.
4. **No login pages** or route protection in v1.4.0.
5. **liveProvider** — still stub; not backed by Supabase until Stage 2 implementation.

## When to use (future)

Private live Vercel project with env vars set → auth pages → middleware → `liveProvider` → Supabase queries with RLS.

See `SUPABASE_LOCAL_DEV.md` and `PRIVATE_DEPLOYMENT_CHECKLIST.md` in repo root.
