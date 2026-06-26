"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { DemoOnlyNotice, GiftAidGuidanceNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { giftAidEligibilityLabel, giftAidEligibilityVariant, formatFundraisingCurrency } from "@/lib/fundraising";
import { formatDate } from "@/lib/utils";

export function DonationsClient() {
  const { donations, campaigns, addDonation } = useFundraisingDemo();
  const [showForm, setShowForm] = useState(false);
  const [donor, setDonor] = useState("");
  const [amount, setAmount] = useState("");
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id ?? "");

  const handleAdd = () => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (!donor || !amount || !campaign) return;
    addDonation({
      donor,
      amount: parseFloat(amount),
      campaignId,
      campaign: campaign.name,
      donationType: "individual voluntary donation",
    });
    setShowForm(false);
    setDonor("");
    setAmount("");
  };

  return (
    <>
      <PageHeader title="Donations" description="All donations with Gift Aid eligibility and finance links." />
      <FundraisingSubNav active="Donations" />
      <DemoOnlyNotice />
      <GiftAidGuidanceNotice />
      <button type="button" onClick={() => setShowForm(!showForm)} className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Add demo donation</button>
      {showForm && (
        <Card className="mt-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <input type="text" placeholder="Donor name" value={donor} onChange={(e) => setDonor(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <select value={campaignId} onChange={(e) => setCampaignId(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
              {campaigns.filter((c) => c.status === "active").map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button type="button" onClick={handleAdd} className="mt-3 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white">Save donation</button>
        </Card>
      )}
      <Card className="mt-4 overflow-x-auto">
        <DataTable headers={["Date", "Donor", "Amount", "Campaign", "Type", "Status", "Gift Aid", "Declaration", "Thank-you", "Links"]}>
          {donations.map((d) => (
            <tr key={d.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-600">{formatDate(d.date)}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{d.donor}</td>
              <td className="px-4 py-3">{formatFundraisingCurrency(d.amount)}</td>
              <td className="px-4 py-3 text-sm"><Link href={`/fundraising/campaigns/${d.campaignId}`} className="text-indigo-600 hover:underline">{d.campaign}</Link></td>
              <td className="px-4 py-3 text-xs text-slate-600">{d.donationType}</td>
              <td className="px-4 py-3"><Badge variant={d.paymentStatus === "received" ? "success" : "info"}>{d.paymentStatus === "received" ? "Donation received" : d.paymentStatus}</Badge></td>
              <td className="px-4 py-3"><Badge variant={giftAidEligibilityVariant(d.giftAidEligibility)}>{giftAidEligibilityLabel[d.giftAidEligibility]}</Badge></td>
              <td className="px-4 py-3 text-xs text-slate-600">{d.giftAidDeclarationStatus ?? "—"}</td>
              <td className="px-4 py-3"><Badge variant={d.thankYouStatus === "sent" ? "success" : "warning"}>{d.thankYouStatus === "needed" ? "Thank-you needed" : d.thankYouStatus}</Badge></td>
              <td className="px-4 py-3 text-xs">
                {d.financeLinkPlaceholder && <Link href="/finance/transactions" className="text-indigo-600 hover:underline">Finance</Link>}
                {d.giftAidLinkPlaceholder && <span className="ml-1 text-slate-500">· <Link href="/gift-aid/eligible-donations" className="text-indigo-600 hover:underline">Gift Aid</Link></span>}
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </>
  );
}
