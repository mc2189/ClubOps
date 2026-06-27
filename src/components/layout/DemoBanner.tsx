import Link from "next/link";
import { DEMO_BANNER_TEXT, DEMO_BANNER_TEXT_SHORT } from "@/lib/demoCopy";

export function DemoBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-3 py-2 text-center text-sm font-medium text-amber-950 sm:px-4"
    >
      <span className="sm:hidden">{DEMO_BANNER_TEXT_SHORT}. Reload resets changes.</span>
      <span className="hidden sm:inline">{DEMO_BANNER_TEXT}</span>
      <Link
        href="/demo"
        className="inline-flex min-h-[32px] items-center rounded bg-amber-600/30 px-2 py-1 text-xs underline-offset-2 hover:underline"
      >
        About demo
      </Link>
    </div>
  );
}
