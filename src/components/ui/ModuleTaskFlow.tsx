import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui";
import type { ModuleLandingConfig, ModuleStatusItem } from "@/lib/moduleTaskFlow";
import { moduleStatusToneClass } from "@/lib/moduleTaskFlow";

interface ModulePrimaryPanelProps {
  config: ModuleLandingConfig;
}

export function ModulePrimaryPanel({ config }: ModulePrimaryPanelProps) {
  return (
    <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-soft/80 via-white to-white">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Start here</p>
      <h2 className="mt-1 text-lg font-bold text-brand-charcoal sm:text-xl">{config.title}</h2>
      <p className="mt-1.5 max-w-2xl text-sm text-slate-600">{config.description}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link
          href={config.primaryHref}
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-hover sm:w-auto"
        >
          {config.primaryLabel}
        </Link>
        {config.secondaryHref && config.secondaryLabel && (
          <Link
            href={config.secondaryHref}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-charcoal shadow-sm hover:bg-slate-50 sm:w-auto"
          >
            {config.secondaryLabel}
          </Link>
        )}
      </div>
      <p className="mt-2 text-xs text-slate-500">{config.safetyLine}</p>
      {(config.howItWorks || config.whatHappensNext) && (
        <details className="mt-3 rounded-md border border-slate-200/80 bg-white/70 text-xs text-slate-600">
          {config.howItWorks && (
            <>
              <summary className="cursor-pointer px-3 py-2 font-medium text-slate-800 hover:bg-slate-50">
                How this works
              </summary>
              <p className="border-t border-slate-100 px-3 py-2">{config.howItWorks}</p>
            </>
          )}
          {config.whatHappensNext && (
            <p className="border-t border-slate-100 px-3 py-2">
              <span className="font-medium text-slate-700">What happens next: </span>
              {config.whatHappensNext}
            </p>
          )}
        </details>
      )}
    </Card>
  );
}

interface ModuleStatusStripProps {
  items: ModuleStatusItem[];
  className?: string;
}

export function ModuleStatusStrip({ items, className }: ModuleStatusStripProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={className}
      role="list"
      aria-label="Demo task status"
    >
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            role="listitem"
            className={`rounded-md border px-2.5 py-1.5 text-xs ${moduleStatusToneClass(item.tone)}`}
          >
            <span className="font-semibold">{item.value}</span>
            <span className="opacity-80"> · {item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ModuleMoreToolsProps {
  title?: string;
  itemCount?: number;
  helperText?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

export function ModuleMoreTools({
  title = "More tools",
  itemCount,
  helperText,
  defaultOpen = false,
  children,
  className,
}: ModuleMoreToolsProps) {
  const summaryTitle =
    itemCount != null && itemCount > 0 ? `${title} (${itemCount})` : title;

  return (
    <details
      open={defaultOpen || undefined}
      className={`rounded-lg border border-slate-200 bg-white p-4 ${className ?? ""}`}
    >
      <summary className="cursor-pointer text-sm font-semibold text-slate-900 hover:text-indigo-700">
        {summaryTitle}
      </summary>
      {helperText && <p className="mt-2 text-xs text-slate-500">{helperText}</p>}
      <div className="mt-3">{children}</div>
    </details>
  );
}
