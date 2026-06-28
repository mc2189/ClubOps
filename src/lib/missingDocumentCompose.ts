import type { MissingDocumentItem } from "@/data/providers/types";

/** Demo-only compose preset for a missing-document row */
export function missingDocumentComposeHref(item: MissingDocumentItem): string {
  if (item.linkedModule === "Gift Aid" || item.missingDocument.toLowerCase().includes("gift aid")) {
    return "/communications/compose?preset=gift-aid";
  }
  if (
    item.missingDocument.toLowerCase().includes("consent") ||
    item.missingDocument.toLowerCase().includes("emergency") ||
    item.missingDocument.toLowerCase().includes("medical")
  ) {
    return "/communications/compose?preset=missing-forms";
  }
  if (item.suggestedAction.toLowerCase().includes("fee")) {
    return "/communications/compose?preset=unpaid-fees";
  }
  return "/communications/compose?preset=missing-forms";
}

export function missingDocumentActionLabel(item: MissingDocumentItem): string {
  if (item.linkedModule === "Finance") return "Upload demo document";
  if (item.linkedModule === "Staff") return "View staff record";
  if (item.linkedModule === "Documents" || item.suggestedAction.includes("Upload")) {
    return "Assign demo document";
  }
  return "Open message draft";
}

export function missingDocumentSecondaryHref(item: MissingDocumentItem): string | null {
  if (item.linkedModule === "Finance" || item.linkedModule === "Staff") return null;
  if (missingDocumentActionLabel(item) === "Open message draft") {
    return "/documents/assignment";
  }
  return null;
}

export function missingDocumentActionHref(item: MissingDocumentItem): string {
  if (item.linkedModule === "Finance") return "/documents/upload";
  if (item.linkedModule === "Staff") return "/staff/qualifications";
  return missingDocumentComposeHref(item);
}
