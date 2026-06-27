"use client";

import Image from "next/image";
import { useState } from "react";
import { clubName, logoPaths } from "@/config/branding";
import { cn } from "@/lib/utils";

const FALLBACK_CHAIN = [logoPaths.primary, logoPaths.transparent, logoPaths.whiteBg] as const;

interface ClubLogoImageProps {
  /** Render width in px — height scales with object-contain */
  width?: number;
  className?: string;
  priority?: boolean;
}

/** Black transparent logo — no colour filters or inversion */
export function ClubLogoImage({ width = 96, className, priority = false }: ClubLogoImageProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const src = FALLBACK_CHAIN[srcIndex] ?? logoPaths.primary;

  return (
    <Image
      src={src}
      alt={`${clubName} logo`}
      width={width}
      height={width}
      className={cn("h-auto w-full object-contain", className)}
      onError={() => {
        setSrcIndex((i) => Math.min(i + 1, FALLBACK_CHAIN.length - 1));
      }}
      priority={priority}
    />
  );
}

export type LogoTileSize = "sidebar" | "drawer" | "dashboard" | "report" | "compact";

const TILE_SIZE: Record<
  LogoTileSize,
  { tileClass: string; imageWidth: number; padding: string }
> = {
  /** Desktop sidebar — 104px tile */
  sidebar: { tileClass: "w-[104px]", imageWidth: 96, padding: "p-2.5" },
  /** Mobile drawer — 88px tile */
  drawer: { tileClass: "w-[88px]", imageWidth: 80, padding: "p-2" },
  /** Dashboard welcome — supporting mark beside club name */
  dashboard: { tileClass: "w-20 sm:w-24", imageWidth: 88, padding: "p-2 sm:p-2.5" },
  /** Report / export headers */
  report: { tileClass: "w-[72px] sm:w-20", imageWidth: 72, padding: "p-2" },
  /** Settings card */
  compact: { tileClass: "w-14", imageWidth: 48, padding: "p-1.5" },
};

interface LogoTileProps {
  size?: LogoTileSize;
  className?: string;
  /** Override responsive tile width classes */
  tileClassName?: string;
  priority?: boolean;
}

/** White rounded tile for the official black logo — use on dark or coloured backgrounds */
export function LogoTile({
  size = "sidebar",
  className,
  tileClassName,
  priority = false,
}: LogoTileProps) {
  const config = TILE_SIZE[size];

  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-sm ring-1 ring-black/5",
        config.padding,
        tileClassName ?? config.tileClass,
        className,
      )}
    >
      <ClubLogoImage width={config.imageWidth} priority={priority} />
    </div>
  );
}

/** Responsive sidebar/drawer tile: 88px mobile drawer, 104px desktop sidebar */
export function SidebarLogoTile({ className }: { className?: string }) {
  return (
    <LogoTile
      size="sidebar"
      className={className}
      tileClassName="mx-auto w-[88px] lg:w-[104px]"
      priority
    />
  );
}
