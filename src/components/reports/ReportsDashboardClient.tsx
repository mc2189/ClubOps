"use client";

import Link from "next/link";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { ReportsSecurityNotice } from "@/components/reports/ReportsNotices";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { CommitteePackPreview } from "@/components/reports/CommitteePackPreview";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { REPORTS_LANDING } from "@/lib/moduleTaskFlow";
import { buildCommitteePackPreview } from "@/lib/committeePackPreview";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function ReportsDashboardClient() {
  const { lastExportTitle } = useReportsAuditDemo();
  const preview = buildCommitteePackPreview(lastExportTitle != null);

  return (
    <>
      <GlamPageHeader
        title="Reports"
        description="Committee pack preview and demo exports."
        breadcrumbs={moduleBreadcrumb(MODULES.reports)}
        backHref="/dashboard"
      />
      <ReportsSubNav active="Dashboard" />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={REPORTS_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "ready",
              value: preview.readyForPreview ? "Ready for demo preview" : "Not ready yet",
              label: "pack status",
              tone: preview.readyForPreview ? "resolved" : "pending",
            },
          ]}
        />

        <CommitteePackPreview compact data={preview} />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/reports/committee-pack"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            View full committee pack
          </Link>
          <Link
            href="/reports/export-centre"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-900 hover:bg-indigo-100"
          >
            Open export centre
          </Link>
        </div>

        <ModuleMoreTools title="Reports safety notes">
          <ReportsSecurityNotice />
        </ModuleMoreTools>
      </div>
    </>
  );
}
