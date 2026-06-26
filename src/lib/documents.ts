import type { AuditEvent, DocumentCategory, SensitivityLevel } from "@/data/providers/types";

export function createDocumentsAuditEvent(action: string, details: string): AuditEvent {
  return {
    id: `aud-doc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: "Demo Secretary",
    action,
    resource: "documents",
    details,
  };
}

export const documentsSubNav = [
  { href: "/documents/upload", label: "Upload" },
  { href: "/documents/assignment", label: "Assignment" },
  { href: "/documents/scanned-notes", label: "Scanned notes" },
  { href: "/documents/missing", label: "Missing" },
  { href: "/documents/archive", label: "Archive" },
  { href: "/documents/rules", label: "Rules" },
];

export const sensitiveCategories: DocumentCategory[] = [
  "medical form",
  "safeguarding note",
  "incident/injury note",
  "bank statement",
  "coach qualification",
  "receipt",
  "invoice",
];

export function isSensitiveCategory(category: DocumentCategory): boolean {
  return sensitiveCategories.includes(category);
}

export function sensitivityVariant(
  level: SensitivityLevel,
): "default" | "success" | "warning" | "danger" | "info" {
  switch (level) {
    case "restricted":
      return "danger";
    case "sensitive":
      return "warning";
    default:
      return "default";
  }
}

export const sensitivityLabel: Record<SensitivityLevel, string> = {
  normal: "Normal",
  sensitive: "Sensitive",
  restricted: "Restricted",
};

export const statusLabel = {
  assigned: "Ready to file",
  unassigned: "Needs assignment",
  "needs-review": "Needs review",
  archived: "Archived",
} as const;

export const priorityVariant = {
  high: "danger" as const,
  medium: "warning" as const,
  low: "default" as const,
};
