"use client";

import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { DemoOnlyNotice, FundraisingSecurityNotice, GiftAidGuidanceNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { COMMUNICATIONS_LINKS, formatFundraisingCurrency } from "@/lib/fundraising";

export function FundraisingDashboardClient() {
  const { dashboard, campaigns } = useFundraisingDemo();
  const active = campaigns.filter((c) => c.status === "active");

  return (
    <>
      <PageHeader title="Fundraising" description="Campaigns, donors, sponsorships and Gift Aid opportunities — demo only." />
      <FundraisingSubNav active="Dashboard" />
      <DemoOnlyNotice />
      <div className="mt-4 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Raised this month" value={formatFundraisingCurrency(dashboard.raisedThisMonth)} />
          <StatCard label="Raised this year" value={formatFundraisingCurrency(dashboard.raisedThisYear)} />
          <StatCard label="Active campaigns" value={dashboard.activeCampaigns} />
          <StatCard label="Potential Gift Aid" value={formatFundraisingCurrency(dashboard.potentialGiftAid)} hint="From eligible donations" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Businesses contacted" value={dashboard.businessesContacted} />
          <StatCard label="Pledges outstanding" value={dashboard.pledgesOutstanding} />
          <StatCard label="Follow-ups due" value={dashboard.followUpsDue} />
          <StatCard label="Thank-yous outstanding" value={dashboard.thankYouOutstanding} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Campaign progress</h2>
            <ul className="mt-3 space-y-3">
              {active.slice(0, 4).map((c) => {
                const pct = Math.round((c.raised / c.target) * 100);
                return (
                  <li key={c.id}>
                    <div className="flex justify-between text-sm">
                      <Link href={`/fundraising/campaigns/${c.id}`} className="font-medium text-indigo-600 hover:underline">{c.name}</Link>
                      <span className="text-slate-600">{formatFundraisingCurrency(c.raised)} / {formatFundraisingCurrency(c.target)}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{pct}% complete</p>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link href="/fundraising/donations" className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-100">Add demo donation</Link>
              <Link href="/fundraising/campaigns" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">View campaigns</Link>
              <Link href="/fundraising/businesses" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">View business leads</Link>
              <Link href="/fundraising/follow-ups" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">Review follow-ups</Link>
              <Link href={COMMUNICATIONS_LINKS.sponsorshipRequest} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">Prepare sponsorship request</Link>
              <Link href="/fundraising/reports" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">View donor report</Link>
            </div>
          </Card>
        </div>
        <GiftAidGuidanceNotice />
        <FundraisingSecurityNotice />
      </div>
    </>
  );
}
