import type { AuditEvent } from "@/data/providers/types";

export const demoAuditEvents: AuditEvent[] = [
  {
    id: "aud-001",
    timestamp: "2026-06-26T09:15:00Z",
    actor: "Demo Admin",
    action: "view",
    resource: "members",
    details: "Viewed member list",
  },
  {
    id: "aud-002",
    timestamp: "2026-06-25T14:30:00Z",
    actor: "Demo Treasurer",
    action: "create",
    resource: "finance",
    details: "Added income transaction: Monthly membership fees — June",
  },
  {
    id: "aud-003",
    timestamp: "2026-06-25T11:00:00Z",
    actor: "Demo Admin",
    action: "update",
    resource: "members",
    details: "Updated member status: Casey Morgan → inactive",
  },
  {
    id: "aud-004",
    timestamp: "2026-06-24T16:45:00Z",
    actor: "Demo Coach",
    action: "create",
    resource: "attendance",
    details: "Recorded attendance for Recreational Gym — Tuesday",
  },
  {
    id: "aud-005",
    timestamp: "2026-06-24T10:00:00Z",
    actor: "Demo Admin",
    action: "create",
    resource: "communications",
    details: "Scheduled email: Outstanding membership fees reminder",
  },
];
