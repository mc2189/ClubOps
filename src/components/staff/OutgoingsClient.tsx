"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { formatStaffCurrency, paymentStatusVariant } from "@/lib/staff";
import type { OutgoingCategory } from "@/data/providers/types";
import { formatDate } from "@/lib/utils";

const categories: OutgoingCategory[] = [
  "hall hire", "equipment", "insurance", "training/certifications",
  "competition fees", "travel", "utilities/miscellaneous", "wage/session payments",
];

export function OutgoingsClient() {
  const { outgoings, markOutgoingPaid, flagMissingReceipt, addOutgoing } = useStaffDemo();
  const [showForm, setShowForm] = useState(false);
  const [payee, setPayee] = useState("");
  const [category, setCategory] = useState<OutgoingCategory>("equipment");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("2026-07-15");

  const handleAdd = () => {
    if (!payee || !amount) return;
    addOutgoing({ payee, category, amount: parseFloat(amount), dueDate });
    setShowForm(false);
    setPayee("");
    setAmount("");
  };

  return (
    <>
      <PageHeader title="Outgoings" description="Hall hire, equipment, insurance, wages and operational costs." />
      <StaffSubNav active="Outgoings" />
      <DemoOnlyNotice />
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => setShowForm(!showForm)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Add outgoing (demo)
        </button>
        <Link href="/finance/expenses" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          View Finance expenses
        </Link>
      </div>
      {showForm && (
        <Card className="mt-4">
          <h2 className="text-sm font-semibold">New outgoing</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input type="text" placeholder="Payee" value={payee} onChange={(e) => setPayee(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <select value={category} onChange={(e) => setCategory(e.target.value as OutgoingCategory)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <button type="button" onClick={handleAdd} className="mt-3 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white">Save</button>
        </Card>
      )}
      <Card className="mt-4 overflow-x-auto">
        <DataTable headers={["Payee", "Category", "Amount", "Due", "Status", "Receipt", "Finance link", "Actions"]}>
          {outgoings.map((o) => (
            <tr key={o.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{o.payee}</td>
              <td className="px-4 py-3 text-slate-600">{o.category}</td>
              <td className="px-4 py-3 text-slate-600">{formatStaffCurrency(o.amount)}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(o.dueDate)}</td>
              <td className="px-4 py-3"><Badge variant={paymentStatusVariant[o.paymentStatus]}>{o.paymentStatus}</Badge></td>
              <td className="px-4 py-3 text-sm">
                {o.missingReceipt ? <Badge variant="warning">Missing receipt</Badge> : o.receiptPlaceholder ?? "—"}
              </td>
              <td className="px-4 py-3 text-sm text-slate-500">{o.financeLinkPlaceholder ?? "—"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {o.paymentStatus !== "paid" && (
                    <button type="button" onClick={() => markOutgoingPaid(o.id)} className="text-xs font-medium text-indigo-600 hover:underline">Mark paid</button>
                  )}
                  <button type="button" onClick={() => flagMissingReceipt(o.id)} className="text-xs text-amber-700 hover:underline">Flag receipt</button>
                  <Link href="/documents/upload" className="text-xs text-slate-500 hover:underline">Link document</Link>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </>
  );
}
