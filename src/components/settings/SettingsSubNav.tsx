"use client";

import { usePathname, useRouter } from "next/navigation";
import { SubNavLink } from "@/components/ui/SubNavLink";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";

const clubVolunteerLinks: { href: string; label: string; exact?: boolean }[] = [
  { href: "/settings", label: "Overview", exact: true },
  { href: "/settings/roles", label: "Demo roles" },
  { href: "/settings/permissions", label: "Permissions" },
  { href: "/settings/security", label: "Security summary" },
];

const technicalLinks: { href: string; label: string }[] = [
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
  const router = useRouter();
  const current =
    clubVolunteerLinks.find((link) => isActive(pathname, link.href, link.exact)) ??
    technicalLinks.find((link) => isActive(pathname, link.href)) ??
    clubVolunteerLinks[0];

  return (
    <div className="mb-6 space-y-4">
      <div className="md:hidden">
        <label htmlFor="settings-section-select" className="mb-1 block text-sm font-medium text-slate-700">
          Settings section
        </label>
        <select
          id="settings-section-select"
          value={current.href}
          onChange={(e) => router.push(e.target.value)}
          className="min-h-[44px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <optgroup label="Club & volunteers">
            {clubVolunteerLinks.map((link) => (
              <option key={link.href} value={link.href}>
                {link.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Technical / going live">
            {technicalLinks.map((link) => (
              <option key={link.href} value={link.href}>
                {link.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="hidden md:block">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Club & volunteers
        </p>
        <ModuleSubNav label="Club and volunteer settings">
          {clubVolunteerLinks.map((link) => (
            <SubNavLink
              key={link.href}
              href={link.href}
              active={isActive(pathname, link.href, link.exact)}
            >
              {link.label}
            </SubNavLink>
          ))}
        </ModuleSubNav>
      </div>

      <div className="hidden rounded-lg border border-slate-200 bg-slate-50 p-3 md:block">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Technical / going live
        </p>
        <p className="mt-1 text-xs text-slate-600">
          For Mike, developers and committee planning — not everyday club admin.
        </p>
        <ModuleSubNav label="Technical planning settings" className="mt-3">
          {technicalLinks.map((link) => (
            <SubNavLink key={link.href} href={link.href} active={isActive(pathname, link.href)}>
              {link.label}
            </SubNavLink>
          ))}
        </ModuleSubNav>
      </div>
    </div>
  );
}
