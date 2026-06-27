import Link from "next/link";
import { ClubLogo } from "@/components/branding/ClubLogo";
import { clubName, clubTagline } from "@/config/branding";

export function DashboardWelcomeCard() {
  return (
    <div className="brand-shimmer mb-6 rounded-xl border border-brand-primary/15 bg-gradient-to-br from-brand-soft via-white to-brand-accent-lilac/40 px-5 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-start gap-4">
        <ClubLogo size={56} />
        <div>
          <p className="text-sm font-medium text-brand-primary">Welcome back</p>
          <h2 className="mt-0.5 text-xl font-bold text-brand-charcoal sm:text-2xl">{clubName}</h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">{clubTagline}</p>
        </div>
      </div>
      <Link
        href="/demo"
        className="mt-4 inline-flex min-h-[44px] items-center rounded-md border border-brand-primary/30 bg-white px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-soft sm:mt-0"
      >
        About this demo
      </Link>
    </div>
  );
}
