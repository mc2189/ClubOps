import type { AttendanceRecord } from "@/data/providers/types";

export const demoAttendance: AttendanceRecord[] = [
  {
    id: "att-001",
    sessionId: "ses-001",
    sessionName: "Recreational Gym — Tuesday",
    sessionDate: "2026-06-24",
    memberId: "mem-001",
    memberName: "Alex Thompson",
    present: true,
  },
  {
    id: "att-002",
    sessionId: "ses-001",
    sessionName: "Recreational Gym — Tuesday",
    sessionDate: "2026-06-24",
    memberId: "mem-002",
    memberName: "Jordan Reeves",
    present: true,
  },
  {
    id: "att-003",
    sessionId: "ses-001",
    sessionName: "Recreational Gym — Tuesday",
    sessionDate: "2026-06-24",
    memberId: "mem-005",
    memberName: "Riley Chen",
    present: false,
  },
  {
    id: "att-004",
    sessionId: "ses-002",
    sessionName: "Competitive Squad — Thursday",
    sessionDate: "2026-06-26",
    memberId: "mem-001",
    memberName: "Alex Thompson",
    present: true,
  },
  {
    id: "att-005",
    sessionId: "ses-002",
    sessionName: "Competitive Squad — Thursday",
    sessionDate: "2026-06-26",
    memberId: "mem-002",
    memberName: "Jordan Reeves",
    present: true,
  },
];
