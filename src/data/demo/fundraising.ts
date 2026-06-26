import type { FundraisingCampaign } from "@/data/providers/types";

export const demoFundraising: FundraisingCampaign[] = [
  {
    id: "fr-001",
    name: "New Floor Equipment Fund",
    target: 5000,
    raised: 3200,
    startDate: "2026-03-01",
    endDate: "2026-09-30",
    status: "active",
  },
  {
    id: "fr-002",
    name: "Charity Bake Sale",
    target: 500,
    raised: 485,
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    status: "active",
  },
  {
    id: "fr-003",
    name: "Christmas Raffle 2025",
    target: 1000,
    raised: 1120,
    startDate: "2025-11-01",
    endDate: "2025-12-20",
    status: "completed",
  },
];
