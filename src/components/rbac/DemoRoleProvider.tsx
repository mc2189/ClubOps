"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuditEvent } from "@/data/providers/types";
import { demoRoles } from "@/data/demo/rolesData";
import {
  DEFAULT_DEMO_ROLE,
  DEMO_ROLE_STORAGE_KEY,
  type DemoRoleId,
  can,
  getRoleRestrictionMessage,
  shouldShowPermissionPreview,
  getRoleAccessHint,
  type PermissionModule,
  type PermissionAction,
} from "@/lib/permissions";

interface DemoRoleContextValue {
  role: DemoRoleId;
  roleName: string;
  roleDescription: string;
  setRole: (role: DemoRoleId) => void;
  roles: typeof demoRoles;
  can: (module: PermissionModule, action?: PermissionAction) => boolean;
  getRestrictionMessage: (module: PermissionModule, action?: PermissionAction) => string | null;
  shouldShowPreview: (module: PermissionModule, action?: PermissionAction) => boolean;
  getAccessHint: (module: PermissionModule) => string;
  rbacAuditEvents: AuditEvent[];
  logRbacEvent: (action: string, details: string, module?: string) => void;
}

const DemoRoleContext = createContext<DemoRoleContextValue | null>(null);

function createRbacAuditEvent(action: string, details: string, module?: string): AuditEvent {
  return {
    id: `aud-rbac-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: "Demo role preview",
    action,
    resource: "rbac",
    module: module ?? "Settings",
    details,
    affectedRecord: "Demo role switching",
    riskLevel: "normal",
    status: "recorded",
    linkedHref: "/settings/permissions",
  };
}

export function DemoRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<DemoRoleId>(DEFAULT_DEMO_ROLE);
  const [hydrated, setHydrated] = useState(false);
  const [rbacAuditEvents, setRbacAuditEvents] = useState<AuditEvent[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(DEMO_ROLE_STORAGE_KEY) as DemoRoleId | null;
      if (stored && demoRoles.some((r) => r.id === stored)) {
        setRoleState(stored);
      }
    } catch {
      /* sessionStorage unavailable */
    }
    setHydrated(true);
  }, []);

  const logRbacEvent = useCallback((action: string, details: string, module?: string) => {
    const event = createRbacAuditEvent(action, details, module);
    setRbacAuditEvents((prev) => [event, ...prev].slice(0, 20));
  }, []);

  const setRole = useCallback(
    (next: DemoRoleId) => {
      const prevDef = demoRoles.find((r) => r.id === role);
      const nextDef = demoRoles.find((r) => r.id === next);
      setRoleState(next);
      try {
        sessionStorage.setItem(DEMO_ROLE_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      logRbacEvent(
        "role switched",
        `Demo role changed from ${prevDef?.name ?? role} to ${nextDef?.name ?? next} — not real security`,
        "Settings",
      );
    },
    [role, logRbacEvent],
  );

  const roleDef = demoRoles.find((r) => r.id === role);

  const value = useMemo(
    (): DemoRoleContextValue => ({
      role,
      roleName: roleDef?.name ?? "Club Secretary / Admin",
      roleDescription: roleDef?.purpose ?? "",
      setRole,
      roles: demoRoles,
      can: (module, action = "view") => can(role, module, action),
      getRestrictionMessage: (module, action = "view") => getRoleRestrictionMessage(role, module, action),
      shouldShowPreview: (module, action = "view") =>
        hydrated && shouldShowPermissionPreview(role, module, action),
      getAccessHint: (module) => getRoleAccessHint(module),
      rbacAuditEvents,
      logRbacEvent,
    }),
    [role, roleDef, setRole, rbacAuditEvents, logRbacEvent, hydrated],
  );

  return <DemoRoleContext.Provider value={value}>{children}</DemoRoleContext.Provider>;
}

export function useDemoRole() {
  const ctx = useContext(DemoRoleContext);
  if (!ctx) throw new Error("useDemoRole must be used within DemoRoleProvider");
  return ctx;
}

export function useDemoRoleOptional() {
  return useContext(DemoRoleContext);
}
