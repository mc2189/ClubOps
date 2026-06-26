import type { ClubOpsDataProvider } from "@/data/providers/types";
import { demoMembers } from "@/data/demo/members";
import { demoAttendance } from "@/data/demo/attendance";
import { demoFinance } from "@/data/demo/finance";
import { demoGiftAid } from "@/data/demo/giftAid";
import { demoCommunications } from "@/data/demo/communications";
import { demoDocuments } from "@/data/demo/documents";
import { demoCalendarEvents } from "@/data/demo/calendar";
import { demoStaff } from "@/data/demo/staff";
import { demoFundraising } from "@/data/demo/fundraising";
import { demoReports } from "@/data/demo/reports";
import { demoAuditEvents } from "@/data/demo/audit";

async function simulateDelay<T>(data: T): Promise<T> {
  return data;
}

export const demoProvider: ClubOpsDataProvider = {
  async getDashboardStats() {
    return simulateDelay({
      activeMembers: demoMembers.filter((m) => m.status === "active").length,
      sessionsThisWeek: 4,
      outstandingFees: 320.0,
      giftAidEligible: demoGiftAid
        .filter((g) => g.status === "active")
        .reduce((sum, g) => sum + g.amountEligible, 0),
      upcomingEvents: demoCalendarEvents.filter(
        (e) => new Date(e.date) >= new Date("2026-06-26"),
      ).length,
      recentCommunications: demoCommunications.filter((c) => c.status === "sent").length,
    });
  },

  async getMembers() {
    return simulateDelay(demoMembers);
  },

  async getAttendanceRecords() {
    return simulateDelay(demoAttendance);
  },

  async getFinanceTransactions() {
    return simulateDelay(demoFinance);
  },

  async getGiftAidDeclarations() {
    return simulateDelay(demoGiftAid);
  },

  async getCommunications() {
    return simulateDelay(demoCommunications);
  },

  async getDocuments() {
    return simulateDelay(demoDocuments.filter((d) => !d.archived));
  },

  async getCalendarEvents() {
    return simulateDelay(demoCalendarEvents);
  },

  async getStaffMembers() {
    return simulateDelay(demoStaff);
  },

  async getFundraisingCampaigns() {
    return simulateDelay(demoFundraising);
  },

  async getReportSummaries() {
    return simulateDelay(demoReports);
  },

  async getAuditEvents() {
    return simulateDelay(demoAuditEvents);
  },
};
