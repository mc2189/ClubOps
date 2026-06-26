"use client";

import Link from "next/link";
import { Badge, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/attendance/AttendanceNotices";
import { useAttendanceDemo } from "@/components/attendance/AttendanceDemoProvider";
import { registerStatusLabel } from "@/lib/attendance";

export function SessionSelectorClient() {
  const { sessions, getSessionStatus } = useAttendanceDemo();

  return (
    <>
      <PageHeader
        title="Select session"
        description="Choose a class to mark attendance."
        action={
          <Link href="/attendance" className="text-sm text-slate-500 hover:text-slate-700">
            Back to attendance
          </Link>
        }
      />
      <DemoOnlyNotice />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <Link
            key={session.id}
            href={`/attendance/register/${session.id}`}
            className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:border-indigo-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-slate-900">{session.name}</h3>
              <Badge variant={getSessionStatus(session.id) === "complete" ? "success" : "warning"}>
                {registerStatusLabel[getSessionStatus(session.id)]}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {session.day} · {session.time}
            </p>
            <p className="text-sm text-slate-500">
              {session.venue} · Coach: {session.coach}
            </p>
            <p className="mt-2 text-xs font-medium text-slate-400">
              {session.memberIds.length} members expected
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
