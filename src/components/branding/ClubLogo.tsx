"use client";

import Image from "next/image";
import { useState } from "react";
import { clubName, logoPaths } from "@/config/branding";
import { cn } from "@/lib/utils";

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
  const [src, setSrc] = useState<string>(logoPaths.svg);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={src}
        alt={`${clubName} logo`}
        width={size}
        height={size}
        className="shrink-0 object-contain"
        onError={() => {
          if (src !== logoPaths.primary) setSrc(logoPaths.primary);
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
