"use client";

import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice, ComplianceWarnings } from "@/components/gift-aid/GiftAidNotices";
import { RestrictedContentPreview } from "@/components/rbac/RestrictedContentPreview";
import { DeclarationRequestModal } from "@/components/gift-aid/DeclarationRequestModal";
import { GiftAidSubNav } from "@/components/gift-aid/GiftAidDashboardClient";
import { useGiftAidDemo } from "@/components/gift-aid/GiftAidDemoProvider";
import { eligibilityLabel, eligibilityVariant } from "@/lib/giftAid";
import { formatCurrency, formatDate } from "@/lib/utils";
import { giftAidTrail } from "@/lib/breadcrumbs";

export function GiftAidReviewClient() {
  const { reviewItems, updateReviewItem, simulateDeclarationRequest, showDeclarationPreview, setShowDeclarationPreview } = useGiftAidDemo();

  return (
    <>
      <PageHeader
        title="Gift Aid review"
        description="Uncertain items requiring treasurer decision."
        breadcrumbs={giftAidTrail("Review")}
        backHref="/gift-aid"
      />
      <GiftAidSubNav active="Review" />
      <DemoOnlyNotice />
      <RestrictedContentPreview module="gift-aid" auditOnView="restricted Gift Aid preview viewed">
      <div className="mt-4">
        <ComplianceWarnings />
      </div>

      <div className="mt-6 space-y-4">
        {reviewItems.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(item.date)} · {formatCurrency(item.amount)} · {item.reviewType}
                </p>
                {item.linkedMemberId && (
                  <Link href={`/members/${item.linkedMemberId}`} className="text-sm text-indigo-600 hover:underline">
                    View member profile
                  </Link>
                )}
              </div>
              <Badge variant={eligibilityVariant(item.eligibility)}>{eligibilityLabel[item.eligibility]}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => updateReviewItem(item.id, "eligible")} className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white">Mark eligible</button>
              <button type="button" onClick={() => updateReviewItem(item.id, "not-eligible")} className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white">Mark ineligible</button>
              <button type="button" onClick={() => simulateDeclarationRequest("gad-005")} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium">Request declaration</button>
            </div>
          </Card>
        ))}
      </div>
      </RestrictedContentPreview>

      {showDeclarationPreview && (
        <DeclarationRequestModal onClose={() => setShowDeclarationPreview(false)} />
      )}
    </>
  );
}
