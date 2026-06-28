/** Primary task copy for module landing pages — demo only */

export type ModuleLandingConfig = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  safetyLine: string;
  howItWorks?: string;
  whatHappensNext?: string;
};

export const FINANCE_LANDING: ModuleLandingConfig = {
  title: "Review payments",
  description:
    "Check suggested matches from the sample statement and deal with anything unmatched.",
  primaryHref: "/finance/import/review",
  primaryLabel: "Start review",
  secondaryHref: "/finance/import",
  secondaryLabel: "View unmatched",
  safetyLine: "Demo only. No real bank is connected.",
  howItWorks:
    "Use the sample statement, review suggested matches, then confirm or reject each payment in the demo queue.",
  whatHappensNext:
    "Confirmed matches update demo fee status for this session. Reloading the page resets changes.",
};

export const MEMBERS_LANDING: ModuleLandingConfig = {
  title: "Check records needing attention",
  description: "Review missing forms, fees and contact details before they slow down club admin.",
  primaryHref: "/members?filter=needs-attention",
  primaryLabel: "Open needs attention",
  secondaryHref: "/members?filter=missing-forms",
  secondaryLabel: "Missing forms",
  safetyLine: "Demo only. No real personal data is stored.",
  whatHappensNext: "Updated demo records clear needs-attention badges on profiles.",
};

export const ATTENDANCE_LANDING: ModuleLandingConfig = {
  title: "Take today's register",
  description: "Mark who attended today's sessions and flag absences for follow-up.",
  primaryHref: "/attendance/register",
  primaryLabel: "Open register",
  secondaryHref: "/attendance/reports",
  secondaryLabel: "View reports",
  safetyLine: "Demo only. Attendance is not saved permanently.",
  whatHappensNext: "Saved marks update the demo attendance summary for this session.",
};

export const COMMUNICATIONS_LANDING: ModuleLandingConfig = {
  title: "Send the right message",
  description: "Use demo templates and groups to prepare reminders and form requests quickly.",
  primaryHref: "/communications/compose",
  primaryLabel: "Compose demo message",
  secondaryHref: "/communications/groups",
  secondaryLabel: "View groups",
  safetyLine: "Demo only. No real emails or texts are sent.",
  whatHappensNext: "Simulated sends appear in message history — nothing is delivered.",
};

export const GIFT_AID_LANDING: ModuleLandingConfig = {
  title: "Review claim readiness",
  description: "Check declarations and eligible donations before preparing any demo claim.",
  primaryHref: "/gift-aid/review",
  primaryLabel: "Review readiness",
  secondaryHref: "/gift-aid/declarations",
  secondaryLabel: "Check declarations",
  safetyLine: "Demo only. Nothing is submitted to HMRC.",
  whatHappensNext: "Reviewed items update the demo Gift Aid summary for this session.",
};

export const DOCUMENTS_LANDING: ModuleLandingConfig = {
  title: "Check missing paperwork",
  description: "See which forms are missing and assign uploaded demo documents to members.",
  primaryHref: "/documents/missing",
  primaryLabel: "View missing forms",
  secondaryHref: "/documents/assignment",
  secondaryLabel: "Assign documents",
  safetyLine: "Demo only. No real uploads are stored.",
  whatHappensNext: "Assigned demo documents appear on member profiles and the documents list.",
};

export const STAFF_LANDING: ModuleLandingConfig = {
  title: "Check volunteer cover",
  description: "Review rota gaps, expiring qualifications and open staff alerts.",
  primaryHref: "/staff/rota",
  primaryLabel: "Review rota",
  secondaryHref: "/staff/qualifications",
  secondaryLabel: "Qualifications",
  safetyLine: "Demo only. No real scheduling changes are made.",
  whatHappensNext: "Reviewed items update the demo staff summary for this session.",
};

export const FUNDRAISING_LANDING: ModuleLandingConfig = {
  title: "Review campaign follow-ups",
  description: "See pledges, thank-yous and business contacts that need a demo follow-up.",
  primaryHref: "/fundraising/follow-ups",
  primaryLabel: "Open follow-ups",
  secondaryHref: "/fundraising/campaigns",
  secondaryLabel: "View campaigns",
  safetyLine: "Demo only. No real donations are processed.",
  whatHappensNext: "Follow-up actions are recorded in the demo fundraising history.",
};

export const REPORTS_LANDING: ModuleLandingConfig = {
  title: "Preview committee pack",
  description: "Review the main demo summaries before sharing a committee update.",
  primaryHref: "/reports/committee-pack",
  primaryLabel: "Preview committee pack",
  secondaryHref: "/reports/export-centre",
  secondaryLabel: "Open export centre",
  safetyLine: "Demo only. No real files are created or sent.",
  whatHappensNext: "Preview sections link to each module — exports are simulated only.",
};

export type ModuleStatusTone = "pending" | "reviewed" | "resolved" | "neutral";

export type ModuleStatusItem = {
  id: string;
  label: string;
  value: string;
  tone?: ModuleStatusTone;
};

const toneStyles: Record<ModuleStatusTone, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-950",
  reviewed: "border-indigo-200 bg-indigo-50 text-indigo-950",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-950",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function moduleStatusToneClass(tone: ModuleStatusTone = "neutral"): string {
  return toneStyles[tone];
}
