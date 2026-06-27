import { GlamBannerBackground, GlamBannerLogo, GlamBannerTitle } from "@/components/branding/GlamBannerDecor";
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

/** Thin rectangular glam banner for internal module pages */
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
    <header
      className={cn(
        "relative mb-6 overflow-hidden rounded-2xl border border-emerald-100/80 shadow-sm ring-1 ring-emerald-900/5",
        className,
      )}
    >
      <GlamBannerBackground dense />
      <GlamBannerLogo variant="page" />

      <div className="relative flex min-h-[140px] flex-col justify-center gap-4 px-5 py-4 sm:min-h-[160px] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:min-h-[180px] lg:max-h-[220px]">
        <div className="min-w-0 max-w-2xl pr-0 md:pr-8">
          <GlamBannerTitle title={title} breadcrumbs={breadcrumbs} />
          {body && (
            <p className="mt-1.5 max-w-xl text-sm text-slate-600 sm:text-base">{body}</p>
          )}
        </div>
        {action && <div className="shrink-0 sm:self-center">{action}</div>}
      </div>
    </header>
  );
}
