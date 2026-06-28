"use client";

import { useMemo, useState } from "react";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { DashboardRecentlyResolved } from "@/components/dashboard/DashboardRecentlyResolved";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import { getPermissionPreviewLevel } from "@/lib/permissions";
import type { DashboardTask, DashboardResolvedItem } from "@/data/providers/types";

const priorityOrder: Record<DashboardTask["priority"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

interface DashboardPrioritiesProps {
  tasks: DashboardTask[];
  resolvedItems?: DashboardResolvedItem[];
  maxVisible?: number;
}

export function DashboardPriorities({
  tasks,
  resolvedItems = [],
  maxVisible = 5,
}: DashboardPrioritiesProps) {
  const { role } = useDemoRole();
  const [showAll, setShowAll] = useState(false);

  const visibleTasks = useMemo(() => {
    return tasks
      .map((task) => {
        const taskModule = task.permissionModule ?? "dashboard";
        const level = getPermissionPreviewLevel(role, taskModule);
        if (level === "restricted") return null;
        return { task, level };
      })
      .filter((entry): entry is { task: DashboardTask; level: "full" | "summary" } => entry !== null)
      .sort((a, b) => priorityOrder[a.task.priority] - priorityOrder[b.task.priority]);
  }, [tasks, role]);

  const displayed = showAll ? visibleTasks : visibleTasks.slice(0, maxVisible);

  if (visibleTasks.length === 0) {
    return (
      <section aria-labelledby="priorities-heading">
        <h2 id="priorities-heading" className="mb-1 text-lg font-semibold text-slate-900">
          Today&apos;s priorities
        </h2>
        <p className="text-sm text-slate-600">
          No priority tasks for your demo role. Try switching to Secretary/Admin or Treasurer in the
          role switcher.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="priorities-heading">
      <h2 id="priorities-heading" className="mb-1 text-lg font-semibold text-slate-900">
        Today&apos;s priorities
      </h2>
      <p className="mb-3 text-sm text-slate-600">
        Start here. These are the demo tasks most likely to save volunteer time.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {displayed.map(({ task, level }) => (
          <TaskCard key={task.id} task={task} previewLevel={level} />
        ))}
      </div>
      {visibleTasks.length > maxVisible && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 text-sm font-medium text-indigo-600 hover:underline"
        >
          {showAll ? "Show fewer tasks" : `Show all ${visibleTasks.length} demo tasks`}
        </button>
      )}
      <DashboardRecentlyResolved items={resolvedItems} />
    </section>
  );
}
