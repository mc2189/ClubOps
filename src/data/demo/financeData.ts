import type {
  RawBankTransaction,
  FinanceDashboardData,
  ExpenseRecord,
  ImportPreviewData,
  FinanceReportsData,
} from "@/data/providers/types";
import { demoFeeRecords } from "@/data/demo/fees";

export const demoCsvTransactions: RawBankTransaction[] = [
  {
    id: "btx-001",
    date: "2026-06-01",
    description: "FASTER PAYMENT THOMPSON A",
    reference: "THOMPSON A / MEM-JUN",
    amount: 45.0,
    type: "credit",
  },
  {
    id: "btx-002",
    date: "2026-06-03",
    description: "FASTER PAYMENT REEVES C",
    reference: "REEVES C JUN FEE",
    amount: 45.0,
    type: "credit",
  },
  {
    id: "btx-003",
    date: "2026-06-05",
    description: "DIRECT DEBIT HALL HIRE LTD",
    reference: "INV-HALL-JUN-680",
    amount: 680.0,
    type: "debit",
  },
  {
    id: "btx-004",
    date: "2026-06-08",
    description: "FASTER PAYMENT DONATION",
    reference: "GYM CLUB DONATION",
    amount: 50.0,
    type: "credit",
  },
  {
    id: "btx-005",
    date: "2026-06-10",
    description: "FASTER PAYMENT WALSH",
    reference: "WALSH PART PAYMENT",
    amount: 22.5,
    type: "credit",
  },
  {
    id: "btx-006",
    date: "2026-06-12",
    description: "CARD PAYMENT EQUIPMENT LTD",
    reference: "EQ-MAINT-12550",
    amount: 125.5,
    type: "debit",
  },
  {
    id: "btx-007",
    date: "2026-06-14",
    description: "FASTER PAYMENT PATEL S",
    reference: "PATEL S ADULT",
    amount: 35.0,
    type: "credit",
  },
  {
    id: "btx-008",
    date: "2026-06-15",
    description: "FASTER PAYMENT CHEN W",
    reference: "CHEN W RILEY FEE",
    amount: 45.0,
    type: "credit",
  },
  {
    id: "btx-009",
    date: "2026-06-18",
    description: "FASTER PAYMENT UNKNOWN",
    reference: "REF 883921",
    amount: 33.0,
    type: "credit",
  },
  {
    id: "btx-010",
    date: "2026-06-20",
    description: "FASTER PAYMENT THOMPSON A",
    reference: "THOMPSON A DUPLICATE?",
    amount: 45.0,
    type: "credit",
  },
  {
    id: "btx-011",
    date: "2026-06-22",
    description: "FASTER PAYMENT BROOKS T",
    reference: "BROOKS T GIFT AID",
    amount: 45.0,
    type: "credit",
  },
  {
    id: "btx-012",
    date: "2026-06-25",
    description: "INSURANCE RENEWAL",
    reference: "COACH-INS-340",
    amount: 340.0,
    type: "debit",
  },
];

/** Simulated PDF extraction — same transactions with OCR-style descriptions */
export const demoPdfTransactions: RawBankTransaction[] = demoCsvTransactions.map((tx) => ({
  ...tx,
  id: `pdf-${tx.id}`,
  description: tx.description.replace("FASTER PAYMENT", "FP").replace("DIRECT DEBIT", "DD"),
}));

const unpaidTotal = demoFeeRecords
  .filter((f) => f.status === "unpaid" || f.status === "partial")
  .reduce((s, f) => s + f.amountOutstanding, 0);
const overdueTotal = demoFeeRecords
  .filter((f) => f.status === "overdue")
  .reduce((s, f) => s + f.amountOutstanding, 0);

export const demoFinanceDashboard: FinanceDashboardData = {
  monthlyIncome: 3340.0,
  monthlyOutgoings: 1145.5,
  netPosition: 2194.5,
  unpaidFees: unpaidTotal,
  overdueFees: overdueTotal,
  matchedPayments: 6,
  unmatchedPayments: 4,
  possibleDonations: 2,
  expensesAwaitingReceipt: 2,
  upcomingObligations: [
    { label: "Main Hall hire — July", amount: 680.0, dueDate: "2026-07-01" },
    { label: "Coach insurance renewal", amount: 340.0, dueDate: "2026-07-15" },
  ],
};

export const demoExpenses: ExpenseRecord[] = [
  {
    id: "exp-001",
    payee: "Hall Hire Ltd",
    category: "hall hire",
    date: "2026-06-05",
    amount: 680.0,
    receiptStatus: "received",
    paymentStatus: "paid",
    notes: "June hall hire invoice",
  },
  {
    id: "exp-002",
    payee: "Equipment Maintenance Co",
    category: "equipment",
    date: "2026-06-12",
    amount: 125.5,
    receiptStatus: "missing",
    paymentStatus: "paid",
    notes: "Springboard servicing",
  },
  {
    id: "exp-003",
    payee: "Coach Insurance Services",
    category: "insurance",
    date: "2026-06-25",
    amount: 340.0,
    receiptStatus: "pending",
    paymentStatus: "paid",
  },
  {
    id: "exp-004",
    payee: "Jamie Hart",
    category: "wages/session payments",
    date: "2026-06-28",
    amount: 120.0,
    receiptStatus: "received",
    paymentStatus: "unpaid",
    notes: "Saturday session coaching",
  },
  {
    id: "exp-005",
    payee: "City Sports Centre",
    category: "competition costs",
    date: "2026-07-12",
    amount: 85.0,
    receiptStatus: "pending",
    paymentStatus: "unpaid",
    notes: "Regional competition entry",
  },
];

export const demoFinanceReports: FinanceReportsData = {
  reports: [
    {
      id: "rpt-fin-001",
      title: "Monthly summary",
      description: "Income, expenses and net position for the current month.",
      category: "Summary",
    },
    {
      id: "rpt-fin-002",
      title: "Unpaid fees report",
      description: "Members with outstanding or overdue membership fees.",
      category: "Fees",
    },
    {
      id: "rpt-fin-003",
      title: "Transaction list",
      description: "All imported and manual transactions for the period.",
      category: "Transactions",
    },
    {
      id: "rpt-fin-004",
      title: "Expense summary",
      description: "Expenses by category with receipt status.",
      category: "Expenses",
    },
    {
      id: "rpt-fin-005",
      title: "Donation summary",
      description: "Voluntary donations and Gift Aid eligible amounts.",
      category: "Donations",
    },
    {
      id: "rpt-fin-006",
      title: "Accountant export pack",
      description: "Combined export for your club accountant (CSV/PDF placeholder).",
      category: "Export",
    },
    {
      id: "rpt-fin-007",
      title: "Audit export",
      description: "Finance audit trail for committee review.",
      category: "Audit",
    },
  ],
};

export function getImportPreview(source: "csv" | "pdf"): ImportPreviewData {
  const transactions = source === "csv" ? demoCsvTransactions : demoPdfTransactions;
  return {
    source,
    rawCount: transactions.length,
    normalizedTransactions: transactions,
  };
}
