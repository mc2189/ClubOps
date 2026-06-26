import Link from "next/link";
import { cn } from "@/lib/utils";
import type { QuickAction } from "@/data/providers/types";

const actionIcons: Record<string, string> = {
  "qa-001": "£",
  "qa-002": "✉",
  "qa-003": "+",
  "qa-004": "↑",
  "qa-005": "GA",
  "qa-006": "R",
};

interface QuickActionCardProps {
  action: QuickAction;
}

export function QuickActionCard({ action }: QuickActionCardProps) {
  const icon = actionIcons[action.id] ?? "→";

  return (
    <Link
      href={action.href}
      className={cn(
        "group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm",
        "transition-all hover:border-indigo-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
      )}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600 transition-colors group-hover:bg-indigo-100"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="mt-3 text-sm font-semibold text-slate-900">{action.label}</span>
      <span className="mt-1 text-xs text-slate-500">{action.description}</span>
    </Link>
  );
}
