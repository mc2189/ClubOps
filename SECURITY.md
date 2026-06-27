# ClubOps — Security Guidelines

## Demo mode safety

- All demo data is **fake**. No real names, addresses, medical records or financial data.
- Demo mode is permanently supported and safe to host publicly.
- No environment variables or secrets are required for the demo version.

## Data protection

- **No real child data** in demo or development.
- Medical, safeguarding and finance data must be treated as **sensitive** in live mode.
- Prefer **soft-delete / archive** over destructive deletion.
- Every data-changing action in live mode must create an **audit event**.

## Access control

- Role-based access control (RBAC) is **previewed in demo** (v1.1.0+) — client-side only.
- **v1.4.4:** Restricted content previews hide or summarise sensitive sections by demo role (medical, finance, Gift Aid, wages, exports). This is **not real security** — fake data may still exist in the client bundle.
- **v1.4.1:** RBAC notices clarify that the public demo keeps fake data visible for exploration where not locked; live mode would block server-side.
- Live mode requires **server-side** RBAC on every request — see [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md).
- TODO markers exist in code for future RBAC enforcement.
- Sensitive fields (medical notes, safeguarding records, finance details) require restricted access.

## Supabase foundation prep (v1.4.0)

- Draft schema, RLS and storage files in `supabase/` — **not applied**
- Client scaffold in `src/lib/supabase/` — **not wired** to demo routes
- `.env.example` documents future vars — **no keys committed**
- Public demo: no Supabase env vars required; build succeeds without them
- No login, no middleware, no liveProvider activation

- Data architecture blueprint documented in ARCHITECTURE.md, DATA_MODEL.md, MIGRATION_PLAN.md.
- Settings UI at `/settings/live-readiness`, `/settings/data-architecture`, `/settings/provider-model`, `/settings/production-roadmap`.
- `liveProvider.stub.ts` is a placeholder — **not wired** and must not be used with real data.
- Public demo must always use `demoProvider`.

## Integrations — prohibited in demo

- No real Gmail integration
- No real bank / Open Banking connections
- No real payment processing
- No Facebook or social media API connections
- No paid third-party APIs unless explicitly instructed

## Secrets and credentials

- Never commit `.env` files, API keys, tokens or credentials.
- Never commit real personal data or real club data.
- Use environment variables for all secrets in live mode.

## Upload handling

- File upload functionality must be designed defensively when implemented:
  - Validate file types and sizes
  - Scan for malware
  - Store outside web root
  - Generate audit events on upload/delete

## Demo RBAC preview (v1.1.0)

- Demo role switching is **not real authentication** — it does not protect real data on the public demo.
- Permission previews are client-side only; live mode requires server-side authorisation on every request.
- Role selection persists in **session storage** for the current browser tab (survives refresh; cleared when tab closes).
- RBAC-related audit events are session-only and merge into the audit activity feed on Reports/Audit pages.
- Use [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) before sharing the public demo URL.

## Audit and exports (v1.0.2 demo)

- Audit events in demo mode are **simulated** and reset on page refresh.
- Report exports do **not** generate real files in demo mode.
- Session-only UI changes (registers, inbox status, alerts, compose drafts) reset on refresh.
- Communications compose uses simulated send only — no real email delivery.
- Use [DEMO_QA_CHECKLIST.md](./DEMO_QA_CHECKLIST.md) before sharing the public demo URL.
- In live mode:
  - Audit logs must be **tamper-resistant** and retained
  - Exports must be **logged** and restricted by role
  - Medical/safeguarding data must **not** be casually exported
  - Financial exports require **treasurer/admin** access
  - Real **data retention policies** are required before production use

## Deployment

- The first public demo deployment must contain **fake data only**.
- Review SECURITY.md before any live data connection.

## Reporting

If you discover a security issue, do not commit sensitive details to the repository. Report privately to the project owner.
