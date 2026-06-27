"use client";

import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { AuditDemoNotice } from "@/components/audit/AuditNotices";
import { AuditSubNav } from "@/components/audit/AuditSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { auditTrail } from "@/lib/breadcrumbs";

export function AuditOverviewClient() {
  const { auditEvents } = useReportsAuditDemo();
  const modules = [...new Set(auditEvents.map((e) => e.module ?? e.resource))];
  const sensitive = auditEvents.filter((e) => e.riskLevel === "sensitive" || e.riskLevel === "restricted").length;

  return (
    <>
      <PageHeader title="Audit Log" description="Cross-module activity and evidence trail — demo only." breadcrumbs={auditTrail("Overview")} backHref="/audit" />
      <AuditSubNav active="Overview" />
      <AuditDemoNotice />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total events" value={auditEvents.length} />
        <StatCard label="Modules covered" value={modules.length} />
        <StatCard label="Sensitive events" value={sensitive} />
      </div>
      <Card className="mt-6">
        <h2 className="text-sm font-semibold">Quick links</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/audit/activity" className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700">View activity feed</Link>
          <Link href="/audit/security" className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Security guidance</Link>
          <Link href="/reports/export-centre" className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Export Centre</Link>
        </div>
      </Card>
      <Card className="mt-4">
        <h2 className="text-sm font-semibold">Recent activity</h2>
        <ul className="mt-3 divide-y divide-slate-100">
          {auditEvents.slice(0, 5).map((e) => (
            <li key={e.id} className="py-2 text-sm">
              <p className="font-medium text-slate-900">{e.action} — {e.module ?? e.resource}</p>
              <p className="text-slate-500">{e.details}</p>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
