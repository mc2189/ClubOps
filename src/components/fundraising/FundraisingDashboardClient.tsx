"use client";

import Link from "next/link";
import { Card, StatCard } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { FundraisingSecurityNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { COMMUNICATIONS_LINKS, formatFundraisingCurrency } from "@/lib/fundraising";
import { BUSINESS_FOLLOWUP_HELP } from "@/lib/terminologyHelp";
import { FUNDRAISING_LANDING } from "@/lib/moduleTaskFlow";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function FundraisingDashboardClient() {
  const { dashboard, campaigns } = useFundraisingDemo();
  const active = campaigns.filter((c) => c.status === "active");

  return (
    <>
      <GlamPageHeader
        title="Fundraising"
        description="Campaigns, donors and follow-ups — demo only."
        breadcrumbs={moduleBreadcrumb(MODULES.fundraising)}
        backHref="/dashboard"
      />
      <FundraisingSubNav active="Dashboard" />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={FUNDRAISING_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "followups",
              value: `${dashboard.followUpsDue} follow-ups due`,
              label: "pending",
              tone: dashboard.followUpsDue > 0 ? "pending" : "resolved",
            },
            {
              id: "thankyou",
              value: `${dashboard.thankYouOutstanding} thank-yous outstanding`,
              label: "pending",
              tone: dashboard.thankYouOutstanding > 0 ? "pending" : "neutral",
            },
          ]}
        />

        <Link
          href="/fundraising/follow-ups"
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 sm:w-auto"
        >
          Review follow-ups
        </Link>
        <p className="text-xs text-slate-500">{BUSINESS_FOLLOWUP_HELP}</p>

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Active campaigns</h2>
          <ul className="mt-2 space-y-3">
            {active.slice(0, 3).map((c) => {
              const pct = Math.round((c.raised / c.target) * 100);
              return (
                <li key={c.id}>
                  <div className="flex justify-between text-sm">
                    <Link href={`/fundraising/campaigns/${c.id}`} className="font-medium text-indigo-600 hover:underline">
                      {c.name}
                    </Link>
                    <span className="text-slate-600">{pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <ModuleMoreTools
          title="More fundraising tools"
          itemCount={6}
          helperText="Open this for donations, campaigns, business leads and sponsorship messages."
        >
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/fundraising/donations", label: "Donations" },
              { href: "/fundraising/campaigns", label: "Campaigns" },
              { href: "/fundraising/businesses", label: "Business leads" },
              { href: "/fundraising/follow-ups", label: "Follow-ups" },
              { href: COMMUNICATIONS_LINKS.sponsorshipRequest, label: "Sponsorship message" },
              { href: "/fundraising/reports", label: "Reports" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Fundraising summary stats">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Raised this month" value={formatFundraisingCurrency(dashboard.raisedThisMonth)} />
            <StatCard label="Active campaigns" value={dashboard.activeCampaigns} />
            <StatCard label="Pledges outstanding" value={dashboard.pledgesOutstanding} />
            <StatCard label="Potential Gift Aid" value={formatFundraisingCurrency(dashboard.potentialGiftAid)} />
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Fundraising safety notes">
          <FundraisingSecurityNotice />
        </ModuleMoreTools>
      </div>
    </>
  );
}
