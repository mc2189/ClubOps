"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice, GiftAidGuidanceNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { COMMUNICATIONS_LINKS, formatFundraisingCurrency } from "@/lib/fundraising";
import type { FundraisingCampaignDetail } from "@/data/providers/types";
import { formatDate } from "@/lib/utils";
import { fundraisingCampaignTrail } from "@/lib/breadcrumbs";

export function CampaignDetailClient({ campaign }: { campaign: FundraisingCampaignDetail }) {
  const { donations } = useFundraisingDemo();
  const linked = donations.filter((d) => d.campaignId === campaign.id);
  const pct = Math.round((campaign.raised / campaign.target) * 100);

  return (
    <>
      <PageHeader
        title={campaign.name}
        description={campaign.purpose}
        breadcrumbs={fundraisingCampaignTrail(campaign.name)}
        backHref="/fundraising/campaigns"
      />
      <FundraisingSubNav active="Campaigns" />
      <DemoOnlyNotice />
      <div className="mt-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <Card><p className="text-sm text-slate-500">Raised</p><p className="text-2xl font-bold">{formatFundraisingCurrency(campaign.raised)}</p></Card>
          <Card><p className="text-sm text-slate-500">Target</p><p className="text-2xl font-bold">{formatFundraisingCurrency(campaign.target)}</p></Card>
          <Card><p className="text-sm text-slate-500">Remaining</p><p className="text-2xl font-bold">{formatFundraisingCurrency(campaign.target - campaign.raised)}</p></Card>
          <Card><p className="text-sm text-slate-500">Progress</p><p className="text-2xl font-bold">{pct}%</p></Card>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
        <p className="text-sm text-slate-500">{formatDate(campaign.startDate)} – {formatDate(campaign.endDate)} · <Badge variant={campaign.status === "active" ? "success" : "default"}>{campaign.status}</Badge></p>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-sm font-semibold">Linked donations</h2>
            <ul className="mt-2 divide-y divide-slate-100">
              {linked.length ? linked.map((d) => (
                <li key={d.id} className="flex justify-between py-2 text-sm">
                  <span>{d.donor}</span>
                  <span className="font-medium">{formatFundraisingCurrency(d.amount)}</span>
                </li>
              )) : <li className="py-2 text-sm text-slate-500">No donations linked yet</li>}
            </ul>
            <Link href="/fundraising/donations" className="mt-2 inline-block text-xs text-indigo-600 hover:underline">View all donations</Link>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold">Sponsors</h2>
            <ul className="mt-2 list-inside list-disc text-sm text-slate-700">
              {campaign.linkedSponsorNames.length ? campaign.linkedSponsorNames.map((s) => <li key={s}>{s}</li>) : <li className="list-none text-slate-500">No sponsors yet</li>}
            </ul>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {campaign.recentActivity.map((a) => <li key={a}>• {a}</li>)}
            </ul>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold">Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={COMMUNICATIONS_LINKS.campaignUpdate} className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700">Prepare campaign update</Link>
              <Link href={COMMUNICATIONS_LINKS.sponsorshipRequest} className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Prepare sponsorship request</Link>
              <Link href="/finance/transactions" className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">View finance</Link>
            </div>
          </Card>
        </div>
        <GiftAidGuidanceNotice />
      </div>
    </>
  );
}
