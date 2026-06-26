import type { AttendanceRecord } from "@/data/providers/types";
import { demoCompletedRegisterMarks } from "@/data/demo/attendanceData";
import { demoSessions } from "@/data/demo/sessions";
import { demoMemberProfiles } from "@/data/demo/members";
import { getMemberDisplayName } from "@/lib/members";

function markToPresent(mark: string): boolean {
  return mark === "present" || mark === "late" || mark === "trial";
}

export const demoAttendance: AttendanceRecord[] = [];

for (const [sessionId, marks] of Object.entries(demoCompletedRegisterMarks)) {
  const session = demoSessions.find((s) => s.id === sessionId);
  if (!session) continue;
  for (const [memberId, mark] of Object.entries(marks)) {
    const profile = demoMemberProfiles.find((p) => p.id === memberId);
    if (!profile) continue;
    demoAttendance.push({
      id: `att-${sessionId}-${memberId}`,
      sessionId,
      sessionName: session.name,
      sessionDate: session.sessionDate,
      memberId,
      memberName: getMemberDisplayName(profile),
      present: markToPresent(mark),
      mark,
    });
  }
}

// Legacy records for backward compatibility
demoAttendance.push(
  {
    id: "att-004",
    sessionId: "ses-thu-competitive",
    sessionName: "Competitive Squad — Thursday",
    sessionDate: "2026-06-26",
    memberId: "mem-001",
    memberName: "Alex Thompson",
    present: true,
    mark: "present",
  },
  {
    id: "att-005",
    sessionId: "ses-thu-competitive",
    sessionName: "Competitive Squad — Thursday",
    sessionDate: "2026-06-26",
    memberId: "mem-002",
    memberName: "Jordan Reeves",
    present: true,
    mark: "present",
  },
);
