import Image from "next/image";
import { brandAssets } from "@/config/branding";
import { cn } from "@/lib/utils";

type GlamBannerVariant = "hero" | "page";

const ART: Record<GlamBannerVariant, string> = {
  hero: brandAssets.bannerArt.dashboardHero,
  page: brandAssets.bannerArt.pageHeader,
};

/** Reference banner artwork — decorative layer matching supplied mockups */
export function GlamBannerArt({
  variant,
  priority = false,
  className,
}: {
  variant: GlamBannerVariant;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={ART[variant]}
      alt=""
      fill
      priority={priority}
      sizes={variant === "hero" ? "100vw" : "(max-width: 768px) 100vw, 80vw"}
      className={cn(
        "pointer-events-none object-cover",
        variant === "hero" ? "object-[center_right]" : "object-[75%_center]",
        className,
      )}
      aria-hidden
    />
  );
}

interface GlamBannerShellProps {
  variant: GlamBannerVariant;
  priority?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

/** Full-width glam banner frame using reference art + real HTML content overlay */
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
      <GlamBannerArt variant={variant} priority={priority} />

      <div
        className={cn(
          "relative z-10 flex h-full min-h-[inherit] flex-col justify-center",
          isHero ? "px-5 py-5 sm:px-7 sm:py-6 lg:px-8" : "px-5 py-4 sm:px-6 sm:py-5",
        )}
      >
        <div
          className={cn(
            "w-full rounded-xl",
            isHero
              ? "bg-gradient-to-r from-white/97 from-0% via-white/88 via-[70%] to-transparent to-[100%] pr-2 sm:via-white/92 sm:via-[52%] sm:to-white/0 sm:to-[68%] sm:max-w-[62%] sm:pr-8 lg:max-w-[58%]"
              : "bg-gradient-to-r from-white/97 from-0% via-white/85 via-[65%] to-transparent to-[100%] pr-1 sm:via-white/90 sm:via-[48%] sm:to-white/0 sm:to-[72%] sm:max-w-[72%] sm:pr-6 lg:max-w-[68%]",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
