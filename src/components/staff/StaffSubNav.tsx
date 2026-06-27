"use client";

import { staffSubNav } from "@/lib/staff";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function StaffSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Staff sections">
      <SubNavLink href="/staff" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {staffSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </nav>
  );
}
