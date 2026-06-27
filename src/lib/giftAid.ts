import type { AuditEvent, DeclarationStatus, GiftAidEligibility } from "@/data/providers/types";

export function createGiftAidAuditEvent(action: string, details: string): AuditEvent {
  return {
    id: `aud-ga-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Treasurer",
    action,
    resource: "gift-aid",
    details,
  };
}

export const declarationStatusLabel: Record<DeclarationStatus, string> = {
  valid: "Valid",
  missing: "Missing declaration",
  returned: "Returned",
  "needs-review": "Needs review",
  expired: "Expired",
  withdrawn: "Withdrawn",
};

export const declarationStatusVariant = (
  status: DeclarationStatus,
): "success" | "warning" | "danger" | "info" | "default" => {
  switch (status) {
    case "valid":
      return "success";
    case "missing":
      return "danger";
    case "returned":
      return "warning";
    case "needs-review":
      return "info";
    case "expired":
    case "withdrawn":
      return "default";
    default:
      return "default";
  }
};

export const eligibilityLabel: Record<GiftAidEligibility, string> = {
  eligible: "Eligible",
  "not-eligible": "Not eligible",
  "needs-review": "Needs review",
};

export const eligibilityVariant = (
  e: GiftAidEligibility,
): "success" | "danger" | "warning" => {
  switch (e) {
    case "eligible":
      return "success";
    case "not-eligible":
      return "danger";
    case "needs-review":
      return "warning";
  }
};

export const DECLARATION_REQUEST_PREVIEW = {
  subject: "Gift Aid declaration request — Arbroath Gymnastics Club",
  body: `Dear [Parent/Carer name],

We would like to invite you to complete a Gift Aid declaration for Arbroath Gymnastics Club.

If you are a UK taxpayer, the club can claim an extra 25p for every £1 you donate at no cost to you. This only applies to genuine voluntary donations — not class fees or membership payments.

Please complete the attached declaration form and return it to the club secretary.

This is a demo preview only. No email will be sent.

Kind regards,
Arbroath Gymnastics Club`,
};
