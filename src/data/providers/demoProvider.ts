import type { ClubOpsDataProvider } from "@/data/providers/types";
import { demoMembers, demoMemberProfiles } from "@/data/demo/members";
import { demoAttendance } from "@/data/demo/attendance";
import {
  demoAttendanceDashboard,
  demoAttendanceReports,
  buildSessionRegister,
  demoCompletedRegisterMarks,
} from "@/data/demo/attendanceData";
import { demoSessions } from "@/data/demo/sessions";
import { demoFinance } from "@/data/demo/finance";
import {
  demoFinanceDashboard,
  demoExpenses,
  demoFinanceReports,
  getImportPreview,
} from "@/data/demo/financeData";
import { demoFeeRecords } from "@/data/demo/fees";
import { demoGiftAid, demoGiftAidPageData } from "@/data/demo/giftAid";
import { demoCommunications, demoCommunicationsPageData } from "@/data/demo/communicationsData";
import { demoDocuments, demoDocumentsPageData } from "@/data/demo/documentsData";
import { demoCalendarEvents, demoCalendarPageData } from "@/data/demo/calendar";
import { demoStaff, demoStaffPageData, getStaffProfileById } from "@/data/demo/staffData";
import { demoFundraising } from "@/data/demo/fundraising";
import { demoReports } from "@/data/demo/reports";
import { demoAuditEvents } from "@/data/demo/audit";
import { demoDashboardData } from "@/data/demo/dashboard";

async function simulateDelay<T>(data: T): Promise<T> {
  return data;
}

export const demoProvider: ClubOpsDataProvider = {
  async getDashboardStats() {
    return simulateDelay({
      activeMembers: demoMembers.filter((m) => m.status === "active").length,
      sessionsThisWeek: demoDashboardData.attendance.sessionsThisWeek,
      outstandingFees: demoDashboardData.finance.unpaidFees * 45.71,
      giftAidEligible: demoDashboardData.giftAid.estimatedClaim,
      upcomingEvents: demoCalendarEvents.filter(
        (e) => new Date(e.date) >= new Date("2026-06-26"),
      ).length,
      recentCommunications: demoCommunications.filter((c) => c.status === "sent").length,
    });
  },

  async getDashboardData() {
    return simulateDelay(demoDashboardData);
  },

  async getMembers() {
    return simulateDelay(demoMembers);
  },

  async getMemberProfiles() {
    return simulateDelay(demoMemberProfiles);
  },

  async getMemberProfile(id: string) {
    const profile = demoMemberProfiles.find((p) => p.id === id) ?? null;
    return simulateDelay(profile);
  },

  async getAttendanceRecords() {
    return simulateDelay(demoAttendance);
  },

  async getAttendanceDashboard() {
    return simulateDelay(demoAttendanceDashboard);
  },

  async getSessionClasses() {
    return simulateDelay(demoSessions);
  },

  async getSessionRegister(sessionId: string) {
    const marks = demoCompletedRegisterMarks[sessionId];
    return simulateDelay(buildSessionRegister(sessionId, marks));
  },

  async getAttendanceReports() {
    return simulateDelay(demoAttendanceReports);
  },

  async getCalendarPageData() {
    return simulateDelay(demoCalendarPageData);
  },

  async getFinanceTransactions() {
    return simulateDelay(demoFinance);
  },

  async getFinanceDashboard() {
    return simulateDelay(demoFinanceDashboard);
  },

  async getFeeRecords() {
    return simulateDelay(demoFeeRecords);
  },

  async getExpenseRecords() {
    return simulateDelay(demoExpenses);
  },

  async getImportPreview(source: "csv" | "pdf") {
    return simulateDelay(getImportPreview(source));
  },

  async getFinanceReports() {
    return simulateDelay(demoFinanceReports);
  },

  async getGiftAidDeclarations() {
    return simulateDelay(demoGiftAid);
  },

  async getGiftAidPageData() {
    return simulateDelay(demoGiftAidPageData);
  },

  async getCommunications() {
    return simulateDelay(demoCommunications);
  },

  async getCommunicationsPageData() {
    return simulateDelay(demoCommunicationsPageData);
  },

  async getDocuments() {
    return simulateDelay(demoDocuments.filter((d) => !d.archived));
  },

  async getDocumentsPageData() {
    return simulateDelay(demoDocumentsPageData);
  },

  async getCalendarEvents() {
    return simulateDelay(demoCalendarEvents);
  },

  async getStaffMembers() {
    return simulateDelay(demoStaff);
  },

  async getStaffPageData() {
    return simulateDelay(demoStaffPageData);
  },

  async getStaffProfile(id: string) {
    return simulateDelay(getStaffProfileById(id));
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
