"use client";

import Image from "next/image";
import Link from "next/link";
import { brandAssets, clubName, dashboardWelcomeSubtitle, productName } from "@/config/branding";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 0 7 4.5 12 6 7 7.5 6 12 5 7.5 0 6 5 4.5 6 0Z" />
    </svg>
  );
}

function RibbonAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 60 C 50 20, 90 70, 130 35 S 170 15, 190 40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M20 70 C 60 45, 100 75, 150 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
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

/** Website-style glam hero for the dashboard — mockup-aligned layout */
export function GlamDashboardHero() {
  return (
    <section
      aria-labelledby="dashboard-hero-heading"
      className="relative mb-6 overflow-hidden rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-white via-emerald-50/60 to-brand-soft/40 p-5 shadow-sm ring-1 ring-emerald-900/5 sm:p-7 lg:p-8"
    >
      <RibbonAccent className="pointer-events-none absolute -left-8 top-8 h-24 w-48 text-emerald-300/50" />
      <RibbonAccent className="pointer-events-none absolute -right-4 bottom-6 h-20 w-40 rotate-12 text-pink-300/40" />
      <Sparkle className="pointer-events-none absolute left-[18%] top-6 h-3 w-3 text-pink-300/70" />
      <Sparkle className="pointer-events-none absolute right-[42%] top-10 hidden h-2.5 w-2.5 text-emerald-400/60 sm:block" />
      <Sparkle className="pointer-events-none absolute bottom-[28%] left-[8%] hidden h-2 w-2 text-pink-200/80 md:block" />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,340px)] lg:items-center lg:gap-8">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/80 bg-pink-50/90 px-3 py-1 text-xs font-semibold text-pink-700">
            <Sparkle className="h-3 w-3 shrink-0" />
            Demo mode
          </span>

          <h1
            id="dashboard-hero-heading"
            className="mt-4 font-serif text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            Welcome back
          </h1>
          <p className="mt-2 max-w-xl text-base text-slate-600 sm:text-lg">{dashboardWelcomeSubtitle}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#priorities-heading"
              className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-hover"
            >
              View today&apos;s priorities
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-charcoal shadow-sm hover:bg-slate-50"
            >
              <InfoIcon className="h-4 w-4 text-brand-primary" />
              About this {productName} demo
            </Link>
          </div>

          <div className="mt-5 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
            <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
            <div className="min-w-0 text-sm leading-snug text-slate-700">
              <p className="font-semibold text-brand-charcoal">You&apos;re viewing a demo club</p>
              <p className="mt-0.5 text-slate-600">
                Changes are not saved and do not affect real data.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[320px] justify-center lg:mx-0 lg:max-w-none lg:justify-end">
          <Sparkle className="pointer-events-none absolute -right-1 top-2 h-4 w-4 text-pink-400/70" />
          <Sparkle className="pointer-events-none absolute bottom-8 left-0 hidden h-3 w-3 text-emerald-400/60 sm:block" />
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]">
            <Image
              src={brandAssets.glamLogo.full}
              alt={clubName}
              width={320}
              height={360}
              priority
              className="h-auto w-full object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use GlamDashboardHero */
export const DashboardWelcomeCard = GlamDashboardHero;
