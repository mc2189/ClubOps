import type { ReportSummary } from "@/data/providers/types";

export const demoReports: ReportSummary[] = [
  {
    id: "rpt-001",
    title: "Membership Summary — June 2026",
    category: "Membership",
    generatedDate: "2026-06-25",
    description: "Active, inactive and new member counts for the current month.",
  },
  {
    id: "rpt-002",
    title: "Attendance Report — Q2 2026",
    category: "Attendance",
    generatedDate: "2026-06-20",
    description: "Session attendance rates across all groups for Q2.",
  },
  {
    id: "rpt-003",
    title: "Financial Summary — H1 2026",
    category: "Finance",
    generatedDate: "2026-06-18",
    description: "Income, expenses and net position for the first half of 2026.",
  },
  {
    id: "rpt-004",
    title: "Gift Aid Claim — 2025/26",
    category: "Gift Aid",
    generatedDate: "2026-06-10",
    description: "Eligible donations and estimated reclaim for the tax year.",
  },
];
