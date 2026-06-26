import type { GiftAidDeclaration } from "@/data/providers/types";

export const demoGiftAid: GiftAidDeclaration[] = [
  {
    id: "ga-001",
    memberId: "mem-006",
    memberName: "Taylor Brooks",
    declaredDate: "2024-09-01",
    status: "active",
    amountEligible: 480.0,
  },
  {
    id: "ga-002",
    memberId: "mem-003",
    memberName: "Sam Patel",
    declaredDate: "2023-06-10",
    status: "active",
    amountEligible: 320.0,
  },
  {
    id: "ga-003",
    memberId: "mem-004",
    memberName: "Casey Morgan",
    declaredDate: "2022-03-22",
    status: "expired",
    amountEligible: 0,
  },
];
