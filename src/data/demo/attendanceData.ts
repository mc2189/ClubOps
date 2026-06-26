import type {
  AttendanceDashboardData,
  AttendanceReportsData,
  SessionRegister,
  RegisterMemberEntry,
  AttendanceMark,
} from "@/data/providers/types";
import { demoSessions, DEMO_TODAY } from "@/data/demo/sessions";
import { demoMemberProfiles } from "@/data/demo/members";
import { calculateAge, getMemberDisplayName } from "@/lib/members";

function buildRegisterEntry(memberId: string, mark: AttendanceMark = "unmarked"): RegisterMemberEntry | null {
  const profile = demoMemberProfiles.find((p) => p.id === memberId);
  if (!profile || profile.status === "archived") return null;

  const recent =
    profile.attendance.percentage >= 90
      ? `${profile.attendance.percentage}% — good attendance`
      : profile.attendance.percentage >= 75
        ? `${profile.attendance.percentage}% — watch`
        : `${profile.attendance.percentage}% — low`;

  return {
    memberId: profile.id,
    memberName: getMemberDisplayName(profile),
    age: calculateAge(profile.dateOfBirth),
    classGroup: profile.classGroup,
    hasMedicalFlag: profile.hasMedicalFlag,
    emergencyContactComplete: profile.emergencyContactComplete,
    recentAttendanceSummary: recent,
    mark,
  };
}

export function buildSessionRegister(
  sessionId: string,
  marks?: Record<string, AttendanceMark>,
): SessionRegister {
  const session = demoSessions.find((s) => s.id === sessionId);
  if (!session) {
    return {
      sessionId,
      sessionName: "Unknown session",
      sessionDate: DEMO_TODAY,
      entries: [],
      status: "outstanding",
    };
  }

  const entries = session.memberIds
    .map((id) => buildRegisterEntry(id, marks?.[id] ?? "unmarked"))
    .filter((e): e is RegisterMemberEntry => e !== null);

  const allMarked = entries.every((e) => e.mark !== "unmarked");
  const someMarked = entries.some((e) => e.mark !== "unmarked");

  return {
    sessionId: session.id,
    sessionName: session.name,
    sessionDate: session.sessionDate,
    entries,
    status: allMarked ? "complete" : someMarked ? "incomplete" : session.registerStatus,
  };
}

export const demoAttendanceDashboard: AttendanceDashboardData = {
  todaySessions: demoSessions.filter((s) => s.sessionDate === DEMO_TODAY),
  registersCompleted: demoSessions.filter((s) => s.registerStatus === "complete").length,
  registersOutstanding: demoSessions.filter(
    (s) => s.registerStatus === "outstanding" || s.registerStatus === "incomplete",
  ).length,
  attendancePercentWeek: 89,
  attendancePercentMonth: 91,
  absenceAlerts: [
    {
      memberId: "mem-005",
      memberName: "Riley Chen",
      consecutiveAbsences: 3,
      lastSession: "Tuesday Development Squad — 17 Jun",
    },
    {
      memberId: "mem-008",
      memberName: "Avery Singh",
      consecutiveAbsences: 2,
      lastSession: "Saturday Recreational — 14 Jun",
    },
  ],
  lowAttendanceMembers: [
    { memberId: "mem-005", memberName: "Riley Chen", classGroup: "Recreational — Tuesday", percentage: 75 },
    { memberId: "mem-008", memberName: "Avery Singh", classGroup: "Mini Gym — Saturday", percentage: 85 },
  ],
};

export const demoAttendanceReports: AttendanceReportsData = {
  byClass: demoSessions.map((s) => ({
    sessionId: s.id,
    sessionName: s.name,
    averageAttendance:
      s.registerStatus === "complete" ? 92 : s.registerStatus === "incomplete" ? 78 : 0,
    registersComplete: s.registerStatus === "complete" ? 4 : s.registerStatus === "incomplete" ? 2 : 0,
    registersTotal: 4,
  })),
  byMember: demoMemberProfiles
    .filter((p) => p.status === "active" && p.membershipType === "Junior")
    .map((p) => ({
      memberId: p.id,
      memberName: getMemberDisplayName(p),
      classGroup: p.classGroup,
      percentage: p.attendance.percentage,
      present: p.attendance.sessionsAttended,
      absent: p.attendance.sessionsTotal - p.attendance.sessionsAttended,
      late: p.attendance.percentage < 100 ? 1 : 0,
    })),
  repeatedAbsences: demoAttendanceDashboard.absenceAlerts,
  lowAttendance: demoAttendanceDashboard.lowAttendanceMembers,
  incompleteRegisters: demoSessions.filter(
    (s) => s.registerStatus === "incomplete" || s.registerStatus === "outstanding",
  ),
};

/** Pre-filled register for completed Tuesday session demo */
export const demoCompletedRegisterMarks: Record<string, Record<string, AttendanceMark>> = {
  "ses-tue-development": {
    "mem-001": "present",
    "mem-005": "absent",
    "mem-004": "present",
  },
};
