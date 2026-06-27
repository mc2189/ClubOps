"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getBackFallbackHref,
  getBackParentLabel,
  type BreadcrumbItem,
} from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  fallbackHref: string;
  parentLabel?: string;
  className?: string;
}

export function BackButton({ fallbackHref, parentLabel, className }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    const sameOriginReferrer =
      typeof document !== "undefined" &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin;

    if (typeof window !== "undefined" && window.history.length > 1 && sameOriginReferrer) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 min-h-[44px] md:min-h-0",
        className,
      )}
      aria-label={parentLabel ? `Back to ${parentLabel}` : "Go back"}
    >
      <span aria-hidden="true">←</span> Back
    </button>
  );
}

function BreadcrumbList({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <ol className={cn("flex min-w-0 items-center gap-1 text-sm", className)}>
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
          {index > 0 && (
            <span aria-hidden="true" className="shrink-0 text-slate-400">
              /
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="truncate text-slate-500 hover:text-indigo-600 hover:underline max-w-[8rem] sm:max-w-none"
            >
              {item.label}
            </Link>
          ) : (
            <span
              aria-current="page"
              className="truncate font-medium text-slate-900 max-w-[9rem] sm:max-w-none"
            >
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const mobileItems = items.length > 2 ? items.slice(-2) : items;

  return (
    <>
      <nav aria-label="Breadcrumb" className="hidden min-w-0 sm:block">
        <BreadcrumbList items={items} />
      </nav>
      <nav aria-label="Breadcrumb" className="min-w-0 sm:hidden">
        <BreadcrumbList items={mobileItems} />
      </nav>
    </>
  );
}

interface PageHeaderNavProps {
  items: BreadcrumbItem[];
  backHref?: string;
  className?: string;
}

export function PageHeaderNav({ items, backHref, className }: PageHeaderNavProps) {
  if (items.length === 0) return null;

  const fallback = backHref ?? getBackFallbackHref(items);
  const parentLabel = getBackParentLabel(items);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BackButton fallbackHref={fallback} parentLabel={parentLabel} />
      <PageBreadcrumbs items={items} />
    </div>
  );
}
