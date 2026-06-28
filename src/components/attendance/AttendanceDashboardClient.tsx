"use client";

import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { DemoOnlyNotice } from "@/components/attendance/AttendanceNotices";
import { useAttendanceDemo } from "@/components/attendance/AttendanceDemoProvider";
import { registerStatusLabel } from "@/lib/attendance";
import { ATTENDANCE_LANDING } from "@/lib/moduleTaskFlow";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function AttendanceDashboardClient() {
  const { dashboard, sessions, getSessionStatus } = useAttendanceDemo();
  const firstTodaySession = dashboard.todaySessions[0];

  return (
    <>
      <GlamPageHeader
        title="Attendance"
        description="Mark registers, track attendance and follow up absences."
        breadcrumbs={moduleBreadcrumb(MODULES.attendance)}
        backHref="/dashboard"
      />

      <DemoOnlyNotice />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel
          config={{
            ...ATTENDANCE_LANDING,
            primaryHref: firstTodaySession
              ? `/attendance/register/${firstTodaySession.id}`
              : ATTENDANCE_LANDING.primaryHref,
          }}
        />
        <ModuleStatusStrip
          items={[
            {
              id: "outstanding",
              value: `${dashboard.registersOutstanding} registers outstanding`,
              label: "pending",
              tone: dashboard.registersOutstanding > 0 ? "pending" : "resolved",
            },
            {
              id: "week",
              value: `${dashboard.attendancePercentWeek}% this week`,
              label: "attendance",
              tone: "neutral",
            },
          ]}
        />

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Today&apos;s sessions</h2>
          {dashboard.todaySessions.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No sessions scheduled for today.</p>
          ) : (
            <ul className="mt-2 divide-y divide-slate-100">
              {dashboard.todaySessions.map((session) => (
                <li key={session.id} className="flex flex-col gap-2 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{session.name}</p>
                    <p className="text-xs text-slate-500">
                      {session.time} · {session.venue}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSessionStatus(session.id) === "complete" ? "success" : "warning"}>
                      {registerStatusLabel[getSessionStatus(session.id)]}
                    </Badge>
                    <Link
                      href={`/attendance/register/${session.id}`}
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:flex-none"
                    >
                      Open register
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {(dashboard.absenceAlerts.length > 0 || dashboard.lowAttendanceMembers.length > 0) && (
          <div className="grid gap-4 lg:grid-cols-2">
            {dashboard.absenceAlerts.length > 0 && (
              <Card>
                <h2 className="text-sm font-semibold text-slate-900">Repeated absences</h2>
                <ul className="mt-2 space-y-2">
                  {dashboard.absenceAlerts.slice(0, 3).map((alert) => (
                    <li key={alert.memberId} className="rounded-md border border-amber-200 bg-amber-50 p-2 text-sm">
                      <Link href={`/members/${alert.memberId}`} className="font-medium text-amber-900 hover:underline">
                        {alert.memberName}
                      </Link>
                      <p className="text-xs text-amber-800">{alert.consecutiveAbsences} in a row</p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            {dashboard.lowAttendanceMembers.length > 0 && (
              <Card>
                <h2 className="text-sm font-semibold text-slate-900">Low attendance</h2>
                <ul className="mt-2 space-y-2">
                  {dashboard.lowAttendanceMembers.slice(0, 3).map((m) => (
                    <li key={m.memberId} className="flex items-center justify-between text-sm">
                      <Link href={`/members/${m.memberId}`} className="font-medium text-slate-900 hover:underline">
                        {m.memberName}
                      </Link>
                      <Badge variant="warning">{m.percentage}% attendance</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}

        <ModuleMoreTools title="More attendance tools">
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/attendance/register" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
              All registers
            </Link>
            <Link href="/attendance/reports" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
              Reports
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                  <th className="pb-2 pr-4">Session</th>
                  <th className="pb-2 pr-4">Register</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 pr-4 font-medium">{s.name}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={getSessionStatus(s.id) === "complete" ? "success" : "warning"}>
                        {registerStatusLabel[getSessionStatus(s.id)]}
                      </Badge>
                    </td>
                    <td className="py-2">
                      <Link href={`/attendance/register/${s.id}`} className="text-indigo-600 hover:underline">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModuleMoreTools>
      </div>
    </>
  );
}
