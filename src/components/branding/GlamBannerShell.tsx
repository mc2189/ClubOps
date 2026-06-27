import Image from "next/image";
import { EmeraldBand, PinkRibbonWave } from "@/components/branding/GlamBannerDecor";
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
      {/* Soft blend into the solid left panel */}
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
 * Split glam banner: solid content panel (left) + cropped reference art (right).
 * Avoids ghosting from baked-in mockup text under live HTML.
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
        "relative overflow-hidden rounded-2xl border border-emerald-100/70 shadow-md ring-1 ring-emerald-900/5",
        isHero
          ? "min-h-[320px] sm:min-h-[340px] lg:min-h-[360px] lg:max-h-[400px]"
          : "min-h-[130px] sm:min-h-[150px] lg:min-h-[170px] lg:max-h-[210px]",
        className,
      )}
    >
      {/* Full-width bottom ribbon accents (CSS/SVG — no duplicate text) */}
      <PinkRibbonWave className="pointer-events-none absolute bottom-[6%] left-0 z-[1] h-8 w-full text-pink-300/55 sm:h-10" />
      <EmeraldBand className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[45%] w-[55%] text-brand-primary" />

      <div className="relative z-10 flex min-h-[inherit] flex-col sm:flex-row">
        {/* Left: solid panel — nothing from the reference image sits underneath */}
        <div
          className={cn(
            "flex flex-1 flex-col justify-center bg-gradient-to-br from-white via-white to-emerald-50/50",
            isHero
              ? "px-5 py-5 sm:px-7 sm:py-6 lg:max-w-[56%] lg:px-8"
              : "px-5 py-4 sm:max-w-[62%] sm:px-6 sm:py-5 lg:max-w-[58%]",
            contentClassName,
          )}
        >
          {children}
        </div>

        {/* Right: cropped glam art (desktop/tablet) */}
        <div
          className={cn(
            "relative hidden shrink-0 sm:block",
            isHero ? "w-[42%] lg:w-[44%]" : "w-[38%] lg:w-[40%]",
          )}
        >
          <GlamBannerArtPanel variant={variant} priority={priority} />
        </div>
      </div>

      {/* Mobile: art strip below content, not under it */}
      <div className="relative h-28 overflow-hidden border-t border-emerald-100/50 sm:hidden">
        <GlamBannerArtPanel variant={variant} priority={priority} className="opacity-95" />
      </div>
    </div>
  );
}
