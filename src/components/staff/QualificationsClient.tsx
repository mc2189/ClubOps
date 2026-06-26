"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { statusVariant } from "@/lib/staff";
import { formatDate } from "@/lib/utils";

export function QualificationsClient() {
  const { qualifications } = useStaffDemo();

  return (
    <>
      <PageHeader title="Qualifications & compliance" description="Coach qualifications, DBS, safeguarding and first aid — demo only." />
      <StaffSubNav active="Qualifications" />
      <DemoOnlyNotice />
      <Card className="mt-4 overflow-x-auto">
        <DataTable headers={["Qualification", "Person", "Status", "Issue", "Expiry", "Days left", "Action", "Evidence"]}>
          {qualifications.map((q) => (
            <tr key={q.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{q.qualificationName}</td>
              <td className="px-4 py-3">
                <Link href={`/staff/${q.staffId}`} className="text-indigo-600 hover:underline">{q.person}</Link>
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(q.status)}>{q.status}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-600">{q.issueDate ? formatDate(q.issueDate) : "—"}</td>
              <td className="px-4 py-3 text-slate-600">{q.expiryDate ? formatDate(q.expiryDate) : "—"}</td>
              <td className="px-4 py-3">
                {q.daysRemaining !== undefined && (
                  <span className={q.daysRemaining < 90 ? "font-medium text-amber-700" : q.daysRemaining < 0 ? "font-medium text-red-700" : "text-slate-600"}>
                    {q.daysRemaining < 0 ? "Expired" : q.daysRemaining}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{q.actionRequired ?? "—"}</td>
              <td className="px-4 py-3">
                {q.documentLink ? (
                  <Link href={q.documentLink} className="text-xs font-medium text-indigo-600 hover:underline">View document</Link>
                ) : (
                  <Badge variant="warning">Missing evidence</Badge>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </>
  );
}
