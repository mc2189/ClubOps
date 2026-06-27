"use client";

import { useState } from "react";
import { TaskCard } from "@/components/dashboard/TaskCard";
import type { DashboardTask } from "@/data/providers/types";

const priorityOrder: Record<DashboardTask["priority"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

interface DashboardPrioritiesProps {
  tasks: DashboardTask[];
  maxVisible?: number;
}

export function DashboardPriorities({ tasks, maxVisible = 3 }: DashboardPrioritiesProps) {
  const [showAll, setShowAll] = useState(false);
  const sorted = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const visible = showAll ? sorted : sorted.slice(0, maxVisible);

  return (
    <section aria-labelledby="priorities-heading">
      <h2 id="priorities-heading" className="mb-1 text-lg font-semibold text-slate-900">
        Today&apos;s priorities
      </h2>
      <p className="mb-3 text-sm text-slate-600">
        Start here — the most important demo tasks for your club today.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {sorted.length > maxVisible && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 text-sm font-medium text-indigo-600 hover:underline"
        >
          {showAll ? "Show fewer tasks" : `Show all ${sorted.length} demo tasks`}
        </button>
      )}
    </section>
  );
}
