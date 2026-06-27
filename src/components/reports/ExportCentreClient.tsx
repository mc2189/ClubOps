"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice, ReportsSecurityNotice, ExportSuccessNotice } from "@/components/reports/ReportsNotices";
import { RestrictedExportButton } from "@/components/rbac/RestrictedExportButton";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { sensitivityVariant } from "@/lib/reports";
import { reportsTrail } from "@/lib/breadcrumbs";

export function ExportCentreClient() {
  const { exportPackItems, simulateExport, lastExportTitle } = useReportsAuditDemo();

  return (
    <>
      <PageHeader
        title="Export Centre"
        description="Full Club Admin Pack — simulated export, no real file generated."
        breadcrumbs={reportsTrail("Export Centre")}
        backHref="/reports"
      />
      <ReportsSubNav active="Export Centre" />
      <DemoOnlyNotice />
      {lastExportTitle === "Full Club Admin Pack" && <ExportSuccessNotice title="Full Club Admin Pack" />}
      <Card className="mt-4">
        <h2 className="text-sm font-semibold text-slate-900">Full Club Admin Pack</h2>
        <p className="mt-1 text-sm text-slate-600">A complete summary for audit, accounting and committee purposes.</p>
        <RestrictedExportButton
          label="Generate demo export"
          onExport={() => simulateExport("Full Club Admin Pack")}
        />
        <p className="mt-2 text-xs text-amber-700">No real file generated</p>
      </Card>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {exportPackItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-slate-900">{item.name}</h3>
              <Badge variant={sensitivityVariant[item.sensitivity]}>{item.sensitivity === "restricted" ? "Sensitive summary only" : item.sensitivity}</Badge>
            </div>
            <p className="mt-1 text-xs text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/audit/activity" className="text-sm font-medium text-indigo-600 hover:underline">View audit log →</Link>
      </div>
      <ReportsSecurityNotice />
    </>
  );
}
