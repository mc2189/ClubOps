"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/settings", label: "Overview" },
  { href: "/settings/roles", label: "Demo roles" },
  { href: "/settings/permissions", label: "Permissions" },
  { href: "/settings/security", label: "Security" },
  { href: "/settings/live-readiness", label: "Live readiness" },
  { href: "/settings/auth-decision", label: "Auth decision" },
  { href: "/settings/live-stack", label: "Live stack" },
  { href: "/settings/implementation-options", label: "Implementation options" },
  { href: "/settings/recommended-stack", label: "Recommended stack" },
  { href: "/settings/supabase-prep", label: "Supabase prep" },
  { href: "/settings/schema-plan", label: "Schema plan" },
  { href: "/settings/private-deployment", label: "Private deploy" },
  { href: "/settings/data-architecture", label: "Data architecture" },
  { href: "/settings/provider-model", label: "Provider model" },
  { href: "/settings/production-roadmap", label: "Production roadmap" },
];

export function SettingsSubNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex flex-wrap gap-2" aria-label="Settings sections">
      {links.map((link) => {
        const active =
          link.href === "/settings"
            ? pathname === "/settings"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              active
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
