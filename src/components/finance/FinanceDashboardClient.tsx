"use client";

import Link from "next/link";
import { Card, StatCard } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { SubNavLink } from "@/components/ui/SubNavLink";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { DemoOnlyNotice, FinanceSecurityNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { FINANCE_LANDING } from "@/lib/moduleTaskFlow";
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
  const { dashboard, importItems } = useFinanceDemo();
  const confirmedSession = importItems.filter((i) => i.match.reviewStatus === "approved").length;

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

      <FinanceRestrictedSection className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={FINANCE_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "review",
              value: `${dashboard.unmatchedPayments} payments need review`,
              label: "pending",
              tone: "pending",
            },
            {
              id: "confirmed",
              value: `${confirmedSession || 2} confirmed this session`,
              label: "reviewed",
              tone: confirmedSession > 0 ? "reviewed" : "neutral",
            },
          ]}
        />

        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href="/finance/fees"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            View unpaid fees
          </Link>
          <Link
            href="/finance/import"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-900 hover:bg-indigo-100"
          >
            Use sample statement
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Expenses awaiting receipt</h2>
            <p className="mt-2 text-2xl font-bold text-amber-600">{dashboard.expensesAwaitingReceipt}</p>
            <Link href="/finance/expenses" className="mt-2 inline-block text-sm text-indigo-600 hover:underline">
              View expenses →
            </Link>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Next obligations</h2>
            <ul className="mt-2 space-y-2">
              {dashboard.upcomingObligations.slice(0, 2).map((ob) => (
                <li key={ob.label} className="flex justify-between gap-2 text-sm">
                  <span className="text-slate-700">{ob.label}</span>
                  <span className="shrink-0 font-medium">
                    {formatCurrency(ob.amount)} · {formatDate(ob.dueDate)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <ModuleMoreTools
          title="More finance tools"
          itemCount={5}
          helperText="Open this for transactions, expenses, reports and other treasurer tools."
        >
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/finance/fees", label: "Fees" },
              { href: "/finance/transactions", label: "Transactions" },
              { href: "/finance/expenses", label: "Expenses" },
              { href: "/finance/reports", label: "Reports" },
              { href: "/finance/import", label: "Sample statement" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Finance summary stats">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Monthly income" value={formatCurrency(dashboard.monthlyIncome)} />
            <StatCard label="Net position" value={formatCurrency(dashboard.netPosition)} />
            <StatCard label="Unpaid fees" value={formatCurrency(dashboard.unpaidFees)} />
            <StatCard label="Matched payments" value={dashboard.matchedPayments} />
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Finance safety notes">
          <FinanceSecurityNotice />
        </ModuleMoreTools>
      </FinanceRestrictedSection>
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
