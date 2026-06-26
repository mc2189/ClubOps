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
  BusinessLead,
  BusinessLeadStatus,
  FollowUpTask,
  FundraisingDashboardData,
  FundraisingDonationRecord,
  FundraisingPageData,
  FundraisingThankYouStatus,
  DonationCategory,
} from "@/data/providers/types";
import { createFundraisingAuditEvent } from "@/lib/fundraising";

interface AddDonationPayload {
  donor: string;
  amount: number;
  campaignId: string;
  campaign: string;
  donationType: DonationCategory;
}

interface FundraisingDemoContextValue {
  dashboard: FundraisingDashboardData;
  campaigns: FundraisingPageData["campaigns"];
  donors: FundraisingPageData["donors"];
  businesses: BusinessLead[];
  sponsorships: FundraisingPageData["sponsorships"];
  donations: FundraisingDonationRecord[];
  followUps: FollowUpTask[];
  reports: FundraisingPageData["reports"];
  localAuditEvents: AuditEvent[];
  reportExportDone: boolean;
  updateBusinessStatus: (id: string, status: BusinessLeadStatus) => void;
  recordPledge: (id: string, amount: number) => void;
  recordDonation: (id: string, amount: number) => void;
  scheduleFollowUp: (id: string, date: string) => void;
  markThankYouSent: (id: string, type: "donor" | "business") => void;
  addDonation: (payload: AddDonationPayload) => void;
  completeFollowUp: (id: string) => void;
  rescheduleFollowUp: (id: string, date: string) => void;
  simulateReportExport: (reportTitle: string) => void;
}

const FundraisingDemoContext = createContext<FundraisingDemoContextValue | null>(null);

function recalcDashboard(
  base: FundraisingDashboardData,
  businesses: BusinessLead[],
  followUps: FollowUpTask[],
  donations: FundraisingDonationRecord[],
  donors: FundraisingPageData["donors"],
): FundraisingDashboardData {
  const eligible = donations.filter((d) => d.giftAidEligibility === "eligible");
  const potentialGiftAid = eligible.reduce((s, d) => s + d.amount * 0.25, 0);
  return {
    ...base,
    businessesContacted: businesses.filter((b) => b.status !== "not contacted").length,
    pledgesOutstanding: businesses.filter((b) => b.status === "pledged").length,
    followUpsDue: followUps.filter((f) => f.status !== "completed").length,
    thankYouOutstanding: donors.filter((d) => d.thankYouStatus === "needed" || d.thankYouStatus === "pending").length,
    potentialGiftAid: Math.round(potentialGiftAid * 100) / 100,
    sponsorshipRenewalsDue: businesses.filter((b) => b.status === "renewal due").length,
    raisedThisMonth: donations.filter((d) => d.date.startsWith("2026-06") && d.paymentStatus === "received").reduce((s, d) => s + d.amount, 0) || base.raisedThisMonth,
  };
}

export function FundraisingDemoProvider({
  initialData,
  children,
}: {
  initialData: FundraisingPageData;
  children: ReactNode;
}) {
  const [businesses, setBusinesses] = useState<BusinessLead[]>(initialData.businesses);
  const [donations, setDonations] = useState<FundraisingDonationRecord[]>(initialData.donations);
  const [followUps, setFollowUps] = useState<FollowUpTask[]>(initialData.followUps);
  const [donors, setDonors] = useState(initialData.donors);
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);
  const [reportExportDone, setReportExportDone] = useState(false);

  const addAudit = useCallback((action: string, details: string) => {
    const audit = createFundraisingAuditEvent(action, details);
    setLocalAuditEvents((prev) => [audit, ...prev]);
    return audit;
  }, []);

  const dashboard = useMemo(
    () => recalcDashboard(initialData.dashboard, businesses, followUps, donations, donors),
    [initialData.dashboard, businesses, followUps, donations, donors],
  );

  const updateBusinessStatus = useCallback(
    (id: string, status: BusinessLeadStatus) => {
      setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      addAudit("Business status changed", status);
    },
    [addAudit],
  );

  const recordPledge = useCallback(
    (id: string, amount: number) => {
      setBusinesses((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "pledged" as BusinessLeadStatus, pledgedAmount: amount } : b)),
      );
      addAudit("Sponsorship pledge recorded", `£${amount}`);
    },
    [addAudit],
  );

  const recordDonation = useCallback(
    (id: string, amount: number) => {
      setBusinesses((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "donated" as BusinessLeadStatus, receivedAmount: amount } : b,
        ),
      );
      addAudit("Donation recorded", `£${amount}`);
    },
    [addAudit],
  );

  const scheduleFollowUp = useCallback(
    (id: string, date: string) => {
      setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, nextFollowUpDate: date } : b)));
      addAudit("Follow-up scheduled", date);
    },
    [addAudit],
  );

  const markThankYouSent = useCallback(
    (id: string, type: "donor" | "business") => {
      if (type === "donor") {
        setDonors((prev) => prev.map((d) => (d.id === id ? { ...d, thankYouStatus: "sent" as FundraisingThankYouStatus } : d)));
      }
      setDonations((prev) =>
        prev.map((d) => (d.donor === id || d.id === id ? { ...d, thankYouStatus: "sent" as FundraisingThankYouStatus } : d)),
      );
      addAudit("Thank-you marked sent", id);
    },
    [addAudit],
  );

  const addDonation = useCallback(
    (payload: AddDonationPayload) => {
      const isBusiness = payload.donationType.includes("business") || payload.donationType === "sponsorship";
      const newDonation: FundraisingDonationRecord = {
        id: `don-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        donor: payload.donor,
        amount: payload.amount,
        campaign: payload.campaign,
        campaignId: payload.campaignId,
        donationType: payload.donationType,
        paymentStatus: "received",
        giftAidEligibility: isBusiness || payload.donationType === "raffle income" || payload.donationType === "grant" ? "not-eligible" : "eligible",
        thankYouStatus: "needed",
        financeLinkPlaceholder: "Finance — Demo donation",
      };
      setDonations((prev) => [newDonation, ...prev]);
      addAudit("Donation recorded", `${payload.donor} — £${payload.amount}`);
    },
    [addAudit],
  );

  const completeFollowUp = useCallback(
    (id: string) => {
      setFollowUps((prev) => prev.map((f) => (f.id === id ? { ...f, status: "completed" as const } : f)));
      addAudit("Follow-up completed", id);
    },
    [addAudit],
  );

  const rescheduleFollowUp = useCallback(
    (id: string, date: string) => {
      setFollowUps((prev) => prev.map((f) => (f.id === id ? { ...f, dueDate: date } : f)));
      addAudit("Follow-up rescheduled", date);
    },
    [addAudit],
  );

  const simulateReportExport = useCallback(
    (reportTitle: string) => {
      setReportExportDone(true);
      addAudit("Report exported (demo)", reportTitle);
    },
    [addAudit],
  );

  const value = useMemo(
    () => ({
      dashboard,
      campaigns: initialData.campaigns,
      donors,
      businesses,
      sponsorships: initialData.sponsorships,
      donations,
      followUps,
      reports: initialData.reports,
      localAuditEvents,
      reportExportDone,
      updateBusinessStatus,
      recordPledge,
      recordDonation,
      scheduleFollowUp,
      markThankYouSent,
      addDonation,
      completeFollowUp,
      rescheduleFollowUp,
      simulateReportExport,
    }),
    [
      dashboard,
      initialData,
      donors,
      businesses,
      donations,
      followUps,
      localAuditEvents,
      reportExportDone,
      updateBusinessStatus,
      recordPledge,
      recordDonation,
      scheduleFollowUp,
      markThankYouSent,
      addDonation,
      completeFollowUp,
      rescheduleFollowUp,
      simulateReportExport,
    ],
  );

  return (
    <FundraisingDemoContext.Provider value={value}>{children}</FundraisingDemoContext.Provider>
  );
}

export function useFundraisingDemo() {
  const ctx = useContext(FundraisingDemoContext);
  if (!ctx) throw new Error("useFundraisingDemo must be used within FundraisingDemoProvider");
  return ctx;
}
