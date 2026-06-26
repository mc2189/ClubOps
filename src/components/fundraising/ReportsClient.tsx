"use client";

import { Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";

export function ReportsClient() {
  const { reports, simulateReportExport, reportExportDone } = useFundraisingDemo();

  return (
    <>
      <PageHeader title="Fundraising reports" description="Summaries and export placeholders — demo only." />
      <FundraisingSubNav active="Reports" />
      <DemoOnlyNotice />
      {reportExportDone && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">Demo report export complete. Audit event recorded. No real file generated.</div>
      )}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.id}>
            <p className="text-xs font-medium text-slate-400">{r.category}</p>
            <h2 className="font-semibold text-slate-900">{r.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{r.description}</p>
            <button type="button" onClick={() => simulateReportExport(r.title)} className="mt-3 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Export (demo)</button>
          </Card>
        ))}
      </div>
    </>
  );
}
