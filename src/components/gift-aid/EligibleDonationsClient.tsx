"use client";

import Link from "next/link";
import { Badge, PageHeader } from "@/components/ui";
import { DemoOnlyNotice, IneligibleWarning } from "@/components/gift-aid/GiftAidNotices";
import { GiftAidSubNav } from "@/components/gift-aid/GiftAidDashboardClient";
import { useGiftAidDemo } from "@/components/gift-aid/GiftAidDemoProvider";
import {
  declarationStatusLabel,
  declarationStatusVariant,
  eligibilityLabel,
  eligibilityVariant,
} from "@/lib/giftAid";
import { formatCurrency, formatDate } from "@/lib/utils";

export function EligibleDonationsClient() {
  const { donations, updateDonationEligibility } = useGiftAidDemo();

  const groups = [
    { title: "Eligible individual donations", filter: (d: typeof donations[0]) => d.category === "eligible individual donation" },
    { title: "Ineligible fees", filter: (d: typeof donations[0]) => d.category === "ineligible fees" },
    { title: "Ineligible raffle income", filter: (d: typeof donations[0]) => d.category === "ineligible raffle income" },
    { title: "Ineligible business / sponsorship", filter: (d: typeof donations[0]) => d.category.includes("business") || d.category.includes("sponsorship") },
    { title: "Ineligible grants", filter: (d: typeof donations[0]) => d.category === "ineligible grant" },
    { title: "Needs review", filter: (d: typeof donations[0]) => d.category === "needs review" },
  ];

  return (
    <>
      <PageHeader
        title="Eligible donations"
        description="Income split by Gift Aid eligibility — linked to finance demo data."
        action={
          <Link href="/finance/transactions" className="text-sm text-indigo-600 hover:underline">
            View finance transactions →
          </Link>
        }
      />
      <GiftAidSubNav active="Eligible donations" />
      <DemoOnlyNotice />

      {groups.map((group) => {
        const items = donations.filter(group.filter);
        return (
          <section key={group.title} className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{group.title}</h2>
            {items.length === 0 ? (
              <p className="text-sm text-slate-500">
                None in demo data for this category.{" "}
                <Link href="/gift-aid/rules" className="font-medium text-indigo-600 hover:underline">
                  View Gift Aid rules
                </Link>
              </p>
            ) : (
            <div className="space-y-3">
              {items.map((d) => (
                <div key={d.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{d.donorSource}</p>
                      <p className="text-sm text-slate-500">
                        {formatDate(d.date)} · {formatCurrency(d.amount)}
                      </p>
                      {d.linkedMemberId && (
                        <Link href={`/members/${d.linkedMemberId}`} className="text-sm text-indigo-600 hover:underline">
                          View member profile
                        </Link>
                      )}
                      {d.financeTransactionId && (
                        <Link href="/finance/transactions" className="ml-2 text-xs text-slate-400 hover:underline">
                          Finance record
                        </Link>
                      )}
                      <p className="mt-2 text-sm text-slate-600">{d.reason}</p>
                      {d.eligibility === "not-eligible" && <IneligibleWarning />}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={eligibilityVariant(d.eligibility)}>{eligibilityLabel[d.eligibility]}</Badge>
                      {d.declarationStatus !== "n/a" && (
                        <Badge variant={declarationStatusVariant(d.declarationStatus)}>
                          {declarationStatusLabel[d.declarationStatus]}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {d.eligibility === "needs-review" && (
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => updateDonationEligibility(d.id, "eligible")} className="rounded bg-green-600 px-2 py-1 text-xs text-white">Mark eligible</button>
                      <button type="button" onClick={() => updateDonationEligibility(d.id, "not-eligible")} className="rounded bg-red-600 px-2 py-1 text-xs text-white">Mark ineligible</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}
          </section>
        );
      })}
    </>
  );
}
