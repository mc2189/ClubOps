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

/** Thin page header — ultra-compact on phone (~96–140px), full glam on tablet/desktop */
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
    <header className={cn("mb-3 sm:mb-6", className)}>
      <GlamBannerShell variant="page">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="min-w-0 flex-1">
            <GlamBannerTitle
              title={title}
              breadcrumbs={breadcrumbs}
              compact
              hideBreadcrumbsOnMobile
            />
            {body && (
              <p className="mt-0.5 line-clamp-1 max-w-xl text-xs leading-snug text-slate-600 sm:mt-1 sm:line-clamp-2 sm:text-sm md:line-clamp-none md:text-base">
                {body}
              </p>
            )}
          </div>
          {action && (
            <div className="w-full shrink-0 sm:w-auto sm:self-center [&_a]:flex [&_a]:min-h-[48px] [&_a]:w-full [&_a]:items-center [&_a]:justify-center [&_button]:min-h-[48px] [&_button]:w-full sm:[&_a]:min-h-[44px] sm:[&_a]:w-auto sm:[&_button]:min-h-[44px] sm:[&_button]:w-auto">
              {action}
            </div>
          )}
        </div>
      </GlamBannerShell>
    </header>
  );
}
