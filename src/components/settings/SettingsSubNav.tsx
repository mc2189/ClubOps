"use client";

import { usePathname } from "next/navigation";
import { SubNavLink } from "@/components/ui/SubNavLink";

const clubVolunteerLinks = [
  { href: "/settings", label: "Overview", exact: true },
  { href: "/settings/roles", label: "Demo roles" },
  { href: "/settings/permissions", label: "Permissions" },
  { href: "/settings/security", label: "Security summary" },
];

const technicalLinks = [
  { href: "/settings/live-readiness", label: "Live readiness" },
  { href: "/settings/data-architecture", label: "Data architecture" },
  { href: "/settings/provider-model", label: "Demo vs live data" },
  { href: "/settings/production-roadmap", label: "Production roadmap" },
  { href: "/settings/auth-decision", label: "Choosing a login system" },
  { href: "/settings/live-stack", label: "Live stack comparison" },
  { href: "/settings/implementation-options", label: "Implementation options" },
  { href: "/settings/recommended-stack", label: "Recommended stack" },
  { href: "/settings/supabase-prep", label: "Supabase prep" },
  { href: "/settings/schema-plan", label: "Database plan" },
  { href: "/settings/private-deployment", label: "Private live deployment" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SettingsSubNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Club & volunteers
        </p>
        <nav className="flex flex-wrap gap-2" aria-label="Club and volunteer settings">
          {clubVolunteerLinks.map((link) => (
            <SubNavLink
              key={link.href}
              href={link.href}
              active={isActive(pathname, link.href, link.exact)}
            >
              {link.label}
            </SubNavLink>
          ))}
        </nav>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Technical / going live
        </p>
        <p className="mt-1 text-xs text-slate-600">
          For Mike, developers and committee planning — not everyday club admin.
        </p>
        <nav className="mt-3 flex flex-wrap gap-2" aria-label="Technical planning settings">
          {technicalLinks.map((link) => (
            <SubNavLink key={link.href} href={link.href} active={isActive(pathname, link.href)}>
              {link.label}
            </SubNavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
