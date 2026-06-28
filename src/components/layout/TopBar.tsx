"use client";

import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";
import { clubShortName } from "@/config/branding";
import { WebLogoIcon } from "@/components/branding/LogoTile";
import { DemoRoleSwitcher } from "@/components/rbac/DemoRoleSwitcher";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import { useMobileShell } from "@/components/layout/MobileShellContext";

export function TopBar() {
  const pathname = usePathname();
  const { roleName } = useDemoRole();
  const { toggleDrawer, drawerOpen } = useMobileShell();
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
    <header className="relative z-20 flex min-h-14 shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3 py-2 sm:gap-3 sm:px-6 lg:sticky lg:top-0">
      <button
        type="button"
        onClick={toggleDrawer}
        className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
        aria-label="Open menu"
        aria-controls="mobile-nav-drawer"
        aria-expanded={drawerOpen}
      >
        <span className="flex flex-col gap-1" aria-hidden="true">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      <WebLogoIcon width={32} className="shrink-0 lg:hidden" />

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-semibold text-brand-charcoal sm:text-lg">
          {currentPage?.label ?? clubShortName}
        </h2>
        {currentPage?.description && (
          <p className="hidden truncate text-sm text-slate-500 sm:block">{currentPage.description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <DemoRoleSwitcher compact />
        <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex">
          <span className="hidden max-w-[120px] truncate text-sm text-slate-500 lg:inline xl:max-w-none">
            {roleName}
          </span>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand-primary"
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
