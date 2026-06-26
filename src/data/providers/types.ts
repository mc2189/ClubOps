export type MemberStatus = "active" | "inactive" | "archived";
export type FinanceStatus = "paid" | "unpaid" | "partial" | "n/a";
export type GiftAidStatus = "declared" | "missing" | "expired" | "n/a";
export type ConsentStatus = "complete" | "partial" | "missing";
export type EmergencyContactCompleteness = "complete" | "partial" | "missing";

export interface ParentCarer {
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface AuthorisedPickup {
  name: string;
  notes?: string;
}

export interface MemberNote {
  id: string;
  date: string;
  author: string;
  content: string;
}

export interface MemberDocumentLink {
  id: string;
  title: string;
  category: string;
  uploadedDate: string;
}

export interface MemberFinanceSummary {
  status: FinanceStatus;
  outstandingAmount: number;
  lastPaymentDate?: string;
}

export interface MemberAttendanceSummary {
  percentage: number;
  sessionsAttended: number;
  sessionsTotal: number;
}

export interface MemberProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  classGroup: string;
  status: MemberStatus;
  joinedDate: string;
  membershipType: string;
  parentCarer: ParentCarer;
  emergencyContact: EmergencyContact;
  emergencyContactComplete: EmergencyContactCompleteness;
  authorisedPickup: AuthorisedPickup[];
  medicalSummary?: string;
  // TODO: RBAC — restrict medical/safeguarding fields to authorised roles only
  medicalNotes?: string;
  allergies: string[];
  hasMedicalFlag: boolean;
  consentStatus: ConsentStatus;
  giftAidStatus: GiftAidStatus;
  finance: MemberFinanceSummary;
  attendance: MemberAttendanceSummary;
  documents: MemberDocumentLink[];
  notes: MemberNote[];
  auditEvents: AuditEvent[];
}

export interface MemberFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  classGroup: string;
  parentCarerName: string;
  parentCarerEmail: string;
  parentCarerPhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  authorisedPickupNotes: string;
  medicalNotes: string;
  allergies: string;
  consentStatus: ConsentStatus;
  giftAidStatus: GiftAidStatus;
}

/** @deprecated Use MemberProfile — kept for backward compatibility with other modules */
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: string;
  status: MemberStatus;
  joinedDate: string;
  medicalNotes?: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  sessionName: string;
  sessionDate: string;
  memberId: string;
  memberName: string;
  present: boolean;
  mark?: AttendanceMark;
}

export type AttendanceMark = "present" | "absent" | "late" | "left-early" | "trial" | "unmarked";

export type RegisterStatus = "complete" | "incomplete" | "outstanding";

export interface SessionClass {
  id: string;
  name: string;
  day: string;
  time: string;
  venue: string;
  coach: string;
  memberIds: string[];
  sessionDate: string;
  registerStatus: RegisterStatus;
}

export interface RegisterMemberEntry {
  memberId: string;
  memberName: string;
  age: number;
  classGroup: string;
  hasMedicalFlag: boolean;
  emergencyContactComplete: EmergencyContactCompleteness;
  recentAttendanceSummary: string;
  mark: AttendanceMark;
}

export interface SessionRegister {
  sessionId: string;
  sessionName: string;
  sessionDate: string;
  entries: RegisterMemberEntry[];
  status: RegisterStatus;
  savedAt?: string;
}

export interface AbsenceAlert {
  memberId: string;
  memberName: string;
  consecutiveAbsences: number;
  lastSession: string;
}

export interface LowAttendanceMember {
  memberId: string;
  memberName: string;
  classGroup: string;
  percentage: number;
}

export interface AttendanceDashboardData {
  todaySessions: SessionClass[];
  registersCompleted: number;
  registersOutstanding: number;
  attendancePercentWeek: number;
  attendancePercentMonth: number;
  absenceAlerts: AbsenceAlert[];
  lowAttendanceMembers: LowAttendanceMember[];
}

export interface ClassAttendanceReport {
  sessionId: string;
  sessionName: string;
  averageAttendance: number;
  registersComplete: number;
  registersTotal: number;
}

export interface MemberAttendanceReport {
  memberId: string;
  memberName: string;
  classGroup: string;
  percentage: number;
  present: number;
  absent: number;
  late: number;
}

export interface AttendanceReportsData {
  byClass: ClassAttendanceReport[];
  byMember: MemberAttendanceReport[];
  repeatedAbsences: AbsenceAlert[];
  lowAttendance: LowAttendanceMember[];
  incompleteRegisters: SessionClass[];
}

export type CalendarItemType =
  | "session"
  | "competition"
  | "hall-booking"
  | "staff-rota"
  | "payment-due"
  | "gift-aid"
  | "qualification-expiry"
  | "fundraising"
  | "meeting"
  | "social";

export interface CalendarItem {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: CalendarItemType;
  module: string;
  description?: string;
}

export interface AutomationHint {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  href?: string;
  category: string;
}

export interface CalendarPageData {
  items: CalendarItem[];
  automationHints: AutomationHint[];
}

export interface FinanceTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  // TODO: RBAC — finance data restricted to treasurer/admin roles
}

export type FeeStatus = "paid" | "unpaid" | "partial" | "overdue" | "waived";
export type TransactionCategory =
  | "member fee"
  | "voluntary donation"
  | "hall hire"
  | "equipment"
  | "wages/session payment"
  | "insurance"
  | "competition fee"
  | "fundraising income"
  | "grant income"
  | "business sponsorship"
  | "refund"
  | "unknown";

export type MatchReviewStatus = "auto-matched" | "suggested" | "unmatched" | "approved" | "flagged";

export type ExpenseCategory =
  | "hall hire"
  | "equipment"
  | "insurance"
  | "wages/session payments"
  | "training/certifications"
  | "competition costs"
  | "travel"
  | "utilities/miscellaneous";

export interface FeeRecord {
  id: string;
  memberId: string;
  memberName: string;
  classGroup: string;
  monthlyFee: number;
  amountPaid: number;
  amountOutstanding: number;
  dueDate: string;
  status: FeeStatus;
  lastPaymentDate?: string;
  paymentReference?: string;
}

export interface RawBankTransaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  amount: number;
  type: "credit" | "debit";
}

export interface TransactionMatch {
  transactionId: string;
  confidence: number;
  suggestedMemberId?: string;
  suggestedMemberName?: string;
  category: TransactionCategory;
  reason: string;
  reviewStatus: MatchReviewStatus;
  warnings: string[];
}

export interface ImportReviewItem extends RawBankTransaction {
  match: TransactionMatch;
}

export interface ExpenseRecord {
  id: string;
  payee: string;
  category: ExpenseCategory;
  date: string;
  amount: number;
  receiptStatus: "received" | "missing" | "pending";
  paymentStatus: "paid" | "unpaid" | "partial";
  notes?: string;
}

export interface FinanceDashboardData {
  monthlyIncome: number;
  monthlyOutgoings: number;
  netPosition: number;
  unpaidFees: number;
  overdueFees: number;
  matchedPayments: number;
  unmatchedPayments: number;
  possibleDonations: number;
  expensesAwaitingReceipt: number;
  upcomingObligations: { label: string; amount: number; dueDate: string }[];
}

export interface FinanceReportsData {
  reports: {
    id: string;
    title: string;
    description: string;
    category: string;
  }[];
}

export interface ImportPreviewData {
  source: "csv" | "pdf";
  rawCount: number;
  normalizedTransactions: RawBankTransaction[];
}

export interface GiftAidDeclaration {
  id: string;
  memberId: string;
  memberName: string;
  declaredDate: string;
  status: "active" | "expired" | "archived";
  amountEligible: number;
}

export type DeclarationStatus =
  | "valid"
  | "missing"
  | "returned"
  | "needs-review"
  | "expired"
  | "withdrawn";

export type GiftAidEligibility = "eligible" | "not-eligible" | "needs-review";

export type DonationIncomeCategory =
  | "eligible individual donation"
  | "ineligible fees"
  | "ineligible raffle income"
  | "ineligible business donation"
  | "ineligible sponsorship"
  | "ineligible grant"
  | "needs review";

export interface GiftAidDeclarationRecord {
  id: string;
  parentCarerName: string;
  linkedMemberIds: string[];
  linkedMemberNames: string[];
  status: DeclarationStatus;
  declarationDate?: string;
  taxpayerConfirmed: boolean;
  coveredPeriod: string;
  communicationPlaceholder?: string;
  auditPlaceholder?: string;
}

export interface GiftAidDonationRecord {
  id: string;
  date: string;
  donorSource: string;
  linkedParentMember?: string;
  linkedMemberId?: string;
  amount: number;
  category: DonationIncomeCategory;
  eligibility: GiftAidEligibility;
  reason: string;
  declarationStatus: DeclarationStatus | "n/a";
  financeTransactionId?: string;
}

export interface GiftAidReviewItem {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  reviewType: string;
  eligibility: GiftAidEligibility;
  linkedMemberId?: string;
}

export interface GiftAidDashboardData {
  validDeclarations: number;
  missingDeclarations: number;
  returnedDeclarations: number;
  needsReviewDeclarations: number;
  eligibleDonationsThisMonth: number;
  ineligibleIncomeThisMonth: number;
  estimatedReclaim: number;
  claimReadyAmount: number;
  possibleMissedGiftAid: number;
  donationsRequiringReview: number;
}

export interface GiftAidClaimExportData {
  claimReadyDonations: GiftAidDonationRecord[];
  estimatedReclaim: number;
  missingDeclarations: GiftAidDeclarationRecord[];
  excludedIncome: GiftAidDonationRecord[];
  reviewExceptions: GiftAidReviewItem[];
  checklist: { label: string; complete: boolean }[];
}

export interface GiftAidPageData {
  dashboard: GiftAidDashboardData;
  declarations: GiftAidDeclarationRecord[];
  donations: GiftAidDonationRecord[];
  reviewItems: GiftAidReviewItem[];
  claimExport: GiftAidClaimExportData;
}

export interface Communication {
  id: string;
  subject: string;
  channel: "email" | "sms" | "notice";
  sentDate: string;
  recipientCount: number;
  status: "draft" | "sent" | "scheduled";
}

export interface Document {
  id: string;
  title: string;
  category: string;
  uploadedDate: string;
  uploadedBy: string;
  // Soft-delete only — never hard-delete documents in production
  archived: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "session" | "competition" | "meeting" | "social";
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  dbsExpiry?: string;
  // TODO: RBAC — safeguarding records restricted to welfare officer/admin
  status: "active" | "inactive" | "archived";
}

export interface FundraisingCampaign {
  id: string;
  name: string;
  target: number;
  raised: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "archived";
}

export interface ReportSummary {
  id: string;
  title: string;
  category: string;
  generatedDate: string;
  description: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  details: string;
}

export interface DashboardStats {
  activeMembers: number;
  sessionsThisWeek: number;
  outstandingFees: number;
  giftAidEligible: number;
  upcomingEvents: number;
  recentCommunications: number;
}

export type TaskPriority = "high" | "medium" | "low";

export interface DashboardTask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  href?: string;
  category: string;
}

export type HealthStatus = "good" | "attention" | "critical";

export interface ClubHealthMetric {
  id: string;
  label: string;
  score: number;
  status: HealthStatus;
  summary: string;
}

export interface FinanceSnapshot {
  paymentsNeedReview: number;
  unpaidFees: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netPosition: number;
}

export interface AttendanceSnapshot {
  sessionsThisWeek: number;
  averageAttendanceRate: number;
  absentWithoutNotice: number;
  nextSession: string;
}

export interface GiftAidSnapshot {
  estimatedClaim: number;
  declarationsReturned: number;
  activeDeclarations: number;
}

export interface FundraisingProgressItem {
  id: string;
  name: string;
  raised: number;
  target: number;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
}

export interface DashboardHighlights {
  upcomingEvent: string;
  complianceAlert: string;
  documentsWaiting: number;
}

export interface DashboardData {
  tasks: DashboardTask[];
  healthMetrics: ClubHealthMetric[];
  finance: FinanceSnapshot;
  attendance: AttendanceSnapshot;
  giftAid: GiftAidSnapshot;
  fundraising: FundraisingProgressItem[];
  recentActivity: AuditEvent[];
  quickActions: QuickAction[];
  highlights: DashboardHighlights;
}

export interface ClubOpsDataProvider {
  getDashboardStats(): Promise<DashboardStats>;
  getDashboardData(): Promise<DashboardData>;
  getMembers(): Promise<Member[]>;
  getMemberProfiles(): Promise<MemberProfile[]>;
  getMemberProfile(id: string): Promise<MemberProfile | null>;
  getAttendanceRecords(): Promise<AttendanceRecord[]>;
  getAttendanceDashboard(): Promise<AttendanceDashboardData>;
  getSessionClasses(): Promise<SessionClass[]>;
  getSessionRegister(sessionId: string): Promise<SessionRegister>;
  getAttendanceReports(): Promise<AttendanceReportsData>;
  getCalendarPageData(): Promise<CalendarPageData>;
  getFinanceTransactions(): Promise<FinanceTransaction[]>;
  getFinanceDashboard(): Promise<FinanceDashboardData>;
  getFeeRecords(): Promise<FeeRecord[]>;
  getExpenseRecords(): Promise<ExpenseRecord[]>;
  getImportPreview(source: "csv" | "pdf"): Promise<ImportPreviewData>;
  getFinanceReports(): Promise<FinanceReportsData>;
  getGiftAidDeclarations(): Promise<GiftAidDeclaration[]>;
  getGiftAidPageData(): Promise<GiftAidPageData>;
  getCommunications(): Promise<Communication[]>;
  getDocuments(): Promise<Document[]>;
  getCalendarEvents(): Promise<CalendarEvent[]>;
  getStaffMembers(): Promise<StaffMember[]>;
  getFundraisingCampaigns(): Promise<FundraisingCampaign[]>;
  getReportSummaries(): Promise<ReportSummary[]>;
  getAuditEvents(): Promise<AuditEvent[]>;
}
