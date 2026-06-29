"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Badge, Card, PageHeader } from "@/components/ui";
import { LocalSafetyNote } from "@/components/demo/LocalSafetyNote";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";
import type { ExpenseCategory, ExpenseRecord } from "@/data/providers/types";

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "hall hire",
  "equipment",
  "insurance",
  "wages/session payments",
  "training/certifications",
  "competition costs",
  "travel",
  "utilities/miscellaneous",
];

function reimbursementLabel(exp: ExpenseRecord) {
  if (exp.paymentStatus === "paid") return "Reimbursed";
  if (exp.paymentStatus === "partial") return "Part claimed";
  return "Claimed — awaiting payment";
}

function ExpenseMobileCard({ exp }: { exp: ExpenseRecord }) {
  return (
    <Card className="min-w-0 max-w-full p-4">
      <p className="break-words font-semibold text-slate-900">{exp.payee}</p>
      <p className="mt-1 break-words text-sm text-slate-600 capitalize">{exp.category}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Date</dt>
          <dd className="text-slate-800">{formatDate(exp.date)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Total</dt>
          <dd className="font-medium text-slate-900">{formatCurrency(exp.amount)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-medium uppercase text-slate-500">Cost centre</dt>
          <dd className="break-words capitalize text-slate-700">{exp.category}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Receipt</dt>
          <dd className="mt-0.5">
            <Badge
              variant={
                exp.receiptStatus === "received"
                  ? "success"
                  : exp.receiptStatus === "missing"
                    ? "danger"
                    : "warning"
              }
            >
              {exp.receiptStatus}
            </Badge>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Status</dt>
          <dd className="mt-0.5 break-words text-slate-700">{reimbursementLabel(exp)}</dd>
        </div>
      </dl>
      <Link
        href="/documents/missing"
        className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Check missing receipts
      </Link>
    </Card>
  );
}

export function ExpensesClient() {
  const { expenses, addExpense } = useFinanceDemo();
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addExpense({
      payee: fd.get("payee") as string,
      category: fd.get("category") as ExpenseCategory,
      date: fd.get("date") as string,
      amount: parseFloat(fd.get("amount") as string),
      receiptStatus: "pending",
      paymentStatus: "unpaid",
      notes: (fd.get("notes") as string) || undefined,
    });
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <>
      <PageHeader
        title="Expenses"
        description="Track club outgoings and receipt status."
        breadcrumbs={moduleBreadcrumb(MODULES.finance, "Expenses")}
        backHref={moduleBackHref(MODULES.finance, "Expenses")}
        action={
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add expense
          </button>
        }
      />
      <FinanceSubNav active="Expenses" />
      <DemoOnlyNotice />

      <FinanceRestrictedSection className="mt-4 min-w-0 max-w-full space-y-4 pb-24 lg:pb-6">
        <LocalSafetyNote>Demo data only. No real payments are processed.</LocalSafetyNote>

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Expense added (demo session only).
          </div>
        )}

        {showForm && (
          <Card>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                Payee
                <input name="payee" required className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
              </label>
              <label className="block text-sm">
                Category
                <select name="category" required className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Date
                <input name="date" type="date" required className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
              </label>
              <label className="block text-sm">
                Amount (£)
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                Notes
                <textarea name="notes" rows={2} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                  Save expense
                </button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-3 md:hidden" data-layout="expenses-mobile-cards">
          {expenses.map((exp) => (
            <ExpenseMobileCard key={exp.id} exp={exp} />
          ))}
        </div>

        <div
          className="hidden min-w-0 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm md:block"
          data-layout="expenses-desktop-table"
        >
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Payee", "Category", "Date", "Amount", "Receipt", "Payment", "Notes"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium">{exp.payee}</td>
                  <td className="px-3 py-3 capitalize text-slate-600">{exp.category}</td>
                  <td className="px-3 py-3 text-slate-600">{formatDate(exp.date)}</td>
                  <td className="px-3 py-3">{formatCurrency(exp.amount)}</td>
                  <td className="px-3 py-3">
                    <Badge
                      variant={
                        exp.receiptStatus === "received"
                          ? "success"
                          : exp.receiptStatus === "missing"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {exp.receiptStatus}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={exp.paymentStatus === "paid" ? "success" : "warning"}>
                      {exp.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-slate-500">{exp.notes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FinanceRestrictedSection>
    </>
  );
}
