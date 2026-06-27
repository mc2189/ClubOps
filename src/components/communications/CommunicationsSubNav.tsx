"use client";

import { communicationsSubNav } from "@/lib/communications";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function CommunicationsSubNav({ active }: { active?: string }) {
  return (
    <ModuleSubNav label="Communications sections">
      <SubNavLink href="/communications" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {communicationsSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </ModuleSubNav>
  );
}
