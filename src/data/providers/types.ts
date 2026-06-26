export type MemberStatus = "active" | "inactive" | "archived";
export type FinanceStatus = "paid" | "unpaid" | "partial" | "overdue" | "n/a";
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

export type MessageStatus = "draft" | "sent" | "scheduled" | "simulated";
export type InboxResponseStatus = "auto-filed" | "needs-review" | "unresolved";
export type FormStatus = "active" | "draft" | "archived";

export interface RecipientGroup {
  id: string;
  name: string;
  description: string;
  recipientCount: number;
  sourceModule: string;
  exampleRecipients: string[];
  lastContacted?: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  linkedFormId?: string;
}

export interface DemoForm {
  id: string;
  name: string;
  purpose: string;
  linkedModule: string;
  status: FormStatus;
  lastSent?: string;
  responsesReceived: number;
  responsesNeedingReview: number;
}

export interface InboxResponse {
  id: string;
  sender: string;
  subject: string;
  detectedType: string;
  matchedRecord: string;
  matchedMemberId?: string;
  confidence: number;
  suggestedAction: string;
  status: InboxResponseStatus;
  linkedModule: string;
}

export interface MessageHistoryRecord {
  id: string;
  dateTime: string;
  sender: string;
  recipientGroup: string;
  subject: string;
  templateUsed?: string;
  formsAttached?: string[];
  status: MessageStatus;
  linkedModule: string;
  auditReference?: string;
}

export interface RoutingRule {
  id: string;
  condition: string;
  action: string;
  priority: number;
}

export interface CommunicationsDashboardData {
  draftCount: number;
  sentCount: number;
  pendingFormResponses: number;
  repliesNeedingReview: number;
  bouncedPlaceholder: number;
  giftAidCampaignPending: boolean;
  unpaidFeeCampaignPending: boolean;
  upcomingCompetitionMessage: string;
}

export interface CommunicationsPageData {
  dashboard: CommunicationsDashboardData;
  groups: RecipientGroup[];
  templates: MessageTemplate[];
  forms: DemoForm[];
  inbox: InboxResponse[];
  history: MessageHistoryRecord[];
  rules: RoutingRule[];
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

export type DocumentCategory =
  | "medical form"
  | "emergency contact form"
  | "consent form"
  | "Gift Aid declaration"
  | "bank statement"
  | "receipt"
  | "invoice"
  | "coach qualification"
  | "safeguarding note"
  | "progress/skill note"
  | "incident/injury note"
  | "parent communication"
  | "sponsor document"
  | "general note";

export type DocumentAssignmentStatus = "assigned" | "unassigned" | "needs-review" | "archived";
export type SensitivityLevel = "normal" | "sensitive" | "restricted";
export type LinkedRecordType =
  | "member"
  | "parent-carer"
  | "staff"
  | "finance"
  | "gift-aid"
  | "sponsor"
  | "event";

export interface ClubDocumentRecord {
  id: string;
  fileName: string;
  title: string;
  category: DocumentCategory;
  fileType: string;
  uploadedDate: string;
  uploadedBy: string;
  status: DocumentAssignmentStatus;
  sensitivity: SensitivityLevel;
  linkedRecordType?: LinkedRecordType;
  linkedRecordName?: string;
  linkedModule?: string;
  extractedPreview?: string;
  archived: boolean;
  auditReference?: string;
}

export interface UnassignedDocumentItem {
  id: string;
  fileName: string;
  suggestedCategory: DocumentCategory;
  suggestedLinkedRecord: string;
  suggestedRecordType: LinkedRecordType;
  confidence: number;
  matchReason: string;
  sensitivity: SensitivityLevel;
}

export type ScannedNoteType =
  | "progress note"
  | "skill assessment"
  | "injury/incident"
  | "welfare/behaviour"
  | "safeguarding concern"
  | "parent communication"
  | "general note";

export interface ScannedNoteItem {
  id: string;
  fileName: string;
  scannedDate: string;
  suggestedMember: string;
  suggestedMemberId?: string;
  suggestedNoteType: ScannedNoteType;
  extractedPreview: string;
  status: "pending" | "assigned" | "needs-review";
  coach?: string;
}

export interface MissingDocumentItem {
  id: string;
  linkedPerson: string;
  missingDocument: string;
  priority: "high" | "medium" | "low";
  linkedModule: string;
  suggestedAction: string;
}

export interface DocumentActivityItem {
  id: string;
  timestamp: string;
  action: string;
  documentTitle: string;
  actor: string;
}

export interface DocumentRoutingRule {
  id: string;
  condition: string;
  action: string;
  priority: number;
}

export interface DemoUploadExample {
  id: string;
  fileName: string;
  fileType: string;
  title: string;
  extractedText: string;
  suggestedCategory: DocumentCategory;
  suggestedLinkedRecord: string;
  suggestedRecordType: LinkedRecordType;
  suggestedModule: string;
  confidence: number;
  sensitivity: SensitivityLevel;
}

export interface DocumentsDashboardData {
  totalDocuments: number;
  unassignedDocuments: number;
  sensitiveDocuments: number;
  awaitingReview: number;
  missingForms: number;
  archivedDocuments: number;
  scannedNotesPending: number;
}

export interface DocumentsPageData {
  dashboard: DocumentsDashboardData;
  documents: ClubDocumentRecord[];
  unassigned: UnassignedDocumentItem[];
  scannedNotes: ScannedNoteItem[];
  missing: MissingDocumentItem[];
  activities: DocumentActivityItem[];
  rules: DocumentRoutingRule[];
  uploadExamples: DemoUploadExample[];
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

export type StaffType =
  | "coach"
  | "assistant coach"
  | "volunteer"
  | "committee member"
  | "safeguarding officer"
  | "treasurer"
  | "secretary";

export type QualificationStatus = "valid" | "expiring soon" | "expired" | "missing" | "needs review";
export type ComplianceStatus = "valid" | "expiring soon" | "expired" | "missing" | "needs review";
export type StaffPaymentStatus = "paid" | "unpaid" | "partial" | "pending";
export type AlertSeverity = "high" | "medium" | "low";
export type AlertStatus = "open" | "in-progress" | "resolved";

export interface StaffQualification {
  id: string;
  name: string;
  issueDate?: string;
  expiryDate?: string;
  status: QualificationStatus;
  documentLink?: string;
}

export interface StaffProfileRecord {
  id: string;
  name: string;
  role: string;
  staffType: StaffType;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "archived";
  assignedSessions: string[];
  availability: string;
  qualifications: StaffQualification[];
  dbsStatus: ComplianceStatus;
  dbsExpiry?: string;
  safeguardingStatus: ComplianceStatus;
  firstAidStatus: ComplianceStatus;
  documentsLinked: string[];
  notes?: string;
  sessionRate?: number;
  recentActivity?: string;
}

export interface QualificationRecord {
  id: string;
  qualificationName: string;
  person: string;
  staffId: string;
  status: QualificationStatus;
  issueDate?: string;
  expiryDate?: string;
  daysRemaining?: number;
  documentLink?: string;
  actionRequired?: string;
}

export interface RotaEntry {
  id: string;
  sessionName: string;
  date: string;
  time: string;
  venue: string;
  assignedStaff: string[];
  gaps: string[];
  hasConflict: boolean;
  suggestedAction?: string;
  confirmed: boolean;
}

export interface WagePrepRecord {
  id: string;
  staffName: string;
  staffId: string;
  sessionsWorked: number;
  rate: number;
  totalDue: number;
  expensesPlaceholder?: number;
  paymentStatus: StaffPaymentStatus;
}

export interface VenueRecord {
  id: string;
  name: string;
  address: string;
  contact: string;
  hireRate: number;
  recurringPattern: string;
  linkedCalendarItems: string[];
  monthlyEstimatedCost: number;
  paymentStatus: StaffPaymentStatus;
  notes?: string;
}

export type OutgoingCategory =
  | "hall hire"
  | "equipment"
  | "insurance"
  | "training/certifications"
  | "competition fees"
  | "travel"
  | "utilities/miscellaneous"
  | "wage/session payments";

export interface OutgoingRecord {
  id: string;
  payee: string;
  category: OutgoingCategory;
  amount: number;
  dueDate: string;
  paymentStatus: StaffPaymentStatus;
  receiptPlaceholder?: string;
  financeLinkPlaceholder?: string;
  priority: "high" | "medium" | "low";
  notes?: string;
  missingReceipt?: boolean;
}

export interface StaffAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  linkedRecord: string;
  linkedModule: string;
  suggestedAction: string;
  dueDate?: string;
  status: AlertStatus;
}

export interface StaffDashboardData {
  activeCoaches: number;
  activeVolunteers: number;
  committeeAdminPlaceholder: number;
  qualificationsExpiringSoon: number;
  dbsReviewDue: number;
  sessionsNeedingStaff: number;
  wagePrepTotalThisMonth: number;
  outgoingsDueThisMonth: number;
  venueBookingsThisWeek: number;
}

export interface StaffPageData {
  dashboard: StaffDashboardData;
  staff: StaffProfileRecord[];
  qualifications: QualificationRecord[];
  rota: RotaEntry[];
  wages: WagePrepRecord[];
  venues: VenueRecord[];
  outgoings: OutgoingRecord[];
  alerts: StaffAlert[];
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

export type DonorType =
  | "individual"
  | "parent/carer"
  | "business"
  | "sponsor"
  | "grant/funder"
  | "anonymous/community";

export type BusinessLeadStatus =
  | "not contacted"
  | "contacted"
  | "interested"
  | "pledged"
  | "donated"
  | "declined"
  | "renewal due";

export type DonationCategory =
  | "individual voluntary donation"
  | "parent/supporter donation"
  | "business donation"
  | "sponsorship"
  | "grant"
  | "fundraising event income"
  | "raffle income"
  | "anonymous/community collection"
  | "equipment-specific donation";

export type FundraisingThankYouStatus = "sent" | "needed" | "pending";
export type FollowUpTaskStatus = "open" | "completed" | "overdue";

export type FollowUpTaskType =
  | "first contact"
  | "chase reply"
  | "confirm pledge"
  | "collect donation"
  | "send thank-you"
  | "request logo"
  | "renew sponsorship"
  | "send update"
  | "invite to event";

export interface FundraisingCampaignDetail extends FundraisingCampaign {
  purpose: string;
  linkedDonationIds: string[];
  linkedSponsorNames: string[];
  documentsPlaceholder: string[];
  communicationsPlaceholder: string[];
  recentActivity: string[];
}

export interface DonorRecord {
  id: string;
  name: string;
  donorType: DonorType;
  totalDonated: number;
  lastDonationDate?: string;
  giftAidStatus?: string;
  linkedCampaign?: string;
  thankYouStatus: FundraisingThankYouStatus;
  followUpStatus: string;
}

export interface BusinessLead {
  id: string;
  businessName: string;
  contactPerson?: string;
  contactPlaceholder: string;
  sector: string;
  status: BusinessLeadStatus;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  potentialAmount?: number;
  pledgedAmount?: number;
  receivedAmount?: number;
  sponsorshipTier?: string;
  notes?: string;
  suggestedNextAction?: string;
}

export interface SponsorshipTier {
  id: string;
  name: string;
  suggestedAmount: number;
  benefitsPlaceholder: string;
  currentSponsors: string[];
  renewalPeriod: string;
  nextRenewalDate?: string;
  acknowledgementStatus: FundraisingThankYouStatus;
}

export interface FundraisingDonationRecord {
  id: string;
  date: string;
  donor: string;
  amount: number;
  campaign: string;
  campaignId: string;
  donationType: DonationCategory;
  paymentStatus: "received" | "pledged" | "pending";
  giftAidEligibility: "eligible" | "not-eligible" | "needs-review";
  giftAidDeclarationStatus?: string;
  thankYouStatus: FundraisingThankYouStatus;
  financeLinkPlaceholder?: string;
  giftAidLinkPlaceholder?: string;
}

export interface FollowUpTask {
  id: string;
  donorOrBusiness: string;
  taskType: FollowUpTaskType;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: FollowUpTaskStatus;
  linkedCampaign?: string;
  suggestedAction: string;
}

export interface FundraisingReportItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface FundraisingActivityItem {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  actor: string;
}

export interface FundraisingDashboardData {
  raisedThisMonth: number;
  raisedThisYear: number;
  activeCampaigns: number;
  businessesContacted: number;
  pledgesOutstanding: number;
  followUpsDue: number;
  thankYouOutstanding: number;
  potentialGiftAid: number;
  sponsorshipRenewalsDue: number;
}

export interface FundraisingPageData {
  dashboard: FundraisingDashboardData;
  campaigns: FundraisingCampaignDetail[];
  donors: DonorRecord[];
  businesses: BusinessLead[];
  sponsorships: SponsorshipTier[];
  donations: FundraisingDonationRecord[];
  followUps: FollowUpTask[];
  reports: FundraisingReportItem[];
}

export interface ReportSummary {
  id: string;
  title: string;
  category: string;
  generatedDate: string;
  description: string;
}

export interface ReportCard {
  id: string;
  name: string;
  purpose: string;
  linkedModules: string[];
  lastGenerated?: string;
  exportStatus: "ready" | "never" | "demo";
  sensitivity: "normal" | "sensitive" | "restricted";
  category: string;
  href?: string;
}

export interface ExportPackItem {
  id: string;
  name: string;
  description: string;
  sensitivity: "normal" | "sensitive" | "restricted";
}

export interface FinancePackData {
  incomeThisMonth: number;
  incomeThisYear: number;
  outgoingsThisMonth: number;
  outgoingsThisYear: number;
  netPosition: number;
  unpaidFees: number;
  matchedTransactions: number;
  unmatchedTransactions: number;
  possibleDonations: number;
  expensesMissingReceipts: number;
  wagePrepTotal: number;
  hallHireOutgoings: number;
}

export interface CommitteePackData {
  clubHealthScore: number;
  activeMembers: number;
  averageAttendance: number;
  netFinancePosition: number;
  fundraisingRaised: number;
  giftAidOpportunity: number;
  staffAlerts: number;
  missingDocuments: number;
  upcomingEvents: number;
  actionsNeedingAttention: string[];
}

export interface GiftAidPackData {
  validDeclarations: number;
  missingDeclarations: number;
  claimReadyAmount: number;
  excludedIncome: number;
  donationsNeedingReview: number;
  estimatedReclaim: number;
  complianceWarnings: string[];
}

export interface MemberPackData {
  activeMembers: number;
  inactiveMembers: number;
  incompleteEmergencyContacts: number;
  missingConsent: number;
  medicalFlags: number;
  attendanceConcerns: number;
  unpaidFees: number;
  documentsMissing: number;
}

export interface DemoScriptStep {
  step: number;
  title: string;
  href: string;
  whatToClick: string;
  whatToSay: string;
  problemSolved: string;
  emphasis: string;
  secondaryHref?: string;
  secondaryLinkLabel?: string;
}

export interface ReportsAuditPageData {
  reportCards: ReportCard[];
  auditEvents: AuditEvent[];
  exportPackItems: ExportPackItem[];
  financePack: FinancePackData;
  committeePack: CommitteePackData;
  giftAidPack: GiftAidPackData;
  memberPack: MemberPackData;
  clubHealth: ClubHealthMetric[];
  demoScript: DemoScriptStep[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  details: string;
  module?: string;
  affectedRecord?: string;
  riskLevel?: "normal" | "sensitive" | "restricted";
  status?: "recorded" | "needs-review" | "flagged";
  linkedHref?: string;
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
  suggestedAction?: string;
  linkedModule?: string;
  linkedHref?: string;
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
  href?: string;
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
  getCommunicationsPageData(): Promise<CommunicationsPageData>;
  getDocuments(): Promise<Document[]>;
  getDocumentsPageData(): Promise<DocumentsPageData>;
  getCalendarEvents(): Promise<CalendarEvent[]>;
  getStaffMembers(): Promise<StaffMember[]>;
  getStaffPageData(): Promise<StaffPageData>;
  getStaffProfile(id: string): Promise<StaffProfileRecord | null>;
  getFundraisingCampaigns(): Promise<FundraisingCampaign[]>;
  getFundraisingPageData(): Promise<FundraisingPageData>;
  getFundraisingCampaign(id: string): Promise<FundraisingCampaignDetail | null>;
  getReportSummaries(): Promise<ReportSummary[]>;
  getAuditEvents(): Promise<AuditEvent[]>;
  getReportsAuditPageData(): Promise<ReportsAuditPageData>;
}
