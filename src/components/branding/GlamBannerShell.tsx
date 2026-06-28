import Image from "next/image";
import {
  EmeraldBand,
  GlamBannerBackground,
  GlamBannerBackgroundMobileMinimal,
  PinkRibbonWave,
} from "@/components/branding/GlamBannerDecor";
import { brandAssets } from "@/config/branding";
import { cn } from "@/lib/utils";

type GlamBannerVariant = "hero" | "page";

const ART: Record<GlamBannerVariant, string> = {
  hero: brandAssets.bannerArt.dashboardHero,
  page: brandAssets.bannerArt.pageHeader,
};

/** Right-side crop of reference art — logo and ribbons only, no baked-in UI text */
export function GlamBannerArtPanel({
  variant,
  priority = false,
  className,
}: {
  variant: GlamBannerVariant;
  priority?: boolean;
  className?: string;
}) {
  const isHero = variant === "hero";

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} aria-hidden="true">
      <Image
        src={ART[variant]}
        alt=""
        fill
        priority={priority}
        sizes={isHero ? "45vw" : "40vw"}
        className={cn(
          "!left-auto !right-0 object-cover object-right",
          isHero ? "!w-[165%] !max-w-none" : "!w-[175%] !max-w-none",
        )}
      />
      <div className="absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-14" />
    </div>
  );
}

interface GlamBannerShellProps {
  variant: GlamBannerVariant;
  priority?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

/**
 * Split glam banner: solid content panel (left) + cropped reference art (right) on tablet+.
 * Mobile: compact text-first card — CSS ribbon accents only, no reference art under text.
 */
export function GlamBannerShell({
  variant,
  priority = false,
  className,
  contentClassName,
  children,
}: GlamBannerShellProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isHero
          ? "rounded-xl border border-emerald-100/70 shadow-sm ring-1 ring-emerald-900/5 sm:rounded-2xl sm:shadow-md"
          : "rounded-lg border border-emerald-100/50 shadow-sm sm:rounded-2xl sm:border-emerald-100/70 sm:shadow-md sm:ring-1 sm:ring-emerald-900/5",
        isHero
          ? "sm:min-h-[340px] lg:min-h-[360px] lg:max-h-[400px]"
          : "sm:min-h-[150px] lg:min-h-[170px] lg:max-h-[210px]",
        className,
      )}
    >
      <PinkRibbonWave className="pointer-events-none absolute bottom-[6%] left-0 z-[1] hidden h-8 w-full text-pink-300/55 sm:block sm:h-10" />
      <EmeraldBand className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden h-[45%] w-[55%] text-brand-primary sm:block" />

      <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
        {isHero ? <GlamBannerBackground dense /> : <GlamBannerBackgroundMobileMinimal />}
      </div>

      <div className="relative z-10 flex min-h-[inherit] flex-col sm:flex-row">
        <div
          className={cn(
            "relative flex flex-1 flex-col justify-center",
            isHero
              ? "bg-white/95 px-3 py-3 sm:bg-gradient-to-br sm:from-white sm:via-white sm:to-emerald-50/50 sm:px-7 sm:py-6 lg:max-w-[56%] lg:px-8"
              : "bg-white/95 px-3 py-2.5 sm:bg-gradient-to-br sm:from-white sm:via-white sm:to-emerald-50/50 sm:max-w-[62%] sm:px-6 sm:py-5 lg:max-w-[58%]",
            contentClassName,
          )}
        >
          {children}
        </div>

        <div
          className={cn(
            "relative hidden shrink-0 sm:block",
            isHero ? "w-[42%] lg:w-[44%]" : "w-[38%] lg:w-[40%]",
          )}
        >
          <GlamBannerArtPanel variant={variant} priority={priority} />
        </div>
      </div>
    </div>
  );
}
