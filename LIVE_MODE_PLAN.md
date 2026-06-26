# ClubOps — Live Mode Plan

## Goal

Enable real clubs to run ClubOps with **real data**, **authentication**, **RBAC**, **secure storage**, and **persistent audit** — while keeping **Demo Mode permanent** for public demos and training.

## What live mode is not (yet)

The v1.2.0 release is a **blueprint only**. The app does not:

- Connect to a database
- Authenticate users
- Store files securely
- Persist audit events
- Process real bank, email, or HMRC data

## Dual-mode strategy

| Aspect | Demo Mode | Live Mode |
|--------|-----------|-----------|
| Deployment | Public Vercel URL | Private deployment (TBD) |
| Provider | `demoProvider` | `liveProvider` (future) |
| Data | Fake | Real, classified |
| Auth | None | Required |
| RBAC | Client preview | Server enforced |
| Audit | Session simulated | Append-only persistent |
| Files | Simulated | Private bucket + scan |

**Never replace Demo Mode.** Sales, committee training, and open demos always use fake data.

## Prerequisites before loading real data

Review `/settings/live-readiness` and complete:

1. Real authentication (no public anonymous access)
2. Server-side authorisation on every API route and export
3. Relational database with migrations and backups
4. Secure object storage for documents
5. Append-only audit log
6. Tenant/club isolation
7. Data retention and deletion policy
8. Incident response and recovery tested

## Provider switch (future)

Today (`src/data/providers/index.ts`):

```typescript
function resolveProvider() {
  if (isDemoMode()) return demoProvider;
  return demoProvider; // live not wired
}
```

Future (private live deployment only):

```typescript
function resolveProvider() {
  if (isDemoMode()) return demoProvider;
  return liveProvider; // after auth + RBAC + DB verified
}
```

`liveProvider.stub.ts` exists as a typed placeholder — it throws if called and is **not imported** in `index.ts`.

## Module rollout order

See [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) and `/settings/production-roadmap`.

Recommended first live module after foundation: **Members** (read path, then write + audit).

Sensitive modules (medical, finance, Gift Aid) come **after** RBAC and audit are proven.

## Session state vs persistent state

Demo mode uses React context for session-only changes (attendance marks, inbox read status, compose drafts). These reset on refresh.

Live mode must persist mutations to the database and write audit events. UI contexts may cache reads but must not be the source of truth.

## Committee communication

Use these pages when explaining the path to production:

- `/settings/live-readiness` — plain-English checklist
- `/settings/production-roadmap` — staged timeline
- `/demo` — what is safe today

## Related documents

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [PROVIDER_CONTRACTS.md](./PROVIDER_CONTRACTS.md)
- [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md)
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
