"use client";

/**
 * @deprecated Use LogoTile or ClubLogoImage from ./LogoTile instead.
 * Kept for any legacy imports — forwards to LogoTile on light backgrounds.
 */
import { LogoTile, type LogoTileSize } from "@/components/branding/LogoTile";
import { clubName } from "@/config/branding";
import { cn } from "@/lib/utils";

interface ClubLogoProps {
  size?: number;
  className?: string;
  showName?: boolean;
  nameClassName?: string;
  variant?: "default" | "onDark" | "report";
}

export function ClubLogo({
  className,
  showName = false,
  nameClassName,
  variant = "default",
}: ClubLogoProps) {
  const tileSize: LogoTileSize =
    variant === "report" ? "report" : variant === "onDark" ? "sidebar" : "dashboard";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoTile size={tileSize} />
      {showName && (
        <div className={nameClassName}>
          <p className="text-sm font-bold leading-tight text-brand-charcoal">{clubName}</p>
          {variant === "report" && (
            <p className="text-xs text-slate-500">Club admin report — demo only</p>
          )}
        </div>
      )}
    </div>
  );
}

export { ClubLogoImage, LogoTile, SidebarLogoTile } from "@/components/branding/LogoTile";
