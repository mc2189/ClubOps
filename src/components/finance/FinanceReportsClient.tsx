"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import type { FinanceReportsData } from "@/data/providers/types";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function FinanceReportsClient({ reports }: { reports: FinanceReportsData }) {
  const { exportReport } = useFinanceDemo();
  const [exported, setExported] = useState<string | null>(null);

  function handleExport(title: string) {
    exportReport(title);
    setExported(title);
    setTimeout(() => setExported(null), 3000);
  }

  return (
    <>
      <PageHeader
        title="Finance reports"
        description="Export placeholders for accountant, audit and tax purposes."
        breadcrumbs={moduleBreadcrumb(MODULES.finance, "Reports")}
        backHref={moduleBackHref(MODULES.finance, "Reports")}
        action={
          <Link href="/finance" className="text-sm text-slate-500 hover:text-slate-700">
            Back to finance
          </Link>
        }
      />
      <FinanceSubNav active="Reports" />
      <DemoOnlyNotice />

      <FinanceRestrictedSection className="mt-4">
      <Card className="border-dashed border-slate-300 bg-slate-50">
        <p className="text-sm text-slate-600">
          Exports are simulated in demo mode. No files are generated — a success message and audit
          entry are created instead.
        </p>
      </Card>

      {exported && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Export queued: {exported} (demo placeholder)
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {reports.reports.map((report) => (
          <Card key={report.id}>
            <p className="text-xs font-semibold uppercase text-slate-400">{report.category}</p>
            <h3 className="mt-1 font-semibold text-slate-900">{report.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{report.description}</p>
            <button
              type="button"
              onClick={() => handleExport(report.title)}
              className="mt-3 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Generate export
            </button>
          </Card>
        ))}
      </div>
      </FinanceRestrictedSection>
    </>
  );
}
