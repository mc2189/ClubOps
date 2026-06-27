import { brandAssets, clubName, productName } from "@/config/branding";
import { cn } from "@/lib/utils";

type AppBrandMarkSize = "sm" | "md" | "lg";
type AppBrandMarkLayout = "badge-only" | "stacked" | "inline";
type AppBrandMarkTheme = "dark" | "light";

interface AppBrandMarkProps {
  size?: AppBrandMarkSize;
  layout?: AppBrandMarkLayout;
  theme?: AppBrandMarkTheme;
  showProductLabel?: boolean;
  className?: string;
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 0 7 4.5 12 6 7 7.5 6 12 5 7.5 0 6 5 4.5 6 0Z" />
    </svg>
  );
}

function RibbonSwoosh({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 8"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 6 C 10 2, 18 2, 26 4 S 38 6, 46 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const BADGE_SIZE: Record<AppBrandMarkSize, string> = {
  sm: "h-9 w-9 rounded-lg text-[10px]",
  md: "h-11 w-11 rounded-xl text-xs",
  lg: "h-14 w-14 rounded-xl text-sm",
};

function AgcBadge({ size }: { size: AppBrandMarkSize }) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center bg-brand-primary font-bold tracking-tight text-white shadow-sm ring-1 ring-white/10",
        BADGE_SIZE[size],
      )}
      aria-hidden="true"
    >
      <RibbonSwoosh className="absolute -bottom-1 left-1/2 h-1.5 w-8 -translate-x-1/2 text-emerald-200/80" />
      <span className="relative z-10">{brandAssets.appMark.initials}</span>
      <SparkleIcon className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 text-emerald-200" />
    </div>
  );
}

/** Compact CSS/vector app mark — sidebar, dashboard shell, settings (not presentation logos) */
export function AppBrandMark({
  size = "md",
  layout = "stacked",
  theme = "light",
  showProductLabel = true,
  className,
}: AppBrandMarkProps) {
  const ariaLabel = brandAssets.appMark.ariaLabel;

  if (layout === "badge-only") {
    return (
      <div className={className} role="img" aria-label={ariaLabel}>
        <AgcBadge size={size} />
      </div>
    );
  }

  const nameClass =
    theme === "dark"
      ? "text-sm font-semibold leading-snug text-white"
      : "text-sm font-semibold leading-snug text-brand-charcoal";
  const productClass =
    theme === "dark"
      ? "text-xs font-medium text-emerald-200/80"
      : "text-xs font-medium text-slate-500";

  if (layout === "inline") {
    return (
      <div
        className={cn("flex items-center gap-3", className)}
        role="img"
        aria-label={ariaLabel}
      >
        <AgcBadge size={size} />
        <div className="min-w-0">
          <p className={nameClass}>{clubName}</p>
          {showProductLabel && <p className={productClass}>{productName} demo</p>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col items-center", className)}
      role="img"
      aria-label={ariaLabel}
    >
      <AgcBadge size={size} />
      <p className={cn("mt-2.5 text-center", nameClass)}>{clubName}</p>
      {showProductLabel && (
        <p className={cn("mt-0.5 text-center", productClass)}>{productName} demo</p>
      )}
    </div>
  );
}
