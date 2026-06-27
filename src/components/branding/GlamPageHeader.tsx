import { GlamBannerShell } from "@/components/branding/GlamBannerShell";
import { GlamBannerTitle } from "@/components/branding/GlamBannerDecor";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

interface GlamPageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backHref?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Thin page header — reference banner art with dynamic title and breadcrumbs */
export function GlamPageHeader({
  title,
  subtitle,
  description,
  breadcrumbs,
  action,
  className,
}: GlamPageHeaderProps) {
  const body = subtitle ?? description;

  return (
    <header className={cn("mb-6", className)}>
      <GlamBannerShell variant="page">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <GlamBannerTitle title={title} breadcrumbs={breadcrumbs} />
            {body && (
              <p className="mt-1 max-w-xl text-sm text-slate-600 sm:text-base">{body}</p>
            )}
          </div>
          {action && <div className="shrink-0 sm:self-center">{action}</div>}
        </div>
      </GlamBannerShell>
    </header>
  );
}
