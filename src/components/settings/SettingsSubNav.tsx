"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/settings", label: "Overview" },
  { href: "/settings/roles", label: "Demo roles" },
  { href: "/settings/permissions", label: "Permissions" },
  { href: "/settings/security", label: "Security" },
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
