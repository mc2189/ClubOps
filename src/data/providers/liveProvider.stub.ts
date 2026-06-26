/**
 * Future live provider placeholder — NOT IMPLEMENTED.
 *
 * Do not use this provider in production or with real data.
 * The public demo must always use demoProvider from index.ts.
 *
 * When implementing live mode:
 * 1. Add authentication and server-side session validation
 * 2. Enforce RBAC on every method — never trust client role switcher
 * 3. Use a relational database with tenant/club isolation
 * 4. Persist audit events append-only
 * 5. Use secure object storage for files — never serve from public paths
 * 6. Keep demoProvider available for training/demo deployments
 *
 * @see PROVIDER_CONTRACTS.md
 * @see LIVE_MODE_PLAN.md
 * @see MIGRATION_PLAN.md
 */

import type { ClubOpsDataProvider } from "@/data/providers/types";

function notImplemented(method: string): never {
  throw new Error(
    `[liveProvider] ${method} is not implemented. ` +
      "ClubOps is running in demo mode. See LIVE_MODE_PLAN.md for migration steps.",
  );
}

/** Future live provider placeholder — not implemented. Public demo uses demoProvider. */
export const liveProvider: ClubOpsDataProvider = {
  getDashboardStats: async () => notImplemented("getDashboardStats"),
  getDashboardData: async () => notImplemented("getDashboardData"),
  getMembers: async () => notImplemented("getMembers"),
  getMemberProfiles: async () => notImplemented("getMemberProfiles"),
  getMemberProfile: async () => notImplemented("getMemberProfile"),
  getAttendanceRecords: async () => notImplemented("getAttendanceRecords"),
  getAttendanceDashboard: async () => notImplemented("getAttendanceDashboard"),
  getSessionClasses: async () => notImplemented("getSessionClasses"),
  getSessionRegister: async () => notImplemented("getSessionRegister"),
  getAttendanceReports: async () => notImplemented("getAttendanceReports"),
  getCalendarPageData: async () => notImplemented("getCalendarPageData"),
  getFinanceTransactions: async () => notImplemented("getFinanceTransactions"),
  getFinanceDashboard: async () => notImplemented("getFinanceDashboard"),
  getFeeRecords: async () => notImplemented("getFeeRecords"),
  getExpenseRecords: async () => notImplemented("getExpenseRecords"),
  getImportPreview: async () => notImplemented("getImportPreview"),
  getFinanceReports: async () => notImplemented("getFinanceReports"),
  getGiftAidDeclarations: async () => notImplemented("getGiftAidDeclarations"),
  getGiftAidPageData: async () => notImplemented("getGiftAidPageData"),
  getCommunications: async () => notImplemented("getCommunications"),
  getCommunicationsPageData: async () => notImplemented("getCommunicationsPageData"),
  getDocuments: async () => notImplemented("getDocuments"),
  getDocumentsPageData: async () => notImplemented("getDocumentsPageData"),
  getCalendarEvents: async () => notImplemented("getCalendarEvents"),
  getStaffMembers: async () => notImplemented("getStaffMembers"),
  getStaffPageData: async () => notImplemented("getStaffPageData"),
  getStaffProfile: async () => notImplemented("getStaffProfile"),
  getFundraisingCampaigns: async () => notImplemented("getFundraisingCampaigns"),
  getFundraisingPageData: async () => notImplemented("getFundraisingPageData"),
  getFundraisingCampaign: async () => notImplemented("getFundraisingCampaign"),
  getReportSummaries: async () => notImplemented("getReportSummaries"),
  getAuditEvents: async () => notImplemented("getAuditEvents"),
  getReportsAuditPageData: async () => notImplemented("getReportsAuditPageData"),
};
