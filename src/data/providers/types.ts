export type MemberStatus = "active" | "inactive" | "archived";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: string;
  status: MemberStatus;
  joinedDate: string;
  // TODO: RBAC — restrict medical/safeguarding fields to authorised roles only
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

export interface GiftAidDeclaration {
  id: string;
  memberId: string;
  memberName: string;
  declaredDate: string;
  status: "active" | "expired" | "archived";
  amountEligible: number;
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
  getAttendanceRecords(): Promise<AttendanceRecord[]>;
  getFinanceTransactions(): Promise<FinanceTransaction[]>;
  getGiftAidDeclarations(): Promise<GiftAidDeclaration[]>;
  getCommunications(): Promise<Communication[]>;
  getDocuments(): Promise<Document[]>;
  getCalendarEvents(): Promise<CalendarEvent[]>;
  getStaffMembers(): Promise<StaffMember[]>;
  getFundraisingCampaigns(): Promise<FundraisingCampaign[]>;
  getReportSummaries(): Promise<ReportSummary[]>;
  getAuditEvents(): Promise<AuditEvent[]>;
}
