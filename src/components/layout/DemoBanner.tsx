import Link from "next/link";
import { DEMO_BANNER_TEXT } from "@/lib/demoCopy";

export function DemoBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-950"
    >
      <span>{DEMO_BANNER_TEXT}</span>
      <Link
        href="/demo"
        className="rounded bg-amber-600/30 px-2 py-0.5 text-xs underline-offset-2 hover:underline"
      >
        Demo safety info
      </Link>
    </div>
  );
}
