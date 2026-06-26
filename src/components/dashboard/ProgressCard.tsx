import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  raised: number;
  target: number;
  className?: string;
}

export function ProgressCard({ title, raised, target, className }: ProgressCardProps) {
  const percentage = Math.min(Math.round((raised / target) * 100), 100);

  return (
    <div className={cn("rounded-lg border border-slate-200 bg-white p-4 shadow-sm", className)}>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-lg font-bold text-slate-900">{formatCurrency(raised)}</span>
        <span className="text-xs text-slate-500">of {formatCurrency(target)}</span>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${title} fundraising progress`}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-indigo-600">{percentage}% of target reached</p>
    </div>
  );
}

interface SnapshotCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SnapshotCard({ title, children, className }: SnapshotCardProps) {
  return (
    <div className={cn("rounded-lg border border-slate-200 bg-white p-5 shadow-sm", className)}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

interface SnapshotRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export function SnapshotRow({ label, value, highlight }: SnapshotRowProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">{label}</span>
      <span className={cn("font-semibold", highlight ? "text-indigo-600" : "text-slate-900")}>
        {value}
      </span>
    </div>
  );
}
