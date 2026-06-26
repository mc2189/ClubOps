import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DashboardTask, TaskPriority } from "@/data/providers/types";

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

interface TaskCardProps {
  task: DashboardTask;
}

export function TaskCard({ task }: TaskCardProps) {
  const content = (
    <div
      className={cn(
        "rounded-lg border border-slate-200 border-l-4 p-4 shadow-sm transition-shadow hover:shadow-md",
        priorityStyles[task.priority],
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">{task.title}</p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize",
            priorityBadge[task.priority],
          )}
        >
          {task.priority}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{task.description}</p>
      <p className="mt-2 text-xs font-medium text-slate-400">{task.category}</p>
    </div>
  );

  if (task.href) {
    return (
      <Link href={task.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
