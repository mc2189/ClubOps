"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { LocalSafetyNote } from "@/components/demo/LocalSafetyNote";
import { InlineActionFeedback } from "@/components/demo/InlineActionFeedback";
import { ReportBrandHeader } from "@/components/branding/ReportBrandHeader";
import { DemoOnlyNotice, ReportsSecurityNotice } from "@/components/reports/ReportsNotices";
import { RestrictedExportButton } from "@/components/rbac/RestrictedExportButton";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import { exportItemAccessLevel, sensitivityVariant } from "@/lib/reports";
import { EXPORT_CENTRE_GROUP_ORDER } from "@/lib/committeePackPreview";
import { SENSITIVE_EXPORT_HELP } from "@/lib/terminologyHelp";
import type { ExportPackItem } from "@/data/providers/types";
import { reportsTrail } from "@/lib/breadcrumbs";

function ExportItemCard({
  item,
  onPreview,
}: {
  item: ExportPackItem;
  onPreview: (name: string) => void;
}) {
  const { role } = useDemoRole();
  const access = exportItemAccessLevel(role, item);
  const restricted = access === "restricted";
  const summaryOnly = access === "summary";
  const [lastExported, setLastExported] = useState<string | null>(null);

  function handlePreview() {
    onPreview(item.name);
    setLastExported(item.name);
  }

  return (
    <Card className="flex min-w-0 max-w-full flex-col overflow-hidden p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-brand-charcoal">{item.name}</h3>
        <Badge variant={sensitivityVariant[item.sensitivity]}>
          {item.sensitivity === "restricted" ? "Sensitive" : item.sensitivity}
        </Badge>
      </div>
      <p className="mt-1 text-xs text-slate-600">{item.description}</p>
      <p className="mt-1 text-xs text-slate-500">
        <span className="font-medium">For: </span>
        {item.audience}
      </p>
      {item.sensitivity === "restricted" || item.sensitivity === "sensitive" ? (
        <p className="mt-2 text-xs text-slate-500">{SENSITIVE_EXPORT_HELP}</p>
      ) : null}
      {restricted && (
        <p className="mt-2 break-words text-xs text-amber-800">
          Restricted for your demo role — switch role in the top bar to preview this export.
        </p>
      )}
      {summaryOnly && !restricted && (
        <p className="mt-2 text-xs text-slate-500">
          Your current demo role can see the summary but not the detailed export.
        </p>
      )}
      <div className="mt-auto flex flex-col gap-2 pt-3">
        {item.previewHref && (
          <Link
            href={item.previewHref}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            View report pack
          </Link>
        )}
        {!restricted && (
          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Preview demo export
          </button>
        )}
        {lastExported === item.name && (
          <InlineActionFeedback message="Demo export prepared. No real file was created." />
        )}
      </div>
    </Card>
  );
}

export function ExportCentreClient() {
  const { exportPackItems, simulateExport } = useReportsAuditDemo();
  const [adminPackExported, setAdminPackExported] = useState(false);

  const grouped = EXPORT_CENTRE_GROUP_ORDER.map((category) => ({
    category,
    items: exportPackItems.filter((i) => i.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <PageHeader
        title="Export Centre"
        description="Preview demo report packs for committee discussion. No real files are created."
        breadcrumbs={reportsTrail("Export Centre")}
        backHref="/reports"
      />
      <ReportsSubNav active="Export Centre" />
      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ReportBrandHeader title="Export Centre" subtitle="Demo exports grouped by purpose" />
        <p className="text-sm text-slate-600">
          Each option shows what is included and who would use it. Nothing is downloaded or sent.
        </p>
        <LocalSafetyNote>Demo only. No real files are created or exported.</LocalSafetyNote>
        <DemoOnlyNotice />

        <Card>
          <h2 className="text-sm font-semibold text-brand-charcoal">Full Club Admin Pack</h2>
          <p className="mt-1 text-sm text-slate-600">
            Complete cross-module summary for audit and committee purposes.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            For: Secretary and treasurer · Contains sensitive summaries
          </p>
          <RestrictedExportButton
            label="Prepare demo file"
            onExport={() => {
              simulateExport("Full Club Admin Pack");
              setAdminPackExported(true);
            }}
          />
          {adminPackExported && (
            <InlineActionFeedback
              className="mt-3"
              message="Demo export prepared. No real file was created."
            />
          )}
          <p className="mt-2 text-xs text-slate-500">Demo only. No real file created.</p>
        </Card>

        {grouped.map(({ category, items }) => (
          <section key={category}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{category}</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" data-layout="export-centre-grid">
              {items.map((item) => (
                <ExportItemCard key={item.id} item={item} onPreview={simulateExport} />
              ))}
            </div>
          </section>
        ))}

        <div>
          <Link href="/audit/activity" className="text-sm font-medium text-brand-primary hover:underline">
            View audit log →
          </Link>
        </div>

        <ReportsSecurityNotice />
      </div>
    </>
  );
}
