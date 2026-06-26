import type { AuditEvent } from "@/data/providers/types";

export function createCommunicationsAuditEvent(action: string, details: string): AuditEvent {
  return {
    id: `aud-com-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Secretary",
    action,
    resource: "communications",
    details,
  };
}

export function applyTemplatePlaceholders(
  text: string,
  vars: Record<string, string>,
): string {
  let result = text;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }
  return result;
}

export const DEFAULT_PREVIEW_VARS: Record<string, string> = {
  parent_first_name: "Sarah",
  member_first_name: "Alex",
  class_name: "Recreational — Tuesday",
  amount_due: "£45.00",
  form_link: "https://demo.clubops.example/forms/gift-aid",
  event_name: "Regional Competition",
  event_date: "12 July 2026",
};

export const communicationsSubNav = [
  { href: "/communications/compose", label: "Compose" },
  { href: "/communications/templates", label: "Templates" },
  { href: "/communications/groups", label: "Groups" },
  { href: "/communications/history", label: "History" },
  { href: "/communications/forms", label: "Forms" },
  { href: "/communications/inbox", label: "Inbox" },
  { href: "/communications/rules", label: "Rules" },
];

export const GIFT_AID_COMPOSE_PRESET = {
  groupId: "grp-missing-giftaid",
  templateId: "tpl-giftaid",
  formId: "form-giftaid",
};

export const UNPAID_FEES_COMPOSE_PRESET = {
  groupId: "grp-unpaid-fees",
  templateId: "tpl-fee-reminder",
};

export const inboxStatusLabel = {
  "auto-filed": "Auto-filed",
  "needs-review": "Needs review",
  unresolved: "Unresolved",
} as const;

export const inboxStatusVariant = {
  "auto-filed": "success" as const,
  "needs-review": "warning" as const,
  unresolved: "danger" as const,
};
