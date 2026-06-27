"use client";

import Image from "next/image";
import { useState } from "react";
import { clubName, logoPaths } from "@/config/branding";
import { cn } from "@/lib/utils";

const FALLBACK_CHAIN = [logoPaths.primary, logoPaths.transparent, logoPaths.whiteBg] as const;

interface ClubLogoProps {
  size?: number;
  className?: string;
  showName?: boolean;
  nameClassName?: string;
  variant?: "default" | "onDark" | "report";
}

export function ClubLogo({
  size = 40,
  className,
  showName = false,
  nameClassName,
  variant = "default",
}: ClubLogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const src = FALLBACK_CHAIN[srcIndex] ?? logoPaths.primary;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={src}
        alt={`${clubName} logo`}
        width={size}
        height={size}
        className={cn(
          "shrink-0 object-contain",
          variant === "onDark" && "brightness-0 invert",
        )}
        onError={() => {
          setSrcIndex((i) => Math.min(i + 1, FALLBACK_CHAIN.length - 1));
        }}
        priority={size >= 48}
      />
      {showName && (
        <div className={nameClassName}>
          <p
            className={cn(
              "text-sm font-bold leading-tight",
              variant === "onDark" ? "text-white" : "text-brand-charcoal",
            )}
          >
            {clubName}
          </p>
          {variant === "report" && (
            <p className="text-xs text-slate-500">Club admin report — demo only</p>
          )}
        </div>
      )}
    </div>
  );
}
