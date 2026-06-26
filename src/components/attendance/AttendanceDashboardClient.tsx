"use client";

import Link from "next/link";
import { Badge, Card, PageHeader, StatCard } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/attendance/AttendanceNotices";
import { useAttendanceDemo } from "@/components/attendance/AttendanceDemoProvider";
import { registerStatusLabel } from "@/lib/attendance";

export function AttendanceDashboardClient() {
  const { dashboard, sessions, getSessionStatus } = useAttendanceDemo();

  return (
    <>
      <PageHeader
        title="Attendance"
        description="Mark registers, track attendance and follow up absences."
        action={
          <Link
            href="/attendance/register"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Complete register
          </Link>
        }
      />

      <DemoOnlyNotice />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Registers completed" value={dashboard.registersCompleted} />
        <StatCard label="Registers outstanding" value={dashboard.registersOutstanding} />
        <StatCard label="Attendance this week" value={`${dashboard.attendancePercentWeek}%`} />
        <StatCard label="Attendance this month" value={`${dashboard.attendancePercentMonth}%`} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Today&apos;s sessions</h2>
          {dashboard.todaySessions.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No sessions scheduled for today.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {dashboard.todaySessions.map((session) => (
                <li key={session.id} className="flex items-center justify-between py-3 first:pt-0">
                  <div>
                    <p className="font-medium text-slate-900">{session.name}</p>
                    <p className="text-xs text-slate-500">
                      {session.time} · {session.venue} · {session.coach}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSessionStatus(session.id) === "complete" ? "success" : "warning"}>
                      {registerStatusLabel[getSessionStatus(session.id)]}
                    </Badge>
                    <Link
                      href={`/attendance/register/${session.id}`}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Open
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Link
              href="/attendance/register"
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-800 hover:bg-indigo-100"
            >
              Complete register
            </Link>
            <Link
              href="/attendance/reports"
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View reports
            </Link>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Repeated absence alerts</h2>
          {dashboard.absenceAlerts.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No repeated absences to report.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {dashboard.absenceAlerts.map((alert) => (
                <li key={alert.memberId} className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm">
                  <Link href={`/members/${alert.memberId}`} className="font-medium text-amber-900 hover:underline">
                    {alert.memberName}
                  </Link>
                  <p className="mt-1 text-amber-800">
                    {alert.consecutiveAbsences} consecutive absences · Last: {alert.lastSession}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Low attendance</h2>
          {dashboard.lowAttendanceMembers.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">All members above threshold.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {dashboard.lowAttendanceMembers.map((m) => (
                <li key={m.memberId} className="flex items-center justify-between text-sm">
                  <Link href={`/members/${m.memberId}`} className="font-medium text-slate-900 hover:underline">
                    {m.memberName}
                  </Link>
                  <Badge variant="warning">{m.percentage}%</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">All sessions</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                <th className="pb-2 pr-4">Session</th>
                <th className="pb-2 pr-4">Day / time</th>
                <th className="pb-2 pr-4">Coach</th>
                <th className="pb-2 pr-4">Members</th>
                <th className="pb-2 pr-4">Register</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 pr-4 font-medium">{s.name}</td>
                  <td className="py-3 pr-4 text-slate-600">
                    {s.day} · {s.time}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{s.coach}</td>
                  <td className="py-3 pr-4 text-slate-600">{s.memberIds.length}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={getSessionStatus(s.id) === "complete" ? "success" : "warning"}>
                      {registerStatusLabel[getSessionStatus(s.id)]}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Link href={`/attendance/register/${s.id}`} className="text-indigo-600 hover:underline">
                      Open register
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
