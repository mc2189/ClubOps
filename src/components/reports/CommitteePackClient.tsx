"use client";

import { ReportBrandHeader } from "@/components/branding/ReportBrandHeader";
import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { DemoOnlyNotice, ExportSuccessNotice } from "@/components/reports/ReportsNotices";
import { RestrictedExportButton } from "@/components/rbac/RestrictedExportButton";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { ClubHealthSummary } from "@/components/reports/ClubHealthSummary";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { formatReportCurrency } from "@/lib/reports";
import { reportsTrail } from "@/lib/breadcrumbs";

export function CommitteePackClient() {
  const { committeePack, clubHealth, simulateExport, lastExportTitle } = useReportsAuditDemo();
  const p = committeePack;

  return (
    <>
      <PageHeader title="Committee Pack" description="Pre-meeting summary for club committee — demo only." breadcrumbs={reportsTrail("Committee Pack")} backHref="/reports" />
      <ReportsSubNav active="Committee Pack" />
      <div className="mt-4">
        <ReportBrandHeader title="Committee Pack" subtitle="Pre-meeting summary for club committee" />
      </div>
      <DemoOnlyNotice />
      {lastExportTitle === "Committee Pack" && <ExportSuccessNotice title="Committee Pack" />}
      <StatCard label="Club health score" value={`${p.clubHealthScore}/100`} />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active members" value={p.activeMembers} />
        <StatCard label="Avg attendance" value={`${p.averageAttendance}%`} />
        <StatCard label="Net finance" value={formatReportCurrency(p.netFinancePosition)} />
        <StatCard label="Fundraising raised" value={formatReportCurrency(p.fundraisingRaised)} />
      </div>
      <Card className="mt-6">
        <h2 className="text-sm font-semibold">Actions needing committee attention</h2>
        <ul className="mt-3 list-inside list-disc text-sm text-slate-700">
          {p.actionsNeedingAttention.map((a) => <li key={a}>{a}</li>)}
        </ul>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div><dt className="text-slate-500">Gift Aid opportunity</dt><dd>{formatReportCurrency(p.giftAidOpportunity)} — <Link href="/gift-aid" className="text-indigo-600 hover:underline">Gift Aid</Link></dd></div>
          <div><dt className="text-slate-500">Staff alerts</dt><dd><Link href="/staff/alerts" className="text-indigo-600 hover:underline">{p.staffAlerts} open</Link></dd></div>
          <div><dt className="text-slate-500">Missing documents</dt><dd><Link href="/documents/missing" className="text-indigo-600 hover:underline">{p.missingDocuments} items</Link></dd></div>
          <div><dt className="text-slate-500">Upcoming events</dt><dd><Link href="/calendar" className="text-indigo-600 hover:underline">{p.upcomingEvents} on calendar</Link></dd></div>
        </dl>
        <RestrictedExportButton label="Generate demo export" onExport={() => simulateExport("Committee Pack")} />
      </Card>
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-slate-900">Club Health summary</h2>
        <div className="mt-4"><ClubHealthSummary metrics={clubHealth} /></div>
      </div>
    </>
  );
}
