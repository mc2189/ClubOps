"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuditEvent, ReportsAuditPageData } from "@/data/providers/types";
import { createReportsAuditEvent } from "@/lib/reports";
import { useDemoRoleOptional } from "@/components/rbac/DemoRoleProvider";

interface ReportsAuditDemoContextValue extends ReportsAuditPageData {
  localAuditEvents: AuditEvent[];
  lastExportTitle: string | null;
  simulateExport: (title: string) => void;
}

const ReportsAuditDemoContext = createContext<ReportsAuditDemoContextValue | null>(null);

export function ReportsAuditDemoProvider({
  initialData,
  children,
}: {
  initialData: ReportsAuditPageData;
  children: ReactNode;
}) {
  const demoRole = useDemoRoleOptional();
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);
  const [lastExportTitle, setLastExportTitle] = useState<string | null>(null);

  const simulateExport = useCallback(
    (title: string) => {
      if (demoRole && !demoRole.can("exports", "export")) {
        demoRole.logRbacEvent(
          "export attempted with limited role",
          `${title} — export would require Admin/Treasurer in live mode`,
          "Reports",
        );
      }
      const audit = createReportsAuditEvent("Demo export generated", title);
      setLocalAuditEvents((prev) => [audit, ...prev]);
      setLastExportTitle(title);
    },
    [demoRole],
  );

  const auditEvents = useMemo(() => {
    const rbac = demoRole?.rbacAuditEvents ?? [];
    return [...localAuditEvents, ...rbac, ...initialData.auditEvents];
  }, [localAuditEvents, demoRole?.rbacAuditEvents, initialData.auditEvents]);

  const value = useMemo(
    () => ({
      ...initialData,
      auditEvents,
      localAuditEvents,
      lastExportTitle,
      simulateExport,
    }),
    [initialData, auditEvents, localAuditEvents, lastExportTitle, simulateExport],
  );

  return (
    <ReportsAuditDemoContext.Provider value={value}>{children}</ReportsAuditDemoContext.Provider>
  );
}

export function useReportsAuditDemo() {
  const ctx = useContext(ReportsAuditDemoContext);
  if (!ctx) throw new Error("useReportsAuditDemo must be used within ReportsAuditDemoProvider");
  return ctx;
}
