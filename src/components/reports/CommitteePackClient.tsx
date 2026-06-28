"use client";

import { ReportBrandHeader } from "@/components/branding/ReportBrandHeader";
import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { DemoOnlyNotice, ExportSuccessNotice } from "@/components/reports/ReportsNotices";
import { RestrictedExportButton } from "@/components/rbac/RestrictedExportButton";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { CommitteePackPreview } from "@/components/reports/CommitteePackPreview";
import { ClubHealthSummary } from "@/components/reports/ClubHealthSummary";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { formatReportCurrency } from "@/lib/reports";
import { reportsTrail } from "@/lib/breadcrumbs";

export function CommitteePackClient() {
  const { committeePack, clubHealth, simulateExport, lastExportTitle } = useReportsAuditDemo();
  const p = committeePack;

  return (
    <>
      <PageHeader
        title="Committee Pack"
        description="Pre-meeting summary for club committee — demo only."
        breadcrumbs={reportsTrail("Committee Pack")}
        backHref="/reports"
      />
      <ReportsSubNav active="Committee Pack" />
      <div className="mt-4 pb-24 lg:pb-6">
        <ReportBrandHeader title="Committee Pack" subtitle="Pre-meeting summary for club committee" />
        <DemoOnlyNotice />
        {lastExportTitle === "Committee Pack" && <ExportSuccessNotice title="Committee Pack" />}

        <CommitteePackPreview />

        <Card className="mt-6">
          <h2 className="text-sm font-semibold text-slate-900">Headline figures</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Club health score" value={`${p.clubHealthScore}/100`} />
            <StatCard label="Active members" value={p.activeMembers} />
            <StatCard label="Avg attendance" value={`${p.averageAttendance}%`} />
            <StatCard label="Net finance" value={formatReportCurrency(p.netFinancePosition)} />
          </div>
        </Card>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-slate-900">Club health by module</h2>
          <div className="mt-3">
            <ClubHealthSummary metrics={clubHealth} />
          </div>
        </div>

        <Card className="mt-6">
          <h2 className="text-sm font-semibold text-slate-900">Simulated export</h2>
          <p className="mt-1 text-sm text-slate-600">
            Record a demo export in the audit trail — no file is created.
          </p>
          <RestrictedExportButton
            label="Preview demo export"
            onExport={() => simulateExport("Committee Pack")}
          />
          <Link href="/reports/export-centre" className="mt-3 inline-block text-sm text-indigo-600 hover:underline">
            Open export centre →
          </Link>
        </Card>
      </div>
    </>
  );
}
