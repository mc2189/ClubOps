import type { AttendanceMark, RegisterStatus } from "@/data/providers/types";
import type { AuditEvent } from "@/data/providers/types";

export const ATTENDANCE_MARKS: AttendanceMark[] = [
  "present",
  "absent",
  "late",
  "left-early",
  "trial",
];

export const markLabels: Record<AttendanceMark, string> = {
  present: "Present",
  absent: "Absent",
  late: "Late",
  "left-early": "Left Early",
  trial: "Trial",
  unmarked: "Unmarked",
};

export const markButtonStyles: Record<AttendanceMark, string> = {
  present: "bg-green-600 text-white ring-green-600",
  absent: "bg-red-600 text-white ring-red-600",
  late: "bg-amber-500 text-white ring-amber-500",
  "left-early": "bg-orange-500 text-white ring-orange-500",
  trial: "bg-indigo-600 text-white ring-indigo-600",
  unmarked: "bg-white text-slate-600 ring-slate-300 hover:bg-slate-50",
};

export const markBadgeVariant = (mark: AttendanceMark) => {
  switch (mark) {
    case "present":
      return "success" as const;
    case "absent":
      return "danger" as const;
    case "late":
    case "left-early":
      return "warning" as const;
    case "trial":
      return "info" as const;
    default:
      return "default" as const;
  }
};

export const registerStatusLabel: Record<RegisterStatus, string> = {
  complete: "Complete",
  incomplete: "Incomplete",
  outstanding: "Outstanding",
};

export function createAttendanceAuditEvent(
  sessionName: string,
  action: string,
): AuditEvent {
  return {
    id: `aud-att-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Coach",
    action,
    resource: "attendance",
    details: `${action} attendance register — ${sessionName}`,
  };
}

export const calendarTypeLabels: Record<string, string> = {
  session: "Class / Session",
  competition: "Competition",
  "hall-booking": "Hall Booking",
  "staff-rota": "Staff Rota",
  "payment-due": "Payment Due",
  "gift-aid": "Gift Aid",
  "qualification-expiry": "Qualification Expiry",
  fundraising: "Fundraising",
  meeting: "Meeting",
  social: "Social",
};

export const calendarTypeColors: Record<string, string> = {
  session: "bg-blue-100 text-blue-800",
  competition: "bg-purple-100 text-purple-800",
  "hall-booking": "bg-slate-100 text-slate-800",
  "staff-rota": "bg-cyan-100 text-cyan-800",
  "payment-due": "bg-red-100 text-red-800",
  "gift-aid": "bg-green-100 text-green-800",
  "qualification-expiry": "bg-amber-100 text-amber-800",
  fundraising: "bg-indigo-100 text-indigo-800",
  meeting: "bg-slate-100 text-slate-700",
  social: "bg-pink-100 text-pink-800",
};
