"use client";

import { fundraisingSubNav } from "@/lib/fundraising";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function FundraisingSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Fundraising sections">
      <SubNavLink href="/fundraising" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {fundraisingSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </nav>
  );
}
