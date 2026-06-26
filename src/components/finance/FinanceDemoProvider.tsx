"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  FinanceDashboardData,
  FeeRecord,
  ExpenseRecord,
  FinanceTransaction,
  RawBankTransaction,
  ImportReviewItem,
  TransactionCategory,
  MatchReviewStatus,
  AuditEvent,
  MemberProfile,
} from "@/data/providers/types";
import {
  matchAllTransactions,
  createFinanceAuditEvent,
} from "@/lib/financeMatching";

interface FinanceDemoContextValue {
  dashboard: FinanceDashboardData;
  fees: FeeRecord[];
  expenses: ExpenseRecord[];
  transactions: FinanceTransaction[];
  importItems: ImportReviewItem[];
  importSource: "csv" | "pdf" | null;
  importApproved: boolean;
  localAuditEvents: AuditEvent[];
  loadImport: (source: "csv" | "pdf", rawTransactions: RawBankTransaction[]) => void;
  approveMatch: (transactionId: string) => void;
  setCategory: (transactionId: string, category: TransactionCategory) => void;
  setReviewStatus: (transactionId: string, status: MatchReviewStatus) => void;
  approveImport: () => void;
  addExpense: (expense: Omit<ExpenseRecord, "id">) => void;
  exportReport: (reportTitle: string) => void;
}

const FinanceDemoContext = createContext<FinanceDemoContextValue | null>(null);

export function FinanceDemoProvider({
  initialDashboard,
  initialFees,
  initialExpenses,
  initialTransactions,
  members,
  children,
}: {
  initialDashboard: FinanceDashboardData;
  initialFees: FeeRecord[];
  initialExpenses: ExpenseRecord[];
  initialTransactions: FinanceTransaction[];
  members: MemberProfile[];
  children: ReactNode;
}) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [fees] = useState(initialFees);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [importItems, setImportItems] = useState<ImportReviewItem[]>([]);
  const [importSource, setImportSource] = useState<"csv" | "pdf" | null>(null);
  const [importApproved, setImportApproved] = useState(false);
  const [localAuditEvents, setLocalAuditEvents] = useState<AuditEvent[]>([]);

  const loadImport = useCallback(
    (source: "csv" | "pdf", rawTransactions: RawBankTransaction[]) => {
      const matched = matchAllTransactions(rawTransactions, fees, members);
      setImportItems(matched);
      setImportSource(source);
      setImportApproved(false);
      const audit = createFinanceAuditEvent(
        "import",
        `Demo statement imported from ${source.toUpperCase()} — ${matched.length} transactions`,
      );
      setLocalAuditEvents((prev) => [audit, ...prev]);
    },
    [fees, members],
  );

  const approveMatch = useCallback((transactionId: string) => {
    setImportItems((prev) =>
      prev.map((item) =>
        item.id === transactionId
          ? {
              ...item,
              match: { ...item.match, reviewStatus: "approved" as MatchReviewStatus },
            }
          : item,
      ),
    );
    const audit = createFinanceAuditEvent("approve", `Payment match approved — transaction ${transactionId.slice(-3)}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, []);

  const setCategory = useCallback((transactionId: string, category: TransactionCategory) => {
    setImportItems((prev) =>
      prev.map((item) =>
        item.id === transactionId
          ? { ...item, match: { ...item.match, category } }
          : item,
      ),
    );
    const audit = createFinanceAuditEvent("update", `Category changed to ${category}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, []);

  const setReviewStatus = useCallback((transactionId: string, status: MatchReviewStatus) => {
    setImportItems((prev) =>
      prev.map((item) =>
        item.id === transactionId
          ? { ...item, match: { ...item.match, reviewStatus: status } }
          : item,
      ),
    );
  }, []);

  const approveImport = useCallback(() => {
    const approved = importItems.filter(
      (i) => i.match.reviewStatus === "approved" || i.match.reviewStatus === "auto-matched",
    );
    const newTx: FinanceTransaction[] = approved.map((item) => ({
      id: `fin-import-${item.id}`,
      date: item.date,
      description: item.description,
      category: item.match.category,
      amount: item.amount,
      type: item.type === "credit" ? "income" : "expense",
    }));
    setTransactions((prev) => [...newTx, ...prev]);
    setDashboard((prev) => ({
      ...prev,
      matchedPayments: prev.matchedPayments + approved.length,
      unmatchedPayments: Math.max(0, prev.unmatchedPayments - approved.length),
    }));
    setImportApproved(true);
    const audit = createFinanceAuditEvent(
      "approve",
      `Demo import approved — ${approved.length} transactions applied`,
    );
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, [importItems]);

  const addExpense = useCallback((expense: Omit<ExpenseRecord, "id">) => {
    const record: ExpenseRecord = { ...expense, id: `exp-${Date.now()}` };
    setExpenses((prev) => [record, ...prev]);
    const audit = createFinanceAuditEvent("create", `Expense added — ${expense.payee}`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, []);

  const exportReport = useCallback((reportTitle: string) => {
    const audit = createFinanceAuditEvent("export", `Export generated — ${reportTitle} (demo placeholder)`);
    setLocalAuditEvents((prev) => [audit, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      dashboard,
      fees,
      expenses,
      transactions,
      importItems,
      importSource,
      importApproved,
      localAuditEvents,
      loadImport,
      approveMatch,
      setCategory,
      setReviewStatus,
      approveImport,
      addExpense,
      exportReport,
    }),
    [
      dashboard,
      fees,
      expenses,
      transactions,
      importItems,
      importSource,
      importApproved,
      localAuditEvents,
      loadImport,
      approveMatch,
      setCategory,
      setReviewStatus,
      approveImport,
      addExpense,
      exportReport,
    ],
  );

  return (
    <FinanceDemoContext.Provider value={value}>{children}</FinanceDemoContext.Provider>
  );
}

export function useFinanceDemo() {
  const ctx = useContext(FinanceDemoContext);
  if (!ctx) throw new Error("useFinanceDemo must be used within FinanceDemoProvider");
  return ctx;
}
