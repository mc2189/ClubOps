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

/** Thin page header — compact on mobile, glam split panel on tablet/desktop */
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
    <header className={cn("mb-4 sm:mb-6", className)}>
      <GlamBannerShell variant="page">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="min-w-0 flex-1">
            <GlamBannerTitle title={title} breadcrumbs={breadcrumbs} compact />
            {body && (
              <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-snug text-slate-600 sm:line-clamp-none sm:text-base">
                {body}
              </p>
            )}
          </div>
          {action && (
            <div className="w-full shrink-0 sm:w-auto sm:self-center [&_a]:flex [&_a]:min-h-[44px] [&_a]:w-full [&_a]:items-center [&_a]:justify-center [&_button]:min-h-[44px] [&_button]:w-full sm:[&_a]:w-auto sm:[&_button]:w-auto">
              {action}
            </div>
          )}
        </div>
      </GlamBannerShell>
    </header>
  );
}
