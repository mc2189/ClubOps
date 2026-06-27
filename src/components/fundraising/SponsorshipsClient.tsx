"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice, GiftAidGuidanceNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { COMMUNICATIONS_LINKS, formatFundraisingCurrency } from "@/lib/fundraising";
import { formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function SponsorshipsClient() {
  const { sponsorships } = useFundraisingDemo();

  return (
    <>
      <PageHeader title="Sponsorship tiers" description="Bronze, Silver, Gold and event sponsorship packages." breadcrumbs={moduleBreadcrumb(MODULES.fundraising, "Sponsorships")} backHref={moduleBackHref(MODULES.fundraising, "Sponsorships")} />
      <FundraisingSubNav active="Sponsorships" />
      <DemoOnlyNotice />
      <GiftAidGuidanceNotice />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {sponsorships.map((tier) => (
          <Card key={tier.id}>
            <div className="flex items-start justify-between">
              <h2 className="font-semibold text-slate-900">{tier.name}</h2>
              <Badge variant={tier.acknowledgementStatus === "sent" ? "success" : tier.acknowledgementStatus === "needed" ? "warning" : "default"}>
                {tier.acknowledgementStatus === "needed" ? "Thank-you needed" : tier.acknowledgementStatus}
              </Badge>
            </div>
            <p className="mt-1 text-lg font-bold text-indigo-700">{formatFundraisingCurrency(tier.suggestedAmount)}</p>
            <p className="mt-2 text-sm text-slate-600">{tier.benefitsPlaceholder}</p>
            <dl className="mt-3 space-y-1 text-sm">
              <div><dt className="text-slate-500">Current sponsors</dt><dd>{tier.currentSponsors.length ? tier.currentSponsors.join(", ") : "None yet"}</dd></div>
              <div><dt className="text-slate-500">Renewal</dt><dd>{tier.renewalPeriod}{tier.nextRenewalDate && ` · Next: ${formatDate(tier.nextRenewalDate)}`}</dd></div>
            </dl>
            {tier.nextRenewalDate && (
              <span className="mt-2 inline-block"><Badge variant="warning">Renewal due</Badge></span>
            )}
            <Link href={COMMUNICATIONS_LINKS.renewalReminder} className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline">Prepare renewal reminder</Link>
          </Card>
        ))}
      </div>
    </>
  );
}
