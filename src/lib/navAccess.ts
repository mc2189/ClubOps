import { can, type DemoRoleId, type PermissionModule } from "@/lib/permissions";

export type NavAccessLevel = "full" | "summary" | "restricted";

/** Top-level nav href → permission module (demo RBAC preview only) */
const NAV_HREF_MODULE: Record<string, PermissionModule> = {
  "/finance": "finance",
  "/gift-aid": "gift-aid",
  "/fundraising": "fundraising",
  "/reports": "reports",
  "/audit": "audit",
};

export function getNavModuleForHref(href: string): PermissionModule | null {
  return NAV_HREF_MODULE[href] ?? null;
}

export function getNavAccessLevel(role: DemoRoleId, href: string): NavAccessLevel {
  const navModule = getNavModuleForHref(href);
  if (!navModule) return "full";
  if (can(role, navModule, "view")) return "full";
  if (can(role, navModule, "view-summary")) return "summary";
  return "restricted";
}

export function navItemLabel(label: string, access: NavAccessLevel): string {
  if (access === "summary") return `${label} (summary)`;
  if (access === "restricted") return `${label} – restricted`;
  return label;
}

export function navItemTitle(description: string, access: NavAccessLevel): string {
  if (access === "full") return description;
  if (access === "summary") {
    return `${description} Your demo role sees a summary-only preview on this module.`;
  }
  return `${description} Your demo role has restricted access — you can open a locked preview to see how permissions would work.`;
}
