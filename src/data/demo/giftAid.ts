import type {
  GiftAidDeclarationRecord,
  GiftAidDonationRecord,
  GiftAidReviewItem,
  GiftAidDashboardData,
  GiftAidClaimExportData,
  GiftAidPageData,
} from "@/data/providers/types";
import type { GiftAidDeclaration } from "@/data/providers/types";

export const GIFT_AID_RATE = 0.25;

export const demoGiftAidDeclarations: GiftAidDeclarationRecord[] = [
  {
    id: "gad-001",
    parentCarerName: "Sarah Thompson",
    linkedMemberIds: ["mem-001"],
    linkedMemberNames: ["Alex Thompson"],
    status: "valid",
    declarationDate: "2024-09-01",
    taxpayerConfirmed: true,
    coveredPeriod: "Sep 2024 — ongoing",
    communicationPlaceholder: "Declaration form sent Sep 2024 — confirmed",
    auditPlaceholder: "Declaration recorded by Demo Admin",
  },
  {
    id: "gad-002",
    parentCarerName: "Chris Reeves",
    linkedMemberIds: ["mem-002"],
    linkedMemberNames: ["Jordan Reeves"],
    status: "valid",
    declarationDate: "2023-06-10",
    taxpayerConfirmed: true,
    coveredPeriod: "Jun 2023 — ongoing",
    communicationPlaceholder: "Annual renewal reminder sent May 2026",
  },
  {
    id: "gad-003",
    parentCarerName: "Sam Patel",
    linkedMemberIds: ["mem-003"],
    linkedMemberNames: ["Sam Patel"],
    status: "valid",
    declarationDate: "2022-06-10",
    taxpayerConfirmed: true,
    coveredPeriod: "Jun 2022 — ongoing",
  },
  {
    id: "gad-004",
    parentCarerName: "Fiona Walsh",
    linkedMemberIds: ["mem-009"],
    linkedMemberNames: ["Quinn Walsh"],
    status: "valid",
    declarationDate: "2024-09-01",
    taxpayerConfirmed: true,
    coveredPeriod: "Sep 2024 — ongoing",
  },
  {
    id: "gad-005",
    parentCarerName: "Wei Chen",
    linkedMemberIds: ["mem-005"],
    linkedMemberNames: ["Riley Chen"],
    status: "missing",
    taxpayerConfirmed: false,
    coveredPeriod: "—",
    communicationPlaceholder: "Declaration request not yet sent",
  },
  {
    id: "gad-006",
    parentCarerName: "Anna Fletcher",
    linkedMemberIds: ["mem-007"],
    linkedMemberNames: ["Morgan Fletcher"],
    status: "missing",
    taxpayerConfirmed: false,
    coveredPeriod: "—",
  },
  {
    id: "gad-007",
    parentCarerName: "Raj Singh",
    linkedMemberIds: ["mem-008"],
    linkedMemberNames: ["Avery Singh"],
    status: "missing",
    taxpayerConfirmed: false,
    coveredPeriod: "—",
  },
  {
    id: "gad-008",
    parentCarerName: "Louise Morgan",
    linkedMemberIds: ["mem-004"],
    linkedMemberNames: ["Casey Morgan"],
    status: "expired",
    declarationDate: "2022-03-22",
    taxpayerConfirmed: false,
    coveredPeriod: "Mar 2022 — Mar 2024 (expired)",
  },
  {
    id: "gad-009",
    parentCarerName: "Taylor Brooks",
    linkedMemberIds: [],
    linkedMemberNames: ["Parent/carer (unlinked)"],
    status: "returned",
    declarationDate: "2024-09-01",
    taxpayerConfirmed: false,
    coveredPeriod: "Returned by HMRC — check details",
    auditPlaceholder: "HMRC returned declaration — 18 Jun 2026",
  },
  {
    id: "gad-010",
    parentCarerName: "David Thompson",
    linkedMemberIds: ["mem-001"],
    linkedMemberNames: ["Alex Thompson"],
    status: "returned",
    taxpayerConfirmed: false,
    coveredPeriod: "Duplicate declaration attempt",
    auditPlaceholder: "Returned — duplicate of Sarah Thompson declaration",
  },
  {
    id: "gad-011",
    parentCarerName: "Jamie Hart",
    linkedMemberIds: [],
    linkedMemberNames: ["Coach (not eligible)"],
    status: "needs-review",
    declarationDate: "2026-06-01",
    taxpayerConfirmed: true,
    coveredPeriod: "Jun 2026 — review required",
    auditPlaceholder: "Flagged — coach role, verify donor eligibility",
  },
];

export const demoGiftAidDonations: GiftAidDonationRecord[] = [
  {
    id: "gdn-001",
    date: "2026-06-08",
    donorSource: "Anonymous donor",
    amount: 50.0,
    category: "eligible individual donation",
    eligibility: "eligible",
    reason: "Genuine voluntary donation — no goods or services received",
    declarationStatus: "missing",
    financeTransactionId: "btx-004",
  },
  {
    id: "gdn-002",
    date: "2026-06-01",
    donorSource: "Sarah Thompson (via Alex)",
    linkedParentMember: "Sarah Thompson",
    linkedMemberId: "mem-001",
    amount: 45.0,
    category: "ineligible fees",
    eligibility: "not-eligible",
    reason: "Monthly class fee — not a voluntary donation. Do not claim Gift Aid on this income type.",
    declarationStatus: "valid",
    financeTransactionId: "btx-001",
  },
  {
    id: "gdn-003",
    date: "2026-06-03",
    donorSource: "Chris Reeves (via Jordan)",
    linkedParentMember: "Chris Reeves",
    linkedMemberId: "mem-002",
    amount: 45.0,
    category: "ineligible fees",
    eligibility: "not-eligible",
    reason: "Membership fee payment — Gift Aid should only be claimed on genuine voluntary donations.",
    declarationStatus: "valid",
    financeTransactionId: "btx-002",
  },
  {
    id: "gdn-004",
    date: "2026-06-15",
    donorSource: "Fiona Walsh (voluntary top-up)",
    linkedParentMember: "Fiona Walsh",
    linkedMemberId: "mem-009",
    amount: 25.0,
    category: "needs review",
    eligibility: "needs-review",
    reason: "Voluntary top-up payment — verify this is a genuine donation, not a disguised fee",
    declarationStatus: "valid",
  },
  {
    id: "gdn-005",
    date: "2026-06-22",
    donorSource: "Taylor Brooks",
    amount: 45.0,
    category: "ineligible fees",
    eligibility: "not-eligible",
    reason: "Payment labelled Gift Aid but is a membership fee — do not claim Gift Aid on class fees.",
    declarationStatus: "returned",
    financeTransactionId: "btx-011",
  },
  {
    id: "gdn-006",
    date: "2026-06-10",
    donorSource: "Local Business Ltd",
    amount: 200.0,
    category: "ineligible business donation",
    eligibility: "not-eligible",
    reason: "Business donation — not eligible for Gift Aid. Do not claim Gift Aid on this income type.",
    declarationStatus: "n/a",
  },
  {
    id: "gdn-007",
    date: "2026-06-12",
    donorSource: "Summer raffle ticket sales",
    amount: 485.0,
    category: "ineligible raffle income",
    eligibility: "not-eligible",
    reason: "Raffle tickets are not Gift Aid eligible — donor receives chance to win a prize.",
    declarationStatus: "n/a",
  },
  {
    id: "gdn-008",
    date: "2026-06-01",
    donorSource: "Sports Council grant",
    amount: 500.0,
    category: "ineligible grant",
    eligibility: "not-eligible",
    reason: "Grant income — not eligible for Gift Aid.",
    declarationStatus: "n/a",
  },
  {
    id: "gdn-009",
    date: "2026-06-18",
    donorSource: "Unknown reference 883921",
    amount: 33.0,
    category: "needs review",
    eligibility: "needs-review",
    reason: "Bank reference unclear — could be donation or fee payment",
    declarationStatus: "n/a",
  },
  {
    id: "gdn-010",
    date: "2026-06-20",
    donorSource: "Sarah Thompson (duplicate?)",
    linkedParentMember: "Sarah Thompson",
    linkedMemberId: "mem-001",
    amount: 45.0,
    category: "needs review",
    eligibility: "needs-review",
    reason: "Possible duplicate payment — review before claiming",
    declarationStatus: "valid",
    financeTransactionId: "btx-010",
  },
  {
    id: "gdn-011",
    date: "2026-06-14",
    donorSource: "Sarah Thompson (donation)",
    linkedParentMember: "Sarah Thompson",
    linkedMemberId: "mem-001",
    amount: 100.0,
    category: "eligible individual donation",
    eligibility: "eligible",
    reason: "Separate voluntary donation with valid declaration — ready to claim",
    declarationStatus: "valid",
  },
];

export const demoGiftAidReviewItems: GiftAidReviewItem[] = [
  {
    id: "gar-001",
    title: "Donation from parent without declaration",
    description: "£50 anonymous donation — no linked declaration on file",
    amount: 50.0,
    date: "2026-06-08",
    reviewType: "Missing declaration",
    eligibility: "needs-review",
  },
  {
    id: "gar-002",
    title: "Bank reference unclear",
    description: "£33 payment with reference 883921 — purpose unknown",
    amount: 33.0,
    date: "2026-06-18",
    reviewType: "Unclear reference",
    eligibility: "needs-review",
    linkedMemberId: undefined,
  },
  {
    id: "gar-003",
    title: "Possible business donation",
    description: "£200 from Local Business Ltd — business donations are not Gift Aid eligible",
    amount: 200.0,
    date: "2026-06-10",
    reviewType: "Business donation",
    eligibility: "not-eligible",
  },
  {
    id: "gar-004",
    title: "Possible raffle income",
    description: "£485 from summer raffle — not eligible regardless of declaration",
    amount: 485.0,
    date: "2026-06-12",
    reviewType: "Raffle income",
    eligibility: "not-eligible",
  },
  {
    id: "gar-005",
    title: "Voluntary top-up payment",
    description: "£25 from Fiona Walsh — verify genuine donation vs fee adjustment",
    amount: 25.0,
    date: "2026-06-15",
    reviewType: "Voluntary top-up",
    eligibility: "needs-review",
    linkedMemberId: "mem-009",
  },
  {
    id: "gar-006",
    title: "Duplicate donation",
    description: "£45 from Sarah Thompson — possible duplicate of June fee payment",
    amount: 45.0,
    date: "2026-06-20",
    reviewType: "Duplicate",
    eligibility: "needs-review",
    linkedMemberId: "mem-001",
  },
];

const eligibleTotal = demoGiftAidDonations
  .filter((d) => d.eligibility === "eligible")
  .reduce((s, d) => s + d.amount, 0);
const ineligibleTotal = demoGiftAidDonations
  .filter((d) => d.eligibility === "not-eligible")
  .reduce((s, d) => s + d.amount, 0);
const claimReady = demoGiftAidDonations
  .filter((d) => d.eligibility === "eligible" && d.declarationStatus === "valid")
  .reduce((s, d) => s + d.amount, 0);
const missed = demoGiftAidDonations
  .filter((d) => d.eligibility === "eligible" && d.declarationStatus === "missing")
  .reduce((s, d) => s + d.amount, 0);

export const demoGiftAidDashboard: GiftAidDashboardData = {
  validDeclarations: demoGiftAidDeclarations.filter((d) => d.status === "valid").length,
  missingDeclarations: demoGiftAidDeclarations.filter((d) => d.status === "missing").length,
  returnedDeclarations: demoGiftAidDeclarations.filter((d) => d.status === "returned").length,
  needsReviewDeclarations: demoGiftAidDeclarations.filter((d) => d.status === "needs-review").length,
  eligibleDonationsThisMonth: eligibleTotal,
  ineligibleIncomeThisMonth: ineligibleTotal,
  estimatedReclaim: Math.round(eligibleTotal * GIFT_AID_RATE * 100) / 100,
  claimReadyAmount: claimReady,
  possibleMissedGiftAid: Math.round(missed * GIFT_AID_RATE * 100) / 100,
  donationsRequiringReview: demoGiftAidDonations.filter((d) => d.eligibility === "needs-review").length,
};

export const demoGiftAidClaimExport: GiftAidClaimExportData = {
  claimReadyDonations: demoGiftAidDonations.filter(
    (d) => d.eligibility === "eligible" && d.declarationStatus === "valid",
  ),
  estimatedReclaim: Math.round(claimReady * GIFT_AID_RATE * 100) / 100,
  missingDeclarations: demoGiftAidDeclarations.filter((d) => d.status === "missing"),
  excludedIncome: demoGiftAidDonations.filter((d) => d.eligibility === "not-eligible"),
  reviewExceptions: demoGiftAidReviewItems.filter((r) => r.eligibility === "needs-review"),
  checklist: [
    { label: "All claim-ready donations have valid declarations", complete: true },
    { label: "No class fees included in claim", complete: true },
    { label: "No raffle or business income included", complete: false },
    { label: "Review exceptions resolved", complete: false },
    { label: "Treasurer sign-off (demo placeholder)", complete: false },
  ],
};

export const demoGiftAidPageData: GiftAidPageData = {
  dashboard: demoGiftAidDashboard,
  declarations: demoGiftAidDeclarations,
  donations: demoGiftAidDonations,
  reviewItems: demoGiftAidReviewItems,
  claimExport: demoGiftAidClaimExport,
};

/** Legacy declarations for getGiftAidDeclarations() */
export const demoGiftAid: GiftAidDeclaration[] = demoGiftAidDeclarations
  .filter((d) => d.status === "valid" || d.status === "expired")
  .map((d) => ({
    id: d.id,
    memberId: d.linkedMemberIds[0] ?? "unknown",
    memberName: d.linkedMemberNames[0] ?? d.parentCarerName,
    declaredDate: d.declarationDate ?? "2020-01-01",
    status: d.status === "valid" ? "active" : d.status === "expired" ? "expired" : "archived",
    amountEligible: d.status === "valid" ? 100 : 0,
  }));

export const GIFT_AID_RULES = [
  {
    title: "Class fees are not eligible",
    body: "Normal class fees, coaching payments, facilities charges and membership benefits are not Gift Aid eligible.",
    warning: false,
  },
  {
    title: "Voluntary donations may be eligible",
    body: "Genuine voluntary individual donations with no goods, services or benefits in return may qualify.",
    warning: false,
  },
  {
    title: "Raffle tickets are not eligible",
    body: "Do not claim Gift Aid on raffle ticket income. The donor receives a chance to win a prize.",
    warning: true,
  },
  {
    title: "Business donations are not eligible",
    body: "Business donations and sponsorship are not Gift Aid eligible for Gift Aid relief.",
    warning: true,
  },
  {
    title: "Valid declaration required",
    body: "A valid Gift Aid declaration must be in place. The donor must be a UK taxpayer and have paid enough UK Income Tax or Capital Gains Tax.",
    warning: true,
  },
  {
    title: "No disguised fees",
    body: "Gift Aid must not be claimed on disguised fees or mandatory payments. Do not reduce fees and replace the difference with donations.",
    warning: true,
  },
  {
    title: "Declaration covers future donations",
    body: "A valid declaration can cover future eligible donations until withdrawn or expired.",
    warning: false,
  },
];

export const GIFT_AID_COMPLIANCE_WARNINGS = [
  "Do not reduce fees and replace the difference with donations.",
  "Do not claim Gift Aid on class fees, coaching or membership payments.",
  "Do not claim Gift Aid on raffle tickets.",
  "Do not claim Gift Aid on business donations or sponsorship.",
  "Do not claim Gift Aid where the donor receives goods, services or benefits.",
  "Do not claim Gift Aid without a valid declaration from a UK taxpayer.",
];
