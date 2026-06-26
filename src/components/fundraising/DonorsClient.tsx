"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { COMMUNICATIONS_LINKS, formatFundraisingCurrency } from "@/lib/fundraising";
import { formatDate } from "@/lib/utils";

export function DonorsClient() {
  const { donors, markThankYouSent } = useFundraisingDemo();

  return (
    <>
      <PageHeader title="Donors" description="Individual, parent, business and community supporters." />
      <FundraisingSubNav active="Donors" />
      <DemoOnlyNotice />
      <Card className="mt-4 overflow-x-auto">
        <DataTable headers={["Donor", "Type", "Total", "Last donation", "Gift Aid", "Campaign", "Thank-you", "Follow-up", "Actions"]}>
          {donors.map((d) => (
            <tr key={d.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{d.name}</td>
              <td className="px-4 py-3 capitalize text-slate-600">{d.donorType}</td>
              <td className="px-4 py-3">{formatFundraisingCurrency(d.totalDonated)}</td>
              <td className="px-4 py-3 text-slate-600">{d.lastDonationDate ? formatDate(d.lastDonationDate) : "—"}</td>
              <td className="px-4 py-3 text-sm">{d.giftAidStatus ?? (d.donorType === "business" || d.donorType === "grant/funder" ? "Not Gift Aid eligible" : "—")}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{d.linkedCampaign ?? "—"}</td>
              <td className="px-4 py-3"><Badge variant={d.thankYouStatus === "sent" ? "success" : d.thankYouStatus === "needed" ? "warning" : "info"}>{d.thankYouStatus === "needed" ? "Thank-you needed" : d.thankYouStatus}</Badge></td>
              <td className="px-4 py-3 text-sm text-slate-600">{d.followUpStatus}</td>
              <td className="px-4 py-3">
                {d.thankYouStatus !== "sent" && (
                  <button type="button" onClick={() => markThankYouSent(d.id, "donor")} className="text-xs text-indigo-600 hover:underline">Mark thank-you sent</button>
                )}
                {d.giftAidStatus?.includes("Missing") && (
                  <Link href={COMMUNICATIONS_LINKS.giftAidRequest} className="ml-2 text-xs text-indigo-600 hover:underline">Request Gift Aid</Link>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </>
  );
}
