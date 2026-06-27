"use client";

import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { DemoOnlyNotice, ExportSuccessNotice } from "@/components/reports/ReportsNotices";
import { RestrictedExportButton } from "@/components/rbac/RestrictedExportButton";
import { GiftAidGuidanceNotice } from "@/components/fundraising/FundraisingNotices";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { COMMUNICATIONS_LINKS } from "@/lib/fundraising";
import { formatReportCurrency } from "@/lib/reports";
import { reportsTrail } from "@/lib/breadcrumbs";

export function GiftAidPackClient() {
  const { giftAidPack, simulateExport, lastExportTitle } = useReportsAuditDemo();
  const p = giftAidPack;

  return (
    <>
      <PageHeader title="Gift Aid Pack" description="Declarations, claim-ready donations and compliance summary." breadcrumbs={reportsTrail("Gift Aid Pack")} backHref="/reports" />
      <ReportsSubNav active="Gift Aid Pack" />
      <DemoOnlyNotice />
      {lastExportTitle === "Gift Aid Pack" && <ExportSuccessNotice title="Gift Aid Pack" />}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Valid declarations" value={p.validDeclarations} />
        <StatCard label="Missing declarations" value={p.missingDeclarations} />
        <StatCard label="Claim-ready amount" value={formatReportCurrency(p.claimReadyAmount)} />
        <StatCard label="Excluded income" value={formatReportCurrency(p.excludedIncome)} />
        <StatCard label="Needs review" value={p.donationsNeedingReview} />
        <StatCard label="Estimated reclaim" value={formatReportCurrency(p.estimatedReclaim)} />
      </div>
      <Card className="mt-6">
        <h2 className="text-sm font-semibold">Compliance warnings</h2>
        <ul className="mt-2 list-inside list-disc text-sm text-red-800">
          {p.complianceWarnings.map((w) => <li key={w}>{w}</li>)}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/gift-aid/declarations" className="text-sm text-indigo-600 hover:underline">Declarations</Link>
          <Link href="/gift-aid/eligible-donations" className="text-sm text-indigo-600 hover:underline">Eligible donations</Link>
          <Link href="/gift-aid/claim-export" className="text-sm text-indigo-600 hover:underline">Claim export</Link>
          <Link href={COMMUNICATIONS_LINKS.giftAidRequest} className="text-sm text-indigo-600 hover:underline">Declaration request campaign</Link>
        </div>
        <RestrictedExportButton label="Generate demo export" onExport={() => simulateExport("Gift Aid Pack")} />
      </Card>
      <div className="mt-4"><GiftAidGuidanceNotice /></div>
    </>
  );
}
