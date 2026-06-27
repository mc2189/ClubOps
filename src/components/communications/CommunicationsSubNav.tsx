"use client";

import { communicationsSubNav } from "@/lib/communications";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function CommunicationsSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Communications sections">
      <SubNavLink href="/communications" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {communicationsSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </nav>
  );
}
