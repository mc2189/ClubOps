import type { PermissionModule } from "@/lib/permissions";

/** Core demo RBAC honesty wording — keep consistent across the app */
export const RBAC_DEMO_ONLY_DISCLAIMER =
  "Demo permission preview only — not real security.";

export const RBAC_PUBLIC_DEMO_EXPLANATION =
  "In this public demo, fake data may still be visible so you can explore the app. In live mode, this section would be blocked server-side.";

export const RBAC_LOCKED_SECTION_EXPLANATION =
  "This section is hidden in this demo role to show how live permissions would work. No real security is provided until authentication and server-side RBAC are implemented.";

export const RBAC_SUMMARY_BY_MODULE: Partial<
  Record<
    PermissionModule,
    { title: string; lines: string[]; requiredLabel: string; education?: string }
  >
> = {
  finance: {
    title: "Finance records exist",
    lines: [
      "This club has fee, payment and expense records in the demo.",
      "Detailed payment data would require Treasurer/Admin access in live mode.",
    ],
    requiredLabel: "Requires Treasurer/Admin",
  },
  "gift-aid": {
    title: "Gift Aid records exist",
    lines: [
      "Declarations and eligible donations are tracked separately from fees.",
      "Donor-specific claim details would require Treasurer/Admin access in live mode.",
    ],
    requiredLabel: "Requires Treasurer/Admin",
    education:
      "Gift Aid lets UK charities reclaim tax on eligible donations. Fees, raffle income and business sponsorship are usually not eligible.",
  },
  "members-sensitive": {
    title: "Medical or welfare information exists",
    lines: ["Detailed notes hidden in this demo role."],
    requiredLabel: "Requires Welfare Officer/Admin",
  },
  "documents-sensitive": {
    title: "Sensitive document on file",
    lines: [
      "Category and status are visible — extracted or detailed content is hidden in this demo role.",
    ],
    requiredLabel: "Requires Welfare Officer/Admin",
  },
  "wage-prep": {
    title: "Wage preparation records exist",
    lines: [
      "Session payment preparation is tracked for coaches and staff.",
      "Detailed wage data would require Treasurer/Admin access in live mode.",
    ],
    requiredLabel: "Requires Treasurer/Admin",
  },
  exports: {
    title: "Exports available to authorised roles",
    lines: [
      "Committee packs and admin exports would require Admin or Treasurer permission in live mode.",
    ],
    requiredLabel: "Requires Treasurer/Admin",
  },
};
