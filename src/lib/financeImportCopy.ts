/** Plain-English copy for the guided bank statement review demo */

export const FINANCE_START_HERE = {
  title: "Review club payments",
  description:
    "Use a sample bank statement to see how payments could be matched against member fees, donations and unknown items. No real bank is connected.",
  primaryCta: "Use sample statement",
  secondaryCta: "Review unmatched payments",
} as const;

export const PDF_STATEMENT_DEMO = {
  title: "PDF statement demo",
  description:
    "In a live system, a statement would be read and converted into payment rows. This public demo uses a sample statement so no real bank data is uploaded.",
  warning: "Do not upload real bank statements into this demo.",
} as const;

export const MATCHING_STEPS = [
  "The system looks at names, references and payment amounts.",
  "It compares them with expected fees and donation records.",
  "It suggests likely matches.",
  "A volunteer confirms or rejects each one.",
  "Unmatched payments stay in the review queue.",
] as const;

export const IMPORT_WIZARD_STEPS = [
  "Choose statement",
  "Check payments found",
  "Review suggested matches",
  "Confirm results",
] as const;
