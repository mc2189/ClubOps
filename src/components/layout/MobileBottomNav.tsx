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
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_8px_rgba(0,0,0,0.06)] lg:hidden"
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
                  "flex min-h-[56px] flex-col items-center justify-center border-t-2 px-1 py-2 text-[11px] font-medium leading-tight sm:text-xs",
                  active
                    ? "border-brand-primary bg-brand-primary/5 font-semibold text-brand-primary"
                    : "border-transparent text-slate-600",
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
            className="flex min-h-[56px] w-full flex-col items-center justify-center border-t-2 border-transparent px-1 py-2 text-[11px] font-medium leading-tight text-slate-600 sm:text-xs"
          >
            More
          </button>
        </li>
      </ul>
    </nav>
  );
}
