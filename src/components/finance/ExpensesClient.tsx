"use client";

import { useState, type FormEvent } from "react";
import { Badge, Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";
import type { ExpenseCategory } from "@/data/providers/types";

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

      {success && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Expense added (demo session only).
        </div>
      )}

      {showForm && (
        <Card className="mt-4">
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
              <input name="amount" type="number" step="0.01" required className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
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

      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
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
                  <Badge variant={exp.receiptStatus === "received" ? "success" : exp.receiptStatus === "missing" ? "danger" : "warning"}>
                    {exp.receiptStatus}
                  </Badge>
                </td>
                <td className="px-3 py-3">
                  <Badge variant={exp.paymentStatus === "paid" ? "success" : "warning"}>{exp.paymentStatus}</Badge>
                </td>
                <td className="px-3 py-3 text-slate-500">{exp.notes ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
