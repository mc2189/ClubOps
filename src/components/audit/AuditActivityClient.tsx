"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { TableScrollWrap } from "@/components/ui/TableScrollWrap";
import { AuditDemoNotice } from "@/components/audit/AuditNotices";
import { AuditSubNav } from "@/components/audit/AuditSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { riskVariant } from "@/lib/reports";

export function AuditActivityClient() {
  const { auditEvents } = useReportsAuditDemo();
  const [moduleFilter, setModuleFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const modules = useMemo(() => [...new Set(auditEvents.map((e) => e.module ?? e.resource))], [auditEvents]);

  const filtered = auditEvents.filter((e) => {
    if (moduleFilter && (e.module ?? e.resource) !== moduleFilter) return false;
    if (riskFilter && e.riskLevel !== riskFilter) return false;
    return true;
  });

  return (
    <>
      <PageHeader title="Audit activity" description="Filterable cross-module activity feed." />
      <AuditSubNav active="Activity" />
      <AuditDemoNotice />
      <Card className="mt-4">
        <div className="flex flex-wrap gap-3">
          <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">
            <option value="">All modules</option>
            {modules.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">
            <option value="">All sensitivity</option>
            <option value="normal">Normal</option>
            <option value="sensitive">Sensitive</option>
            <option value="restricted">Restricted</option>
          </select>
          <span className="text-sm text-slate-500">Date range: demo placeholder</span>
        </div>
      </Card>
      <TableScrollWrap className="mt-4">
        <Card className="overflow-x-auto">
          <DataTable headers={["Time", "User", "Module", "Action", "Record", "Risk", "Status", "Details", "Link"]}>
          {filtered.map((e) => (
            <tr key={e.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-xs text-slate-600">{new Date(e.timestamp).toLocaleString("en-GB")}</td>
              <td className="px-4 py-3 text-slate-900">{e.actor}</td>
              <td className="px-4 py-3 capitalize text-slate-600">{e.module ?? e.resource}</td>
              <td className="px-4 py-3"><Badge variant="info">{e.action}</Badge></td>
              <td className="px-4 py-3 text-sm text-slate-600">{e.affectedRecord ?? "—"}</td>
              <td className="px-4 py-3">{e.riskLevel ? <Badge variant={riskVariant[e.riskLevel]}>{e.riskLevel}</Badge> : "—"}</td>
              <td className="px-4 py-3 text-sm">{e.status ?? "recorded"}</td>
              <td className="max-w-xs px-4 py-3 text-sm text-slate-600">{e.details}</td>
              <td className="px-4 py-3">{e.linkedHref ? <Link href={e.linkedHref} className="text-xs text-indigo-600 hover:underline">View</Link> : "—"}</td>
            </tr>
          ))}
        </DataTable>
        </Card>
      </TableScrollWrap>
    </>
  );
}
