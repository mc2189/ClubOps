"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice, ComplianceWarnings } from "@/components/gift-aid/GiftAidNotices";
import { RestrictedContentPreview } from "@/components/rbac/RestrictedContentPreview";
import { DeclarationRequestModal } from "@/components/gift-aid/DeclarationRequestModal";
import { GiftAidSubNav } from "@/components/gift-aid/GiftAidDashboardClient";
import { useGiftAidDemo } from "@/components/gift-aid/GiftAidDemoProvider";
import { eligibilityLabel, eligibilityVariant } from "@/lib/giftAid";
import {
  GIFT_AID_HMRC_SAFETY_LINE,
  getGiftAidReviewActions,
  giftAidActionButtonClass,
  type GiftAidReviewAction,
} from "@/lib/giftAidReviewActions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { giftAidTrail } from "@/lib/breadcrumbs";

export function GiftAidReviewClient() {
  const {
    reviewItems,
    updateReviewItem,
    simulateDeclarationRequest,
    showDeclarationPreview,
    setShowDeclarationPreview,
  } = useGiftAidDemo();
  const [actionMessages, setActionMessages] = useState<Record<string, string>>({});

  function handleAction(itemId: string, action: GiftAidReviewAction) {
    if (action.opensDeclarationModal) {
      simulateDeclarationRequest("gad-005");
    }
    if (action.eligibilityUpdate) {
      updateReviewItem(itemId, action.eligibilityUpdate);
    }
    setActionMessages((prev) => ({ ...prev, [itemId]: action.message }));
  }

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
        <div className="mt-4 space-y-3">
          <ComplianceWarnings />
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {GIFT_AID_HMRC_SAFETY_LINE}
          </p>
        </div>

        <div className="mt-6 space-y-4 pb-24 lg:pb-6">
          {reviewItems.map((item) => {
            const actions = getGiftAidReviewActions(item);
            const primary = actions.find((a) => a.tone === "primary");
            const secondary = actions.filter((a) => a.tone !== "primary");

            return (
              <Card key={item.id}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(item.date)} · {formatCurrency(item.amount)} · {item.reviewType}
                    </p>
                    {item.linkedMemberId && (
                      <Link
                        href={`/members/${item.linkedMemberId}`}
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        View member profile
                      </Link>
                    )}
                  </div>
                  <Badge variant={eligibilityVariant(item.eligibility)}>
                    {eligibilityLabel[item.eligibility]}
                  </Badge>
                </div>

                {actionMessages[item.id] && (
                  <p
                    className="mt-3 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-800"
                    role="status"
                  >
                    {actionMessages[item.id]}
                  </p>
                )}

                <div className="mt-4 flex flex-col gap-2">
                  {primary && (
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, primary)}
                      className={`w-full sm:w-auto ${giftAidActionButtonClass(primary.tone)}`}
                    >
                      {primary.label}
                    </button>
                  )}
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    {secondary.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleAction(item.id, action)}
                        className={`w-full sm:w-auto ${giftAidActionButtonClass(action.tone)}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </RestrictedContentPreview>

      {showDeclarationPreview && (
        <DeclarationRequestModal onClose={() => setShowDeclarationPreview(false)} />
      )}
    </>
  );
}
