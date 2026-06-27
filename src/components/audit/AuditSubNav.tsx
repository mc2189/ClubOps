"use client";

import { auditSubNav } from "@/lib/reports";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function AuditSubNav({ active }: { active?: string }) {
  return (
    <ModuleSubNav label="Audit sections">
      <SubNavLink href="/audit" active={active === "Overview"}>
        Overview
      </SubNavLink>
      {auditSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </ModuleSubNav>
  );
}
