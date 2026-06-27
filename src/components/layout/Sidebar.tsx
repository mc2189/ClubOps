"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationGroups, clubName } from "@/config/navigation";
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
        "flex h-full w-64 flex-col border-r border-slate-200 bg-slate-900 text-white",
        className,
      )}
    >
      <div className="border-b border-slate-700 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">ClubOps</p>
        <p className="mt-1 text-lg font-bold leading-tight">{clubName}</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.id} className={cn(groupIndex > 0 && "mt-5 border-t border-slate-800 pt-4")}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
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
                          ? "bg-slate-700 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white",
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
