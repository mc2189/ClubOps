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
  CommunicationsDashboardData,
  CommunicationsPageData,
  InboxResponse,
  InboxResponseStatus,
  MessageHistoryRecord,
  MessageStatus,
} from "@/data/providers/types";
import { createCommunicationsAuditEvent } from "@/lib/communications";

export interface ComposeDraft {
  id: string;
  groupId: string;
  templateId?: string;
  formId?: string;
  subject: string;
  body: string;
  createdAt: string;
}

interface SendPayload {
  groupId: string;
  groupName: string;
  templateId?: string;
  templateName?: string;
  formId?: string;
  formName?: string;
  subject: string;
  body: string;
}

interface CommunicationsDemoContextValue {
  dashboard: CommunicationsDashboardData;
  groups: CommunicationsPageData["groups"];
  templates: CommunicationsPageData["templates"];
  forms: CommunicationsPageData["forms"];
  inbox: InboxResponse[];
  history: MessageHistoryRecord[];
  rules: CommunicationsPageData["rules"];
  drafts: ComposeDraft[];
  localAuditEvents: AuditEvent[];
  saveDraft: (draft: Omit<ComposeDraft, "id" | "createdAt">) => void;
  simulateSend: (payload: SendPayload) => string;
  updateInboxStatus: (id: string, status: InboxResponseStatus) => void;
}

const CommunicationsDemoContext = createContext<CommunicationsDemoContextValue | null>(null);

function recalcDashboard(
  base: CommunicationsDashboardData,
  history: MessageHistoryRecord[],
  inbox: InboxResponse[],
): CommunicationsDashboardData {
  const drafts = history.filter((h) => h.status === "draft").length;
  const sent = history.filter((h) => h.status === "simulated" || h.status === "sent").length;
  return {
    ...base,
    draftCount: drafts,
    sentCount: sent,
    repliesNeedingReview: inbox.filter((i) => i.status === "needs-review").length,
    pendingFormResponses: inbox.filter((i) => i.status === "unresolved").length,
  };
}

export function CommunicationsDemoProvider({
  initialData,
  children,
}: {
  initialData: CommunicationsPageData;
  children: ReactNode;
}) {
  const [history, setHistory] = useState<MessageHistoryRecord[]>(initialData.history);
  const [inbox, setInbox] = useState<InboxResponse[]>(initialData.inbox);
  const [drafts, setDrafts] = useState<ComposeDraft[]>([]);
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);

  const dashboard = useMemo(
    () => recalcDashboard(initialData.dashboard, history, inbox),
    [initialData.dashboard, history, inbox],
  );

  const saveDraft = useCallback((draft: Omit<ComposeDraft, "id" | "createdAt">) => {
    const newDraft: ComposeDraft = {
      ...draft,
      id: `draft-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setDrafts((prev) => [newDraft, ...prev]);
    const audit = createCommunicationsAuditEvent("Draft saved", `Subject: ${draft.subject}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, []);

  const simulateSend = useCallback((payload: SendPayload) => {
    let demoRef = "DEMO-COMMS-001";
    const audit = createCommunicationsAuditEvent(
      "Simulated send",
      `To: ${payload.groupName} — ${payload.subject}`,
    );
    const record: MessageHistoryRecord = {
      id: `hist-${Date.now()}`,
      dateTime: new Date().toISOString(),
      sender: "Demo Secretary",
      recipientGroup: payload.groupName,
      subject: payload.subject,
      templateUsed: payload.templateName,
      formsAttached: payload.formName ? [payload.formName] : undefined,
      status: "simulated" as MessageStatus,
      linkedModule: payload.formId?.includes("giftaid")
        ? "Gift Aid"
        : payload.templateId === "tpl-fee-reminder"
          ? "Finance"
          : "Communications",
      auditReference: demoRef,
    };
    setHistory((prev) => {
      demoRef = `DEMO-COMMS-${String(prev.length + 1).padStart(3, "0")}`;
      record.auditReference = demoRef;
      return [record, ...prev];
    });
    setLocalAuditEvents((prev) => [audit, ...prev]);
    return demoRef;
  }, []);

  const updateInboxStatus = useCallback((id: string, status: InboxResponseStatus) => {
    setInbox((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    const audit = createCommunicationsAuditEvent("Inbox updated", `Response ${id} → ${status}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      dashboard,
      groups: initialData.groups,
      templates: initialData.templates,
      forms: initialData.forms,
      inbox,
      history,
      rules: initialData.rules,
      drafts,
      localAuditEvents,
      saveDraft,
      simulateSend,
      updateInboxStatus,
    }),
    [
      dashboard,
      initialData,
      inbox,
      history,
      drafts,
      localAuditEvents,
      saveDraft,
      simulateSend,
      updateInboxStatus,
    ],
  );

  return (
    <CommunicationsDemoContext.Provider value={value}>
      {children}
    </CommunicationsDemoContext.Provider>
  );
}

export function useCommunicationsDemo() {
  const ctx = useContext(CommunicationsDemoContext);
  if (!ctx) {
    throw new Error("useCommunicationsDemo must be used within CommunicationsDemoProvider");
  }
  return ctx;
}
