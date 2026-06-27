"use client";

import { type ReactNode } from "react";
import { RestrictedContentPreview } from "@/components/rbac/RestrictedContentPreview";
import { isSensitiveCategory } from "@/lib/documents";
import type { DocumentCategory } from "@/data/providers/types";

interface SensitiveDocumentPreviewProps {
  category: DocumentCategory | string;
  children: ReactNode;
  /** Safe metadata shown even when locked */
  metadata?: ReactNode;
}

const FINANCE_DOC_CATEGORIES = new Set(["bank statement", "receipt", "invoice", "Gift Aid declaration"]);

export function isRestrictedDocumentCategory(category: DocumentCategory | string): boolean {
  if (isSensitiveCategory(category as DocumentCategory)) return true;
  return FINANCE_DOC_CATEGORIES.has(category);
}

export function documentPreviewModule(category: DocumentCategory | string): "documents-sensitive" | "finance" {
  if (FINANCE_DOC_CATEGORIES.has(category)) return "finance";
  return "documents-sensitive";
}

export function SensitiveDocumentPreview({
  category,
  children,
  metadata,
}: SensitiveDocumentPreviewProps) {
  if (!isRestrictedDocumentCategory(category)) {
    return <>{children}</>;
  }

  const previewModule = documentPreviewModule(category);

  return (
    <RestrictedContentPreview
      module={previewModule}
      detailAction={previewModule === "documents-sensitive" ? "view-sensitive-detail" : "view"}
      auditOnView="sensitive document preview viewed by limited role"
      summaryTitle="Sensitive document on file"
      summaryLines={[
        `Category: ${category}`,
        "Status visible — detailed content hidden in this demo role.",
      ]}
    >
      {metadata}
      {children}
    </RestrictedContentPreview>
  );
}
