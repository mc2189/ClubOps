import type { PermissionModule } from "@/lib/permissions";
import type { ModuleStatusTone } from "@/lib/moduleTaskFlow";
import { DEMO_OUTSTANDING_FEE_COUNT } from "@/data/demo/fees";
import {
  demoCommitteePack,
  demoGiftAidPack,
  demoMemberPack,
} from "@/data/demo/reportsAuditData";
import { formatReportCurrency } from "@/lib/reports";

export interface CommitteePackSection {
  id: string;
  title: string;
  status: string;
  statusTone: ModuleStatusTone;
  highlights: string[];
  attention: string;
  moduleHref: string;
  actionLabel: string;
  permissionModule?: PermissionModule;
}

export interface CommitteePackNote {
  id: string;
  text: string;
  href?: string;
}

export interface CommitteeReadinessItem {
  id: string;
  label: string;
  complete: boolean;
}

export interface CommitteePackPreviewData {
  summaryTitle: string;
  summaryText: string;
  sections: CommitteePackSection[];
  notes: CommitteePackNote[];
  readiness: CommitteeReadinessItem[];
  readyForPreview: boolean;
}

const MATCHABLE_DEMO_AMOUNT = 256;

export function buildCommitteePackPreview(exportPreviewed = false): CommitteePackPreviewData {
  const sections: CommitteePackSection[] = [
    {
      id: "membership",
      title: "Membership",
      status: `${3} records need attention`,
      statusTone: "pending",
      highlights: [
        `${demoMemberPack.activeMembers} active demo members`,
        `Photo consent missing for 2 demo members`,
      ],
      attention: "Missing forms or emergency details can slow down club admin.",
      moduleHref: "/members?filter=needs-attention",
      actionLabel: "Review members",
      permissionModule: "members",
    },
    {
      id: "attendance",
      title: "Attendance",
      status: `${demoCommitteePack.averageAttendance}% average this month`,
      statusTone: "resolved",
      highlights: [
        `${demoMemberPack.attendanceConcerns} member with low attendance flagged`,
        "Registers mostly complete for demo week",
      ],
      attention: "Follow up repeated absences before the next committee review.",
      moduleHref: "/attendance/register",
      actionLabel: "Open register",
      permissionModule: "attendance",
    },
    {
      id: "finance",
      title: "Finance",
      status: `${4} payments need review`,
      statusTone: "pending",
      highlights: [
        `${formatReportCurrency(MATCHABLE_DEMO_AMOUNT)} could be matched to member fees`,
        `${DEMO_OUTSTANDING_FEE_COUNT} unpaid fee records in demo`,
      ],
      attention: "Unmatched payments should be reviewed before fee reminders are sent.",
      moduleHref: "/finance/import",
      actionLabel: "Review payments",
      permissionModule: "finance",
    },
    {
      id: "gift-aid",
      title: "Gift Aid",
      status: "Claim not ready",
      statusTone: "pending",
      highlights: [
        `${demoGiftAidPack.missingDeclarations} declarations need checking`,
        `${formatReportCurrency(demoGiftAidPack.estimatedReclaim)} estimated reclaim in demo`,
      ],
      attention: "Do not prepare a claim until missing declarations are checked.",
      moduleHref: "/gift-aid/review",
      actionLabel: "Review Gift Aid",
      permissionModule: "gift-aid",
    },
    {
      id: "documents",
      title: "Documents & forms",
      status: `${demoMemberPack.documentsMissing} forms missing`,
      statusTone: "pending",
      highlights: [
        `${demoCommitteePack.missingDocuments} document items flagged in demo`,
        "Consent and registration forms need follow-up",
      ],
      attention: "Assign uploaded demo documents and chase missing forms.",
      moduleHref: "/documents/missing",
      actionLabel: "Check missing forms",
      permissionModule: "documents",
    },
    {
      id: "staff",
      title: "Staff & volunteers",
      status: `${2} rota gaps`,
      statusTone: "pending",
      highlights: [
        `${demoCommitteePack.staffAlerts} open staff alerts in demo`,
        "1 qualification nearing review",
      ],
      attention: "Volunteer cover should be reviewed for upcoming sessions.",
      moduleHref: "/staff/rota",
      actionLabel: "Review volunteer cover",
      permissionModule: "staff",
    },
    {
      id: "fundraising",
      title: "Fundraising",
      status: `${formatReportCurrency(demoCommitteePack.fundraisingRaised)} raised in demo`,
      statusTone: "reviewed",
      highlights: [
        "Equipment fund at 64% of target",
        "Business pledges need follow-up",
      ],
      attention: "Thank-yous and sponsor follow-ups remain on the demo list.",
      moduleHref: "/fundraising/follow-ups",
      actionLabel: "Review follow-ups",
      permissionModule: "fundraising",
    },
    {
      id: "actions",
      title: "Actions for committee",
      status: `${demoCommitteePack.actionsNeedingAttention.length} items to discuss`,
      statusTone: "pending",
      highlights: demoCommitteePack.actionsNeedingAttention.slice(0, 3),
      attention: "Use the full committee pack page for the complete action list.",
      moduleHref: "/reports/committee-pack",
      actionLabel: "Open full pack",
      permissionModule: "reports",
    },
  ];

  const notes: CommitteePackNote[] = [
    {
      id: "note-finance",
      text: "Unmatched payments should be reviewed before fee reminders are sent.",
      href: "/finance/import",
    },
    {
      id: "note-members",
      text: "Some member records are missing consent or emergency details.",
      href: "/members?filter=needs-attention",
    },
    {
      id: "note-giftaid",
      text: "Gift Aid claim should not be prepared until missing declarations are checked.",
      href: "/gift-aid/declarations",
    },
    {
      id: "note-staff",
      text: "Volunteer cover should be reviewed for upcoming sessions.",
      href: "/staff/rota",
    },
  ];

  const readiness: CommitteeReadinessItem[] = [
    { id: "members", label: "Member records reviewed", complete: false },
    { id: "payments", label: "Unmatched payments checked", complete: false },
    { id: "giftaid", label: "Gift Aid declarations checked", complete: false },
    { id: "forms", label: "Missing forms reviewed", complete: false },
    { id: "staff", label: "Volunteer cover reviewed", complete: false },
    { id: "export", label: "Demo export previewed", complete: exportPreviewed },
  ];

  const readyForPreview = exportPreviewed;

  return {
    summaryTitle: "Committee summary",
    summaryText:
      "The demo club is broadly up to date, but payment matching, missing forms and Gift Aid declarations need attention before the next committee review. Finance and member records are the most useful places to start.",
    sections,
    notes,
    readiness,
    readyForPreview,
  };
}

export const EXPORT_CENTRE_GROUP_ORDER = [
  "Committee pack",
  "Finance",
  "Gift Aid",
  "Attendance",
  "Members",
  "Fundraising",
  "Staff",
  "Audit/security",
] as const;

export type ExportCentreGroup = (typeof EXPORT_CENTRE_GROUP_ORDER)[number];
