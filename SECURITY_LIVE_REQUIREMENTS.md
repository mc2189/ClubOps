# ClubOps — Live Mode Security Requirements

Requirements for a **production** ClubOps deployment with real club data. The public demo **does not** meet these requirements.

Also surfaced in UI: `/settings/security`, `/settings/live-readiness`.

## Authentication

- [ ] Real user authentication required — no anonymous access to live data
- [ ] Secure session management (httpOnly cookies or equivalent)
- [ ] Password policy or magic-link expiry
- [ ] Account lockout / rate limiting on failed login
- [ ] Failed login attempts logged to audit

## Authorisation

- [ ] **Server-side** RBAC on every API route, server action, and export
- [ ] Client role switcher (demo) must **not** be used for live security
- [ ] Role changes require **admin approval** and audit entry
- [ ] Principle of least privilege per volunteer role
- [ ] Medical/welfare/finance modules enforce extra checks server-side

## Data classification

All records classified — see `/settings/data-architecture` and [DATA_MODEL.md](./DATA_MODEL.md).

| Classification | Who accesses | Export | Audit |
|----------------|--------------|--------|-------|
| Public/demo | Anyone (demo URL) | None real | Simulated |
| Internal admin | Secretary, admin | Role-gated | Logged |
| Parent contact | Secretary, limited welfare | No bulk for coaches | Logged |
| Child/member | Secretary, assigned coaches | Restricted | Logged |
| Medical/welfare | Welfare officer, admin | Highly restricted | Every view logged |
| Financial | Treasurer, admin | Treasurer-only packs | All actions logged |
| Gift Aid/tax | Treasurer | Claim exports only | Logged |
| Staff/volunteer | Admin, welfare (DBS) | No public DBS export | Logged |
| Documents/files | Per category RBAC | Signed URL download | Upload/view/delete logged |
| Audit/security | Admin, committee summary | Admin full export | Meta-audit |

## Audit

- [ ] **Persistent** append-only audit log (not session-only)
- [ ] Tamper-resistant storage
- [ ] Fields: who, when, module, record, action, sensitivity level
- [ ] Before/after summary for sensitive edits where appropriate
- [ ] Export events logged
- [ ] Role change events logged
- [ ] Document view/download logged
- [ ] Medical/welfare access logged with sensitivity flag
- [ ] Finance and Gift Aid actions logged

**Demo vs live:** Demo audit events reset on refresh and are simulated. Live audit must survive restarts and be queryable for committee review.

## File storage

- [ ] Private storage buckets — no public child/member files
- [ ] Signed URLs or controlled download endpoints
- [ ] Role-based access per document category
- [ ] Virus/malware scanning on upload
- [ ] Metadata extraction where useful
- [ ] Retention and archive policy
- [ ] Audit every view, download, export, delete

## Financial and bank data

- [ ] Bank transaction data encrypted at rest
- [ ] Import pipelines validated and audited
- [ ] No bank credentials in repository
- [ ] Treasurer-only access to full transaction detail

## Safeguarding

- [ ] Medical/welfare notes restricted to authorised roles
- [ ] No casual export of safeguarding records
- [ ] Retention policy aligned with safeguarding guidance
- [ ] Soft-delete/archive preferred over hard delete

## Backups and recovery

- [ ] Automated backups with tested restore
- [ ] Recovery time objective documented
- [ ] Incident response plan

## Retention and deletion

- [ ] GDPR-aligned deletion process
- [ ] Member leave / data minimisation workflow
- [ ] Gift Aid and finance retention per HMRC/accountant guidance

## Demo deployment policy

- [ ] Public demo URL uses **demoProvider only**
- [ ] Public demo **never** contains real member, medical, or financial data
- [ ] Separate environment for live if/when deployed

## Integrations (when added)

- Email: consent, unsubscribe, audit sends
- Bank import: read-only where possible; no credential storage in frontend
- Payments: PCI scope minimisation; no card data in ClubOps DB if avoidable
- Webhooks: signature verification

## Related documents

- [SECURITY.md](./SECURITY.md) — current demo guidelines
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) — when to implement each control
- [ARCHITECTURE.md](./ARCHITECTURE.md)
