export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

export const navigationGroups: NavGroup[] = [
  {
    id: "day-to-day",
    title: "Day to day",
    items: [
      { label: "Dashboard", href: "/dashboard", description: "Club overview and key metrics" },
      { label: "Members", href: "/members", description: "Member records and membership types" },
      { label: "Attendance", href: "/attendance", description: "Session attendance tracking" },
      { label: "Communications", href: "/communications", description: "Emails, notices and messages" },
      { label: "Calendar", href: "/calendar", description: "Sessions, events and meetings" },
    ],
  },
  {
    id: "money",
    title: "Money & compliance",
    items: [
      { label: "Finance", href: "/finance", description: "Income, expenses and fees" },
      { label: "Gift Aid", href: "/gift-aid", description: "Gift Aid declarations and claims" },
    ],
  },
  {
    id: "people-files",
    title: "People & files",
    items: [
      { label: "Staff & Volunteers", href: "/staff", description: "Coaches, volunteers and DBS records" },
      { label: "Documents", href: "/documents", description: "Policies, forms and club files" },
    ],
  },
  {
    id: "committee",
    title: "Committee",
    items: [
      { label: "Fundraising", href: "/fundraising", description: "Campaigns and donations" },
      { label: "Reports", href: "/reports", description: "Exports, committee packs and admin reports" },
      { label: "Audit Log", href: "/audit", description: "Cross-module activity and evidence trail" },
    ],
  },
  {
    id: "help",
    title: "Help & demo",
    items: [
      { label: "Demo Script", href: "/demo-script", description: "Guide for showing ClubOps to your club" },
      { label: "About Demo Mode", href: "/demo", description: "What demo mode means — fake data only" },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    items: [
      { label: "Settings", href: "/settings", description: "Club configuration and preferences" },
    ],
  },
];

/** Flat list for top bar and other lookups */
export const mainNavigation: NavItem[] = navigationGroups.flatMap((g) => g.items);

export const clubName = "Riverside Gymnastics Club";
