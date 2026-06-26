import type {
  DashboardData,
  DashboardTask,
  ClubHealthMetric,
  FinanceSnapshot,
  AttendanceSnapshot,
  GiftAidSnapshot,
  FundraisingProgressItem,
  QuickAction,
  DashboardHighlights,
} from "@/data/providers/types";
import { demoAuditEvents } from "@/data/demo/audit";
import { DEMO_OUTSTANDING_FEE_COUNT } from "@/data/demo/fees";

export const demoDashboardTasks: DashboardTask[] = [
  {
    id: "task-001",
    title: "4 payments need review",
    description: "Recent bank transfers awaiting treasurer confirmation.",
    priority: "high",
    href: "/finance/import/review",
    category: "Finance",
  },
  {
    id: "task-002",
    title: "2 Gift Aid declarations returned",
    description: "HMRC returned declarations — check member details.",
    priority: "high",
    href: "/gift-aid",
    category: "Gift Aid",
  },
  {
    id: "task-003",
    title: `${DEMO_OUTSTANDING_FEE_COUNT} unpaid fees`,
    description: "Membership fees overdue for June term.",
    priority: "medium",
    href: "/finance/fees",
    category: "Finance",
  },
  {
    id: "task-004",
    title: "Competition this Saturday",
    description: "Regional Competition at City Sports Centre — 12 gymnasts entered.",
    priority: "medium",
    href: "/calendar",
    category: "Calendar",
  },
  {
    id: "task-005",
    title: "Safeguarding training expired — Jamie Hart",
    description: "Jamie Hart's safeguarding certificate expired — book a refresher before the next session.",
    priority: "medium",
    href: "/staff/qualifications",
    category: "Compliance",
  },
  {
    id: "task-006",
    title: "3 documents waiting to be assigned",
    description: "Uploaded files need categorisation and review.",
    priority: "low",
    href: "/documents/assignment",
    category: "Documents",
  },
];

export const demoHealthMetrics: ClubHealthMetric[] = [
  {
    id: "health-finance",
    label: "Finance",
    score: 78,
    status: "attention",
    summary: `${DEMO_OUTSTANDING_FEE_COUNT} unpaid fees and 4 payments to review`,
    suggestedAction: "Review bank import matches",
    linkedModule: "Finance",
    linkedHref: "/finance/import/review",
  },
  {
    id: "health-attendance",
    label: "Attendance",
    score: 92,
    status: "good",
    summary: "92% average attendance this month",
    suggestedAction: "View reports",
    linkedModule: "Attendance",
    linkedHref: "/attendance/reports",
  },
  {
    id: "health-comms",
    label: "Communications",
    score: 85,
    status: "good",
    summary: "2 replies needing review",
    suggestedAction: "Review inbox",
    linkedModule: "Communications",
    linkedHref: "/communications/inbox",
  },
  {
    id: "health-fundraising",
    label: "Fundraising",
    score: 64,
    status: "attention",
    summary: "Equipment fund at 64% of target",
    suggestedAction: "View campaigns",
    linkedModule: "Fundraising",
    linkedHref: "/fundraising/campaigns",
  },
  {
    id: "health-compliance",
    label: "Compliance",
    score: 71,
    status: "attention",
    summary: "Safeguarding expired, BG Level 2 expiring soon",
    suggestedAction: "Review qualifications",
    linkedModule: "Staff",
    linkedHref: "/staff/qualifications",
  },
  {
    id: "health-staff",
    label: "Staff",
    score: 88,
    status: "good",
    summary: "All DBS checks current",
    suggestedAction: "View staff alerts",
    linkedModule: "Staff",
    linkedHref: "/staff/alerts",
  },
];

export const demoFinanceSnapshot: FinanceSnapshot = {
  paymentsNeedReview: 4,
  unpaidFees: DEMO_OUTSTANDING_FEE_COUNT,
  monthlyIncome: 3340.0,
  monthlyExpenses: 1145.5,
  netPosition: 2194.5,
};

export const demoAttendanceSnapshot: AttendanceSnapshot = {
  sessionsThisWeek: 4,
  averageAttendanceRate: 92,
  absentWithoutNotice: 2,
  nextSession: "Recreational Gym — Tuesday 17:00",
};

export const demoGiftAidSnapshot: GiftAidSnapshot = {
  estimatedClaim: 486.0,
  declarationsReturned: 2,
  activeDeclarations: 2,
};

export const demoFundraisingProgress: FundraisingProgressItem[] = [
  {
    id: "fr-001",
    name: "New Equipment Appeal",
    raised: 3200,
    target: 5000,
    href: "/fundraising/campaigns/fr-001",
  },
  {
    id: "fr-002",
    name: "Competition Travel Fund",
    raised: 890,
    target: 1500,
    href: "/fundraising/campaigns/fr-002",
  },
];

export const demoQuickActions: QuickAction[] = [
  {
    id: "qa-001",
    label: "Review payments",
    description: "Check pending transactions",
    href: "/finance/import/review",
  },
  {
    id: "qa-002",
    label: "Send message",
    description: "Email or notice to members",
    href: "/communications",
  },
  {
    id: "qa-003",
    label: "Add member",
    description: "Register a new member",
    href: "/members/new",
  },
  {
    id: "qa-004",
    label: "Upload document",
    description: "Add a club file or policy",
    href: "/documents",
  },
  {
    id: "qa-005",
    label: "View Gift Aid",
    description: "Declarations and claims",
    href: "/gift-aid",
  },
  {
    id: "qa-006",
    label: "View reports",
    description: "Membership and finance reports",
    href: "/reports",
  },
];

export const demoDashboardHighlights: DashboardHighlights = {
  upcomingEvent: "Regional Competition — Saturday 12 July",
  complianceAlert: "Jamie Hart safeguarding expired — renewal needed",
  documentsWaiting: 3,
};

export const demoDashboardData: DashboardData = {
  tasks: demoDashboardTasks,
  healthMetrics: demoHealthMetrics,
  finance: demoFinanceSnapshot,
  attendance: demoAttendanceSnapshot,
  giftAid: demoGiftAidSnapshot,
  fundraising: demoFundraisingProgress,
  recentActivity: demoAuditEvents.slice(0, 6),
  quickActions: demoQuickActions,
  highlights: demoDashboardHighlights,
};
