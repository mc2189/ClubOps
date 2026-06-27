import Image from "next/image";
import Link from "next/link";
import { brandAssets, clubName } from "@/config/branding";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 0 7 4.5 12 6 7 7.5 6 12 5 7.5 0 6 5 4.5 6 0Z" />
    </svg>
  );
}

export function PinkRibbonWave({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 60" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M0 45 C 80 15, 160 55, 240 25 S 360 10, 400 35"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M0 52 C 100 35, 200 58, 300 38 S 380 28, 400 48"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

export function EmeraldBand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M0 90 Q 120 40, 240 70 T 400 50 L 400 120 L 0 120 Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M120 95 Q 220 55, 320 75 T 400 65"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

export function GlamBannerBackground({ dense = false }: { dense?: boolean }) {
  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-emerald-50/70 to-emerald-100/40",
          dense && "via-white to-emerald-50/50",
        )}
        aria-hidden="true"
      />
      <EmeraldBand className="pointer-events-none absolute bottom-0 right-0 h-[55%] w-[70%] text-brand-primary" />
      <PinkRibbonWave className="pointer-events-none absolute bottom-[8%] left-0 h-8 w-[85%] text-pink-300/60 sm:h-10" />
      <Sparkle className="pointer-events-none absolute left-[12%] top-[18%] hidden h-2.5 w-2.5 text-pink-300/70 sm:block" />
      <Sparkle className="pointer-events-none absolute right-[38%] top-[22%] hidden h-2 w-2 text-emerald-400/50 lg:block" />
      <Sparkle className="pointer-events-none absolute bottom-[35%] left-[42%] hidden h-1.5 w-1.5 text-pink-200/80 md:block" />
    </>
  );
}

export function GlamBannerLogo({
  variant = "hero",
  priority = false,
}: {
  variant?: "hero" | "page";
  priority?: boolean;
}) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "pointer-events-none absolute overflow-hidden",
        isHero
          ? "bottom-0 right-0 hidden h-full w-[min(52%,440px)] sm:block"
          : "bottom-0 right-0 hidden h-full w-[min(42%,280px)] md:block",
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute",
          isHero
            ? "bottom-[-8%] right-[-6%] h-[115%] w-[108%]"
            : "bottom-[-12%] right-[-8%] h-[125%] w-[115%]",
        )}
      >
        <Image
          src={brandAssets.glamLogo.full}
          alt=""
          width={isHero ? 420 : 280}
          height={isHero ? 380 : 260}
          priority={priority}
          className="h-full w-full object-contain object-bottom-right opacity-95"
        />
      </div>
    </div>
  );
}

function BreadcrumbEyebrow({ items }: { items: BreadcrumbItem[] }) {
  const mobileItems = items.length > 2 ? items.slice(-2) : items;

  function renderList(list: BreadcrumbItem[], className?: string) {
    return (
      <ol className={cn("flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs font-medium text-brand-primary/80 sm:text-sm", className)}>
        {list.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
            {index > 0 && (
              <span aria-hidden="true" className="shrink-0 text-brand-primary/40">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="truncate hover:text-brand-primary hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-brand-primary">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-2 flex min-w-0 items-center gap-1.5">
      <Sparkle className="h-3 w-3 shrink-0 text-pink-400/80" aria-hidden="true" />
      <div className="min-w-0 sm:hidden">{renderList(mobileItems)}</div>
      <div className="hidden min-w-0 sm:block">{renderList(items)}</div>
    </nav>
  );
}

export function GlamBannerTitle({
  id,
  title,
  breadcrumbs,
}: {
  id?: string;
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <div className="min-w-0">
      {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbEyebrow items={breadcrumbs} />}
      <h1
        id={id}
        className="flex min-w-0 items-center gap-2 font-serif text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl lg:text-4xl"
      >
        <Sparkle className="hidden h-3.5 w-3.5 shrink-0 text-pink-400/70 sm:block" aria-hidden="true" />
        <span className="truncate">{title}</span>
        <Sparkle className="hidden h-3 w-3 shrink-0 text-pink-300/60 lg:block" aria-hidden="true" />
      </h1>
      <span className="sr-only">{clubName}</span>
    </div>
  );
}
