"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, PageHeader } from "@/components/ui";
import { DemoOnlyNotice, MedicalFlagNotice } from "@/components/attendance/AttendanceNotices";
import { useAttendanceDemo } from "@/components/attendance/AttendanceDemoProvider";
import {
  ATTENDANCE_MARKS,
  markLabels,
  markButtonStyles,
  registerStatusLabel,
} from "@/lib/attendance";
import { cn } from "@/lib/utils";
import { attendanceRegisterTrail, attendanceTrail } from "@/lib/breadcrumbs";

export function RegisterMarkingClient({ sessionId }: { sessionId: string }) {
  const { getRegister, setMemberMark, markAllPresent, saveRegister, getSessionStatus, sessions } =
    useAttendanceDemo();
  const register = getRegister(sessionId);
  const session = sessions.find((s) => s.id === sessionId);
  const [showMarkAllConfirm, setShowMarkAllConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!session) {
    return (
      <PageHeader
        title="Session not found"
        description="This session does not exist in the demo data."
        breadcrumbs={attendanceTrail("Select session")}
        backHref="/attendance/register"
      />
    );
  }

  function handleSave() {
    saveRegister(sessionId);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  }

  function handleMarkAllPresent() {
    markAllPresent(sessionId);
    setShowMarkAllConfirm(false);
  }

  const markedCount = register.entries.filter((e) => e.mark !== "unmarked").length;

  return (
    <>
      <PageHeader
        title={register.sessionName}
        description={`${session.day} · ${session.time} · ${session.venue} · Coach: ${session.coach}`}
        breadcrumbs={attendanceRegisterTrail(register.sessionName)}
        backHref="/attendance/register"
        action={
          <Link
            href="/attendance/register"
            className="inline-flex min-h-[44px] items-center text-sm text-slate-500 hover:text-slate-700"
          >
            Change session
          </Link>
        }
      />

      <DemoOnlyNotice />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Badge variant={getSessionStatus(sessionId) === "complete" ? "success" : "warning"}>
          Register: {registerStatusLabel[getSessionStatus(sessionId)]}
        </Badge>
        <span className="text-sm text-slate-500">
          {markedCount} of {register.entries.length} marked
        </span>
      </div>

      {saveSuccess && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Register saved successfully (demo session only).
        </div>
      )}

      <div className="mt-4 hidden flex-wrap gap-3 lg:flex">
        <button
          type="button"
          onClick={() => setShowMarkAllConfirm(true)}
          className="min-h-[44px] rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Mark all present
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="min-h-[44px] rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save register
        </button>
      </div>

      {showMarkAllConfirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Mark all present?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This will mark every member in {register.sessionName} as present. You can still change
              individual marks before saving.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="min-h-[48px] rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Yes, mark all present
              </button>
              <button
                type="button"
                onClick={() => setShowMarkAllConfirm(false)}
                className="min-h-[48px] rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4 pb-24 lg:pb-0">
        {register.entries.length === 0 ? (
          <p className="text-sm text-slate-500">No members expected for this session.</p>
        ) : (
          register.entries.map((entry) => (
            <div
              key={entry.memberId}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/members/${entry.memberId}`}
                      className="text-base font-semibold text-slate-900 hover:underline"
                    >
                      {entry.memberName}
                    </Link>
                    <span className="text-sm text-slate-500">Age {entry.age}</span>
                    {entry.hasMedicalFlag && <Badge variant="warning">Medical flag</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{entry.classGroup}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Emergency contact:{" "}
                    <Badge
                      variant={
                        entry.emergencyContactComplete === "complete"
                          ? "success"
                          : entry.emergencyContactComplete === "partial"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {entry.emergencyContactComplete}
                    </Badge>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{entry.recentAttendanceSummary}</p>
                  {entry.hasMedicalFlag && (
                    <div className="mt-2">
                      <MedicalFlagNotice />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-5">
                {ATTENDANCE_MARKS.map((mark) => (
                  <button
                    key={mark}
                    type="button"
                    onClick={() => setMemberMark(sessionId, entry.memberId, mark)}
                    className={cn(
                      "min-h-[52px] rounded-lg border px-3 py-3 text-sm font-semibold ring-2 ring-offset-1 transition-all sm:min-h-[48px]",
                      entry.mark === mark
                        ? markButtonStyles[mark]
                        : "border-slate-200 bg-white text-slate-600 ring-transparent hover:bg-slate-50",
                    )}
                    aria-pressed={entry.mark === mark}
                  >
                    {markLabels[mark]}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed inset-x-0 bottom-[52px] z-20 flex gap-2 border-t border-slate-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg lg:hidden">
        <button
          type="button"
          onClick={() => setShowMarkAllConfirm(true)}
          className="min-h-[48px] flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Mark all present
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="min-h-[48px] flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save register
        </button>
      </div>
    </>
  );
}
