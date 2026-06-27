"use client";

import Link from "next/link";
import { Card, StatCard } from "@/components/ui";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { SubNavLink } from "@/components/ui/SubNavLink";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import {
  DemoOnlyNotice,
  GiftAidSecurityNotice,
  ComplianceWarnings,
} from "@/components/gift-aid/GiftAidNotices";
import { RestrictedContentPreview } from "@/components/rbac/RestrictedContentPreview";
import { useGiftAidDemo } from "@/components/gift-aid/GiftAidDemoProvider";
import { DeclarationRequestModal } from "@/components/gift-aid/DeclarationRequestModal";
import { formatCurrency } from "@/lib/utils";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export const giftAidSubNav = [
  { href: "/gift-aid/declarations", label: "Declarations" },
  { href: "/gift-aid/eligible-donations", label: "Eligible donations" },
  { href: "/gift-aid/review", label: "Review" },
  { href: "/gift-aid/claim-export", label: "Claim export" },
  { href: "/gift-aid/rules", label: "Rules" },
];

export function GiftAidSubNav({ active }: { active?: string }) {
  return (
    <ModuleSubNav label="Gift Aid sections">
      <SubNavLink href="/gift-aid" active={active === "Dashboard"}>
        Dashboard
      </SubNavLink>
      {giftAidSubNav.map((item) => (
        <SubNavLink key={item.href} href={item.href} active={active === item.label}>
          {item.label}
        </SubNavLink>
      ))}
    </ModuleSubNav>
  );
}

export function GiftAidDashboardClient() {
  const { dashboard, showDeclarationPreview, setShowDeclarationPreview } = useGiftAidDemo();

  return (
    <>
      <GlamPageHeader
        title="Gift Aid"
        description="Track declarations, eligible donations and claim readiness."
        breadcrumbs={moduleBreadcrumb(MODULES.giftAid)}
        backHref="/dashboard"
      />
      <GiftAidSubNav active="Dashboard" />
      <DemoOnlyNotice />
      <RestrictedContentPreview
        module="gift-aid"
        auditOnView="restricted Gift Aid preview viewed"
        className="mt-4 space-y-4"
      >
      <div className="space-y-4">
        <GiftAidSecurityNotice />
        <ComplianceWarnings />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Valid declarations" value={dashboard.validDeclarations} />
        <StatCard label="Missing declarations" value={dashboard.missingDeclarations} />
        <StatCard label="Returned" value={dashboard.returnedDeclarations} />
        <StatCard label="Needs review" value={dashboard.needsReviewDeclarations} />
        <StatCard label="Eligible donations (month)" value={formatCurrency(dashboard.eligibleDonationsThisMonth)} />
        <StatCard label="Ineligible income (month)" value={formatCurrency(dashboard.ineligibleIncomeThisMonth)} />
        <StatCard label="Estimated reclaim" value={formatCurrency(dashboard.estimatedReclaim)} />
        <StatCard label="Claim-ready amount" value={formatCurrency(dashboard.claimReadyAmount)} />
        <StatCard label="Possible missed Gift Aid" value={formatCurrency(dashboard.possibleMissedGiftAid)} />
        <StatCard label="Donations needing review" value={dashboard.donationsRequiringReview} />
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/gift-aid/declarations", label: "Review declarations" },
            { href: "/gift-aid/eligible-donations", label: "Review eligible donations" },
            { href: "/gift-aid/declarations", label: "Prepare declaration request", onClick: () => setShowDeclarationPreview(true) },
            { href: "/gift-aid/claim-export", label: "Generate claim report" },
            { href: "/gift-aid/rules", label: "View Gift Aid rules" },
          ].map((action) =>
            action.onClick ? (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className="rounded-lg border border-slate-200 p-4 text-left hover:border-indigo-300 hover:bg-indigo-50/50"
              >
                <p className="font-medium text-slate-900">{action.label}</p>
              </button>
            ) : (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-lg border border-slate-200 p-4 hover:border-indigo-300 hover:bg-indigo-50/50"
              >
                <p className="font-medium text-slate-900">{action.label}</p>
              </Link>
            ),
          )}
        </div>
      </Card>
      </RestrictedContentPreview>

      {showDeclarationPreview && (
        <DeclarationRequestModal onClose={() => setShowDeclarationPreview(false)} />
      )}
    </>
  );
}
