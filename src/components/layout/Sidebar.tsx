"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationGroups } from "@/config/navigation";
import { BrandMark } from "@/components/branding/BrandMark";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  const pathname = usePathname();

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
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      title={item.description}
                      className={cn(
                        "block min-h-[44px] rounded-md px-3 py-2.5 text-sm font-medium transition-colors lg:min-h-0 lg:py-2",
                        isActive
                          ? "bg-brand-primary text-white shadow-sm"
                          : "text-emerald-100/80 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
