export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const MODULES = {
  members: { label: "Members", href: "/members" },
  attendance: { label: "Attendance", href: "/attendance" },
  finance: { label: "Finance", href: "/finance" },
  giftAid: { label: "Gift Aid", href: "/gift-aid" },
  communications: { label: "Communications", href: "/communications" },
  documents: { label: "Documents", href: "/documents" },
  calendar: { label: "Calendar", href: "/calendar" },
  staff: { label: "Staff & Volunteers", href: "/staff" },
  fundraising: { label: "Fundraising", href: "/fundraising" },
  reports: { label: "Reports", href: "/reports" },
  audit: { label: "Audit Log", href: "/audit" },
  settings: { label: "Settings", href: "/settings" },
} as const;

export function getBackFallbackHref(items: BreadcrumbItem[]): string {
  for (let i = items.length - 1; i >= 0; i--) {
    const href = items[i].href;
    if (href) return href;
  }
  return "/dashboard";
}

export function getBackParentLabel(items: BreadcrumbItem[]): string | undefined {
  const withHref = items.filter((item) => item.href);
  return withHref[withHref.length - 1]?.label;
}

function dashboard(): BreadcrumbItem {
  return { label: "Dashboard", href: "/dashboard" };
}

/** Standard module page: Dashboard > Module or Dashboard > Module > Section */
export function moduleBreadcrumb(
  module: { label: string; href: string },
  pageLabel?: string,
): BreadcrumbItem[] {
  const page = pageLabel ?? module.label;
  if (page === module.label) {
    return [dashboard(), { label: page }];
  }
  return [dashboard(), { label: module.label, href: module.href }, { label: page }];
}

export function moduleBackHref(module: { label: string; href: string }, pageLabel?: string): string {
  const page = pageLabel ?? module.label;
  return page === module.label ? "/dashboard" : module.href;
}

export function helpTrail(pageLabel: string): BreadcrumbItem[] {
  return [dashboard(), { label: pageLabel }];
}

export function membersMemberTrail(memberName: string): BreadcrumbItem[] {
  return [dashboard(), { label: "Members", href: "/members" }, { label: memberName }];
}

export function membersEditTrail(memberName: string, memberId: string): BreadcrumbItem[] {
  return [
    dashboard(),
    { label: "Members", href: "/members" },
    { label: memberName, href: `/members/${memberId}` },
    { label: "Edit" },
  ];
}

export function membersAddTrail(): BreadcrumbItem[] {
  return [dashboard(), { label: "Members", href: "/members" }, { label: "Add member" }];
}

export function attendanceTrail(pageLabel: string, pageHref?: string): BreadcrumbItem[] {
  return [
    dashboard(),
    { label: "Attendance", href: "/attendance" },
    pageHref ? { label: pageLabel, href: pageHref } : { label: pageLabel },
  ];
}

export function attendanceRegisterTrail(sessionName: string): BreadcrumbItem[] {
  return [
    dashboard(),
    { label: "Attendance", href: "/attendance" },
    { label: "Select session", href: "/attendance/register" },
    { label: sessionName },
  ];
}

export function financeTrail(pageLabel: string, parent?: { label: string; href: string }): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [dashboard(), { label: "Finance", href: "/finance" }];
  if (parent) items.push(parent);
  items.push({ label: pageLabel });
  return items;
}

export function financeImportReviewTrail(): BreadcrumbItem[] {
  return financeTrail("Import review", { label: "Import", href: "/finance/import" });
}

export function giftAidTrail(pageLabel: string): BreadcrumbItem[] {
  return moduleBreadcrumb(MODULES.giftAid, pageLabel);
}

export function communicationsTrail(pageLabel: string): BreadcrumbItem[] {
  return moduleBreadcrumb(MODULES.communications, pageLabel);
}

export function documentsTrail(pageLabel: string): BreadcrumbItem[] {
  return moduleBreadcrumb(MODULES.documents, pageLabel);
}

export function staffTrail(pageLabel: string, pageHref?: string): BreadcrumbItem[] {
  return [
    dashboard(),
    { label: "Staff & Volunteers", href: "/staff" },
    pageHref ? { label: pageLabel, href: pageHref } : { label: pageLabel },
  ];
}

export function staffProfileTrail(staffName: string): BreadcrumbItem[] {
  return staffTrail(staffName);
}

export function fundraisingCampaignTrail(campaignName: string): BreadcrumbItem[] {
  return [
    dashboard(),
    { label: "Fundraising", href: "/fundraising" },
    { label: "Campaigns", href: "/fundraising/campaigns" },
    { label: campaignName },
  ];
}

export function reportsTrail(pageLabel: string): BreadcrumbItem[] {
  return moduleBreadcrumb(MODULES.reports, pageLabel);
}

export function auditTrail(pageLabel: string): BreadcrumbItem[] {
  return moduleBreadcrumb(MODULES.audit, pageLabel);
}

export function settingsTrail(pageLabel: string): BreadcrumbItem[] {
  return moduleBreadcrumb(MODULES.settings, pageLabel);
}
