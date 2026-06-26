import type { DemoRoleId } from "@/lib/permissions";

export interface DemoRoleDefinition {
  id: DemoRoleId;
  name: string;
  shortName: string;
  purpose: string;
  typicalUser: string;
  allowedModules: string;
  restrictedModules: string;
  sensitiveAccess: string;
  exportPermissions: string;
  communicationPermissions: string;
  canDoExamples: string[];
  cannotDoExamples: string[];
  liveModeRequirements: string;
}

export const demoRoles: DemoRoleDefinition[] = [
  {
    id: "secretary-admin",
    name: "Club Secretary / Admin",
    shortName: "Secretary",
    purpose: "Day-to-day club administration, member records and communications.",
    typicalUser: "Club secretary, chair or designated admin volunteer",
    allowedModules: "Dashboard, members, attendance, documents, communications, reports (view), settings",
    restrictedModules: "Full medical detail (summary only), finance approval (treasurer-led)",
    sensitiveAccess: "Medical flags and summaries — full safeguarding notes restricted to Welfare Officer in live mode",
    exportPermissions: "Most admin exports with treasurer oversight for finance packs",
    communicationPermissions: "Bulk parent messages, template sends, form requests",
    canDoExamples: [
      "Add and edit member records",
      "Send parent notices and form requests",
      "Assign documents and run the demo script",
    ],
    cannotDoExamples: [
      "Approve bank matches without treasurer role",
      "View full medical notes without welfare authorisation",
      "Change production security settings (live mode only)",
    ],
    liveModeRequirements: "Real login, MFA recommended, full audit logging, data protection training",
  },
  {
    id: "treasurer",
    name: "Treasurer",
    shortName: "Treasurer",
    purpose: "Club finances, fees, Gift Aid and wage preparation.",
    typicalUser: "Elected treasurer or assistant treasurer",
    allowedModules: "Finance, Gift Aid, wage prep, finance exports, fee tracking",
    restrictedModules: "Medical/safeguarding detail, bulk non-finance communications",
    sensitiveAccess: "Finance and Gift Aid data — no medical detail",
    exportPermissions: "Finance pack, Gift Aid pack, wage prep exports, bank reconciliation reports",
    communicationPermissions: "Fee reminders and finance-related messages only",
    canDoExamples: [
      "Review bank import matches",
      "Prepare Gift Aid claim summaries",
      "Export treasurer reports for the accountant",
    ],
    cannotDoExamples: [
      "View full medical or safeguarding case notes",
      "Send general bulk communications without secretary approval",
      "Approve their own role changes",
    ],
    liveModeRequirements: "Separate treasurer login, finance-only audit trail, export logging",
  },
  {
    id: "coach",
    name: "Coach",
    shortName: "Coach",
    purpose: "Session delivery and attendance — minimal admin access.",
    typicalUser: "Volunteer coach or session leader",
    allowedModules: "Dashboard (limited), attendance register, member list (basic)",
    restrictedModules: "Finance, Gift Aid, exports, wage prep, sensitive medical detail",
    sensitiveAccess: "Medical flags only — not full notes (allergy alerts on register where needed)",
    exportPermissions: "None in live mode",
    communicationPermissions: "Session notices only — not bulk parent campaigns",
    canDoExamples: [
      "Mark attendance on the register",
      "See which members are in their class",
      "View competition calendar entries",
    ],
    cannotDoExamples: [
      "View bank transactions or unpaid fee totals",
      "Export member lists or finance reports",
      "Read detailed safeguarding notes",
    ],
    liveModeRequirements: "Coach login scoped to assigned sessions; auto-expire on leaving club",
  },
  {
    id: "welfare-officer",
    name: "Welfare Officer",
    shortName: "Welfare",
    purpose: "Safeguarding, medical flags and sensitive member welfare records.",
    typicalUser: "Club welfare officer or designated safeguarding lead",
    allowedModules: "Members (welfare fields), sensitive documents, limited communications",
    restrictedModules: "Finance, Gift Aid claims, wage prep, fundraising CRM",
    sensitiveAccess: "Full medical and safeguarding detail — highest sensitivity",
    exportPermissions: "Restricted — sensitive summaries only with audit approval",
    communicationPermissions: "Welfare-related contact with parents — not bulk finance messages",
    canDoExamples: [
      "Review medical flags and allergy plans",
      "Access safeguarding document assignments",
      "Follow up on welfare-related form responses",
    ],
    cannotDoExamples: [
      "View bank statements or fee balances",
      "Export full member contact lists for marketing",
      "Approve Gift Aid claims",
    ],
    liveModeRequirements: "Enhanced safeguarding training, restricted audit access, no finance modules",
  },
  {
    id: "fundraising-lead",
    name: "Fundraising Lead",
    shortName: "Fundraising",
    purpose: "Campaigns, donors, sponsors and fundraising communications.",
    typicalUser: "Fundraising coordinator or events volunteer",
    allowedModules: "Fundraising, donor CRM, campaign reports, fundraising communications",
    restrictedModules: "Full finance ledger, wage prep, medical detail",
    sensitiveAccess: "Donor contact details — not medical or finance core data",
    exportPermissions: "Fundraising pipeline and donor reports",
    communicationPermissions: "Sponsor requests, thank-you messages, campaign updates",
    canDoExamples: [
      "Track business pledges and follow-ups",
      "Record demo donations and campaign progress",
      "Prepare sponsorship request messages",
    ],
    cannotDoExamples: [
      "Process bank imports or approve fee payments",
      "View detailed medical records",
      "Export full club admin pack without admin role",
    ],
    liveModeRequirements: "Fundraising-scoped login; Gift Aid eligibility guidance still required",
  },
  {
    id: "committee-readonly",
    name: "Committee Read-Only",
    shortName: "Committee",
    purpose: "Oversight and meeting prep without operational write access.",
    typicalUser: "Committee member, parent governor or advisor",
    allowedModules: "Dashboard, high-level reports view, calendar, audit summary",
    restrictedModules: "Finance detail, medical detail, exports, communications send",
    sensitiveAccess: "Aggregated summaries only — no individual medical or bank detail",
    exportPermissions: "None — view committee pack in app only",
    communicationPermissions: "None",
    canDoExamples: [
      "Review club health scores before meetings",
      "Read committee pack summaries in the app",
      "See audit activity overview",
    ],
    cannotDoExamples: [
      "Edit member records or attendance",
      "Download exports or bank data",
      "Send bulk parent emails",
    ],
    liveModeRequirements: "Read-only login; time-limited access for non-operational roles",
  },
  {
    id: "demo-super-admin",
    name: "Demo Super Admin",
    shortName: "Super Admin",
    purpose: "Preview all modules during demonstrations — not a real club role.",
    typicalUser: "Demo presenter only",
    allowedModules: "All modules (demo preview)",
    restrictedModules: "None in demo preview — still not real security",
    sensitiveAccess: "All demo data visible — fake data only",
    exportPermissions: "All demo exports enabled",
    communicationPermissions: "All simulated sends enabled",
    canDoExamples: ["Present any module during a demo walkthrough"],
    cannotDoExamples: ["Protect real data — this role does not exist in production as shown"],
    liveModeRequirements: "Would require platform operator access — separate from club volunteer roles",
  },
];

export const demoSecurityRequirements = [
  {
    title: "Real authentication",
    description:
      "Each volunteer would sign in with their own account. Passwords, MFA or club SSO — not demo role switching.",
  },
  {
    title: "Server-side authorisation",
    description:
      "Permissions checked on the server for every page, API call and export. Client-side previews are not sufficient.",
  },
  {
    title: "Secure database",
    description: "Encrypted storage for member, finance and safeguarding records with regular backups.",
  },
  {
    title: "Secure file storage",
    description: "Documents and uploads stored outside the web root with virus scanning and access logging.",
  },
  {
    title: "Audit logging",
    description: "Tamper-resistant logs for data changes, exports, logins and sensitive access.",
  },
  {
    title: "Export controls",
    description: "Role-gated exports with watermarking, approval workflows and download audit trails.",
  },
  {
    title: "Data retention policies",
    description: "Defined retention and secure deletion for expired member, medical and finance records.",
  },
  {
    title: "Safeguarding access restrictions",
    description: "Medical and welfare data limited to trained welfare officers with enhanced logging.",
  },
  {
    title: "Finance and Gift Aid restrictions",
    description: "Treasurer-only access to bank data; separation of duties for approvals.",
  },
  {
    title: "Admin approval for role changes",
    description: "Role assignments require committee-approved admin — no self-elevation.",
  },
  {
    title: "Security incident logging",
    description: "Failed logins, suspicious exports and permission violations recorded and reviewed.",
  },
];
