"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { ReportBrandHeader } from "@/components/branding/ReportBrandHeader";
import { DemoOnlyNotice, ReportsSecurityNotice } from "@/components/reports/ReportsNotices";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { sensitivityVariant } from "@/lib/reports";
import { formatDate } from "@/lib/utils";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function ReportsDashboardClient() {
  const { reportCards } = useReportsAuditDemo();
  const categories = [...new Set(reportCards.map((r) => r.category))];

  return (
    <>
      <PageHeader title="Reports" description="Generate demo exports for finance, committee, Gift Aid and admin purposes." breadcrumbs={moduleBreadcrumb(MODULES.reports)} backHref="/dashboard" />
      <ReportBrandHeader className="mt-4" />
      <ReportsSubNav active="Dashboard" />
      <DemoOnlyNotice />
      <div className="mt-4 space-y-8">
        {categories.map((cat) => (
          <section key={cat}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{cat}</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reportCards.filter((r) => r.category === cat).map((r) => (
                <Card key={r.id}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{r.name}</h3>
                    <Badge variant={sensitivityVariant[r.sensitivity]}>{r.sensitivity === "restricted" ? "Restricted in live mode" : r.sensitivity}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{r.purpose}</p>
                  <p className="mt-2 text-xs text-slate-500">Modules: {r.linkedModules.join(", ")}</p>
                  {r.lastGenerated && <p className="mt-1 text-xs text-slate-400">Last generated: {formatDate(r.lastGenerated)}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.href ? (
                      <Link href={r.href} className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">Open report</Link>
                    ) : (
                      <Link href={r.href ?? "#"} className="rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                        Open module →
                      </Link>
                    )}
                    <Badge variant={r.exportStatus === "ready" ? "success" : r.exportStatus === "demo" ? "info" : "default"}>{r.exportStatus}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
        <ReportsSecurityNotice />
      </div>
    </>
  );
}
