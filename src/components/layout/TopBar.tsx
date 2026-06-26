"use client";

import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";

export function TopBar() {
  const pathname = usePathname();
  const currentPage = mainNavigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          {currentPage?.label ?? "ClubOps"}
        </h2>
        {currentPage?.description && (
          <p className="text-sm text-slate-500">{currentPage.description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 sm:inline">Demo Admin</span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600"
          aria-hidden="true"
        >
          DA
        </div>
      </div>
    </header>
  );
}
