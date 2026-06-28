"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationGroups } from "@/config/navigation";
import { BrandMark } from "@/components/branding/BrandMark";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import {
  getNavAccessLevel,
  navItemLabel,
  navItemTitle,
  type NavAccessLevel,
} from "@/lib/navAccess";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

function navLinkClass(isActive: boolean, access: NavAccessLevel): string {
  if (isActive) {
    return "bg-brand-primary text-white shadow-sm";
  }
  if (access === "restricted") {
    return "text-emerald-100/50 hover:bg-white/5 hover:text-emerald-100/70";
  }
  if (access === "summary") {
    return "text-emerald-100/70 hover:bg-white/10 hover:text-white";
  }
  return "text-emerald-100/80 hover:bg-white/10 hover:text-white";
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  const pathname = usePathname();
  const { role } = useDemoRole();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-brand-sidebar-border bg-brand-sidebar text-white",
        className,
      )}
    >
      <div className="border-b border-brand-sidebar-border px-5 py-5">
        <BrandMark />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {navigationGroups.map((group, groupIndex) => (
          <div
            key={group.id}
            className={cn(groupIndex > 0 && "mt-5 border-t border-brand-sidebar-border pt-4")}
          >
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-emerald-200/50">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                const access = getNavAccessLevel(role, item.href);
                const label = navItemLabel(item.label, access);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      title={navItemTitle(item.description, access)}
                      className={cn(
                        "flex min-h-[44px] items-center gap-1.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors lg:min-h-0 lg:py-2",
                        navLinkClass(isActive, access),
                      )}
                    >
                      {access !== "full" && (
                        <span aria-hidden="true" className="shrink-0 text-xs opacity-80">
                          🔒
                        </span>
                      )}
                      <span className="truncate">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="mt-4 px-3 text-[10px] leading-relaxed text-emerald-200/40">
          Demo roles change what you can see. Switch role in the top bar or open{" "}
          <Link href="/settings/roles" onClick={onNavigate} className="underline hover:text-emerald-100/70">
            demo roles
          </Link>
          .
        </p>
      </nav>
    </aside>
  );
}
