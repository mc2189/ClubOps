import type { AuditEvent, BusinessLeadStatus, GiftAidEligibility } from "@/data/providers/types";

export function createFundraisingAuditEvent(action: string, details: string): AuditEvent {
  return {
    id: `aud-fr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Treasurer",
    action,
    resource: "fundraising",
    details,
  };
}

export const fundraisingSubNav = [
  { href: "/fundraising/campaigns", label: "Campaigns" },
  { href: "/fundraising/donors", label: "Donors" },
  { href: "/fundraising/businesses", label: "Businesses" },
  { href: "/fundraising/sponsorships", label: "Sponsorships" },
  { href: "/fundraising/donations", label: "Donations" },
  { href: "/fundraising/follow-ups", label: "Follow-ups" },
  { href: "/fundraising/reports", label: "Reports" },
];

export const COMMUNICATIONS_LINKS = {
  sponsorshipRequest: "/communications/compose?preset=sponsorship-request",
  thankYou: "/communications/compose?template=tpl-announcement",
  campaignUpdate: "/communications/compose?template=tpl-fundraising",
  renewalReminder: "/communications/compose?preset=sponsorship-request",
  giftAidRequest: "/communications/compose?preset=gift-aid",
};

export const giftAidEligibilityVariant = (
  e: GiftAidEligibility | "eligible" | "not-eligible" | "needs-review",
): "success" | "warning" | "danger" | "info" | "default" => {
  switch (e) {
    case "eligible":
      return "success";
    case "not-eligible":
      return "default";
    case "needs-review":
      return "warning";
    default:
      return "default";
  }
};

export const giftAidEligibilityLabel = {
  eligible: "Gift Aid possible",
  "not-eligible": "Not Gift Aid eligible",
  "needs-review": "Needs review",
} as const;

export const businessStatusVariant = (
  status: BusinessLeadStatus,
): "success" | "warning" | "danger" | "info" | "default" => {
  switch (status) {
    case "donated":
    case "pledged":
      return "success";
    case "interested":
    case "contacted":
      return "info";
    case "renewal due":
      return "warning";
    case "declined":
      return "default";
    default:
      return "default";
  }
};

export const GIFT_AID_GUIDANCE = [
  "Business sponsorship is not Gift Aid eligible.",
  "Business donations are not Gift Aid eligible for Gift Aid.",
  "Individual donations from UK taxpayers may be Gift Aid eligible if all conditions are met.",
  "Raffle income, class fees and grants are not Gift Aid eligible.",
];

export const formatFundraisingCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
