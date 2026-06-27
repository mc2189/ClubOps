"use client";

import { auditSubNav } from "@/lib/reports";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function AuditSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Audit sections">
      <SubNavLink href="/audit" active={active === "Overview"}>
        Overview
      </SubNavLink>
      {auditSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </nav>
  );
}
