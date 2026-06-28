"use client";

import Link from "next/link";
import { Card, Badge } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { ReportsSecurityNotice } from "@/components/reports/ReportsNotices";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { sensitivityVariant } from "@/lib/reports";
import { formatDate } from "@/lib/utils";
import { REPORTS_LANDING } from "@/lib/moduleTaskFlow";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function ReportsDashboardClient() {
  const { reportCards } = useReportsAuditDemo();
  const committeePack = reportCards.find((r) => r.id === "rc-committee");
  const categories = [...new Set(reportCards.map((r) => r.category))];

  return (
    <>
      <GlamPageHeader
        title="Reports"
        description="Generate demo exports for committee and treasurer review."
        breadcrumbs={moduleBreadcrumb(MODULES.reports)}
        backHref="/dashboard"
      />
      <ReportsSubNav active="Dashboard" />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={REPORTS_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "committee",
              value: committeePack?.exportStatus === "ready" ? "Committee summary ready to preview" : "Committee summary demo",
              label: "status",
              tone: committeePack?.exportStatus === "ready" ? "resolved" : "neutral",
            },
          ]}
        />

        <ModuleMoreTools title="All report packs">
          {categories.map((cat) => (
            <section key={cat} className="mt-4 first:mt-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{cat}</h3>
              <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {reportCards.filter((r) => r.category === cat).map((r) => (
                  <Card key={r.id}>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-slate-900">{r.name}</h4>
                      <Badge variant={sensitivityVariant[r.sensitivity]}>{r.sensitivity}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{r.purpose}</p>
                    {r.lastGenerated && (
                      <p className="mt-1 text-xs text-slate-400">Last: {formatDate(r.lastGenerated)}</p>
                    )}
                    {r.href && (
                      <Link href={r.href} className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:underline">
                        Open →
                      </Link>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </ModuleMoreTools>

        <ModuleMoreTools title="Reports safety notes">
          <ReportsSecurityNotice />
        </ModuleMoreTools>
      </div>
    </>
  );
}
