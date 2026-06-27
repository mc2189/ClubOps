"use client";

import Image from "next/image";
import Link from "next/link";
import {
  EmeraldBand,
  GlamBannerBackground,
  GlamBannerLogo,
  PinkRibbonWave,
  Sparkle,
} from "@/components/branding/GlamBannerDecor";
import { brandAssets, dashboardWelcomeSubtitle, productName } from "@/config/branding";

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

/** Wide rectangular glam hero banner for the dashboard */
export function GlamDashboardHero() {
  return (
    <section
      aria-labelledby="dashboard-hero-heading"
      className="relative mb-6 overflow-hidden rounded-2xl border border-emerald-100/80 shadow-sm ring-1 ring-emerald-900/5"
    >
      <GlamBannerBackground />
      <GlamBannerLogo variant="hero" priority />

      <div className="relative grid min-h-[280px] gap-5 px-5 py-5 sm:min-h-[300px] sm:px-6 sm:py-6 lg:min-h-[320px] lg:max-h-[380px] lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:items-center lg:gap-6 lg:py-7">
        <div className="min-w-0 lg:max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/80 bg-pink-50/90 px-3 py-1 text-xs font-semibold text-pink-700">
            <Sparkle className="h-3 w-3 shrink-0" />
            Demo mode
          </span>

          <h1
            id="dashboard-hero-heading"
            className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl lg:mt-4 lg:text-[2.35rem] lg:leading-tight"
          >
            Welcome back
          </h1>
          <p className="mt-1.5 max-w-lg text-sm text-slate-600 sm:text-base lg:text-lg">
            {dashboardWelcomeSubtitle}
          </p>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:mt-5">
            <Link
              href="#priorities-heading"
              className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-hover"
            >
              View today&apos;s priorities
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-brand-charcoal shadow-sm hover:bg-white"
            >
              <InfoIcon className="h-4 w-4 text-brand-primary" />
              About this {productName} demo
            </Link>
          </div>

          <div className="mt-4 flex max-w-lg gap-3 rounded-xl border border-emerald-100/90 bg-emerald-50/80 px-3.5 py-2.5 lg:mt-5">
            <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
            <div className="min-w-0 text-sm leading-snug text-slate-700">
              <p className="font-semibold text-brand-charcoal">You&apos;re viewing a demo club</p>
              <p className="mt-0.5 text-slate-600">
                Changes are not saved and do not affect real data.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: integrated logo strip below copy */}
        <div className="relative mx-auto h-36 w-full max-w-sm overflow-hidden sm:h-40 lg:hidden">
          <PinkRibbonWave className="absolute bottom-2 left-0 h-6 w-full text-pink-300/50" />
          <EmeraldBand className="absolute bottom-0 right-0 h-full w-3/4 text-brand-primary" />
          <div className="absolute bottom-0 right-0 h-[115%] w-[85%]">
            <Image
              src={brandAssets.glamLogo.full}
              alt="Arbroath Gymnastics Club"
              width={320}
              height={280}
              priority
              className="h-full w-full object-contain object-bottom-right opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use GlamDashboardHero */
export const DashboardWelcomeCard = GlamDashboardHero;
