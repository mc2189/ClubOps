"use client";

import Image from "next/image";
import { useState } from "react";
import { clubName, logoPaths, type WebLogoVariant } from "@/config/branding";
import { cn } from "@/lib/utils";

const VARIANT_SRC: Record<WebLogoVariant, string> = {
  "clean-icon": logoPaths.clean.icon,
  "clean-full": logoPaths.clean.full,
  "clean-medium": logoPaths.clean.medium,
  "glam-full": logoPaths.glam.full,
  "glam-icon": logoPaths.glam.icon,
};

const VARIANT_FALLBACK: Partial<Record<WebLogoVariant, WebLogoVariant[]>> = {
  "clean-icon": ["clean-medium"],
  "clean-full": ["clean-medium"],
  "glam-full": ["glam-icon"],
};

function resolveSrc(variant: WebLogoVariant, fallbackIndex: number): string {
  if (fallbackIndex === 0) return VARIANT_SRC[variant];
  const chain = VARIANT_FALLBACK[variant] ?? [];
  const next = chain[fallbackIndex - 1];
  return next ? VARIANT_SRC[next] : VARIANT_SRC[variant];
}

interface WebLogoProps {
  variant?: WebLogoVariant;
  /** Max render width in px — height follows aspect ratio */
  width?: number;
  /** White rounded tile — required for icons on dark sidebar */
  tile?: boolean;
  /** Use empty alt when visible text already names the club */
  decorative?: boolean;
  className?: string;
  tileClassName?: string;
  priority?: boolean;
}

/** Web-friendly Arbroath logo — no inversion or colour filters */
export function WebLogo({
  variant = "clean-icon",
  width = 96,
  tile = false,
  decorative = false,
  className,
  tileClassName,
  priority = false,
}: WebLogoProps) {
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const src = resolveSrc(variant, fallbackIndex);
  const maxFallbacks = (VARIANT_FALLBACK[variant]?.length ?? 0) + 1;

  const image = (
    <Image
      src={src}
      alt={decorative ? "" : clubName}
      width={width}
      height={Math.round(width * 1.1)}
      className={cn("h-auto w-full max-w-full object-contain", className)}
      onError={() => {
        setFallbackIndex((i) => Math.min(i + 1, maxFallbacks - 1));
      }}
      priority={priority}
      aria-hidden={decorative ? true : undefined}
    />
  );

  if (!tile) return image;

  return (
    <div
      className={cn(
        "rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-black/5 sm:p-3",
        tileClassName,
      )}
    >
      {image}
    </div>
  );
}

/** @deprecated Use AppBrandMark for sidebar/shell — presentation logos only elsewhere */
export function SidebarLogoTile({ className }: { className?: string }) {
  return (
    <WebLogo
      variant="clean-icon"
      width={88}
      tile
      tileClassName={cn("mx-auto w-[88px] lg:w-[104px]", className)}
      priority
    />
  );
}

/** Full clean logo for demo, reports, and presentation headers only */
export function WebLogoFull({
  className,
  width = 220,
  priority = false,
  decorative = false,
}: {
  className?: string;
  width?: number;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <WebLogo
      variant="clean-full"
      width={width}
      decorative={decorative}
      className={cn("max-w-[min(100%,280px)]", className)}
      priority={priority}
    />
  );
}

/** Optional glam accent — decorative only */
export function GlamLogoAccent({ className }: { className?: string }) {
  return (
    <WebLogo
      variant="glam-icon"
      width={56}
      decorative
      className={cn("opacity-90", className)}
    />
  );
}

/** @deprecated Use WebLogo — kept for settings compact tile */
export type LogoTileSize = "sidebar" | "drawer" | "dashboard" | "report" | "compact";

export function LogoTile({
  size = "compact",
  className,
  priority = false,
}: {
  size?: LogoTileSize;
  className?: string;
  priority?: boolean;
}) {
  if (size === "sidebar" || size === "drawer") {
    return <SidebarLogoTile className={className} />;
  }
  const width = size === "compact" ? 48 : 200;
  return (
    <WebLogo
      variant={size === "compact" ? "clean-icon" : "clean-full"}
      width={width}
      tile={size === "compact"}
      tileClassName={size === "compact" ? "w-14" : undefined}
      className={className}
      priority={priority}
    />
  );
}

export const ClubLogoImage = WebLogo;
