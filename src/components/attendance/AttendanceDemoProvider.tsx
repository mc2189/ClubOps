"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  SessionClass,
  SessionRegister,
  AttendanceMark,
  AttendanceDashboardData,
  AuditEvent,
  RegisterStatus,
} from "@/data/providers/types";
import { buildSessionRegister } from "@/data/demo/attendanceData";
import { createAttendanceAuditEvent } from "@/lib/attendance";

interface SavedRegister {
  register: SessionRegister;
  savedAt: string;
}

interface AttendanceDemoContextValue {
  sessions: SessionClass[];
  dashboard: AttendanceDashboardData;
  savedRegisters: Record<string, SavedRegister>;
  localAuditEvents: AuditEvent[];
  getRegister: (sessionId: string) => SessionRegister;
  setMemberMark: (sessionId: string, memberId: string, mark: AttendanceMark) => void;
  markAllPresent: (sessionId: string) => void;
  saveRegister: (sessionId: string) => void;
  getSessionStatus: (sessionId: string) => RegisterStatus;
}

const AttendanceDemoContext = createContext<AttendanceDemoContextValue | null>(null);

function registerKey(sessionId: string) {
  return sessionId;
}

export function AttendanceDemoProvider({
  initialSessions,
  initialDashboard,
  initialRegisters,
  children,
}: {
  initialSessions: SessionClass[];
  initialDashboard: AttendanceDashboardData;
  initialRegisters: Record<string, SessionRegister>;
  children: ReactNode;
}) {
  const [sessions, setSessions] = useState(initialSessions);
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [registers, setRegisters] = useState<Record<string, SessionRegister>>(initialRegisters);
  const [savedRegisters, setSavedRegisters] = useState<Record<string, SavedRegister>>({});
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);

  const getRegister = useCallback(
    (sessionId: string) => registers[sessionId] ?? buildSessionRegister(sessionId),
    [registers],
  );

  const setMemberMark = useCallback((sessionId: string, memberId: string, mark: AttendanceMark) => {
    setRegisters((prev) => {
      const current = prev[sessionId] ?? buildSessionRegister(sessionId);
      const entries = current.entries.map((e) =>
        e.memberId === memberId ? { ...e, mark } : e,
      );
      const allMarked = entries.every((e) => e.mark !== "unmarked");
      const someMarked = entries.some((e) => e.mark !== "unmarked");
      const status: RegisterStatus = allMarked
        ? "complete"
        : someMarked
          ? "incomplete"
          : "outstanding";
      return { ...prev, [sessionId]: { ...current, entries, status } };
    });
  }, []);

  const markAllPresent = useCallback((sessionId: string) => {
    setRegisters((prev) => {
      const current = prev[sessionId] ?? buildSessionRegister(sessionId);
      const entries = current.entries.map((e) => ({ ...e, mark: "present" as AttendanceMark }));
      return {
        ...prev,
        [sessionId]: { ...current, entries, status: "complete" as RegisterStatus },
      };
    });
  }, []);

  const saveRegister = useCallback((sessionId: string) => {
    const register = registers[sessionId] ?? buildSessionRegister(sessionId);
    const savedAt = new Date().toISOString();
    const saved = { ...register, status: "complete" as RegisterStatus, savedAt };

    setRegisters((prev) => ({ ...prev, [sessionId]: saved }));
    setSavedRegisters((prev) => ({
      ...prev,
      [registerKey(sessionId)]: { register: saved, savedAt },
    }));

    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, registerStatus: "complete" } : s)),
    );

    setDashboard((prev) => ({
      ...prev,
      registersCompleted: prev.registersCompleted + 1,
      registersOutstanding: Math.max(0, prev.registersOutstanding - 1),
    }));

    const audit = createAttendanceAuditEvent(register.sessionName, "Saved");
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, [registers]);

  const getSessionStatus = useCallback(
    (sessionId: string): RegisterStatus => {
      const saved = savedRegisters[registerKey(sessionId)];
      if (saved) return "complete";
      return registers[sessionId]?.status ?? sessions.find((s) => s.id === sessionId)?.registerStatus ?? "outstanding";
    },
    [registers, savedRegisters, sessions],
  );

  const value = useMemo(
    () => ({
      sessions,
      dashboard,
      savedRegisters,
      localAuditEvents,
      getRegister,
      setMemberMark,
      markAllPresent,
      saveRegister,
      getSessionStatus,
    }),
    [
      sessions,
      dashboard,
      savedRegisters,
      localAuditEvents,
      getRegister,
      setMemberMark,
      markAllPresent,
      saveRegister,
      getSessionStatus,
    ],
  );

  return (
    <AttendanceDemoContext.Provider value={value}>{children}</AttendanceDemoContext.Provider>
  );
}

export function useAttendanceDemo() {
  const ctx = useContext(AttendanceDemoContext);
  if (!ctx) {
    throw new Error("useAttendanceDemo must be used within AttendanceDemoProvider");
  }
  return ctx;
}
