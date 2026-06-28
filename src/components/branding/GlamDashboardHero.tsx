"use client";

import Link from "next/link";
import { GlamBannerShell } from "@/components/branding/GlamBannerShell";
import { Sparkle } from "@/components/branding/GlamBannerDecor";
import { dashboardWelcomeSubtitle, productName } from "@/config/branding";

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2 4 5v6c0 5.25 3.4 10.15 8 11 4.6-.85 8-5.75 8-11V5l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 2a2 2 0 00-2 2v1H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7zm0 2h6v1H7V4zm-1 3h8v8H6V7z" />
    </svg>
  );
}

/** Dashboard hero — ultra-compact on mobile, full glam split panel on tablet/desktop */
export function GlamDashboardHero() {
  return (
    <section aria-labelledby="dashboard-hero-heading" className="mb-3 sm:mb-6">
      <GlamBannerShell variant="hero" priority>
        <span className="inline-flex items-center gap-1 rounded-full border border-pink-200/90 bg-pink-50/95 px-2 py-0.5 text-[10px] font-semibold text-pink-700 shadow-sm sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
          <Sparkle className="h-2 w-2 shrink-0 sm:h-3 sm:w-3" />
          Demo mode
        </span>

        <h1
          id="dashboard-hero-heading"
          className="mt-1.5 font-serif text-3xl font-bold leading-tight tracking-tight text-brand-charcoal sm:mt-3 sm:text-3xl lg:text-[2.6rem] lg:leading-[1.1]"
        >
          Welcome back
        </h1>
        <p className="mt-1 max-w-md text-sm leading-snug text-slate-600">{dashboardWelcomeSubtitle}</p>

        <div className="mt-2.5 flex flex-col gap-1.5 sm:mt-4 sm:flex-row sm:flex-wrap sm:gap-2.5">
          <Link
            href="#priorities-heading"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-primary-hover sm:min-h-[44px] sm:w-auto sm:px-5"
          >
            <ClipboardIcon className="h-4 w-4" />
            View today&apos;s priorities
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-charcoal shadow-sm hover:bg-slate-50 sm:min-h-[44px] sm:w-auto sm:px-5"
          >
            <InfoIcon className="h-4 w-4 text-brand-primary" />
            About this {productName} demo
          </Link>
        </div>

        <div className="mt-2.5 flex gap-2 rounded-lg border border-emerald-200/80 bg-emerald-50/90 px-2.5 py-1.5 shadow-sm sm:mt-4 sm:max-w-md sm:gap-3 sm:px-3.5 sm:py-2.5">
          <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary sm:h-5 sm:w-5" />
          <div className="min-w-0 text-[11px] leading-snug sm:text-sm">
            <p className="font-semibold text-brand-charcoal">Demo club — changes not saved</p>
            <p className="mt-0.5 hidden text-slate-600 sm:block">
              Changes are not saved and do not affect real data.
            </p>
          </div>
        </div>
      </GlamBannerShell>
    </section>
  );
}

/** @deprecated Use GlamDashboardHero */
export const DashboardWelcomeCard = GlamDashboardHero;
