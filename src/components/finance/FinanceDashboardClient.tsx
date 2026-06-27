"use client";

import Link from "next/link";
import { Card, StatCard } from "@/components/ui";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { SubNavLink } from "@/components/ui/SubNavLink";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { DemoOnlyNotice, FinanceSecurityNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

const subNav = [
  { href: "/finance/fees", label: "Fees" },
  { href: "/finance/transactions", label: "Transactions" },
  { href: "/finance/expenses", label: "Expenses" },
  { href: "/finance/import", label: "Import" },
  { href: "/finance/reports", label: "Reports" },
];

export function FinanceDashboardClient() {
  const { dashboard } = useFinanceDemo();

  return (
    <>
      <GlamPageHeader
        title="Finance"
        description="Treasurer overview — income, fees, expenses and bank import."
        breadcrumbs={moduleBreadcrumb(MODULES.finance)}
        backHref="/dashboard"
      />

      <DemoOnlyNotice />
      <FinanceSubNav active="Dashboard" />

      <FinanceRestrictedSection className="mt-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Monthly income" value={formatCurrency(dashboard.monthlyIncome)} />
        <StatCard label="Monthly outgoings" value={formatCurrency(dashboard.monthlyOutgoings)} />
        <StatCard label="Net position" value={formatCurrency(dashboard.netPosition)} />
        <StatCard label="Unpaid fees" value={formatCurrency(dashboard.unpaidFees)} />
        <StatCard label="Overdue fees" value={formatCurrency(dashboard.overdueFees)} />
        <StatCard label="Matched payments" value={dashboard.matchedPayments} />
        <StatCard label="Unmatched payments" value={dashboard.unmatchedPayments} />
        <StatCard label="Possible donations" value={dashboard.possibleDonations} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Expenses awaiting receipt</h2>
          <p className="mt-2 text-3xl font-bold text-amber-600">
            {dashboard.expensesAwaitingReceipt}
          </p>
          <Link href="/finance/expenses" className="mt-2 inline-block text-sm text-indigo-600 hover:underline">
            View expenses →
          </Link>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Upcoming obligations</h2>
          <ul className="mt-3 space-y-2">
            {dashboard.upcomingObligations.map((ob) => (
              <li key={ob.label} className="flex justify-between text-sm">
                <span className="text-slate-700">{ob.label}</span>
                <span className="font-medium">
                  {formatCurrency(ob.amount)} · {formatDate(ob.dueDate)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/finance/import", label: "Import statement", desc: "CSV or PDF demo" },
            { href: "/finance/import/review", label: "Review unmatched payments", desc: "Match and categorise" },
            { href: "/finance/fees", label: "View unpaid fees", desc: "Member fee tracking" },
            { href: "/finance/expenses", label: "Add expense", desc: "Record club outgoings" },
            { href: "/reports/finance-pack", label: "Export finance pack", desc: "Demo treasurer summary" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-lg border border-slate-200 p-4 hover:border-indigo-300 hover:bg-indigo-50/50"
            >
              <p className="font-medium text-slate-900">{action.label}</p>
              <p className="text-xs text-slate-500">{action.desc}</p>
            </Link>
          ))}
        </div>
      </Card>
      </FinanceRestrictedSection>
      <div className="mt-6">
        <FinanceSecurityNotice />
      </div>
    </>
  );
}

export function FinanceSubNav({ active }: { active: string }) {
  return (
    <ModuleSubNav label="Finance sections">
      <SubNavLink href="/finance" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {subNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </ModuleSubNav>
  );
}
