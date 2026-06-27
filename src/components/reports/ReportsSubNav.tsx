"use client";

import { reportsSubNav } from "@/lib/reports";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function ReportsSubNav({ active }: { active?: string }) {
  return (
    <ModuleSubNav label="Reports sections">
      <SubNavLink href="/reports" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {reportsSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </ModuleSubNav>
  );
}
