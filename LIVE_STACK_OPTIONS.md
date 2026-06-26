# ClubOps — Live Stack Options

Comparison of realistic live-mode foundations for ClubOps. **Not implemented.**

## Options overview

### 1. Supabase Auth + Postgres + RLS + Storage — **Recommended**

| Area | Assessment |
|------|------------|
| Authentication | Email, magic link, OAuth; JWT sessions |
| RBAC | App role tables + RLS policies using `auth.uid()` and `club_id` |
| Server-side auth | Verify Supabase session in server actions; service role server-only |
| Database | Postgres — ideal for finance, Gift Aid, audit joins |
| File storage | Private buckets with storage policies |
| Audit | Custom `audit_events` append-only table |
| Multi-club | `club_id` + RLS on all rows |
| Local dev | Supabase CLI or hosted dev project |
| Vercel | Official Next.js SSR patterns |
| Cost | Strong free tier for small clubs |
| Lock-in | Moderate — Postgres portable |
| Youth data | Good with strict RLS + audit on medical access |
| Demo separation | No Supabase on public demo; separate projects |

**What could go wrong:** Misconfigured RLS; service role key in client bundle; mixing demo/live env vars.

---

### 2. Clerk + separate database/storage — Possible alternative

| Area | Assessment |
|------|------------|
| Authentication | Excellent UX, MFA, org management |
| RBAC | Clerk org roles + custom DB permissions for modules |
| Server-side auth | Clerk middleware |
| Database | Separate Postgres (Neon, Supabase DB-only, RDS) |
| File storage | S3, Supabase Storage, UploadThing — separate |
| Audit | Custom DB table + Clerk webhooks for auth events |
| Cost | MAU-based — may exceed Supabase for parent accounts |
| Demo separation | Clerk env vars on live deploy only |

**Prefer when:** Auth UX and MFA are top priority; team accepts multi-vendor ops.

**Avoid when:** Minimising cost and integration complexity for small clubs.

---

### 3. Auth.js / NextAuth + separate DB/storage — Higher burden

| Area | Assessment |
|------|------------|
| Authentication | OAuth, credentials via adapters |
| RBAC | Fully custom in Postgres |
| Server-side auth | `getServerSession` — must harden every route |
| Database | Adapter to Postgres recommended |
| Complexity | High — sessions, CSRF, rotation, patches |
| Cost | No auth SaaS fee; engineering time is the cost |
| Demo separation | No Auth.js on public demo |

**Prefer when:** Strong Next.js team wants full control and no auth SaaS.

**Avoid when:** Small team + sensitive youth data without security expertise.

---

### 4. Firebase Auth + Firestore/Storage — Possible alternative

| Area | Assessment |
|------|------------|
| Authentication | Mature Google auth |
| Database | Firestore — poor fit for relational finance/audit |
| RBAC | Security rules + custom claims — complex for module matrix |
| Vercel | Works but less idiomatic than Supabase |
| Lock-in | High — migrating Firestore to SQL is painful |
| Demo separation | No Firebase on public demo |

**Prefer when:** Mobile-first real-time app with simple document model.

**Avoid when:** Finance-heavy, export-heavy club admin (ClubOps today).

---

### 5. Custom auth — Not recommended

Building passwords, MFA, breach response, and session security from scratch is **high-risk** for a volunteer-club product handling child and safeguarding data.

**Only if:** Regulatory constraint blocks all managed auth (rare).

---

## Decision matrix (1–5)

| Criterion | Supabase | Clerk | Auth.js | Firebase | Custom |
|-----------|:--------:|:-----:|:-------:|:--------:|:------:|
| Security fit | 4 | 5 | 4 | 4 | 2 |
| Data model fit | 5 | 4 | 4 | 2 | 3 |
| RBAC fit | 4 | 3 | 3 | 3 | 2 |
| Audit fit | 4 | 3 | 3 | 3 | 2 |
| File storage fit | 5 | 3 | 3 | 4 | 2 |
| Simplicity | 4 | 3 | 2 | 3 | 1 |
| Cost suitability | 5 | 3 | 4 | 4 | 3 |
| Maintainability | 4 | 4 | 3 | 3 | 1 |
| Vercel compatibility | 5 | 5 | 4 | 3 | 3 |
| Small-club suitability | 5 | 3 | 3 | 3 | 1 |
| **Average** | **4.5** | **3.6** | **3.3** | **3.2** | **2.0** |

Justifications for each score are in `src/data/demo/stackDecisionData.ts` and the UI at `/settings/live-stack`.

**Disclaimer:** Scores reflect ClubOps context only — not universal rankings or legal advice.

## Demo Mode separation (all options)

| Deployment | Provider | Auth | Data |
|------------|----------|------|------|
| Public Vercel demo | `demoProvider` | None | Fake |
| Future live (private) | `liveProvider` | Chosen stack | Real |

Never add live stack env vars to the public demo Vercel project.

## Related documents

- [AUTH_DECISION_PACK.md](./AUTH_DECISION_PACK.md)
- [RECOMMENDED_LIVE_STACK.md](./RECOMMENDED_LIVE_STACK.md)
- [AUTH_IMPLEMENTATION_PLAN.md](./AUTH_IMPLEMENTATION_PLAN.md)
