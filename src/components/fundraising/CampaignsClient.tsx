"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { formatFundraisingCurrency } from "@/lib/fundraising";
import { formatDate } from "@/lib/utils";

export function CampaignsClient() {
  const { campaigns } = useFundraisingDemo();

  return (
    <>
      <PageHeader title="Campaigns" description="What we're raising money for and how we're progressing." />
      <FundraisingSubNav active="Campaigns" />
      <DemoOnlyNotice />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {campaigns.map((c) => {
          const pct = Math.round((c.raised / c.target) * 100);
          const remaining = c.target - c.raised;
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between">
                <Link href={`/fundraising/campaigns/${c.id}`} className="text-lg font-semibold text-indigo-600 hover:underline">{c.name}</Link>
                <Badge variant={c.status === "active" ? "success" : "default"}>{c.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">{c.purpose}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div><p className="text-slate-500">Raised</p><p className="font-semibold">{formatFundraisingCurrency(c.raised)}</p></div>
                <div><p className="text-slate-500">Target</p><p className="font-semibold">{formatFundraisingCurrency(c.target)}</p></div>
                <div><p className="text-slate-500">Remaining</p><p className="font-semibold">{formatFundraisingCurrency(remaining)}</p></div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <p className="mt-1 text-xs text-slate-500">{pct}% · {formatDate(c.startDate)} – {formatDate(c.endDate)}</p>
            </Card>
          );
        })}
      </div>
    </>
  );
}
