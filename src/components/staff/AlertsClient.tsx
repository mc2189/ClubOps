"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge, EmptyState } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { alertSeverityVariant } from "@/lib/staff";
import { formatDate } from "@/lib/utils";

export function AlertsClient() {
  const { alerts, resolveAlert } = useStaffDemo();
  const open = alerts.filter((a) => a.status !== "resolved");

  return (
    <>
      <PageHeader title="Staff & operations alerts" description="Qualifications, rota gaps, outgoings and compliance needing attention." />
      <StaffSubNav active="Alerts" />
      <DemoOnlyNotice />
      {open.length === 0 ? (
        <EmptyState
          title="No open alerts"
          description="All staff and operations alerts are resolved."
          actionLabel="View rota"
          actionHref="/staff/rota"
          className="mt-4"
        />
      ) : (
      <Card className="mt-4 overflow-x-auto">
        <DataTable headers={["Alert", "Severity", "Linked record", "Module", "Suggested action", "Due", "Status", "Actions"]}>
          {open.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{a.title}</td>
              <td className="px-4 py-3"><Badge variant={alertSeverityVariant[a.severity]}>{a.severity}</Badge></td>
              <td className="px-4 py-3 text-slate-600">{a.linkedRecord}</td>
              <td className="px-4 py-3 text-slate-600">{a.linkedModule}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{a.suggestedAction}</td>
              <td className="px-4 py-3 text-slate-600">{a.dueDate ? formatDate(a.dueDate) : "—"}</td>
              <td className="px-4 py-3"><Badge variant={a.status === "in-progress" ? "info" : "warning"}>{a.status}</Badge></td>
              <td className="px-4 py-3">
                <button type="button" onClick={() => resolveAlert(a.id)} className="text-xs font-medium text-indigo-600 hover:underline">Resolve</button>
                {a.linkedModule === "Staff" && (
                  <Link href="/staff/qualifications" className="ml-2 text-xs text-indigo-600 hover:underline">Review</Link>
                )}
                {a.linkedModule === "Communications" && (
                  <Link href="/communications/compose?template=tpl-coach" className="ml-2 text-xs text-indigo-600 hover:underline">Communications</Link>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
      )}
    </>
  );
}
