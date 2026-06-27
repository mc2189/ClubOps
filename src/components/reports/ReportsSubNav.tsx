"use client";

import { reportsSubNav } from "@/lib/reports";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function ReportsSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Reports sections">
      <SubNavLink href="/reports" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {reportsSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </nav>
  );
}
