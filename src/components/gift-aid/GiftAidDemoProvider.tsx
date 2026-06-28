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
  GiftAidPageData,
  GiftAidDeclarationRecord,
  GiftAidDonationRecord,
  GiftAidReviewItem,
  GiftAidDashboardData,
  DeclarationStatus,
  GiftAidEligibility,
  AuditEvent,
} from "@/data/providers/types";
import { GIFT_AID_RATE } from "@/data/demo/giftAid";
import { createGiftAidAuditEvent } from "@/lib/giftAid";

interface GiftAidDemoContextValue {
  dashboard: GiftAidDashboardData;
  declarations: GiftAidDeclarationRecord[];
  donations: GiftAidDonationRecord[];
  reviewItems: GiftAidReviewItem[];
  claimExport: GiftAidPageData["claimExport"];
  localAuditEvents: AuditEvent[];
  exportCompleted: boolean;
  showDeclarationPreview: boolean;
  setShowDeclarationPreview: (show: boolean) => void;
  updateDeclarationStatus: (id: string, status: DeclarationStatus) => void;
  updateDonationEligibility: (id: string, eligibility: GiftAidEligibility) => void;
  updateReviewItem: (id: string, eligibility: GiftAidEligibility) => void;
  simulateExport: () => void;
  simulateDeclarationRequest: (declarationId: string) => void;
}

const GiftAidDemoContext = createContext<GiftAidDemoContextValue | null>(null);

function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100;
}

function getLinkedDeclarationStatus(
  donation: GiftAidDonationRecord,
  declarations: GiftAidDeclarationRecord[],
): DeclarationStatus | "n/a" {
  if (donation.declarationStatus === "n/a") return "n/a";

  const declaration = declarations.find((d) => {
    if (donation.linkedParentMember && d.parentCarerName === donation.linkedParentMember) {
      return true;
    }

    return Boolean(donation.linkedMemberId && d.linkedMemberIds.includes(donation.linkedMemberId));
  });

  return declaration?.status ?? donation.declarationStatus;
}

function syncDonationDeclarationStatuses(
  donations: GiftAidDonationRecord[],
  declarations: GiftAidDeclarationRecord[],
): GiftAidDonationRecord[] {
  return donations.map((donation) => ({
    ...donation,
    declarationStatus: getLinkedDeclarationStatus(donation, declarations),
  }));
}

function buildClaimExport(
  donations: GiftAidDonationRecord[],
  declarations: GiftAidDeclarationRecord[],
  reviewItems: GiftAidReviewItem[],
  checklist: GiftAidPageData["claimExport"]["checklist"],
): GiftAidPageData["claimExport"] {
  const claimReadyDonations = donations.filter(
    (d) => d.eligibility === "eligible" && d.declarationStatus === "valid",
  );
  const reviewExceptions = reviewItems.filter((r) => r.eligibility === "needs-review");

  return {
    claimReadyDonations,
    estimatedReclaim: roundCurrency(
      claimReadyDonations.reduce((s, d) => s + d.amount, 0) * GIFT_AID_RATE,
    ),
    missingDeclarations: declarations.filter((d) => d.status === "missing"),
    excludedIncome: donations.filter((d) => d.eligibility === "not-eligible"),
    reviewExceptions,
    checklist: checklist.map((item) =>
      item.label === "Review exceptions resolved"
        ? { ...item, complete: reviewExceptions.length === 0 }
        : item,
    ),
  };
}

function updateLinkedReviewDonation(
  donations: GiftAidDonationRecord[],
  reviewItem: GiftAidReviewItem | undefined,
  eligibility: GiftAidEligibility,
): GiftAidDonationRecord[] {
  if (!reviewItem) return donations;

  return donations.map((donation) => {
    const matchesReviewItem =
      donation.amount === reviewItem.amount &&
      donation.date === reviewItem.date &&
      (!reviewItem.linkedMemberId || donation.linkedMemberId === reviewItem.linkedMemberId);

    return matchesReviewItem ? { ...donation, eligibility } : donation;
  });
}

function recalcDashboard(
  donations: GiftAidDonationRecord[],
  declarations: GiftAidDeclarationRecord[],
): GiftAidDashboardData {
  const eligibleTotal = donations
    .filter((d) => d.eligibility === "eligible")
    .reduce((s, d) => s + d.amount, 0);
  const ineligibleTotal = donations
    .filter((d) => d.eligibility === "not-eligible")
    .reduce((s, d) => s + d.amount, 0);
  const claimReady = donations
    .filter((d) => d.eligibility === "eligible" && d.declarationStatus === "valid")
    .reduce((s, d) => s + d.amount, 0);
  const missed = donations
    .filter((d) => d.eligibility === "eligible" && d.declarationStatus === "missing")
    .reduce((s, d) => s + d.amount, 0);

  return {
    validDeclarations: declarations.filter((d) => d.status === "valid").length,
    missingDeclarations: declarations.filter((d) => d.status === "missing").length,
    returnedDeclarations: declarations.filter((d) => d.status === "returned").length,
    needsReviewDeclarations: declarations.filter((d) => d.status === "needs-review").length,
    eligibleDonationsThisMonth: eligibleTotal,
    ineligibleIncomeThisMonth: ineligibleTotal,
    estimatedReclaim: roundCurrency(eligibleTotal * GIFT_AID_RATE),
    claimReadyAmount: claimReady,
    possibleMissedGiftAid: roundCurrency(missed * GIFT_AID_RATE),
    donationsRequiringReview: donations.filter((d) => d.eligibility === "needs-review").length,
  };
}

export function GiftAidDemoProvider({
  initialData,
  children,
}: {
  initialData: GiftAidPageData;
  children: ReactNode;
}) {
  const [declarations, setDeclarations] = useState(initialData.declarations);
  const [donations, setDonations] = useState(initialData.donations);
  const [reviewItems, setReviewItems] = useState(initialData.reviewItems);
  const [dashboard, setDashboard] = useState(initialData.dashboard);
  const [claimExport, setClaimExport] = useState(initialData.claimExport);
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);
  const [exportCompleted, setExportCompleted] = useState(false);
  const [showDeclarationPreview, setShowDeclarationPreview] = useState(false);

  const updateDeclarationStatus = useCallback((id: string, status: DeclarationStatus) => {
    setDeclarations((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, status } : d));
      const syncedDonations = syncDonationDeclarationStatuses(donations, updated);
      setDonations(syncedDonations);
      setDashboard(recalcDashboard(syncedDonations, updated));
      setClaimExport((ce) => buildClaimExport(syncedDonations, updated, reviewItems, ce.checklist));
      return updated;
    });
    const audit = createGiftAidAuditEvent("update", `Declaration status changed to ${status}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, [donations, reviewItems]);

  const updateDonationEligibility = useCallback((id: string, eligibility: GiftAidEligibility) => {
    setDonations((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, eligibility } : d));
      setDashboard(recalcDashboard(updated, declarations));
      setClaimExport((ce) => buildClaimExport(updated, declarations, reviewItems, ce.checklist));
      return updated;
    });
    const audit = createGiftAidAuditEvent("update", `Donation marked as ${eligibility}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, [declarations, reviewItems]);

  const updateReviewItem = useCallback((id: string, eligibility: GiftAidEligibility) => {
    const reviewItem = reviewItems.find((r) => r.id === id);
    const updatedReviewItems = reviewItems.map((r) => (r.id === id ? { ...r, eligibility } : r));
    setReviewItems(updatedReviewItems);
    setDonations((prev) => {
      const updatedDonations = updateLinkedReviewDonation(prev, reviewItem, eligibility);
      setDashboard(recalcDashboard(updatedDonations, declarations));
      setClaimExport((ce) =>
        buildClaimExport(updatedDonations, declarations, updatedReviewItems, ce.checklist),
      );
      return updatedDonations;
    });
    const audit = createGiftAidAuditEvent("review", `Review item resolved — ${eligibility}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, [declarations, reviewItems]);

  const simulateExport = useCallback(() => {
    setExportCompleted(true);
    const audit = createGiftAidAuditEvent(
      "export",
      "Gift Aid claim export generated (demo placeholder — not submitted to HMRC)",
    );
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, []);

  const simulateDeclarationRequest = useCallback((declarationId: string) => {
    setShowDeclarationPreview(true);
    const decl = declarations.find((d) => d.id === declarationId);
    const audit = createGiftAidAuditEvent(
      "create",
      `Declaration request prepared for ${decl?.parentCarerName ?? "parent/carer"} (demo — not sent)`,
    );
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, [declarations]);

  const value = useMemo(
    () => ({
      dashboard,
      declarations,
      donations,
      reviewItems,
      claimExport,
      localAuditEvents,
      exportCompleted,
      showDeclarationPreview,
      setShowDeclarationPreview,
      updateDeclarationStatus,
      updateDonationEligibility,
      updateReviewItem,
      simulateExport,
      simulateDeclarationRequest,
    }),
    [
      dashboard,
      declarations,
      donations,
      reviewItems,
      claimExport,
      localAuditEvents,
      exportCompleted,
      showDeclarationPreview,
      updateDeclarationStatus,
      updateDonationEligibility,
      updateReviewItem,
      simulateExport,
      simulateDeclarationRequest,
    ],
  );

  return (
    <GiftAidDemoContext.Provider value={value}>{children}</GiftAidDemoContext.Provider>
  );
}

export function useGiftAidDemo() {
  const ctx = useContext(GiftAidDemoContext);
  if (!ctx) throw new Error("useGiftAidDemo must be used within GiftAidDemoProvider");
  return ctx;
}
