"use client";

import { documentsSubNav } from "@/lib/documents";
import { SubNavLink } from "@/components/ui/SubNavLink";

export function DocumentsSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Documents sections">
      <SubNavLink href="/documents" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {documentsSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </nav>
  );
}
