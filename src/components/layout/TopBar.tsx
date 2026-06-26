"use client";

import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";
import { DemoRoleSwitcher } from "@/components/rbac/DemoRoleSwitcher";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";

export function TopBar() {
  const pathname = usePathname();
  const { roleName } = useDemoRole();
  const currentPage = mainNavigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  const initials = roleName
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-auto min-h-14 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2 sm:px-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          {currentPage?.label ?? "ClubOps"}
        </h2>
        {currentPage?.description && (
          <p className="text-sm text-slate-500">{currentPage.description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <DemoRoleSwitcher />
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <span className="hidden text-sm text-slate-500 sm:inline">{roleName}</span>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700"
            aria-hidden="true"
            title={roleName}
          >
            {initials.slice(0, 2)}
          </div>
        </div>
      </div>
    </header>
  );
}
