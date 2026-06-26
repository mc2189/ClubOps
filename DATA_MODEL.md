# ClubOps — Data Model

This document describes the **logical domain model** for ClubOps. Demo mode uses fake data implementing these shapes. Live mode will persist them in a relational database with row-level access controls.

## Entity groups

### Club & access

| Entity | Purpose | Sensitive fields | Module | Related |
|--------|---------|------------------|--------|---------|
| **Club** | Tenant organisation | Billing contact (future) | Settings | User, Role |
| **User** | Volunteer login identity | Email, auth IDs | Auth (future) | Role, Audit Event |
| **Role** | RBAC assignment | Permission grants | Settings/Auth | User, Permission |
| **Permission** | Module/action grant | Sensitive module flags | Settings | Role |

**Live access:** Admin only for club settings. Role changes require admin approval and audit.

**Retention:** Club active while subscribed; user accounts deleted on closure; role history retained in audit.

---

### Members & families

| Entity | Purpose | Sensitive fields | Module | Related |
|--------|---------|------------------|--------|---------|
| **Member** | Junior/adult member | DOB, class, status | Members | Parent, Attendance, Fee |
| **Parent/Carer** | Primary contact | Email, phone | Members | Member, Communication |
| **Emergency Contact** | Emergency details | Phone, relationship | Members | Member |
| **Authorised Pickup** | Collection authorisation | Names, notes | Members | Member |
| **Medical/Welfare Note** | Medical/safeguarding | Full notes, allergies | Members | Member, Document |

**Live access:** Secretary (general); coaches (session-limited); welfare (medical/safeguarding).

**Retention:** GDPR-aligned deletion when member leaves; safeguarding notes may need longer retention — seek legal advice.

---

### Attendance & staff

| Entity | Purpose | Sensitive fields | Module | Related |
|--------|---------|------------------|--------|---------|
| **Attendance Session** | Scheduled class | None typically | Attendance | Register, Staff |
| **Attendance Register** | Present/absent marks | Attendance patterns | Attendance | Member, Session |
| **Staff/Volunteer** | Coach/volunteer record | Contact, DBS ref | Staff | Qualification, Rota |
| **Qualification** | Certs, DBS, training | Expiry, cert refs | Staff | Staff, Document |
| **Rota Entry** | Session assignment | None | Staff | Staff, Session |
| **Wage Prep Item** | Session payment due | Amounts | Staff | Staff, Finance |
| **Venue** | Training location | Hire costs | Staff | Outgoing, Calendar |
| **Outgoing** | Hall hire, insurance | Amounts, payees | Staff/Finance | Finance, Document |

**Live access:** Coaches mark assigned registers; admin manages staff; treasurer sees wage prep amounts.

---

### Finance & Gift Aid

| Entity | Purpose | Sensitive fields | Module | Related |
|--------|---------|------------------|--------|---------|
| **Finance Transaction** | Ledger entry | Amounts, bank refs | Finance | Member, Donation |
| **Fee Record** | Membership fee status | Outstanding amounts | Finance | Member |
| **Expense** | Club outgoing | Amounts, receipts | Finance | Document |
| **Gift Aid Declaration** | HMRC declaration | Taxpayer details | Gift Aid | Member, Donation |
| **Gift Aid Donation** | Eligible donation | Amounts | Gift Aid | Finance, Declaration |

**Live access:** Treasurer and authorised admin only. Bank data encrypted at rest.

**Retention:** Typically 6+ years for accounts; HMRC rules for Gift Aid.

---

### Communications & documents

| Entity | Purpose | Sensitive fields | Module | Related |
|--------|---------|------------------|--------|---------|
| **Communication Message** | Sent/drafted notice | Recipient groups | Communications | Template, Member |
| **Communication Template** | Reusable template | None | Communications | Message |
| **Digital Form** | Attached form | Form fields | Communications | Form Response |
| **Form Response** | Parent reply | Matched member data | Communications | Member, Inbox |
| **Document** | File metadata | Category, sensitivity | Documents | Member, Staff |
| **Scanned Note** | Digitised paper note | Note content | Documents | Member, Document |

**Live access:** Secretary sends comms; welfare/admin for sensitive documents. Files in private storage — never public URLs for child/member files.

---

### Fundraising, reports & audit

| Entity | Purpose | Sensitive fields | Module | Related |
|--------|---------|------------------|--------|---------|
| **Fundraising Campaign** | Target and progress | None | Fundraising | Donor, Donation |
| **Donor** | Individual CRM | Contact details | Fundraising | Donation |
| **Business Lead** | Sponsor pipeline | Contact details | Fundraising | Sponsorship |
| **Sponsorship** | Sponsor tier | Contract refs | Fundraising | Business Lead |
| **Follow-Up** | Chase task | None | Fundraising | Donor, Business |
| **Report Export** | Generated pack | Depends on pack | Reports | Audit Event |
| **Audit Event** | Who/what/when | Action details | Audit | All modules |

**Live access:** Fundraising lead for CRM; role-gated exports; admin/committee read-only for audit summaries.

---

## Data classification

Every live record must be tagged with a classification. See categories in [SECURITY_LIVE_REQUIREMENTS.md](./SECURITY_LIVE_REQUIREMENTS.md) and the UI at `/settings/data-architecture`.

| Classification | Examples |
|----------------|----------|
| Public/demo | Fake names, sample amounts |
| Internal club admin | Class lists, non-sensitive reports |
| Parent/member contact | Email, phone, address |
| Child/member data | DOB, class, attendance |
| Medical/welfare/safeguarding | Allergies, injury notes, safeguarding |
| Financial | Bank transactions, fees |
| Gift Aid/tax | Declarations, claim data |
| Staff/volunteer | DBS, qualifications |
| Documents/files | Policies, receipts, scanned notes |
| Audit/security | Login events, role changes, exports |

## Relationship overview

```
Club ──< User ──< Role ──< Permission
  │
  └──< Member ──< Parent/Carer, Emergency Contact, Authorised Pickup
         │
         ├──< Medical/Welfare Note
         ├──< Attendance Register >── Attendance Session
         ├──< Fee Record, Gift Aid Declaration
         └──< Document / Scanned Note

Staff/Volunteer ──< Qualification, Rota Entry, Wage Prep Item
Finance Transaction ── Gift Aid Donation
Fundraising Campaign ── Donor, Business Lead ── Sponsorship
All modules ──> Audit Event (live: append-only)
```

## Suggested database outline (future — not implemented)

High-level tables only; no connection exists today.

```
clubs, users, roles, role_permissions, user_roles
members, parent_carers, emergency_contacts, authorised_pickups, medical_notes
attendance_sessions, attendance_registers, attendance_marks
staff, qualifications, rota_entries, wage_prep_items, venues, outgoings
finance_transactions, fee_records, expenses
gift_aid_declarations, gift_aid_donations
communication_messages, communication_templates, digital_forms, form_responses
documents (metadata), document_storage_refs
fundraising_campaigns, donors, business_leads, sponsorships, follow_ups
report_exports, audit_events (append-only)
```

**Tenant isolation:** All tables include `club_id`. Queries always filter by authenticated user's club.

**Files:** Binary content in object storage; `documents` table holds metadata and access policy only.

See [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) for when to implement each group.
