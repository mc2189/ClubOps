"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMobileShell } from "@/components/layout/MobileShellContext";

const items = [
  { href: "/dashboard", label: "Home", match: (p: string) => p === "/dashboard" },
  { href: "/members", label: "Members", match: (p: string) => p.startsWith("/members") },
  { href: "/attendance", label: "Attendance", match: (p: string) => p.startsWith("/attendance") },
  { href: "/communications", label: "Messages", match: (p: string) => p.startsWith("/communications") },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openDrawer } = useMobileShell();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Quick navigation"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[52px] flex-col items-center justify-center px-1 py-2 text-xs font-medium",
                  active ? "text-indigo-700" : "text-slate-600",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={openDrawer}
            className="flex min-h-[52px] w-full flex-col items-center justify-center px-1 py-2 text-xs font-medium text-slate-600"
          >
            More
          </button>
        </li>
      </ul>
    </nav>
  );
}
