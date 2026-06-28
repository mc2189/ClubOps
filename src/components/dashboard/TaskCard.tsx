import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DashboardTask, TaskPriority } from "@/data/providers/types";
import type { PermissionPreviewLevel } from "@/lib/permissions";

const priorityStyles: Record<TaskPriority, string> = {
  high: "border-l-red-500 bg-red-50/50",
  medium: "border-l-amber-500 bg-amber-50/50",
  low: "border-l-slate-300 bg-white",
};

const priorityBadge: Record<TaskPriority, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-600",
};

function severityBadgeClass(severity: string, priority: TaskPriority): string {
  if (severity === "Needs review") return "bg-amber-100 text-amber-800";
  if (severity === "Ready to confirm") return "bg-emerald-100 text-emerald-800";
  return priorityBadge[priority];
}

interface TaskCardProps {
  task: DashboardTask;
  previewLevel?: PermissionPreviewLevel;
}

export function TaskCard({ task, previewLevel = "full" }: TaskCardProps) {
  const severity = task.severityLabel ?? task.priority;
  const why = task.whyItMatters ?? task.description;
  const action = task.suggestedAction;
  const linked = task.linkedModules ?? (task.category ? [task.category] : []);
  const actionLabel = task.actionLabel ?? "Open task";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border border-slate-200 border-l-4 p-4 shadow-sm",
        priorityStyles[task.priority],
      )}
      aria-labelledby={`task-${task.id}-title`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 id={`task-${task.id}-title`} className="text-sm font-semibold text-slate-900">
          {task.title}
        </h3>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
            severityBadgeClass(String(severity), task.priority),
          )}
        >
          <span className="sr-only">Severity: </span>
          {severity}
        </span>
      </div>

      <div className="mt-2 flex-1 space-y-2 text-xs text-slate-600">
        <p>
          <span className="font-medium text-slate-700">Why this matters: </span>
          {why}
        </p>
        {action && (
          <p>
            <span className="font-medium text-slate-700">Suggested action: </span>
            {action}
          </p>
        )}
      </div>

      {linked.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Linked areas">
          {linked.map((module) => (
            <span
              key={module}
              className="rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              {module}
            </span>
          ))}
        </div>
      )}

      {previewLevel === "summary" && (
        <p className="mt-2 text-[11px] text-slate-500">
          Summary view for your role — switch to Treasurer or Admin in the demo role switcher for
          full detail.
        </p>
      )}

      {task.href && (
        <Link
          href={task.href}
          className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:py-2"
        >
          {actionLabel}
        </Link>
      )}

      {task.whatHappensNext && (
        <p className="mt-2 text-[11px] leading-snug text-slate-500">
          <span className="font-medium text-slate-600">What happens next: </span>
          {task.whatHappensNext}
        </p>
      )}
    </article>
  );
}
