import type { Communication } from "@/data/providers/types";

export const demoCommunications: Communication[] = [
  {
    id: "com-001",
    subject: "Summer term schedule update",
    channel: "email",
    sentDate: "2026-06-20",
    recipientCount: 42,
    status: "sent",
  },
  {
    id: "com-002",
    subject: "Club AGM — save the date",
    channel: "email",
    sentDate: "2026-06-18",
    recipientCount: 58,
    status: "sent",
  },
  {
    id: "com-003",
    subject: "Outstanding membership fees reminder",
    channel: "email",
    sentDate: "2026-06-25",
    recipientCount: 8,
    status: "scheduled",
  },
  {
    id: "com-004",
    subject: "Charity bake sale volunteers needed",
    channel: "notice",
    sentDate: "2026-06-15",
    recipientCount: 0,
    status: "draft",
  },
];
