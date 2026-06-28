"use client";

import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import { LocalSafetyNote } from "@/components/demo/LocalSafetyNote";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";
import type { FeeRecord } from "@/data/providers/types";

const statusVariant = {
  paid: "success" as const,
  unpaid: "warning" as const,
  partial: "info" as const,
  overdue: "danger" as const,
  waived: "default" as const,
};

function FeeMobileCard({ fee }: { fee: FeeRecord }) {
  const showReminder = fee.amountOutstanding > 0;
  const overdueNote =
    fee.status === "overdue"
      ? "Overdue — follow up in this demo session"
      : fee.amountOutstanding > 0
        ? `Due ${formatDate(fee.dueDate)}`
        : null;

  return (
    <Card className="min-w-0 max-w-full p-4">
      <p className="break-words font-semibold text-slate-900">{fee.memberName}</p>
      <p className="break-words text-sm text-slate-500">{fee.classGroup}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Fee period</dt>
          <dd className="text-slate-800">June fee</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Status</dt>
          <dd className="mt-0.5">
            <Badge variant={statusVariant[fee.status]}>{fee.status}</Badge>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Amount due</dt>
          <dd className="font-medium text-slate-900">{formatCurrency(fee.monthlyFee)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Amount paid</dt>
          <dd className="text-slate-800">{formatCurrency(fee.amountPaid)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-medium uppercase text-slate-500">Balance</dt>
          <dd className="font-medium text-slate-900">
            {fee.amountOutstanding > 0 ? formatCurrency(fee.amountOutstanding) : "Nothing owed"}
          </dd>
        </div>
        {overdueNote && (
          <div className="col-span-2">
            <dt className="text-xs font-medium uppercase text-slate-500">Due date</dt>
            <dd className="text-slate-700">{overdueNote}</dd>
          </div>
        )}
      </dl>
      <div className="mt-4 flex flex-col gap-2">
        <Link
          href={`/members/${fee.memberId}`}
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          View fee record
        </Link>
        {showReminder && (
          <Link
            href="/communications/compose?preset=unpaid-fees"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Draft reminder
          </Link>
        )}
      </div>
    </Card>
  );
}

export function FeesClient() {
  const { fees } = useFinanceDemo();

  return (
    <>
      <PageHeader
        title="Fee tracking"
        description="Who has paid and who owes money."
        breadcrumbs={moduleBreadcrumb(MODULES.finance, "Fees")}
        backHref={moduleBackHref(MODULES.finance, "Fees")}
      />
      <FinanceSubNav active="Fees" />
      <DemoOnlyNotice />
      <FinanceRestrictedSection className="mt-4 min-w-0 max-w-full space-y-4 pb-24 lg:pb-6">
        <LocalSafetyNote>Demo data only. No real payments are processed.</LocalSafetyNote>

        <div className="space-y-3 md:hidden" data-layout="fees-mobile-cards">
          {fees.map((fee) => (
            <FeeMobileCard key={fee.id} fee={fee} />
          ))}
        </div>

        <div
          className="hidden min-w-0 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm md:block"
          data-layout="fees-desktop-table"
        >
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
                  <th
                    key={h}
                    className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/members/${fee.memberId}`}
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      {fee.memberName}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600">{fee.classGroup}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatCurrency(fee.monthlyFee)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatCurrency(fee.amountPaid)}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {fee.amountOutstanding > 0 ? formatCurrency(fee.amountOutstanding) : "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                    {formatDate(fee.dueDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Badge variant={statusVariant[fee.status]}>{fee.status}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                    {fee.lastPaymentDate ? formatDate(fee.lastPaymentDate) : "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                    {fee.paymentReference ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500 md:hidden">Demo session only — reload resets fee changes.</p>
      </FinanceRestrictedSection>
    </>
  );
}
