import type {
  AuditEvent,
  ReportCard,
  ExportPackItem,
  FinancePackData,
  CommitteePackData,
  GiftAidPackData,
  MemberPackData,
  ClubHealthMetric,
  DemoScriptStep,
  ReportsAuditPageData,
} from "@/data/providers/types";
import type { ReportSummary } from "@/data/providers/types";
import { DEMO_OUTSTANDING_FEE_COUNT } from "@/data/demo/fees";

export const demoAuditLog: AuditEvent[] = [
  { id: "aud-001", timestamp: "2026-06-26T09:15:00Z", actor: "Demo Admin", action: "view", resource: "members", module: "Members", details: "Viewed member list", affectedRecord: "All members", riskLevel: "normal", status: "recorded", linkedHref: "/members" },
  { id: "aud-002", timestamp: "2026-06-26T08:30:00Z", actor: "Demo Treasurer", action: "approve", resource: "finance", module: "Finance", details: "Approved bank import match — Sarah Thompson £45", affectedRecord: "Finance import", riskLevel: "sensitive", status: "recorded", linkedHref: "/finance/import/review" },
  { id: "aud-003", timestamp: "2026-06-25T16:45:00Z", actor: "Demo Coach", action: "save", resource: "attendance", module: "Attendance", details: "Saved register — Competitive Squad Thursday", affectedRecord: "Session register", riskLevel: "normal", status: "recorded", linkedHref: "/attendance" },
  { id: "aud-004", timestamp: "2026-06-25T14:30:00Z", actor: "Demo Treasurer", action: "create", resource: "finance", module: "Finance", details: "Added income transaction: Monthly membership fees — June", affectedRecord: "Finance transactions", riskLevel: "sensitive", status: "recorded", linkedHref: "/finance/transactions" },
  { id: "aud-005", timestamp: "2026-06-25T11:00:00Z", actor: "Demo Admin", action: "update", resource: "members", module: "Members", details: "Updated member status: Casey Morgan → inactive", affectedRecord: "Casey Morgan", riskLevel: "normal", status: "recorded", linkedHref: "/members" },
  { id: "aud-006", timestamp: "2026-06-25T09:00:00Z", actor: "Demo Secretary", action: "simulated send", resource: "communications", module: "Communications", details: "Simulated Gift Aid declaration request to 3 parents", affectedRecord: "Parents missing Gift Aid", riskLevel: "sensitive", status: "recorded", linkedHref: "/communications/history" },
  { id: "aud-007", timestamp: "2026-06-24T16:45:00Z", actor: "Demo Coach", action: "create", resource: "attendance", module: "Attendance", details: "Recorded attendance for Recreational — Tuesday", affectedRecord: "Tuesday session", riskLevel: "normal", status: "recorded", linkedHref: "/attendance/register" },
  { id: "aud-008", timestamp: "2026-06-24T14:00:00Z", actor: "Demo Treasurer", action: "review", resource: "gift-aid", module: "Gift Aid", details: "Reviewed eligible donation — flagged business income", affectedRecord: "Gift Aid review", riskLevel: "sensitive", status: "needs-review", linkedHref: "/gift-aid/review" },
  { id: "aud-009", timestamp: "2026-06-24T10:00:00Z", actor: "Demo Secretary", action: "assign", resource: "documents", module: "Documents", details: "Assigned medical form to Jordan Reeves", affectedRecord: "Medical form scan", riskLevel: "restricted", status: "recorded", linkedHref: "/documents/assignment" },
  { id: "aud-010", timestamp: "2026-06-23T11:15:00Z", actor: "Morgan Ellis", action: "digitise", resource: "documents", module: "Documents", details: "Scanned progress note linked to Alex Thompson", affectedRecord: "Alex Thompson", riskLevel: "normal", status: "recorded", linkedHref: "/documents/scanned-notes" },
  { id: "aud-011", timestamp: "2026-06-23T09:00:00Z", actor: "Demo Secretary", action: "confirm", resource: "staff", module: "Staff", details: "Confirmed rota — Tuesday Development Squad", affectedRecord: "Staff rota", riskLevel: "normal", status: "recorded", linkedHref: "/staff/rota" },
  { id: "aud-012", timestamp: "2026-06-22T15:00:00Z", actor: "Demo Treasurer", action: "export", resource: "fundraising", module: "Fundraising", details: "Demo report export — Campaign summary", affectedRecord: "Fundraising reports", riskLevel: "normal", status: "recorded", linkedHref: "/fundraising/reports" },
  { id: "aud-013", timestamp: "2026-06-22T10:00:00Z", actor: "Demo Treasurer", action: "record", resource: "fundraising", module: "Fundraising", details: "Recorded business pledge — Local Business Ltd £250", affectedRecord: "Local Business Ltd", riskLevel: "normal", status: "recorded", linkedHref: "/fundraising/businesses" },
  { id: "aud-014", timestamp: "2026-06-20T16:00:00Z", actor: "Demo Admin", action: "archive", resource: "documents", module: "Documents", details: "Soft-archived superseded membership form", affectedRecord: "Membership Form 2024/25", riskLevel: "normal", status: "recorded", linkedHref: "/documents/archive" },
  { id: "aud-015", timestamp: "2026-06-20T10:00:00Z", actor: "Demo Treasurer", action: "export", resource: "gift-aid", module: "Gift Aid", details: "Simulated HMRC claim export (demo)", affectedRecord: "Gift Aid claim", riskLevel: "sensitive", status: "recorded", linkedHref: "/gift-aid/claim-export" },
];

export const demoReportCards: ReportCard[] = [
  { id: "rc-finance", name: "Finance Pack", purpose: "Income, outgoings, fees and accountant summary", linkedModules: ["Finance", "Staff"], lastGenerated: "2026-06-25", exportStatus: "ready", sensitivity: "sensitive", category: "Finance", href: "/reports/finance-pack" },
  { id: "rc-members", name: "Member Admin Pack", purpose: "Membership, consent and contact completeness", linkedModules: ["Members"], lastGenerated: "2026-06-20", exportStatus: "ready", sensitivity: "sensitive", category: "Members", href: "/reports/member-pack" },
  { id: "rc-attendance", name: "Attendance Summary", purpose: "Session attendance and absence patterns", linkedModules: ["Attendance"], lastGenerated: "2026-06-18", exportStatus: "demo", sensitivity: "normal", category: "Attendance", href: "/attendance/reports" },
  { id: "rc-giftaid", name: "Gift Aid Pack", purpose: "Declarations, claim-ready donations and compliance", linkedModules: ["Gift Aid", "Finance"], lastGenerated: "2026-06-22", exportStatus: "ready", sensitivity: "sensitive", category: "Gift Aid", href: "/reports/gift-aid-pack" },
  { id: "rc-comms", name: "Communications History", purpose: "Simulated sends and form responses", linkedModules: ["Communications"], exportStatus: "never", sensitivity: "sensitive", category: "Communications", href: "/communications/history" },
  { id: "rc-docs", name: "Documents Review", purpose: "Unassigned and sensitive documents", linkedModules: ["Documents"], exportStatus: "demo", sensitivity: "restricted", category: "Documents", href: "/documents/missing" },
  { id: "rc-staff", name: "Staff Qualification Summary", purpose: "DBS, qualifications and wage prep", linkedModules: ["Staff"], lastGenerated: "2026-06-24", exportStatus: "ready", sensitivity: "sensitive", category: "Staff/Volunteers", href: "/staff/qualifications" },
  { id: "rc-fundraising", name: "Fundraising Pipeline", purpose: "Campaigns, donors and business leads", linkedModules: ["Fundraising"], lastGenerated: "2026-06-23", exportStatus: "demo", sensitivity: "normal", category: "Fundraising", href: "/fundraising/reports" },
  { id: "rc-audit", name: "Audit Log Summary", purpose: "Cross-module activity evidence trail", linkedModules: ["Audit"], lastGenerated: "2026-06-26", exportStatus: "ready", sensitivity: "sensitive", category: "Audit", href: "/audit/activity" },
  { id: "rc-committee", name: "Committee Pack", purpose: "Pre-meeting club health and actions summary", linkedModules: ["All modules"], lastGenerated: "2026-06-25", exportStatus: "ready", sensitivity: "normal", category: "Committee Pack", href: "/reports/committee-pack" },
  { id: "rc-export", name: "Full Club Admin Pack", purpose: "Complete export centre for audit and accounting", linkedModules: ["All modules"], exportStatus: "never", sensitivity: "restricted", category: "Export Centre", href: "/reports/export-centre" },
];

export const demoExportPackItems: ExportPackItem[] = [
  { id: "exp-01", name: "Member list", description: "Active members with class and status", sensitivity: "normal" },
  { id: "exp-02", name: "Parent/carer contact summary", description: "Contact details — restricted in live mode", sensitivity: "sensitive" },
  { id: "exp-03", name: "Emergency contact completeness", description: "Missing or incomplete emergency contacts", sensitivity: "sensitive" },
  { id: "exp-04", name: "Medical flags summary", description: "Flagged members only — no detailed notes", sensitivity: "restricted" },
  { id: "exp-05", name: "Attendance summary", description: "Session attendance rates by class", sensitivity: "normal" },
  { id: "exp-06", name: "Unpaid fees", description: "Outstanding membership fees", sensitivity: "sensitive" },
  { id: "exp-07", name: "Payment summary", description: "Matched and unmatched transactions", sensitivity: "sensitive" },
  { id: "exp-08", name: "Expenses summary", description: "Club outgoings and receipts status", sensitivity: "sensitive" },
  { id: "exp-09", name: "Donation summary", description: "Fundraising and voluntary donations", sensitivity: "normal" },
  { id: "exp-10", name: "Gift Aid claim-ready summary", description: "Eligible donations with valid declarations", sensitivity: "sensitive" },
  { id: "exp-11", name: "Gift Aid exceptions", description: "Ineligible income and review items", sensitivity: "sensitive" },
  { id: "exp-12", name: "Communications history", description: "Simulated sends and form replies", sensitivity: "sensitive" },
  { id: "exp-13", name: "Documents needing review", description: "Unassigned and sensitive documents", sensitivity: "restricted" },
  { id: "exp-14", name: "Staff qualification summary", description: "DBS and coaching qualifications", sensitivity: "sensitive" },
  { id: "exp-15", name: "Wage prep summary", description: "Session payments — not payroll", sensitivity: "sensitive" },
  { id: "exp-16", name: "Venue/outgoings summary", description: "Hall hire and operational costs", sensitivity: "sensitive" },
  { id: "exp-17", name: "Fundraising pipeline", description: "Campaigns and business CRM status", sensitivity: "normal" },
  { id: "exp-18", name: "Sponsorship renewals", description: "Sponsors due for renewal", sensitivity: "normal" },
  { id: "exp-19", name: "Audit log summary", description: "Cross-module activity trail", sensitivity: "sensitive" },
];

export const demoFinancePack: FinancePackData = {
  incomeThisMonth: 2840,
  incomeThisYear: 14200,
  outgoingsThisMonth: 1975,
  outgoingsThisYear: 11800,
  netPosition: 2400,
  unpaidFees: DEMO_OUTSTANDING_FEE_COUNT,
  matchedTransactions: 9,
  unmatchedTransactions: 3,
  possibleDonations: 2,
  expensesMissingReceipts: 1,
  wagePrepTotal: 596,
  hallHireOutgoings: 720,
};

export const demoCommitteePack: CommitteePackData = {
  clubHealthScore: 82,
  activeMembers: 8,
  averageAttendance: 92,
  netFinancePosition: 2400,
  fundraisingRaised: 5880,
  giftAidOpportunity: 187.5,
  staffAlerts: 4,
  missingDocuments: 8,
  upcomingEvents: 3,
  actionsNeedingAttention: [
    "Review 4 unmatched bank payments",
    "Chase 3 missing Gift Aid declarations",
    "Confirm Thursday session coach on rota",
    "Collect Local Business Ltd pledged donation",
    "Send thank-you to 4 donors",
  ],
};

export const demoGiftAidPack: GiftAidPackData = {
  validDeclarations: 5,
  missingDeclarations: 3,
  claimReadyAmount: 750,
  excludedIncome: 1620,
  donationsNeedingReview: 2,
  estimatedReclaim: 187.5,
  complianceWarnings: [
    "Do not claim Gift Aid on class fees or membership payments",
    "Do not claim on raffle tickets or business sponsorship",
    "2 donations flagged for review before claim",
  ],
};

export const demoMemberPack: MemberPackData = {
  activeMembers: 8,
  inactiveMembers: 1,
  incompleteEmergencyContacts: 2,
  missingConsent: 1,
  medicalFlags: 2,
  attendanceConcerns: 1,
  unpaidFees: DEMO_OUTSTANDING_FEE_COUNT,
  documentsMissing: 8,
};

export const demoClubHealthSummary: ClubHealthMetric[] = [
  { id: "health-finance", label: "Finance", score: 78, status: "attention", summary: `${DEMO_OUTSTANDING_FEE_COUNT} unpaid fees and 4 payments to review`, suggestedAction: "Review bank import matches", linkedModule: "Finance", linkedHref: "/finance/import/review" },
  { id: "health-attendance", label: "Attendance", score: 92, status: "good", summary: "92% average attendance this month", suggestedAction: "Follow up repeated absences", linkedModule: "Attendance", linkedHref: "/attendance/reports" },
  { id: "health-giftaid", label: "Gift Aid", score: 65, status: "attention", summary: "3 missing declarations, £187 reclaim possible", suggestedAction: "Send declaration requests", linkedModule: "Gift Aid", linkedHref: "/gift-aid" },
  { id: "health-comms", label: "Communications", score: 85, status: "good", summary: "2 replies needing review", suggestedAction: "Review inbox responses", linkedModule: "Communications", linkedHref: "/communications/inbox" },
  { id: "health-fundraising", label: "Fundraising", score: 80, status: "good", summary: "£925 raised this month across 5 campaigns", suggestedAction: "Chase business pledges", linkedModule: "Fundraising", linkedHref: "/fundraising/follow-ups" },
  { id: "health-compliance", label: "Compliance", score: 70, status: "attention", summary: "2 qualifications expiring, 1 DBS review", suggestedAction: "Review qualifications", linkedModule: "Staff", linkedHref: "/staff/qualifications" },
  { id: "health-documents", label: "Documents", score: 75, status: "attention", summary: "5 unassigned documents, 3 scanned notes pending", suggestedAction: "Assign documents", linkedModule: "Documents", linkedHref: "/documents/assignment" },
];

export const demoScriptSteps: DemoScriptStep[] = [
  { step: 1, title: "Dashboard", href: "/dashboard", whatToClick: "Review Today's tasks, then click a Club Health score to jump to that module", whatToSay: "This is your club command centre. Tasks and health scores show what needs attention today — saving volunteers from scattered spreadsheets.", problemSolved: "Volunteers no longer rely on scattered spreadsheets and WhatsApp messages.", emphasis: "Everything is in one place — fake demo data only. Refresh resets session changes." },
  { step: 2, title: "Members", href: "/members/mem-002", whatToClick: "Open Jordan Reeves — show parent/carer tab and medical flag", whatToSay: "Each gymnast has a linked parent record, medical flag and finance status.", problemSolved: "Secretary can find member details in seconds instead of digging through paper files.", emphasis: "Medical details are flagged — restricted access in live mode." },
  { step: 3, title: "Attendance", href: "/attendance/register", whatToClick: "Select a session and mark Present/Absent on the register", whatToSay: "Coaches mark attendance on a phone-friendly register in seconds.", problemSolved: "No more paper registers lost in kit bags.", emphasis: "Large buttons — designed for busy gym sessions. Session-only change." },
  { step: 4, title: "Finance", href: "/finance/import", secondaryHref: "/finance/import/review", secondaryLinkLabel: "Review matches", whatToClick: "Walk through bank import, then open Review to approve a match", whatToSay: "The treasurer uploads a bank statement and ClubOps suggests matches to members.", problemSolved: "Reduces hours matching payments to members manually.", emphasis: "Demo only — no real bank connection or bank data processed." },
  { step: 5, title: "Gift Aid", href: "/gift-aid/eligible-donations", whatToClick: "Show eligible vs ineligible donations and compliance warnings", whatToSay: "Gift Aid is tracked separately from fees — with clear warnings about what not to claim.", problemSolved: "Treasurer avoids costly HMRC mistakes.", emphasis: "No HMRC submission is made — demo guidance only." },
  { step: 6, title: "Communications", href: "/communications/compose?preset=gift-aid", whatToClick: "Prepare Gift Aid declaration request — show preview before simulated send", whatToSay: "The secretary can message parents missing declarations with one click.", problemSolved: "No more copying emails from a spreadsheet.", emphasis: "Simulated send only — no real email sent." },
  { step: 7, title: "Documents", href: "/documents/scanned-notes", whatToClick: "Assign a scanned paper note to a member", whatToSay: "Paper notes can be digitised and linked to the right member record.", problemSolved: "Club escapes filing cabinets full of paper.", emphasis: "No real file uploaded — safeguarding notes would be restricted in live mode." },
  { step: 8, title: "Staff & Operations", href: "/staff/qualifications", secondaryHref: "/staff/wages", secondaryLinkLabel: "Wage prep", whatToClick: "Show Jamie Hart's expired safeguarding qualification, then open Wage prep", whatToSay: "Track coach qualifications, rota gaps and session payment prep in one place.", problemSolved: "Committee knows when DBS or qualifications need renewal without chasing coaches.", emphasis: "Wage prep is not payroll software — demo only." },
  { step: 9, title: "Fundraising", href: "/fundraising/businesses", whatToClick: "Show business CRM — pledge and follow-up demo actions", whatToSay: "Track local business sponsors and campaign progress in one place.", problemSolved: "Fundraising leads don't get forgotten between volunteers.", emphasis: "Business donations are not Gift Aid eligible — demo data only." },
  { step: 10, title: "Reports & Audit", href: "/reports/export-centre", whatToClick: "Generate demo Full Club Admin Pack", whatToSay: "Before a committee meeting, generate a pack covering finance, members, Gift Aid and audit trail.", problemSolved: "Committee gets evidence without manual report building.", emphasis: "Generate demo export — no real file generated." },
];

export const demoScriptOptionalSteps: DemoScriptStep[] = [
  {
    step: 0,
    title: "Optional — Show permissions honestly",
    href: "/finance",
    secondaryHref: "/members/mem-002?tab=medical",
    secondaryLinkLabel: "Member medical tab",
    whatToClick:
      "Switch to Coach (top bar) → open Finance — show locked preview. Open a member Medical tab — show sensitive info hidden. Switch to Treasurer — show Finance and Gift Aid. Switch to Welfare Officer — show Medical/Welfare detail. Return to Club Secretary/Admin.",
    whatToSay:
      "Not every volunteer sees everything. This demo hides sensitive sections by role to show how live permissions would work — but this is demo-only and not real security.",
    problemSolved: "Committee understands why RBAC matters before any real data is loaded.",
    emphasis:
      "Demo permission preview only — not real security. Real login and server-side RBAC required before production.",
    optional: true,
  },
  {
    step: 0,
    title: "Optional — Switch demo roles",
    href: "/demo-roles",
    secondaryHref: "/settings/permissions",
    secondaryLinkLabel: "Permissions matrix",
    whatToClick:
      "Review the permissions matrix. Switch between Coach, Treasurer, Welfare Officer and Committee Read-Only to see restricted previews on Finance, Medical, Gift Aid, Wages and Exports.",
    whatToSay:
      "Treasurers handle money, welfare officers handle sensitive records, coaches mark attendance — the matrix shows who would access what in live mode.",
    problemSolved: "Committee understands role separation before any real data is loaded.",
    emphasis: "Demo role switching only — not real security. Real login required before production.",
    optional: true,
  },
  {
    step: 0,
    title: "Optional — Live-ready architecture (v1.2.0)",
    href: "/settings/live-readiness",
    secondaryHref: "/settings/production-roadmap",
    secondaryLinkLabel: "Production roadmap",
    whatToClick: "Open Live readiness → skim checklist. Open Data architecture for entity groups. Mention demo stays permanent; live is a separate deployment.",
    whatToSay: "This demo uses fake data only. Before we load real member or medical records, we need authentication, a secure database, file storage and audit logging — all documented here so we avoid a messy rewrite.",
    problemSolved: "Committee sees a credible path from demo to production without rushing into live data.",
    emphasis: "Blueprint only — no database or real auth in this release.",
    optional: true,
  },
  {
    step: 0,
    title: "Optional — Auth & live stack decision (v1.3.0)",
    href: "/settings/auth-decision",
    secondaryHref: "/settings/recommended-stack",
    secondaryLinkLabel: "Recommended stack",
    whatToClick: "Open Auth decision pack → skim stack options. Open Recommended stack for provisional Supabase recommendation.",
    whatToSay: "Before we build live mode, we compare auth and database options. Our provisional recommendation is Supabase for auth, Postgres, row-level security and file storage — on a separate private deployment. The public demo stays fake data forever.",
    problemSolved: "Committee understands we are choosing foundations carefully, not rushing into real data.",
    emphasis: "Decision pack only — Supabase packages installed as scaffold but not connected to the public demo.",
    optional: true,
  },
];

export const demoReportsAuditPageData: ReportsAuditPageData = {
  reportCards: demoReportCards,
  auditEvents: demoAuditLog,
  exportPackItems: demoExportPackItems,
  financePack: demoFinancePack,
  committeePack: demoCommitteePack,
  giftAidPack: demoGiftAidPack,
  memberPack: demoMemberPack,
  clubHealth: demoClubHealthSummary,
  demoScript: demoScriptSteps,
  demoScriptOptional: demoScriptOptionalSteps,
};

/** Legacy */
export const demoAuditEvents: AuditEvent[] = demoAuditLog;

export const demoReports: ReportSummary[] = demoReportCards.slice(0, 4).map((r) => ({
  id: r.id,
  title: r.name,
  category: r.category,
  generatedDate: r.lastGenerated ?? "2026-06-26",
  description: r.purpose,
}));
