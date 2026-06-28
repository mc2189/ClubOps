import type { GiftAidReviewItem } from "@/data/providers/types";

export type GiftAidReviewActionId =
  | "confirm-excluded"
  | "keep-out-of-claim"
  | "request-review"
  | "draft-declaration"
  | "add-note"
  | "needs-review"
  | "ask-treasurer"
  | "keep-in-claim"
  | "confirm-demo-review";

export type GiftAidReviewAction = {
  id: GiftAidReviewActionId;
  label: string;
  tone: "primary" | "secondary" | "neutral";
  message: string;
  /** When set, updates demo eligibility on click */
  eligibilityUpdate?: GiftAidReviewItem["eligibility"];
  opensDeclarationModal?: boolean;
};

export const GIFT_AID_HMRC_SAFETY_LINE =
  "This demo does not submit anything to HMRC. Ineligible items should stay out of the claim.";

function declarationActions(item: GiftAidReviewItem): GiftAidReviewAction[] {
  if (item.reviewType === "Missing declaration" || item.description.includes("declaration")) {
    return [
      {
        id: "draft-declaration",
        label: "Draft declaration request",
        tone: "primary",
        message: "Demo declaration request drafted — nothing is sent to the parent.",
        opensDeclarationModal: true,
      },
    ];
  }
  if (item.linkedMemberId) {
    return [
      {
        id: "draft-declaration",
        label: "Draft declaration request",
        tone: "secondary",
        message: "Demo declaration request drafted — nothing is sent.",
        opensDeclarationModal: true,
      },
    ];
  }
  return [];
}

export function getGiftAidReviewActions(item: GiftAidReviewItem): GiftAidReviewAction[] {
  if (item.eligibility === "not-eligible") {
    return [
      {
        id: "confirm-excluded",
        label: "Confirm excluded",
        tone: "primary",
        message: `${item.title} kept out of the demo claim — not Gift Aid eligible.`,
        eligibilityUpdate: "not-eligible",
      },
      {
        id: "keep-out-of-claim",
        label: "Keep out of claim",
        tone: "secondary",
        message: "Marked to stay out of the demo claim.",
        eligibilityUpdate: "not-eligible",
      },
      {
        id: "add-note",
        label: "Add note",
        tone: "neutral",
        message: "Demo note added — treasurer can review later (session only).",
      },
      {
        id: "request-review",
        label: "Request review",
        tone: "neutral",
        message: "Flagged for treasurer review in this demo session.",
        eligibilityUpdate: "needs-review",
      },
    ];
  }

  if (item.eligibility === "eligible") {
    return [
      {
        id: "keep-in-claim",
        label: "Keep in demo claim",
        tone: "primary",
        message: "Kept in the demo claim for treasurer review.",
        eligibilityUpdate: "eligible",
      },
      {
        id: "confirm-demo-review",
        label: "Confirm for demo review",
        tone: "secondary",
        message: "Confirmed for demo claim review — no HMRC submission.",
        eligibilityUpdate: "eligible",
      },
      {
        id: "add-note",
        label: "Add note",
        tone: "neutral",
        message: "Demo note added (session only).",
      },
    ];
  }

  const checking: GiftAidReviewAction[] = [
    {
      id: "needs-review",
      label: "Needs review",
      tone: "primary",
      message: "Marked as needs review — stays out of the demo claim until checked.",
      eligibilityUpdate: "needs-review",
    },
    {
      id: "ask-treasurer",
      label: "Ask Treasurer to check",
      tone: "secondary",
      message: "Treasurer check noted in this demo — no message sent.",
      eligibilityUpdate: "needs-review",
    },
    ...declarationActions(item),
    {
      id: "add-note",
      label: "Add note",
      tone: "neutral",
      message: "Demo note added (session only).",
    },
  ];

  return checking;
}

export function giftAidActionButtonClass(tone: GiftAidReviewAction["tone"]): string {
  const base = "min-h-[44px] rounded-md px-3 py-2 text-sm font-medium";
  if (tone === "primary") {
    return `${base} bg-indigo-600 text-white hover:bg-indigo-700`;
  }
  if (tone === "secondary") {
    return `${base} border border-slate-300 bg-white text-slate-800 hover:bg-slate-50`;
  }
  return `${base} border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100`;
}
