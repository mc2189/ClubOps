"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { LocalSafetyNote } from "@/components/demo/LocalSafetyNote";
import { InlineActionFeedback } from "@/components/demo/InlineActionFeedback";
import { DemoOnlyNotice, WagePrepWarning } from "@/components/staff/StaffNotices";
import { RestrictedContentPreview } from "@/components/rbac/RestrictedContentPreview";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { formatStaffCurrency, paymentStatusVariant } from "@/lib/staff";
import { staffTrail } from "@/lib/breadcrumbs";

export function WagesClient() {
  const { wages, simulateWageExport, wageExportDone } = useStaffDemo();
  const totalDue = wages.reduce((s, w) => s + w.totalDue + (w.expensesPlaceholder ?? 0), 0);

  return (
    <>
      <PageHeader
        title="Wage preparation"
        description="Session payment preparation — not payroll."
        breadcrumbs={staffTrail("Wages")}
        backHref="/staff"
      />
      <StaffSubNav active="Wages" />
      <DemoOnlyNotice />
      <WagePrepWarning />
      <LocalSafetyNote className="mt-4">
        Demo data only. Do not enter real staff, child or parent information.
      </LocalSafetyNote>
      <RestrictedContentPreview module="wage-prep" auditOnView="restricted wage prep preview viewed">
      <Card className="mt-4">
        <p className="text-sm font-medium text-slate-700">Total due this month: {formatStaffCurrency(totalDue)}</p>
        <button
          type="button"
          onClick={simulateWageExport}
          className="mt-3 min-h-[48px] w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 sm:w-auto"
        >
          Export payroll/wage summary (demo)
        </button>
        {wageExportDone && (
          <InlineActionFeedback
            className="mt-3"
            message="Demo wage summary exported. No real file was created."
          />
        )}
      </Card>
      <Card className="mt-4 overflow-x-auto">
        <DataTable headers={["Staff/coach", "Sessions", "Rate", "Total due", "Expenses", "Status"]}>
          {wages.map((w) => (
            <tr key={w.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <Link href={`/staff/${w.staffId}`} className="font-medium text-indigo-600 hover:underline">{w.staffName}</Link>
              </td>
              <td className="px-4 py-3 text-slate-600">{w.sessionsWorked}</td>
              <td className="px-4 py-3 text-slate-600">{w.rate > 0 ? formatStaffCurrency(w.rate) : "Volunteer"}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{formatStaffCurrency(w.totalDue)}</td>
              <td className="px-4 py-3 text-slate-600">{w.expensesPlaceholder ? formatStaffCurrency(w.expensesPlaceholder) : "—"}</td>
              <td className="px-4 py-3">
                <Badge variant={paymentStatusVariant[w.paymentStatus]}>{w.paymentStatus}</Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
      </RestrictedContentPreview>
    </>
  );
}
