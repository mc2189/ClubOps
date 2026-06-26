"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MemberProfile, MemberFormData, AuditEvent } from "@/data/providers/types";
import {
  formDataToProfile,
  createAuditEvent,
  getMemberDisplayName,
} from "@/lib/members";

interface MembersDemoContextValue {
  profiles: MemberProfile[];
  localAuditEvents: AuditEvent[];
  getProfile: (id: string) => MemberProfile | undefined;
  addMember: (data: MemberFormData) => string;
  updateMember: (id: string, data: MemberFormData) => void;
  archiveMember: (id: string) => void;
}

const MembersDemoContext = createContext<MembersDemoContextValue | null>(null);

export function MembersDemoProvider({
  initialProfiles,
  children,
}: {
  initialProfiles: MemberProfile[];
  children: ReactNode;
}) {
  const [profiles, setProfiles] = useState<MemberProfile[]>(initialProfiles);
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);

  const getProfile = useCallback(
    (id: string) => profiles.find((p) => p.id === id),
    [profiles],
  );

  const addMember = useCallback((data: MemberFormData) => {
    const profile = formDataToProfile(data);
    const name = getMemberDisplayName(profile);
    const audit = createAuditEvent("create", name, `Created member record — ${name}`);
    profile.auditEvents = [audit, ...profile.auditEvents];
    setProfiles((prev) => [...prev, profile]);
    setLocalAuditEvents((prev) => [audit, ...prev]);
    return profile.id;
  }, []);

  const updateMember = useCallback((id: string, data: MemberFormData) => {
    let audit: AuditEvent | null = null;
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = formDataToProfile(data, p);
        const name = getMemberDisplayName(updated);
        audit = createAuditEvent("update", name, `Updated member record — ${name}`);
        return { ...updated, auditEvents: [audit, ...updated.auditEvents] };
      }),
    );
    if (audit) {
      setLocalAuditEvents((prev) => [audit!, ...prev]);
    }
  }, []);

  const archiveMember = useCallback((id: string) => {
    let audit: AuditEvent | null = null;
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const name = getMemberDisplayName(p);
        audit = createAuditEvent(
          "archive",
          name,
          `Archived member record — ${name} (soft archive, not deleted)`,
        );
        return {
          ...p,
          status: "archived" as const,
          auditEvents: [audit, ...p.auditEvents],
        };
      }),
    );
    if (audit) {
      setLocalAuditEvents((prev) => [audit!, ...prev]);
    }
  }, []);

  const value = useMemo(
    () => ({
      profiles,
      localAuditEvents,
      getProfile,
      addMember,
      updateMember,
      archiveMember,
    }),
    [profiles, localAuditEvents, getProfile, addMember, updateMember, archiveMember],
  );

  return (
    <MembersDemoContext.Provider value={value}>{children}</MembersDemoContext.Provider>
  );
}

export function useMembersDemo() {
  const ctx = useContext(MembersDemoContext);
  if (!ctx) {
    throw new Error("useMembersDemo must be used within MembersDemoProvider");
  }
  return ctx;
}
