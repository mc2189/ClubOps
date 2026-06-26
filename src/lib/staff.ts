import type { AuditEvent, QualificationStatus, ComplianceStatus } from "@/data/providers/types";

export function createStaffAuditEvent(action: string, details: string): AuditEvent {
  return {
    id: `aud-stf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Secretary",
    action,
    resource: "staff",
    details,
  };
}

export const staffSubNav = [
  { href: "/staff/rota", label: "Rota" },
  { href: "/staff/qualifications", label: "Qualifications" },
  { href: "/staff/wages", label: "Wages" },
  { href: "/staff/venues", label: "Venues" },
  { href: "/staff/outgoings", label: "Outgoings" },
  { href: "/staff/alerts", label: "Alerts" },
];

export function statusVariant(
  status: QualificationStatus | ComplianceStatus,
): "success" | "warning" | "danger" | "info" | "default" {
  switch (status) {
    case "valid":
      return "success";
    case "expiring soon":
      return "warning";
    case "expired":
    case "missing":
      return "danger";
    case "needs review":
      return "info";
    default:
      return "default";
  }
}

export const alertSeverityVariant = {
  high: "danger" as const,
  medium: "warning" as const,
  low: "default" as const,
};

export const paymentStatusVariant = {
  paid: "success" as const,
  unpaid: "danger" as const,
  partial: "warning" as const,
  pending: "info" as const,
};

export const formatStaffCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
