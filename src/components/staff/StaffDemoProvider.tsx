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
  AuditEvent,
  OutgoingRecord,
  OutgoingCategory,
  RotaEntry,
  StaffAlert,
  StaffDashboardData,
  StaffPageData,
  StaffPaymentStatus,
  AlertStatus,
} from "@/data/providers/types";
import { createStaffAuditEvent } from "@/lib/staff";

interface AddOutgoingPayload {
  payee: string;
  category: OutgoingCategory;
  amount: number;
  dueDate: string;
  notes?: string;
}

interface StaffDemoContextValue {
  dashboard: StaffDashboardData;
  staff: StaffPageData["staff"];
  qualifications: StaffPageData["qualifications"];
  rota: RotaEntry[];
  wages: StaffPageData["wages"];
  venues: StaffPageData["venues"];
  outgoings: OutgoingRecord[];
  alerts: StaffAlert[];
  localAuditEvents: AuditEvent[];
  wageExportDone: boolean;
  assignStaffToRota: (rotaId: string, staffName: string) => void;
  flagConflict: (rotaId: string) => void;
  confirmRota: (rotaId: string) => void;
  markOutgoingPaid: (id: string) => void;
  flagMissingReceipt: (id: string) => void;
  addOutgoing: (payload: AddOutgoingPayload) => void;
  resolveAlert: (id: string) => void;
  simulateWageExport: () => void;
}

const StaffDemoContext = createContext<StaffDemoContextValue | null>(null);

function recalcDashboard(
  base: StaffDashboardData,
  rota: RotaEntry[],
  outgoings: OutgoingRecord[],
  alerts: StaffAlert[],
  wages: StaffPageData["wages"],
): StaffDashboardData {
  const unpaidOutgoings = outgoings
    .filter((o) => o.paymentStatus === "unpaid" || o.paymentStatus === "pending")
    .reduce((s, o) => s + o.amount, 0);
  const wageTotal = wages
    .filter((w) => w.paymentStatus === "pending")
    .reduce((s, w) => s + w.totalDue + (w.expensesPlaceholder ?? 0), 0);
  return {
    ...base,
    sessionsNeedingStaff: rota.filter((r) => r.gaps.length > 0 || r.assignedStaff.length === 0).length,
    outgoingsDueThisMonth: unpaidOutgoings,
    wagePrepTotalThisMonth: wageTotal,
    dbsReviewDue: alerts.filter((a) => a.title.includes("DBS")).length,
  };
}

export function StaffDemoProvider({
  initialData,
  children,
}: {
  initialData: StaffPageData;
  children: ReactNode;
}) {
  const [rota, setRota] = useState<RotaEntry[]>(initialData.rota);
  const [outgoings, setOutgoings] = useState<OutgoingRecord[]>(initialData.outgoings);
  const [alerts, setAlerts] = useState<StaffAlert[]>(initialData.alerts);
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);
  const [wageExportDone, setWageExportDone] = useState(false);

  const addAudit = useCallback((action: string, details: string) => {
    const audit = createStaffAuditEvent(action, details);
    setLocalAuditEvents((prev) => [audit, ...prev]);
    return audit;
  }, []);

  const dashboard = useMemo(
    () => recalcDashboard(initialData.dashboard, rota, outgoings, alerts, initialData.wages),
    [initialData.dashboard, initialData.wages, rota, outgoings, alerts],
  );

  const assignStaffToRota = useCallback(
    (rotaId: string, staffName: string) => {
      setRota((prev) =>
        prev.map((r) =>
          r.id === rotaId
            ? {
                ...r,
                assignedStaff: [...r.assignedStaff, staffName],
                gaps: r.gaps.slice(1),
                suggestedAction: r.gaps.length <= 1 ? "Confirm rota" : r.suggestedAction,
              }
            : r,
        ),
      );
      addAudit("Rota assignment", `${staffName} → ${rotaId}`);
    },
    [addAudit],
  );

  const flagConflict = useCallback(
    (rotaId: string) => {
      setRota((prev) =>
        prev.map((r) => (r.id === rotaId ? { ...r, hasConflict: true } : r)),
      );
      addAudit("Rota conflict flagged", rotaId);
    },
    [addAudit],
  );

  const confirmRota = useCallback(
    (rotaId: string) => {
      setRota((prev) =>
        prev.map((r) => (r.id === rotaId ? { ...r, confirmed: true } : r)),
      );
      addAudit("Rota confirmed", rotaId);
    },
    [addAudit],
  );

  const markOutgoingPaid = useCallback(
    (id: string) => {
      setOutgoings((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, paymentStatus: "paid" as StaffPaymentStatus } : o,
        ),
      );
      const item = outgoings.find((o) => o.id === id);
      addAudit("Outgoing marked paid", item?.payee ?? id);
    },
    [outgoings, addAudit],
  );

  const flagMissingReceipt = useCallback(
    (id: string) => {
      setOutgoings((prev) =>
        prev.map((o) => (o.id === id ? { ...o, missingReceipt: true } : o)),
      );
      addAudit("Missing receipt flagged", id);
    },
    [addAudit],
  );

  const addOutgoing = useCallback(
    (payload: AddOutgoingPayload) => {
      const newOutgoing: OutgoingRecord = {
        id: `out-${Date.now()}`,
        payee: payload.payee,
        category: payload.category,
        amount: payload.amount,
        dueDate: payload.dueDate,
        paymentStatus: "unpaid",
        priority: "medium",
        notes: payload.notes,
      };
      setOutgoings((prev) => [newOutgoing, ...prev]);
      addAudit("Outgoing added", payload.payee);
    },
    [addAudit],
  );

  const resolveAlert = useCallback(
    (id: string) => {
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "resolved" as AlertStatus } : a)),
      );
      addAudit("Alert resolved", id);
    },
    [addAudit],
  );

  const simulateWageExport = useCallback(() => {
    setWageExportDone(true);
    addAudit("Wage summary exported (demo)", "June session payments");
  }, [addAudit]);

  const value = useMemo(
    () => ({
      dashboard,
      staff: initialData.staff,
      qualifications: initialData.qualifications,
      rota,
      wages: initialData.wages,
      venues: initialData.venues,
      outgoings,
      alerts,
      localAuditEvents,
      wageExportDone,
      assignStaffToRota,
      flagConflict,
      confirmRota,
      markOutgoingPaid,
      flagMissingReceipt,
      addOutgoing,
      resolveAlert,
      simulateWageExport,
    }),
    [
      dashboard,
      initialData,
      rota,
      outgoings,
      alerts,
      localAuditEvents,
      wageExportDone,
      assignStaffToRota,
      flagConflict,
      confirmRota,
      markOutgoingPaid,
      flagMissingReceipt,
      addOutgoing,
      resolveAlert,
      simulateWageExport,
    ],
  );

  return <StaffDemoContext.Provider value={value}>{children}</StaffDemoContext.Provider>;
}

export function useStaffDemo() {
  const ctx = useContext(StaffDemoContext);
  if (!ctx) {
    throw new Error("useStaffDemo must be used within StaffDemoProvider");
  }
  return ctx;
}
