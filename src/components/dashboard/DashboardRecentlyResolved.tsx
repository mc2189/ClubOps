import type { DashboardResolvedItem } from "@/data/providers/types";

interface DashboardRecentlyResolvedProps {
  items: DashboardResolvedItem[];
}

export function DashboardRecentlyResolved({ items }: DashboardRecentlyResolvedProps) {
  if (items.length === 0) return null;

  return (
    <aside
      aria-labelledby="resolved-heading"
      className="mt-4 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3"
    >
      <h3 id="resolved-heading" className="text-sm font-semibold text-slate-800">
        Recently resolved in demo
      </h3>
      <p className="mt-0.5 text-xs text-slate-500">
        Example outcomes from the guided walkthrough — fake data only.
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-baseline gap-x-2 text-xs text-slate-600">
            <span aria-hidden="true" className="text-emerald-600">
              ✓
            </span>
            <span>{item.text}</span>
            {item.module && (
              <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                {item.module}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
