import type { FinanceTransaction } from "@/data/providers/types";

export const demoFinance: FinanceTransaction[] = [
  {
    id: "fin-001",
    date: "2026-06-01",
    description: "Monthly membership fees — June",
    category: "Membership",
    amount: 2450.0,
    type: "income",
  },
  {
    id: "fin-002",
    date: "2026-06-05",
    description: "Hall hire — June",
    category: "Venue",
    amount: 680.0,
    type: "expense",
  },
  {
    id: "fin-003",
    date: "2026-06-10",
    description: "Equipment maintenance",
    category: "Equipment",
    amount: 125.5,
    type: "expense",
  },
  {
    id: "fin-004",
    date: "2026-06-15",
    description: "Summer camp deposits",
    category: "Events",
    amount: 890.0,
    type: "income",
  },
  {
    id: "fin-005",
    date: "2026-06-20",
    description: "Coach insurance renewal",
    category: "Insurance",
    amount: 340.0,
    type: "expense",
  },
];
