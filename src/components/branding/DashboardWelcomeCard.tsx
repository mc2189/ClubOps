import Link from "next/link";
import { GlamLogoAccent, WebLogoFull } from "@/components/branding/LogoTile";
import { clubName, clubTagline } from "@/config/branding";

export function DashboardWelcomeCard() {
  return (
    <div className="brand-shimmer relative mb-6 overflow-hidden rounded-xl border border-brand-primary/15 bg-gradient-to-br from-brand-soft via-white to-brand-accent-lilac/40 px-5 py-5">
      <GlamLogoAccent className="pointer-events-none absolute right-4 top-4 hidden opacity-40 sm:block lg:opacity-50" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <WebLogoFull width={240} priority className="shrink-0 self-start" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-brand-primary">Welcome back</p>
            <h2 className="mt-0.5 text-xl font-bold text-brand-charcoal sm:text-2xl">{clubName}</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600">{clubTagline}</p>
          </div>
        </div>
        <Link
          href="/demo"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md border border-brand-primary/30 bg-white px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-soft sm:self-center"
        >
          About this demo
        </Link>
      </div>
    </div>
  );
}
