import type { AuditEvent, ExportPackItem } from "@/data/providers/types";
import type { DemoRoleId, PermissionModule, PermissionPreviewLevel } from "@/lib/permissions";
import { getPermissionPreviewLevel } from "@/lib/permissions";

export function createReportsAuditEvent(action: string, details: string): AuditEvent {
  return {
    id: `aud-rpt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Treasurer",
    action,
    resource: "reports",
    module: "Reports",
    details,
    riskLevel: "sensitive",
    status: "recorded",
    linkedHref: "/audit/activity",
  };
}

export const reportsSubNav = [
  { href: "/reports/finance-pack", label: "Finance Pack" },
  { href: "/reports/committee-pack", label: "Committee Pack" },
  { href: "/reports/gift-aid-pack", label: "Gift Aid Pack" },
  { href: "/reports/member-pack", label: "Member Pack" },
  { href: "/reports/export-centre", label: "Export Centre" },
];

export const auditSubNav = [
  { href: "/audit/activity", label: "Activity" },
  { href: "/audit/security", label: "Security" },
];

export const sensitivityVariant = {
  normal: "default" as const,
  sensitive: "warning" as const,
  restricted: "danger" as const,
};

export const riskVariant = sensitivityVariant;

export const formatReportCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);

export function exportItemPermissionModule(item: ExportPackItem): PermissionModule {
  switch (item.category) {
    case "Finance":
      return "finance";
    case "Gift Aid":
      return "gift-aid";
    case "Members":
      return item.sensitivity === "restricted" ? "members-sensitive" : "members";
    case "Staff":
      return "staff";
    case "Fundraising":
      return "fundraising";
    case "Attendance":
      return "attendance";
    case "Audit/security":
      return item.sensitivity === "restricted" ? "documents-sensitive" : "audit";
    default:
      return "reports";
  }
}

export function exportItemAccessLevel(
  role: DemoRoleId,
  item: ExportPackItem,
): PermissionPreviewLevel {
  const permissionModule = exportItemPermissionModule(item);
  const level = getPermissionPreviewLevel(role, permissionModule);
  if (level === "restricted" && item.sensitivity === "restricted") {
    return "restricted";
  }
  if (item.category === "Finance" || item.category === "Gift Aid") {
    return getPermissionPreviewLevel(role, permissionModule);
  }
  return level;
}
