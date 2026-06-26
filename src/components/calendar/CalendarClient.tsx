"use client";

import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import type { CalendarPageData } from "@/data/providers/types";
import { calendarTypeLabels, calendarTypeColors } from "@/lib/attendance";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CalendarClient({ data }: { data: CalendarPageData }) {
  const sortedItems = [...data.items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const grouped = sortedItems.reduce<Record<string, typeof sortedItems>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const priorityColors = {
    high: "border-red-200 bg-red-50",
    medium: "border-amber-200 bg-amber-50",
    low: "border-slate-200 bg-slate-50",
  };

  return (
    <>
      <PageHeader
        title="Calendar"
        description="Sessions, events, reminders and suggested actions across the club."
      />

      <Card className="border-amber-200 bg-amber-50">
        <p className="text-sm text-amber-900">
          Demo calendar — all items are fake. Suggested actions are hints only; no real emails or
          integrations are triggered.
        </p>
      </Card>

      <section className="mt-6" aria-labelledby="hints-heading">
        <h2 id="hints-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Suggested actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.automationHints.map((hint) => (
            <div
              key={hint.id}
              className={cn("rounded-lg border p-4", priorityColors[hint.priority])}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{hint.title}</p>
                <Badge variant={hint.priority === "high" ? "danger" : hint.priority === "medium" ? "warning" : "default"}>
                  {hint.priority}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{hint.description}</p>
              {hint.href && (
                <Link href={hint.href} className="mt-2 inline-block text-sm text-indigo-600 hover:underline">
                  View →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="agenda-heading">
        <h2 id="agenda-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Agenda
        </h2>
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <h3 className="sticky top-0 bg-slate-50 py-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                {formatDate(date)}
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <Card key={item.id} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            calendarTypeColors[item.type] ?? "bg-slate-100 text-slate-700",
                          )}
                        >
                          {calendarTypeLabels[item.type] ?? item.type}
                        </span>
                        <Badge variant="default">{item.module}</Badge>
                      </div>
                      {item.description && (
                        <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                      )}
                      <p className="mt-1 text-xs text-slate-400">
                        {item.startTime !== "00:00" ? `${item.startTime} – ${item.endTime}` : "All day"}
                        {item.location !== "—" && ` · ${item.location}`}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
