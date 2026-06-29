"use client";

import Link from "next/link";
import { Badge, Card, PageHeader, EmptyState } from "@/components/ui";
import { LocalSafetyNote } from "@/components/demo/LocalSafetyNote";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { categoryLabels } from "@/lib/financeMatching";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";
import type { FinanceTransaction, TransactionCategory } from "@/data/providers/types";

const ledgerStatusVariant = {
  matched: "success" as const,
  unmatched: "warning" as const,
  recorded: "default" as const,
};

const ledgerStatusLabel = {
  matched: "Matched",
  unmatched: "Unmatched",
  recorded: "Recorded",
};

function TransactionMobileCard({ tx }: { tx: FinanceTransaction }) {
  const status = tx.ledgerStatus ?? "recorded";
  const actionHref = status === "unmatched" ? "/finance/import/review" : "/finance/fees";
  const actionLabel = status === "unmatched" ? "Review payment match" : "View fee records";

  return (
    <Card className="min-w-0 max-w-full p-4">
      <p className="break-words font-semibold text-slate-900">{tx.description}</p>
      {tx.reference && <p className="mt-1 break-words text-xs text-slate-500">{tx.reference}</p>}
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Date</dt>
          <dd className="text-slate-800">{formatDate(tx.date)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Amount</dt>
          <dd className="font-medium text-slate-900">{formatCurrency(tx.amount)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Status</dt>
          <dd className="mt-0.5">
            <Badge variant={ledgerStatusVariant[status]}>{ledgerStatusLabel[status]}</Badge>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Type</dt>
          <dd className="mt-0.5">
            <Badge variant={tx.type === "income" ? "success" : "warning"}>{tx.type}</Badge>
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-medium uppercase text-slate-500">Category</dt>
          <dd className="break-words text-slate-700">
            {categoryLabels[tx.category as TransactionCategory] ?? tx.category}
            {tx.memberName ? ` · ${tx.memberName}` : ""}
          </dd>
        </div>
      </dl>
      <Link
        href={actionHref}
        className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        {actionLabel}
      </Link>
    </Card>
  );
}

export function TransactionsClient() {
  const { transactions } = useFinanceDemo();

  return (
    <>
      <PageHeader
        title="Transactions"
        description="All income and expense transactions."
        breadcrumbs={moduleBreadcrumb(MODULES.finance, "Transactions")}
        backHref={moduleBackHref(MODULES.finance, "Transactions")}
      />
      <FinanceSubNav active="Transactions" />
      <DemoOnlyNotice />
      <FinanceRestrictedSection className="mt-4 min-w-0 max-w-full space-y-4 pb-24 lg:pb-6">
        <LocalSafetyNote>Demo data only. No real payments are processed.</LocalSafetyNote>
        {transactions.length === 0 ? (
          <EmptyState
            title="No transactions"
            description="Demo finance transactions appear here after you import or add payments."
            actionLabel="Go to import review"
            actionHref="/finance/import/review"
          />
        ) : (
          <>
            <div className="space-y-3 md:hidden" data-layout="transactions-mobile-cards">
              {transactions.map((tx) => (
                <TransactionMobileCard key={tx.id} tx={tx} />
              ))}
            </div>

            <div
              className="hidden min-w-0 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm md:block"
              data-layout="transactions-desktop-table"
            >
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["Date", "Description", "Category", "Type", "Amount"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500"
                      >
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
          </>
        )}
      </FinanceRestrictedSection>
    </>
  );
}
