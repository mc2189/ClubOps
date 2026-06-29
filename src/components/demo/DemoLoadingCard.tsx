"use client";

import Link from "next/link";
import { Card } from "@/components/ui";

type DemoLoadingCardProps = {
  title: string;
  description: string;
  reloadLabel?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
  /** When true, shows skeleton bars and hides action buttons (initial prepare state) */
  preparing?: boolean;
};

export function DemoLoadingCard({
  title,
  description,
  reloadLabel = "Reload page",
  backHref = "/dashboard",
  backLabel = "Back to dashboard",
  children,
  preparing = false,
}: DemoLoadingCardProps) {
  return (
    <div role="status" aria-live="polite">
      <Card className="mt-6 max-w-xl">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        {preparing && (
          <div className="mt-5 space-y-3" aria-hidden="true">
            <div className="h-10 animate-pulse rounded-md bg-slate-100" />
            <div className="h-10 animate-pulse rounded-md bg-slate-100" />
            <div className="h-24 animate-pulse rounded-md bg-slate-100" />
          </div>
        )}
        {children}
        {!preparing && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {reloadLabel}
            </button>
            <Link
              href={backHref}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {backLabel}
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
