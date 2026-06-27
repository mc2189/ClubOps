import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ClubHealthMetric, HealthStatus } from "@/data/providers/types";

const statusColors: Record<HealthStatus, { bar: string; text: string; bg: string }> = {
  good: { bar: "bg-green-500", text: "text-green-700", bg: "bg-green-50" },
  attention: { bar: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  critical: { bar: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
};

const statusLabels: Record<HealthStatus, string> = {
  good: "Good",
  attention: "Needs attention",
  critical: "Urgent",
};

const statusPlainSentence: Record<HealthStatus, string> = {
  good: "Everything looks fine for now.",
  attention: "Worth a look when you have a moment.",
  critical: "Please action this soon.",
};

interface HealthScoreCardProps {
  metric: ClubHealthMetric;
}

export function HealthScoreCard({ metric }: HealthScoreCardProps) {
  const colors = statusColors[metric.status];

  const content = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{metric.label}</p>
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", colors.bg, colors.text)}>
          {statusLabels[metric.status]}
        </span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-2xl font-bold text-slate-900">{metric.score}</span>
        <span className="mb-1 text-xs text-slate-400">/ 100</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all", colors.bar)}
          style={{ width: `${metric.score}%` }}
          role="progressbar"
          aria-valuenow={metric.score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${metric.label}: ${statusLabels[metric.status]}`}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-slate-700">{statusPlainSentence[metric.status]}</p>
      <p className="mt-1 text-xs text-slate-500">{metric.summary}</p>
      {metric.suggestedAction && metric.linkedHref && (
        <p className="mt-2 text-xs font-medium text-indigo-600">{metric.suggestedAction} →</p>
      )}
    </>
  );

  if (metric.linkedHref) {
    return (
      <Link
        href={metric.linkedHref}
        className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {content}
    </div>
  );
}
