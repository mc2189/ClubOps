"use client";

import { staffSubNav } from "@/lib/staff";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function StaffSubNav({ active }: { active?: string }) {
  return (
    <ModuleSubNav label="Staff sections">
      <SubNavLink href="/staff" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {staffSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </ModuleSubNav>
  );
}
