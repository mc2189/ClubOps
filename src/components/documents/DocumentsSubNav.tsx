"use client";

import { documentsSubNav } from "@/lib/documents";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function DocumentsSubNav({ active }: { active?: string }) {
  return (
    <ModuleSubNav label="Documents sections">
      <SubNavLink href="/documents" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {documentsSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </ModuleSubNav>
  );
}
