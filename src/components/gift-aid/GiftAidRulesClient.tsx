"use client";

import { Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice, ComplianceWarnings } from "@/components/gift-aid/GiftAidNotices";
import { GiftAidSubNav } from "@/components/gift-aid/GiftAidDashboardClient";
import { GIFT_AID_RULES, GIFT_AID_COMPLIANCE_WARNINGS } from "@/data/demo/giftAid";
import { giftAidTrail } from "@/lib/breadcrumbs";

export function GiftAidRulesClient() {
  return (
    <>
      <PageHeader title="Gift Aid rules" description="Plain-English rules for volunteers and treasurers." breadcrumbs={giftAidTrail("Rules")} backHref="/gift-aid" />
      <GiftAidSubNav active="Rules" />
      <DemoOnlyNotice />
      <div className="mt-4">
        <ComplianceWarnings />
      </div>

      <div className="mt-6 space-y-4">
        {GIFT_AID_RULES.map((rule) => (
          <Card key={rule.title} className={rule.warning ? "border-red-200 bg-red-50/30" : ""}>
            <h3 className="font-semibold text-slate-900">{rule.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{rule.body}</p>
            {rule.warning && (
              <p className="mt-2 text-sm font-medium text-red-700">
                Do not claim Gift Aid on this income type.
              </p>
            )}
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="font-semibold text-slate-900">Compliance checklist</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
          {GIFT_AID_COMPLIANCE_WARNINGS.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </Card>

      <p className="mt-4 text-sm text-slate-500">
        For official guidance, consult HMRC Gift Aid rules. This demo module does not connect to HMRC.
      </p>
    </>
  );
}
