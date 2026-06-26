"use client";

import { Badge, PageHeader, EmptyState } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { categoryLabels } from "@/lib/financeMatching";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { TransactionCategory } from "@/data/providers/types";

export function TransactionsClient() {
  const { transactions } = useFinanceDemo();

  return (
    <>
      <PageHeader title="Transactions" description="All income and expense transactions." />
      <FinanceSubNav active="Transactions" />
      <DemoOnlyNotice />
      {transactions.length === 0 ? (
        <EmptyState
          title="No transactions"
          description="Demo finance transactions appear here. Refresh resets session changes."
          className="mt-4"
        />
      ) : (
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Date", "Description", "Category", "Type", "Amount"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-600">{formatDate(tx.date)}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
                <td className="px-4 py-3 text-slate-600">
                  {categoryLabels[tx.category as TransactionCategory] ?? tx.category}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={tx.type === "income" ? "success" : "warning"}>{tx.type}</Badge>
                </td>
                <td className="px-4 py-3 font-medium">{formatCurrency(tx.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </>
  );
}
