"use client";

import Link from "next/link";
import { Card, StatCard } from "@/components/ui";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { SubNavLink } from "@/components/ui/SubNavLink";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { DemoOnlyNotice, FinanceSecurityNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import { FINANCE_START_HERE } from "@/lib/financeImportCopy";
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
        <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-soft/80 via-white to-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Start here</p>
          <h2 className="mt-1 text-xl font-bold text-brand-charcoal sm:text-2xl">
            {FINANCE_START_HERE.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            {FINANCE_START_HERE.description}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href="/finance/import"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-hover sm:w-auto"
            >
              {FINANCE_START_HERE.primaryCta}
            </Link>
            <Link
              href="/finance/import/review"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-charcoal shadow-sm hover:bg-slate-50 sm:w-auto"
            >
              {FINANCE_START_HERE.secondaryCta}
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Demo only — no real bank connected. Sample statement data is used for training.
          </p>
        </Card>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Monthly income" value={formatCurrency(dashboard.monthlyIncome)} />
          <StatCard label="Monthly outgoings" value={formatCurrency(dashboard.monthlyOutgoings)} />
          <StatCard label="Net position" value={formatCurrency(dashboard.netPosition)} />
          <StatCard label="Unpaid fees" value={formatCurrency(dashboard.unpaidFees)} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Overdue fees" value={formatCurrency(dashboard.overdueFees)} />
          <StatCard label="Matched payments" value={dashboard.matchedPayments} />
          <StatCard label="Unmatched payments" value={dashboard.unmatchedPayments} />
          <StatCard label="Possible donations" value={dashboard.possibleDonations} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-base font-semibold text-slate-900">Expenses awaiting receipt</h2>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {dashboard.expensesAwaitingReceipt}
            </p>
            <Link
              href="/finance/expenses"
              className="mt-2 inline-block text-sm text-indigo-600 hover:underline"
            >
              View expenses →
            </Link>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-slate-900">Upcoming obligations</h2>
            <ul className="mt-3 space-y-2">
              {dashboard.upcomingObligations.map((ob) => (
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

        <Card className="mt-6">
          <h2 className="text-base font-semibold text-slate-900">More finance tools</h2>
          <p className="mt-1 text-sm text-slate-500">Secondary areas — open after reviewing payments.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/finance/fees", label: "Fees", desc: "Who has paid and who owes" },
              { href: "/finance/transactions", label: "Transactions", desc: "All income and expenses" },
              { href: "/finance/expenses", label: "Expenses", desc: "Record club outgoings" },
              { href: "/finance/reports", label: "Reports", desc: "Treasurer summaries" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-lg border border-slate-200 p-3 hover:border-indigo-300 hover:bg-indigo-50/50"
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
