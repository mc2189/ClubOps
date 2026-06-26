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
  ClubDocumentRecord,
  DocumentActivityItem,
  DocumentAssignmentStatus,
  DocumentCategory,
  DocumentsDashboardData,
  DocumentsPageData,
  DemoUploadExample,
  ScannedNoteItem,
  ScannedNoteType,
  SensitivityLevel,
  UnassignedDocumentItem,
} from "@/data/providers/types";
import { createDocumentsAuditEvent, isSensitiveCategory } from "@/lib/documents";

interface DocumentsDemoContextValue {
  dashboard: DocumentsDashboardData;
  documents: ClubDocumentRecord[];
  unassigned: UnassignedDocumentItem[];
  scannedNotes: ScannedNoteItem[];
  missing: DocumentsPageData["missing"];
  activities: DocumentActivityItem[];
  rules: DocumentsPageData["rules"];
  uploadExamples: DemoUploadExample[];
  localAuditEvents: AuditEvent[];
  simulateUpload: (example: DemoUploadExample) => string;
  assignDocument: (id: string) => void;
  changeCategory: (id: string, category: DocumentCategory) => void;
  markSensitive: (id: string) => void;
  leaveUnresolved: (id: string) => void;
  archiveDocument: (id: string) => void;
  restoreDocument: (id: string) => void;
  confirmScannedNote: (
    id: string,
    member: string,
    noteType: ScannedNoteType,
    coach: string,
  ) => void;
}

const DocumentsDemoContext = createContext<DocumentsDemoContextValue | null>(null);

function recalcDashboard(
  base: DocumentsDashboardData,
  documents: ClubDocumentRecord[],
  unassigned: UnassignedDocumentItem[],
  scannedNotes: ScannedNoteItem[],
): DocumentsDashboardData {
  const active = documents.filter((d) => !d.archived);
  return {
    ...base,
    totalDocuments: active.length,
    unassignedDocuments: unassigned.length,
    sensitiveDocuments: active.filter(
      (d) => d.sensitivity !== "normal" || isSensitiveCategory(d.category),
    ).length,
    awaitingReview: active.filter((d) => d.status === "needs-review").length,
    archivedDocuments: documents.filter((d) => d.archived).length,
    scannedNotesPending: scannedNotes.filter((n) => n.status === "pending").length,
  };
}

export function DocumentsDemoProvider({
  initialData,
  children,
}: {
  initialData: DocumentsPageData;
  children: ReactNode;
}) {
  const [documents, setDocuments] = useState<ClubDocumentRecord[]>(initialData.documents);
  const [unassigned, setUnassigned] = useState<UnassignedDocumentItem[]>(initialData.unassigned);
  const [scannedNotes, setScannedNotes] = useState<ScannedNoteItem[]>(initialData.scannedNotes);
  const [activities, setActivities] = useState<DocumentActivityItem[]>(initialData.activities);
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);

  const addActivity = useCallback((action: string, documentTitle: string) => {
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action,
        documentTitle,
        actor: "Demo Secretary",
      },
      ...prev,
    ]);
  }, []);

  const addAudit = useCallback((action: string, details: string) => {
    const audit = createDocumentsAuditEvent(action, details);
    setLocalAuditEvents((prev) => [audit, ...prev]);
    return audit;
  }, []);

  const dashboard = useMemo(
    () => recalcDashboard(initialData.dashboard, documents, unassigned, scannedNotes),
    [initialData.dashboard, documents, unassigned, scannedNotes],
  );

  const simulateUpload = useCallback(
    (example: DemoUploadExample) => {
      const audit = addAudit("Demo upload", example.title);
      const newDoc: ClubDocumentRecord = {
        id: `doc-${Date.now()}`,
        fileName: example.fileName,
        title: example.title,
        category: example.suggestedCategory,
        fileType: example.fileType,
        uploadedDate: new Date().toISOString().slice(0, 10),
        uploadedBy: "Demo Secretary",
        status: example.confidence >= 70 ? "unassigned" : "needs-review",
        sensitivity: example.sensitivity,
        linkedRecordType: example.suggestedRecordType,
        linkedRecordName: example.suggestedLinkedRecord,
        linkedModule: example.suggestedModule,
        extractedPreview: example.extractedText.slice(0, 120),
        archived: false,
        auditReference: audit.id,
      };
      setDocuments((prev) => [newDoc, ...prev]);
      const unassignedItem: UnassignedDocumentItem = {
        id: `unas-${Date.now()}`,
        fileName: example.fileName,
        suggestedCategory: example.suggestedCategory,
        suggestedLinkedRecord: example.suggestedLinkedRecord,
        suggestedRecordType: example.suggestedRecordType,
        confidence: example.confidence,
        matchReason: `Simulated extraction from ${example.fileName}`,
        sensitivity: example.sensitivity,
      };
      setUnassigned((prev) => [unassignedItem, ...prev]);
      addActivity("Uploaded (simulated)", example.title);
      return audit.id;
    },
    [addActivity, addAudit],
  );

  const assignDocument = useCallback(
    (id: string) => {
      const item = unassigned.find((u) => u.id === id);
      if (!item) return;
      addAudit("Document assigned", item.fileName);
      setUnassigned((prev) => prev.filter((u) => u.id !== id));
      setDocuments((prev) =>
        prev.map((d) =>
          d.fileName === item.fileName
            ? {
                ...d,
                status: "assigned" as DocumentAssignmentStatus,
                category: item.suggestedCategory,
                linkedRecordName: item.suggestedLinkedRecord,
                linkedRecordType: item.suggestedRecordType,
              }
            : d,
        ),
      );
      addActivity("Assigned", item.fileName);
    },
    [unassigned, addAudit, addActivity],
  );

  const changeCategory = useCallback(
    (id: string, category: DocumentCategory) => {
      setUnassigned((prev) =>
        prev.map((u) => (u.id === id ? { ...u, suggestedCategory: category } : u)),
      );
      addAudit("Category changed", category);
    },
    [addAudit],
  );

  const markSensitive = useCallback(
    (id: string) => {
      setUnassigned((prev) =>
        prev.map((u) => (u.id === id ? { ...u, sensitivity: "restricted" as SensitivityLevel } : u)),
      );
      addAudit("Marked sensitive", id);
    },
    [addAudit],
  );

  const leaveUnresolved = useCallback(
    (id: string) => {
      setUnassigned((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, confidence: 0, matchReason: "Left unresolved for manual review" } : u,
        ),
      );
      addAudit("Left unresolved", id);
    },
    [addAudit],
  );

  const archiveDocument = useCallback(
    (id: string) => {
      const item = unassigned.find((u) => u.id === id);
      if (item) {
        setUnassigned((prev) => prev.filter((u) => u.id !== id));
        addActivity("Archived (soft)", item.fileName);
      }
      setDocuments((prev) =>
        prev.map((d) =>
          d.fileName === item?.fileName || d.id === id
            ? { ...d, archived: true, status: "archived" as DocumentAssignmentStatus }
            : d,
        ),
      );
      addAudit("Archived (soft)", item?.fileName ?? id);
    },
    [unassigned, addAudit, addActivity],
  );

  const restoreDocument = useCallback(
    (id: string) => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, archived: false, status: "assigned" as DocumentAssignmentStatus }
            : d,
        ),
      );
      const doc = documents.find((d) => d.id === id);
      addAudit("Restored from archive", doc?.title ?? id);
      addActivity("Restored from archive", doc?.title ?? "Document");
    },
    [documents, addAudit, addActivity],
  );

  const confirmScannedNote = useCallback(
    (id: string, member: string, noteType: ScannedNoteType, coach: string) => {
      setScannedNotes((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, status: "assigned", suggestedMember: member, suggestedNoteType: noteType, coach } : n,
        ),
      );
      addAudit("Scanned note digitised", `${noteType} — ${member}`);
      addActivity("Scanned note digitised", `${noteType} — ${member}`);
    },
    [addAudit, addActivity],
  );

  const value = useMemo(
    () => ({
      dashboard,
      documents,
      unassigned,
      scannedNotes,
      missing: initialData.missing,
      activities,
      rules: initialData.rules,
      uploadExamples: initialData.uploadExamples,
      localAuditEvents,
      simulateUpload,
      assignDocument,
      changeCategory,
      markSensitive,
      leaveUnresolved,
      archiveDocument,
      restoreDocument,
      confirmScannedNote,
    }),
    [
      dashboard,
      documents,
      unassigned,
      scannedNotes,
      initialData,
      activities,
      localAuditEvents,
      simulateUpload,
      assignDocument,
      changeCategory,
      markSensitive,
      leaveUnresolved,
      archiveDocument,
      restoreDocument,
      confirmScannedNote,
    ],
  );

  return (
    <DocumentsDemoContext.Provider value={value}>{children}</DocumentsDemoContext.Provider>
  );
}

export function useDocumentsDemo() {
  const ctx = useContext(DocumentsDemoContext);
  if (!ctx) {
    throw new Error("useDocumentsDemo must be used within DocumentsDemoProvider");
  }
  return ctx;
}
