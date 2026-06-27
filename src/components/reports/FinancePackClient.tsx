"use client";

import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { DemoOnlyNotice, ReportsSecurityNotice, ExportSuccessNotice } from "@/components/reports/ReportsNotices";
import { RestrictedExportButton } from "@/components/rbac/RestrictedExportButton";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";
import { formatReportCurrency } from "@/lib/reports";
import { reportsTrail } from "@/lib/breadcrumbs";

export function FinancePackClient() {
  const { financePack, simulateExport, lastExportTitle } = useReportsAuditDemo();
  const p = financePack;

  return (
    <>
      <PageHeader title="Finance Pack" description="Treasurer summary for accounting and audit." breadcrumbs={reportsTrail("Finance Pack")} backHref="/reports" />
      <ReportsSubNav active="Finance Pack" />
      <DemoOnlyNotice />
      {lastExportTitle === "Finance Pack" && <ExportSuccessNotice title="Finance Pack" />}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Income this month" value={formatReportCurrency(p.incomeThisMonth)} />
        <StatCard label="Income this year" value={formatReportCurrency(p.incomeThisYear)} />
        <StatCard label="Outgoings this month" value={formatReportCurrency(p.outgoingsThisMonth)} />
        <StatCard label="Net position" value={formatReportCurrency(p.netPosition)} />
      </div>
      <Card className="mt-6">
        <h2 className="text-sm font-semibold">Summary</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Unpaid/overdue fees: {p.unpaidFees} members</li>
          <li>Matched transactions: {p.matchedTransactions} · Unmatched: {p.unmatchedTransactions}</li>
          <li>Possible donations to review: {p.possibleDonations}</li>
          <li>Expenses missing receipts: {p.expensesMissingReceipts}</li>
          <li>Wage prep summary: {formatReportCurrency(p.wagePrepTotal)} — <Link href="/staff/wages" className="text-indigo-600 hover:underline">Staff wages</Link></li>
          <li>Hall hire/outgoings: {formatReportCurrency(p.hallHireOutgoings)} — <Link href="/staff/outgoings" className="text-indigo-600 hover:underline">Staff outgoings</Link></li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/finance" className="text-sm text-indigo-600 hover:underline">Finance dashboard</Link>
          <Link href="/reports/finance-pack" className="text-sm text-indigo-600 hover:underline">Finance pack report</Link>
          <Link href="/finance/reports" className="text-sm text-indigo-600 hover:underline">Finance module reports</Link>
          <Link href="/documents/upload" className="text-sm text-indigo-600 hover:underline">Receipts/invoices</Link>
          <Link href="/fundraising/donations" className="text-sm text-indigo-600 hover:underline">Donations</Link>
        </div>
        <RestrictedExportButton label="Generate demo export" onExport={() => simulateExport("Finance Pack")} />
      </Card>
      <ReportsSecurityNotice />
    </>
  );
}
