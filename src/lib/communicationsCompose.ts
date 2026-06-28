import type { RecipientGroup, MessageTemplate } from "@/data/providers/types";

export type ComposePresetId =
  | "unpaid-fees"
  | "gift-aid"
  | "missing-forms"
  | "low-attendance"
  | "sponsorship-request"
  | "competition";

export interface ComposePresetConfig {
  id: ComposePresetId;
  label: string;
  groupId: string;
  templateId: string;
  formId?: string;
  sourceModule: string;
  sourceLabel: string;
  whyIncluded: string;
  suggestedNextAction: string;
}

export const COMPOSE_PRESETS: Record<ComposePresetId, ComposePresetConfig> = {
  "unpaid-fees": {
    id: "unpaid-fees",
    label: "Fee reminder",
    groupId: "grp-unpaid-fees",
    templateId: "tpl-fee-reminder",
    sourceModule: "Finance",
    sourceLabel: "Finance unpaid fees",
    whyIncluded:
      "Their linked members have unpaid or part-paid June fees in the Finance demo.",
    suggestedNextAction: "Review the recipient list, then simulate send to see the demo audit trail.",
  },
  "gift-aid": {
    id: "gift-aid",
    label: "Gift Aid declaration request",
    groupId: "grp-missing-giftaid",
    templateId: "tpl-giftaid",
    formId: "form-giftaid",
    sourceModule: "Gift Aid",
    sourceLabel: "Gift Aid declarations",
    whyIncluded:
      "These parents have no valid Gift Aid declaration on file for eligible donations.",
    suggestedNextAction: "Check the attached declaration form preview, then simulate send.",
  },
  "missing-forms": {
    id: "missing-forms",
    label: "Missing consent form request",
    groupId: "grp-missing-consent",
    templateId: "tpl-consent-request",
    formId: "form-consent",
    sourceModule: "Documents",
    sourceLabel: "Documents missing forms",
    whyIncluded:
      "Linked members are missing consent or registration forms in the Documents demo.",
    suggestedNextAction: "Confirm example members, then simulate send — no real forms are issued.",
  },
  "low-attendance": {
    id: "low-attendance",
    label: "Low attendance follow-up",
    groupId: "grp-low-attendance",
    templateId: "tpl-attendance",
    sourceModule: "Attendance",
    sourceLabel: "Attendance follow-up",
    whyIncluded:
      "These members have low attendance in the demo register over recent weeks.",
    suggestedNextAction: "Review the message tone, then simulate send to record a demo action.",
  },
  "sponsorship-request": {
    id: "sponsorship-request",
    label: "Sponsorship request",
    groupId: "grp-business-followup",
    templateId: "tpl-sponsorship",
    sourceModule: "Fundraising",
    sourceLabel: "Fundraising sponsorship",
    whyIncluded:
      "Business contacts flagged for follow-up in the Fundraising demo.",
    suggestedNextAction: "Personalise the demo template if needed, then simulate send.",
  },
  competition: {
    id: "competition",
    label: "Competition update",
    groupId: "grp-competition-update",
    templateId: "tpl-competition",
    sourceModule: "Calendar",
    sourceLabel: "Calendar competition",
    whyIncluded:
      "Parents of gymnasts entered for the upcoming Regional Competition in the demo calendar.",
    suggestedNextAction: "Check travel and arrival times in the preview, then simulate send.",
  },
};

/** Legacy preset exports — keep for existing imports */
export const GIFT_AID_COMPOSE_PRESET = {
  groupId: COMPOSE_PRESETS["gift-aid"].groupId,
  templateId: COMPOSE_PRESETS["gift-aid"].templateId,
  formId: COMPOSE_PRESETS["gift-aid"].formId!,
};

export const UNPAID_FEES_COMPOSE_PRESET = {
  groupId: COMPOSE_PRESETS["unpaid-fees"].groupId,
  templateId: COMPOSE_PRESETS["unpaid-fees"].templateId,
};

export const SPONSORSHIP_COMPOSE_PRESET = {
  groupId: COMPOSE_PRESETS["sponsorship-request"].groupId,
  templateId: COMPOSE_PRESETS["sponsorship-request"].templateId,
};

export function isComposePresetId(value: string | null | undefined): value is ComposePresetId {
  return value != null && value in COMPOSE_PRESETS;
}

export function getComposePreset(preset: string | null | undefined): ComposePresetConfig | null {
  if (!isComposePresetId(preset)) return null;
  return COMPOSE_PRESETS[preset];
}

export interface ComposeContext {
  preset: ComposePresetConfig | null;
  sourceLabel: string;
  sourceModule: string;
  whyIncluded: string;
  suggestedNextAction: string;
  linkedAdminTask: string | null;
}

export function buildComposeContext(
  preset: string | null | undefined,
  group: RecipientGroup | undefined,
  template: MessageTemplate | undefined,
): ComposeContext {
  const presetConfig = getComposePreset(preset);

  if (presetConfig) {
    return {
      preset: presetConfig,
      sourceLabel: presetConfig.sourceLabel,
      sourceModule: presetConfig.sourceModule,
      whyIncluded: presetConfig.whyIncluded,
      suggestedNextAction: presetConfig.suggestedNextAction,
      linkedAdminTask: presetConfig.sourceLabel,
    };
  }

  const sourceModule = group?.sourceModule ?? template?.linkedModule ?? template?.category ?? "Communications";
  const sourceLabel =
    group != null
      ? `${sourceModule} — ${group.name}`
      : template != null
        ? `${sourceModule} — ${template.name}`
        : "Manual compose";

  return {
    preset: null,
    sourceLabel,
    sourceModule,
    whyIncluded:
      group?.whyIncluded ??
      group?.description ??
      "Recipients selected manually in the demo composer.",
    suggestedNextAction: template?.needsReviewBeforeSend
      ? "Review the message carefully before simulating send."
      : "Choose a template or write a message, then simulate send.",
    linkedAdminTask: group ? `${sourceModule}: ${group.name}` : null,
  };
}

export const DEMO_PREVIEW_FOOTER =
  "\n\n—\nThis is a demo preview only. No real email or text will be sent. Contact details shown are fake — do not enter real parent, child or contact information.";

export const COMMUNICATIONS_START_HERE = {
  title: "Send the right message",
  description:
    "Use demo templates and recipient groups to see how volunteers could send reminders, form requests and club updates without checking every record manually.",
  primaryCta: "Compose demo message",
  secondaryCta: "View recipient groups",
  safetyLine: "This demo does not send real emails or texts.",
};

export const SIMULATED_SEND_CONFIRMATION =
  "Demo message prepared. No real emails or texts were sent.";
