import Link from "next/link";
import { WebLogoFull } from "@/components/branding/LogoTile";
import { Badge } from "@/components/ui";
import { clubName, dashboardWelcomeSubtitle, productName } from "@/config/branding";

export function DashboardWelcomeCard() {
  return (
    <div className="mb-6 rounded-xl border border-brand-primary/15 bg-gradient-to-br from-brand-soft/80 via-white to-white px-5 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <WebLogoFull width={200} priority decorative className="shrink-0 self-start sm:w-[220px]" />
          <div className="min-w-0">
            <span className="sr-only">{clubName}</span>
            <p className="text-sm font-medium text-brand-primary">Welcome back</p>
            <p className="mt-0.5 text-lg font-semibold text-brand-charcoal sm:text-xl">
              {dashboardWelcomeSubtitle}
            </p>
            <Badge variant="info">Demo mode</Badge>
          </div>
        </div>
        <Link
          href="/demo"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md border border-brand-primary/30 bg-white px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-soft sm:self-center"
        >
          About this {productName} demo
        </Link>
      </div>
    </div>
  );
}
