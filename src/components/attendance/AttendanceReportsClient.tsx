"use client";

import Link from "next/link";
import { Badge, Card, EmptyState, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/attendance/AttendanceNotices";
import type { AttendanceReportsData } from "@/data/providers/types";
import { registerStatusLabel } from "@/lib/attendance";
import { attendanceTrail } from "@/lib/breadcrumbs";

export function AttendanceReportsClient({ reports }: { reports: AttendanceReportsData }) {
  return (
    <>
      <PageHeader
        title="Attendance reports"
        description="Summary reports for classes, members and follow-ups."
        breadcrumbs={attendanceTrail("Reports")}
        backHref="/attendance"
        action={
          <Link href="/attendance" className="text-sm text-slate-500 hover:text-slate-700">
            Back to attendance
          </Link>
        }
      />

      <DemoOnlyNotice />

      <Card className="mt-4 border-dashed border-slate-300 bg-slate-50">
        <p className="text-sm text-slate-600">
          <strong>Print / export</strong> — PDF and CSV export will be available in a future
          iteration. Reports below use demo data.
        </p>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Attendance by class</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-slate-500">
                  <th className="pb-2 pr-4">Class</th>
                  <th className="pb-2 pr-4">Avg %</th>
                  <th className="pb-2">Registers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.byClass.map((row) => (
                  <tr key={row.sessionId}>
                    <td className="py-2 pr-4 font-medium">{row.sessionName}</td>
                    <td className="py-2 pr-4">{row.averageAttendance}%</td>
                    <td className="py-2">
                      {row.registersComplete}/{row.registersTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Incomplete registers</h2>
          {reports.incompleteRegisters.length === 0 ? (
            <EmptyState title="All complete" description="Every register has been completed." />
          ) : (
            <ul className="mt-3 space-y-2">
              {reports.incompleteRegisters.map((s) => (
                <li key={s.id} className="flex items-center justify-between text-sm">
                  <span>{s.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">{registerStatusLabel[s.registerStatus]}</Badge>
                    <Link href={`/attendance/register/${s.id}`} className="text-indigo-600 hover:underline">
                      Complete
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Attendance by member</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-slate-500">
                <th className="pb-2 pr-4">Member</th>
                <th className="pb-2 pr-4">Class</th>
                <th className="pb-2 pr-4">%</th>
                <th className="pb-2 pr-4">Present</th>
                <th className="pb-2 pr-4">Absent</th>
                <th className="pb-2">Late</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.byMember.map((row) => (
                <tr key={row.memberId}>
                  <td className="py-2 pr-4">
                    <Link href={`/members/${row.memberId}`} className="font-medium text-indigo-600 hover:underline">
                      {row.memberName}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-slate-600">{row.classGroup}</td>
                  <td className="py-2 pr-4">
                    <Badge variant={row.percentage < 80 ? "warning" : "success"}>{row.percentage}%</Badge>
                  </td>
                  <td className="py-2 pr-4">{row.present}</td>
                  <td className="py-2 pr-4">{row.absent}</td>
                  <td className="py-2">{row.late}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Repeated absences</h2>
          <ul className="mt-3 space-y-2">
            {reports.repeatedAbsences.map((a) => (
              <li key={a.memberId} className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm">
                <Link href={`/members/${a.memberId}`} className="font-medium hover:underline">
                  {a.memberName}
                </Link>
                <p className="text-amber-800">{a.consecutiveAbsences} consecutive · {a.lastSession}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Low attendance warnings</h2>
          <ul className="mt-3 space-y-2">
            {reports.lowAttendance.map((m) => (
              <li key={m.memberId} className="flex justify-between text-sm">
                <Link href={`/members/${m.memberId}`} className="font-medium hover:underline">
                  {m.memberName}
                </Link>
                <Badge variant="warning">{m.percentage}%</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
