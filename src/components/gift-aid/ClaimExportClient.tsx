"use client";

import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/gift-aid/GiftAidNotices";
import { GiftAidRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { GiftAidSubNav } from "@/components/gift-aid/GiftAidDashboardClient";
import { useGiftAidDemo } from "@/components/gift-aid/GiftAidDemoProvider";
import { eligibilityLabel, eligibilityVariant } from "@/lib/giftAid";
import { formatCurrency, formatDate } from "@/lib/utils";
import { GIFT_AID_RATE } from "@/data/demo/giftAid";
import { giftAidTrail } from "@/lib/breadcrumbs";

export function ClaimExportClient() {
  const { claimExport, simulateExport, exportCompleted } = useGiftAidDemo();

  return (
    <>
      <PageHeader
        title="Claim export"
        description="Prepare Gift Aid claim — demo placeholder, not submitted to HMRC."
        breadcrumbs={giftAidTrail("Claim export")}
        backHref="/gift-aid"
      />
      <GiftAidSubNav active="Claim export" />
      <DemoOnlyNotice />

      {exportCompleted && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Claim export generated (demo only — not submitted to HMRC).
        </div>
      )}

      <GiftAidRestrictedSection className="mt-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Claim-ready donations</p>
          <p className="text-2xl font-bold">{formatCurrency(claimExport.claimReadyDonations.reduce((s, d) => s + d.amount, 0))}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Estimated reclaim ({GIFT_AID_RATE * 100}%)</p>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(claimExport.estimatedReclaim)}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Review exceptions</p>
          <p className="text-2xl font-bold text-amber-600">{claimExport.reviewExceptions.length}</p>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="font-semibold text-slate-900">Export checklist</h3>
        <ul className="mt-3 space-y-2">
          {claimExport.checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm">
              <span className={item.complete ? "text-green-600" : "text-slate-400"}>
                {item.complete ? "✓" : "○"}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={simulateExport}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Generate simulated export
        </button>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-slate-900">Claim-ready donations</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {claimExport.claimReadyDonations.map((d) => (
              <li key={d.id} className="flex justify-between">
                <span>{d.donorSource}</span>
                <span>{formatCurrency(d.amount)}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Missing declarations</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {claimExport.missingDeclarations.map((d) => (
              <li key={d.id}>{d.parentCarerName}</li>
            ))}
          </ul>
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-slate-900">Excluded income (do not claim)</h3>
          <ul className="mt-3 space-y-2">
            {claimExport.excludedIncome.slice(0, 5).map((d) => (
              <li key={d.id} className="flex justify-between text-sm">
                <span>{d.donorSource} — {formatDate(d.date)}</span>
                <Badge variant={eligibilityVariant(d.eligibility)}>{eligibilityLabel[d.eligibility]}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        <Link href="/finance" className="text-indigo-600 hover:underline">Finance module</Link>
        {" "}— verify transactions before submitting any real claim.
      </p>
      </GiftAidRestrictedSection>
    </>
  );
}
