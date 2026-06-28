import type { MemberProfile, MemberFormData, AuditEvent, MemberStatus } from "@/data/providers/types";
import {
  attendanceTier,
  documentsStatusLabel,
  profileNeedsAttention,
} from "@/lib/memberProfileSummary";

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export function getMemberDisplayName(profile: Pick<MemberProfile, "firstName" | "lastName">): string {
  return `${profile.firstName} ${profile.lastName}`;
}

export function getMemberInitials(profile: Pick<MemberProfile, "firstName" | "lastName">): string {
  return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
}

export function profileToFormData(profile: MemberProfile): MemberFormData {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    dateOfBirth: profile.dateOfBirth,
    classGroup: profile.classGroup,
    parentCarerName: profile.parentCarer.name === "N/A" ? "" : profile.parentCarer.name,
    parentCarerEmail: profile.parentCarer.email,
    parentCarerPhone: profile.parentCarer.phone,
    emergencyContactName: profile.emergencyContact.name,
    emergencyContactPhone: profile.emergencyContact.phone,
    authorisedPickupNotes: profile.authorisedPickup
      .map((p) => (p.notes ? `${p.name} (${p.notes})` : p.name))
      .join("; "),
    medicalNotes: profile.medicalNotes ?? "",
    allergies: profile.allergies.join(", "),
    consentStatus: profile.consentStatus,
    giftAidStatus: profile.giftAidStatus,
  };
}

export function formDataToProfile(
  data: MemberFormData,
  existing?: MemberProfile,
): MemberProfile {
  const allergies = data.allergies
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const hasMedicalFlag = allergies.length > 0 || data.medicalNotes.trim().length > 0;
  const emergencyComplete =
    data.emergencyContactName.trim() && data.emergencyContactPhone.trim()
      ? "complete"
      : data.emergencyContactName.trim() || data.emergencyContactPhone.trim()
        ? "partial"
        : "missing";

  const pickupEntries = data.authorisedPickupNotes
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(/^(.+?)\s*\((.+)\)$/);
      return match
        ? { name: match[1].trim(), notes: match[2].trim() }
        : { name: entry };
    });

  return {
    id: existing?.id ?? `mem-${Date.now()}`,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    dateOfBirth: data.dateOfBirth,
    classGroup: data.classGroup,
    status: existing?.status ?? "active",
    joinedDate: existing?.joinedDate ?? new Date().toISOString().slice(0, 10),
    membershipType: existing?.membershipType ?? "Junior",
    parentCarer: {
      name: data.parentCarerName.trim() || "N/A",
      email: data.parentCarerEmail.trim(),
      phone: data.parentCarerPhone.trim(),
      relationship: existing?.parentCarer.relationship ?? "Parent/Carer",
    },
    emergencyContact: {
      name: data.emergencyContactName.trim(),
      phone: data.emergencyContactPhone.trim(),
      relationship: "Emergency contact",
    },
    emergencyContactComplete: emergencyComplete as MemberProfile["emergencyContactComplete"],
    authorisedPickup: pickupEntries.length > 0 ? pickupEntries : [{ name: data.parentCarerName.trim() || "TBC" }],
    medicalSummary: hasMedicalFlag
      ? data.medicalNotes.trim() || "See medical notes"
      : "No known conditions",
    medicalNotes: data.medicalNotes.trim() || undefined,
    allergies,
    hasMedicalFlag,
    consentStatus: data.consentStatus,
    giftAidStatus: data.giftAidStatus,
    finance: existing?.finance ?? { status: "unpaid", outstandingAmount: 45.0 },
    attendance: existing?.attendance ?? { percentage: 0, sessionsAttended: 0, sessionsTotal: 0 },
    documents: existing?.documents ?? [],
    notes: existing?.notes ?? [],
    auditEvents: existing?.auditEvents ?? [],
  };
}

export function createAuditEvent(
  action: string,
  memberName: string,
  details?: string,
): AuditEvent {
  return {
    id: `aud-local-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Admin",
    action,
    resource: "members",
    details: details ?? `${action} member record — ${memberName}`,
  };
}

export const CLASS_GROUPS = [
  "Mini Gym — Saturday",
  "Recreational — Tuesday",
  "Competitive Squad — Thursday",
  "Adult Recreational — Wednesday",
] as const;

export const emptyFormData: MemberFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  classGroup: CLASS_GROUPS[1],
  parentCarerName: "",
  parentCarerEmail: "",
  parentCarerPhone: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  authorisedPickupNotes: "",
  medicalNotes: "",
  allergies: "",
  consentStatus: "missing",
  giftAidStatus: "missing",
};

export type MemberFilterKey =
  | "all"
  | "active"
  | "inactive"
  | "archived"
  | "medical"
  | "unpaid"
  | "missing-gift-aid"
  | "incomplete-emergency"
  | "needs-attention"
  | "missing-forms"
  | "low-attendance";

export function matchesFilter(profile: MemberProfile, filter: MemberFilterKey): boolean {
  switch (filter) {
    case "all":
      return true;
    case "active":
      return profile.status === "active";
    case "inactive":
      return profile.status === "inactive";
    case "archived":
      return profile.status === "archived";
    case "medical":
      return profile.hasMedicalFlag;
    case "unpaid":
      return profile.finance.status === "unpaid" || profile.finance.status === "partial";
    case "missing-gift-aid":
      return profile.giftAidStatus === "missing";
    case "incomplete-emergency":
      return profile.emergencyContactComplete !== "complete";
    case "needs-attention":
      return profileNeedsAttention(profile);
    case "missing-forms":
      return profile.consentStatus !== "complete" || documentsStatusLabel(profile) === "Missing forms";
    case "low-attendance":
      return attendanceTier(profile) === "Low";
    default:
      return true;
  }
}

export function matchesSearch(profile: MemberProfile, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const name = getMemberDisplayName(profile).toLowerCase();
  return (
    name.includes(q) ||
    profile.classGroup.toLowerCase().includes(q) ||
    profile.parentCarer.name.toLowerCase().includes(q)
  );
}

export function statusBadgeVariant(
  status: MemberStatus,
): "success" | "warning" | "default" {
  if (status === "active") return "success";
  if (status === "inactive") return "warning";
  return "default";
}
