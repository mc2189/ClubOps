export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", description: "Club overview and key metrics" },
  { label: "Members", href: "/members", description: "Member records and membership types" },
  { label: "Attendance", href: "/attendance", description: "Session attendance tracking" },
  { label: "Finance", href: "/finance", description: "Income, expenses and fees" },
  { label: "Gift Aid", href: "/gift-aid", description: "Gift Aid declarations and claims" },
  { label: "Communications", href: "/communications", description: "Emails, notices and messages" },
  { label: "Documents", href: "/documents", description: "Policies, forms and club files" },
  { label: "Calendar", href: "/calendar", description: "Sessions, events and meetings" },
  { label: "Staff & Volunteers", href: "/staff", description: "Coaches, volunteers and DBS records" },
  { label: "Fundraising", href: "/fundraising", description: "Campaigns and donations" },
  { label: "Reports", href: "/reports", description: "Exports, committee packs and admin reports" },
  { label: "Audit Log", href: "/audit", description: "Cross-module activity and evidence trail" },
  { label: "Demo Script", href: "/demo-script", description: "Guide for showing ClubOps to your club" },
  { label: "Settings", href: "/settings", description: "Club configuration and preferences" },
];

export const clubName = "Riverside Gymnastics Club";
