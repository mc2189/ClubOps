# ClubOps — Migration Plan

Staged path from **Demo Mode** (today) to **Live Mode** (future). Demo Mode remains permanent throughout.

UI summary: `/settings/production-roadmap`

## Stage 1 — Current state (complete)

**Public demo, fake data, session-only changes.**

| Deliverable | Status |
|-------------|--------|
| `demoProvider` for all modules | Done |
| Public Vercel demo | Done |
| Demo script and QA checklist | Done |
| RBAC preview (client-side, v1.1.0) | Done |
| Architecture blueprint (v1.2.0) | Done |

**Risks:** Accidentally loading real data into demo deployment.

**Mitigation:** Always use `demoProvider` on public URL; policy documented in SECURITY.md.

---

## Stage 2 — Live foundation

**Real auth, server-side route protection, database, real RBAC.**

| Deliverable | Notes |
|-------------|-------|
| Auth provider choice | Email/magic link/SSO — document decision |
| Database + migrations | PostgreSQL or similar recommended |
| `liveProvider` skeleton | Read path for one module |
| Server actions/API with auth checks | Every mutation authorised server-side |
| Environment separation | Demo vs live deployments |

**Dependencies:** Stable `ClubOpsDataProvider` contract (v1.2.0).

**Risks:** Treating client RBAC preview as real security.

**Exit criteria:** Unauthenticated requests cannot read or write live data.

---

## Stage 3 — Core live records

**Members, parents, attendance, staff, document metadata.**

| Deliverable | Notes |
|-------------|-------|
| Member CRUD | Parents, emergency contacts, pickup |
| Attendance persistence | Sessions and registers |
| Staff records | Qualifications metadata (not files yet) |
| Document metadata | No binary storage yet |
| Seed data | Training/demo clubs only — not production member data |

**Dependencies:** Stage 2.

**Risks:** Schema changes without migrations.

**Exit criteria:** One club can run day-to-day member and attendance operations live.

---

## Stage 4 — Sensitive modules

**Medical/welfare, documents, finance, Gift Aid, persistent audit.**

| Deliverable | Notes |
|-------------|-------|
| Secure file storage | Private bucket, signed URLs, virus scan |
| Append-only audit log | All sensitive access logged |
| Medical/welfare RBAC | Welfare officer enforcement server-side |
| Finance + Gift Aid | Treasurer-only; export controls |
| Field encryption | If required for highest sensitivity |

**Dependencies:** Stage 3 + server RBAC proven.

**Risks:** Safeguarding exposure; finance breach.

**Exit criteria:** Sensitive modules pass security review checklist.

---

## Stage 5 — Integrations

**Email, file processing, exports, optional bank/payments.**

| Deliverable | Notes |
|-------------|-------|
| Email delivery provider | Audited sends |
| Export pipeline | Real PDF/CSV with permission checks |
| Bank import (optional) | Read-only; no demo bank data |
| Webhook security | Verified signatures |

**Dependencies:** Stage 4.

**Risks:** Third-party data leakage.

---

## Stage 6 — Production hardening

**Backups, monitoring, incident response, retention, go-live.**

| Deliverable | Notes |
|-------------|-------|
| Backup/restore tested | Document RTO/RPO |
| Monitoring and alerts | Failed auth, export spikes |
| DPA and retention docs | GDPR, safeguarding |
| Go-live checklist | Committee sign-off |
| Demo deployment unchanged | Public URL still fake data |

**Dependencies:** Stage 5.

**Risks:** No recovery plan; non-compliance.

---

## Recommended build order

1. Freeze provider contract (v1.2.0)
2. Choose auth strategy
3. Database schema v1 from DATA_MODEL.md
4. Server-side RBAC middleware
5. `liveProvider` read path (members first)
6. `liveProvider` write path + audit
7. Secure file storage
8. Sensitive modules (finance, Gift Aid, medical)
9. Integrations and exports
10. Production hardening

See `/settings/production-roadmap` for risk-if-skipped notes.

## Rollback strategy

- Demo deployment unaffected at all stages
- Live deployments use database migrations with down scripts where safe
- Feature flags for enabling live modules per club

## What not to do

- Do not add Supabase/Firebase/Prisma/Neon until explicitly planned
- Do not wire `liveProvider` to public demo
- Do not store real data in demo JSON files
- Do not skip audit for "quick" live launch

## Related documents

- [LIVE_MODE_PLAN.md](./LIVE_MODE_PLAN.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
