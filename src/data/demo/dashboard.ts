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

export const demoDashboardTasks: DashboardTask[] = [
  {
    id: "task-001",
    title: "4 payments need review",
    description: "Recent bank transfers awaiting treasurer confirmation.",
    priority: "high",
    href: "/finance",
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
    title: "7 unpaid fees",
    description: "Membership fees overdue for June term.",
    priority: "medium",
    href: "/finance",
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
    title: "Coach first aid expires in 28 days",
    description: "Jamie Hart's first aid certificate expires on 24 July 2026.",
    priority: "medium",
    href: "/staff",
    category: "Compliance",
  },
  {
    id: "task-006",
    title: "3 documents waiting to be assigned",
    description: "Uploaded files need categorisation and review.",
    priority: "low",
    href: "/documents",
    category: "Documents",
  },
];

export const demoHealthMetrics: ClubHealthMetric[] = [
  {
    id: "health-finance",
    label: "Finance",
    score: 78,
    status: "attention",
    summary: "7 unpaid fees and 4 payments to review",
  },
  {
    id: "health-attendance",
    label: "Attendance",
    score: 92,
    status: "good",
    summary: "92% average attendance this month",
  },
  {
    id: "health-comms",
    label: "Communications",
    score: 85,
    status: "good",
    summary: "2 messages sent this week, 1 scheduled",
  },
  {
    id: "health-fundraising",
    label: "Fundraising",
    score: 64,
    status: "attention",
    summary: "Equipment fund at 64% of target",
  },
  {
    id: "health-compliance",
    label: "Compliance",
    score: 71,
    status: "attention",
    summary: "1 first aid certificate expiring soon",
  },
  {
    id: "health-staff",
    label: "Staff",
    score: 88,
    status: "good",
    summary: "All DBS checks current",
  },
];

export const demoFinanceSnapshot: FinanceSnapshot = {
  paymentsNeedReview: 4,
  unpaidFees: 7,
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
    name: "New Floor Equipment Fund",
    raised: 1240,
    target: 5000,
  },
  {
    id: "fr-002",
    name: "Charity Bake Sale",
    raised: 485,
    target: 500,
  },
];

export const demoQuickActions: QuickAction[] = [
  {
    id: "qa-001",
    label: "Review payments",
    description: "Check pending transactions",
    href: "/finance",
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
    href: "/members",
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
  complianceAlert: "Coach first aid expires in 28 days",
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
