"use client";

import Link from "next/link";
import { Card, StatCard } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { SubNavLink } from "@/components/ui/SubNavLink";
import { ModuleSubNav } from "@/components/ui/ModuleSubNav";
import { DemoOnlyNotice, GiftAidSecurityNotice } from "@/components/gift-aid/GiftAidNotices";
import { RestrictedContentPreview } from "@/components/rbac/RestrictedContentPreview";
import { useGiftAidDemo } from "@/components/gift-aid/GiftAidDemoProvider";
import { DeclarationRequestModal } from "@/components/gift-aid/DeclarationRequestModal";
import { formatCurrency } from "@/lib/utils";
import { GIFT_AID_LANDING } from "@/lib/moduleTaskFlow";
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
  const claimReady = dashboard.claimReadyAmount > 0;

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
        className="mt-4 space-y-4 pb-24 lg:pb-6"
      >
        <ModulePrimaryPanel config={GIFT_AID_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "claim",
              value: claimReady ? "Partially claim ready" : "Claim not ready",
              label: "status",
              tone: claimReady ? "reviewed" : "pending",
            },
            {
              id: "declarations",
              value: `${dashboard.missingDeclarations + dashboard.needsReviewDeclarations} declarations need checking`,
              label: "pending",
              tone: "pending",
            },
          ]}
        />

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Quick follow-up</h2>
          <p className="mt-1 text-sm text-slate-600">
            Request missing declarations via Communications (simulated send only).
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/communications/compose?preset=gift-aid"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Draft declaration request
            </Link>
            <button
              type="button"
              onClick={() => setShowDeclarationPreview(true)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Preview form
            </button>
          </div>
        </Card>

        <ModuleMoreTools title="More Gift Aid tools">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {giftAidSubNav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Gift Aid summary stats">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Valid declarations" value={dashboard.validDeclarations} />
            <StatCard label="Missing declarations" value={dashboard.missingDeclarations} />
            <StatCard label="Estimated reclaim" value={formatCurrency(dashboard.estimatedReclaim)} />
            <StatCard label="Claim-ready amount" value={formatCurrency(dashboard.claimReadyAmount)} />
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Gift Aid safety notes">
          <GiftAidSecurityNotice />
        </ModuleMoreTools>
      </RestrictedContentPreview>

      {showDeclarationPreview && (
        <DeclarationRequestModal onClose={() => setShowDeclarationPreview(false)} />
      )}
    </>
  );
}
