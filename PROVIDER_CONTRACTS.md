# ClubOps — Provider Contracts

## ClubOpsDataProvider

The shared contract is defined in `src/data/providers/types.ts` as `ClubOpsDataProvider`.

All UI pages must consume data through:

```typescript
import { dataProvider } from "@/data/providers";
```

**Do not** import `src/data/demo/*` in UI components.

## Implementations

### demoProvider (active)

- **File:** `src/data/providers/demoProvider.ts`
- **Status:** Production for public demo
- **Data source:** `src/data/demo/*.ts`
- **Permanent:** Yes — always available for demo/training deployments

### liveProvider (placeholder)

- **File:** `src/data/providers/liveProvider.stub.ts`
- **Status:** Not implemented — every method throws
- **Wired:** No — not imported in `index.ts`
- **Purpose:** Type-check future implementation against the same contract

## Entry point

**File:** `src/data/providers/index.ts`

```typescript
export const dataProvider = resolveProvider();
```

`resolveProvider()` returns `demoProvider` when `isDemoMode()` is true (always, today).

## Contract methods (overview)

The provider exposes grouped methods for each module. Examples:

| Area | Methods (representative) |
|------|--------------------------|
| Members | `getMembers`, `getMemberById`, … |
| Attendance | Session and register data |
| Finance | Dashboard, transactions, import demo |
| Gift Aid | Declarations, eligible donations |
| Communications | Templates, groups, inbox |
| Documents | Library, scanned notes |
| Staff | Qualifications, rota, wages |
| Fundraising | Campaigns, businesses, donors |
| Reports/Audit | Report cards, audit log, demo script |

Full method list: see `ClubOpsDataProvider` in `types.ts`.

## Module-specific demo providers

Some modules use additional demo-only context providers (e.g. attendance session state, finance import review). These wrap or extend demo behaviour for session mutations.

**Live mode:** Replace session contexts with server mutations + audit; keep the same UI components where possible.

## Rules for extending the contract

1. Add types to `types.ts` first.
2. Implement in `demoProvider.ts` with fake data.
3. Add stub throw in `liveProvider.stub.ts`.
4. Document in CHANGELOG and DATA_MODEL.md if new entities are introduced.
5. Do not implement live reads/writes until server RBAC exists.

## Shared types

Domain types (`MemberProfile`, `AuditEvent`, `FinanceTransaction`, etc.) live in `types.ts` and are shared by:

- Demo data files
- UI components
- Future database mappers

Keep types **provider-agnostic** — no database-specific fields in UI-facing types.

## TODO markers for live implementation

Search codebase for:

- `TODO: RBAC` — sensitive field access
- `Future live provider` — in provider files
- `liveProvider.stub.ts` — method stubs

## UI blueprint

`/settings/provider-model` explains this architecture for committees and developers.

## Related documents

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [LIVE_MODE_PLAN.md](./LIVE_MODE_PLAN.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
