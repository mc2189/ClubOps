# ClubOps — Project Overview

## Purpose

ClubOps reduces volunteer admin workload for sports clubs. The first demonstration target is a gymnastics club, but the product is designed to remain generic for other club types.

## Core modules

| Module             | Purpose                                      |
| ------------------ | -------------------------------------------- |
| Dashboard          | Overview metrics and recent activity         |
| Members            | Member records and membership management     |
| Attendance         | Session attendance tracking                  |
| Finance            | Income, expenses and fee tracking            |
| Gift Aid           | Declarations and HMRC claim support          |
| Communications     | Emails, notices and member messaging         |
| Documents          | Policies, forms and file storage             |
| Calendar           | Sessions, competitions and events            |
| Staff & Volunteers | Coaches, DBS and safeguarding records        |
| Fundraising        | Campaigns and donation tracking              |
| Reports            | Exports, committee packs and admin reports   |
| Audit Log          | Cross-module activity and evidence trail     |
| Demo Script        | Guided presentation walkthrough              |
| Settings           | Club configuration                           |

## Design principles

1. **Demo-first, live-ready** — works with fake data now, swappable to live data later.
2. **Volunteer-friendly** — simple UI for non-technical users.
3. **Security-conscious** — RBAC, audit trails, soft-delete, no real sensitive data in demo.
4. **Modular** — each module is independent and reusable.
5. **Accessible** — responsive, keyboard-navigable, screen-reader friendly.

## Demo club

The demo uses **Riverside Gymnastics Club** with entirely fictional members, staff and records.

## Data provider pattern

```
UI Page → dataProvider.getX() → demoProvider (now) / liveProvider (future)
```

All data access goes through `ClubOpsDataProvider` interface defined in `src/data/providers/types.ts`.

## v1.1.0 status

ClubOps v1.1.0 adds **demo role switching and RBAC preview** — a presentation tool showing how secretary, treasurer, coach and welfare roles would restrict access in live mode. This is **not real authentication** and does not protect real data. The demo remains publicly accessible without login.

The next phase after v1.1.0 is backend authentication and server-side authorisation for live mode.
