import type { AuditEvent, MemberProfile } from "@/data/providers/types";
import { getMemberDisplayName } from "@/lib/members";

export type AttendanceTier = "Good" | "Watch" | "Low";

export interface AttentionItem {
  id: string;
  title: string;
  action: string;
  href?: string;
  tab?: "medical" | "finance" | "documents" | "parents" | "attendance";
}

export interface StatusTile {
  id: string;
  label: string;
  value: string;
  hint?: string;
}

export interface ActivityTimelineItem {
  id: string;
  text: string;
  date?: string;
}

export function feeStatusLabel(profile: MemberProfile): string {
  switch (profile.finance.status) {
    case "paid":
      return "Paid";
    case "partial":
      return "Part-paid";
    case "unpaid":
    case "overdue":
      return "Owes fees";
    default:
      return "N/A";
  }
}

export function attendanceTier(profile: MemberProfile): AttendanceTier {
  if (profile.attendance.percentage >= 85) return "Good";
  if (profile.attendance.percentage >= 70) return "Watch";
  return "Low";
}

export function attendanceLabel(profile: MemberProfile): string {
  return `${profile.attendance.percentage}% this term · ${attendanceTier(profile)}`;
}

export function documentsStatusLabel(profile: MemberProfile): string {
  const hasPhotoConsent = profile.documents.some(
    (d) =>
      d.title.toLowerCase().includes("photo") ||
      d.title.toLowerCase().includes("consent") ||
      d.category.toLowerCase().includes("consent"),
  );
  if (profile.consentStatus === "complete" && (hasPhotoConsent || profile.documents.length > 0)) {
    return "Complete";
  }
  return "Missing forms";
}

export function giftAidSummaryLabel(profile: MemberProfile): string {
  switch (profile.giftAidStatus) {
    case "declared":
      return "Declaration on file";
    case "expired":
      return "Declaration expired";
    case "n/a":
      return "Not applicable";
    default:
      return "Declaration missing";
  }
}

export function feeSummaryLine(profile: MemberProfile): string {
  if (profile.finance.status === "paid") return "June fee paid";
  if (profile.finance.status === "partial") {
    return `Part-paid — £${profile.finance.outstandingAmount.toFixed(2)} outstanding`;
  }
  if (profile.finance.status === "unpaid" || profile.finance.status === "overdue") {
    return "June fee unpaid";
  }
  return "No fee record";
}

export function communicationsSummary(profile: MemberProfile): string {
  if (profile.parentCarer.email) return `Email preferred — ${profile.parentCarer.email}`;
  if (profile.parentCarer.phone) return `Phone contact — ${profile.parentCarer.phone}`;
  return "No contact method on file";
}

export function medicalSummaryLine(
  profile: MemberProfile,
  canViewMedicalDetail: boolean,
): string {
  if (!profile.hasMedicalFlag) return "No medical flag";
  if (canViewMedicalDetail) return profile.medicalSummary ?? "Medical flag — see Medical tab";
  return "Restricted to Welfare Officer";
}

export function profileNeedsAttention(profile: MemberProfile): boolean {
  return getNeedsAttentionItems(profile).length > 0;
}

export function getNeedsAttentionItems(profile: MemberProfile): AttentionItem[] {
  const items: AttentionItem[] = [];

  if (profile.consentStatus !== "complete") {
    items.push({
      id: "photo-consent",
      title: "Photo consent form missing",
      action:
        "Ask parent to complete the consent form before using photos in club updates.",
      href: "/documents",
      tab: "documents",
    });
  } else if (documentsStatusLabel(profile) === "Missing forms") {
    items.push({
      id: "forms-missing",
      title: "Membership or consent forms missing",
      action: "Check which forms are outstanding and ask the parent to return them.",
      href: "/documents",
      tab: "documents",
    });
  }

  if (profile.emergencyContactComplete !== "complete") {
    items.push({
      id: "emergency",
      title: "Emergency contact needs checked",
      action: "Confirm emergency contact name and phone number are correct and complete.",
      tab: "parents",
    });
  }

  if (
    profile.finance.status === "unpaid" ||
    profile.finance.status === "overdue" ||
    profile.finance.status === "partial"
  ) {
    items.push({
      id: "fees",
      title:
        profile.finance.status === "partial" ? "Fee part-paid" : "June fee unpaid",
      action:
        "Review the fee record and follow up with parent if payment is overdue.",
      href: "/finance/fees",
      tab: "finance",
    });
  }

  if (profile.giftAidStatus === "missing" || profile.giftAidStatus === "expired") {
    items.push({
      id: "gift-aid",
      title:
        profile.giftAidStatus === "expired"
          ? "Gift Aid declaration expired"
          : "Gift Aid declaration missing",
      action: "Send a Gift Aid declaration request to the parent (simulated in Communications).",
      href: "/communications/compose?preset=gift-aid",
    });
  }

  if (attendanceTier(profile) === "Low") {
    items.push({
      id: "attendance",
      title: "Attendance below expected level",
      action: "Check recent absences and contact parent if a pattern is developing.",
      href: "/attendance",
      tab: "attendance",
    });
  }

  if (profile.hasMedicalFlag) {
    items.push({
      id: "medical",
      title: "Medical / welfare note on file",
      action:
        "Detailed medical notes are restricted. Welfare Officer can view and update welfare information.",
      tab: "medical",
    });
  }

  return items;
}

export function getStatusTiles(
  profile: MemberProfile,
  canViewMedicalDetail: boolean,
): StatusTile[] {
  return [
    { id: "fees", label: "Fees", value: feeSummaryLine(profile) },
    { id: "attendance", label: "Attendance", value: attendanceLabel(profile) },
    { id: "gift-aid", label: "Gift Aid", value: giftAidSummaryLabel(profile) },
    {
      id: "documents",
      label: "Documents",
      value:
        documentsStatusLabel(profile) === "Complete"
          ? "Forms on file"
          : "Photo consent missing",
    },
    {
      id: "communications",
      label: "Communications",
      value: communicationsSummary(profile).split(" — ")[0] ?? "Contact on file",
      hint: profile.parentCarer.name !== "N/A" ? profile.parentCarer.name : undefined,
    },
    {
      id: "medical",
      label: "Medical",
      value: medicalSummaryLine(profile, canViewMedicalDetail),
    },
  ];
}

export function getLastUpdateLine(
  profile: MemberProfile,
  auditEvents: AuditEvent[],
): string {
  const latest = auditEvents[0];
  if (latest) {
    return latest.details;
  }
  if (profile.notes[0]) {
    return profile.notes[0].content;
  }
  return "No recent updates in demo data";
}

export function buildRecentActivity(
  profile: MemberProfile,
  auditEvents: AuditEvent[],
): ActivityTimelineItem[] {
  const items: ActivityTimelineItem[] = [];

  for (const event of auditEvents.slice(0, 4)) {
    items.push({
      id: event.id,
      text: event.details,
      date: event.timestamp,
    });
  }

  if (profile.finance.lastPaymentDate && profile.finance.status === "paid") {
    items.push({
      id: "fee-matched",
      text: "Fee matched from sample bank statement (demo)",
      date: profile.finance.lastPaymentDate,
    });
  }

  if (
    profile.finance.status === "unpaid" ||
    profile.finance.status === "overdue" ||
    profile.finance.status === "partial"
  ) {
    items.push({
      id: "fee-reminder",
      text: "Parent fee reminder could be drafted in Communications",
    });
  }

  if (profile.attendance.percentage >= 85) {
    items.push({
      id: "attendance-ok",
      text: `Attendance marked present — ${profile.attendance.percentage}% this term`,
    });
  }

  if (profile.giftAidStatus === "declared") {
    items.push({
      id: "gift-aid-ok",
      text: "Gift Aid declaration on file",
    });
  } else if (profile.giftAidStatus === "missing") {
    items.push({
      id: "gift-aid-missing",
      text: "Gift Aid declaration still missing",
    });
  }

  if (profile.consentStatus !== "complete") {
    items.push({
      id: "consent-missing",
      text: "Photo consent still missing",
    });
  }

  if (profile.notes[0] && !items.some((i) => i.text.includes(profile.notes[0].content))) {
    items.push({
      id: profile.notes[0].id,
      text: profile.notes[0].content,
      date: profile.notes[0].date,
    });
  }

  const seen = new Set<string>();
  return items
    .filter((item) => {
      if (seen.has(item.text)) return false;
      seen.add(item.text);
      return true;
    })
    .slice(0, 6);
}

export function memberListScanLine(profile: MemberProfile): string {
  return `${profile.classGroup} · ${getMemberDisplayName(profile)}`;
}
