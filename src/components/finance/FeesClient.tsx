"use client";

import Link from "next/link";
import { Badge, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusVariant = {
  paid: "success" as const,
  unpaid: "warning" as const,
  partial: "info" as const,
  overdue: "danger" as const,
  waived: "default" as const,
};

export function FeesClient() {
  const { fees } = useFinanceDemo();

  return (
    <>
      <PageHeader title="Fee tracking" description="Who has paid and who owes money." />
      <FinanceSubNav active="Fees" />
      <DemoOnlyNotice />
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Member",
                "Class",
                "Monthly fee",
                "Paid",
                "Outstanding",
                "Due date",
                "Status",
                "Last payment",
                "Reference",
              ].map((h) => (
                <th key={h} className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {fees.map((fee) => (
              <tr key={fee.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-3">
                  <Link href={`/members/${fee.memberId}`} className="font-medium text-indigo-600 hover:underline">
                    {fee.memberName}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-600">{fee.classGroup}</td>
                <td className="whitespace-nowrap px-3 py-3">{formatCurrency(fee.monthlyFee)}</td>
                <td className="whitespace-nowrap px-3 py-3">{formatCurrency(fee.amountPaid)}</td>
                <td className="whitespace-nowrap px-3 py-3 font-medium">
                  {fee.amountOutstanding > 0 ? formatCurrency(fee.amountOutstanding) : "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatDate(fee.dueDate)}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <Badge variant={statusVariant[fee.status]}>{fee.status}</Badge>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                  {fee.lastPaymentDate ? formatDate(fee.lastPaymentDate) : "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-500">{fee.paymentReference ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
