# Supabase Local Development

**For future private live development only — not required for public demo.**

## Public demo (default)

```bash
npm install
npm run dev
```

No Supabase env vars needed. App uses `demoProvider`.

## Optional: private live scaffold testing

1. Copy `.env.local.example` → `.env.local` (gitignored)
2. Create a **dev** Supabase project (not production club data)
3. Set placeholders:

```env
CLUBOPS_PROVIDER_MODE=demo
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. **Keep `CLUBOPS_PROVIDER_MODE=demo`** until auth + liveProvider are implemented
5. Never commit `.env.local`

## Supabase CLI (future)

```bash
# When ready — not required for v1.4.0 demo
npx supabase init
npx supabase start
npx supabase db push
```

Apply migrations from `supabase/migrations/` only after review.

## Scaffold files

- `src/lib/supabase/client.ts` — returns `null` without env
- `src/lib/supabase/server.ts` — returns `null` without env
- `src/lib/supabase/middleware.ts` — not wired (no root `middleware.ts`)

## Safety

- Do not use production club data in local dev
- Use fake seed data only
- Public Vercel demo project: **no Supabase env vars**

## Related

- [PRIVATE_DEPLOYMENT_CHECKLIST.md](./PRIVATE_DEPLOYMENT_CHECKLIST.md)
- `.env.example`
