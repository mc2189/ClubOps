"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { DEMO_BANNER_TEXT } from "@/lib/demoCopy";

export function DemoBanner() {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-amber-500 px-3 py-2 text-center text-xs font-medium text-amber-950 sm:gap-x-3 sm:px-4 sm:text-sm"
    >
      <span>{DEMO_BANNER_TEXT}</span>
      <Link
        href="/demo"
        className="inline-flex min-h-[32px] shrink-0 items-center rounded bg-amber-600/30 px-2 py-1 underline-offset-2 hover:underline"
      >
        About demo
      </Link>
    </div>
  );
}
