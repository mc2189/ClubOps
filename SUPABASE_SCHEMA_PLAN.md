# Supabase Schema Plan

**Draft only — v1.4.0. Not applied to any Supabase project.**

## Location

`supabase/migrations/001_core_auth_and_clubs.sql` through `009_reports_and_audit.sql`

## Tables by migration

| File | Tables |
|------|--------|
| 001 | clubs, profiles, club_memberships, roles, role_permissions, user_roles |
| 002 | members, parent_carers, member_parent_links, emergency_contacts, authorised_pickups |
| 003 | attendance_sessions, attendance_register_entries |
| 004 | finance_transactions, fee_records, expenses, gift_aid_declarations, gift_aid_donations |
| 005 | communication_templates, communication_messages, digital_forms, form_responses |
| 006 | documents, scanned_notes |
| 007 | staff_profiles, qualifications, venues, rota_entries, wage_prep_items, outgoings |
| 008 | fundraising_campaigns, donors, business_leads, sponsorships, follow_ups |
| 009 | report_exports, audit_events |

## Conventions

- UUID primary keys (`gen_random_uuid()`)
- `club_id` on all tenant-scoped tables
- `created_at`, `updated_at` timestamps
- Soft archive: `archived_at`, `archived_by`, `archive_reason` where appropriate
- `profiles.id` references `auth.users(id)`

## Not in v1.4.0

- Applied migrations on a live project
- Seed data with real member information
- Generated TypeScript types from DB (future: `supabase gen types`)

## UI

`/settings/schema-plan`

## Related

- [DATA_MODEL.md](./DATA_MODEL.md)
- [SUPABASE_RLS_PLAN.md](./SUPABASE_RLS_PLAN.md)
