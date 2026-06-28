import type {
  RecipientGroup,
  MessageTemplate,
  DemoForm,
  InboxResponse,
  MessageHistoryRecord,
  RoutingRule,
  CommunicationsDashboardData,
  CommunicationsPageData,
} from "@/data/providers/types";
import type { Communication } from "@/data/providers/types";
import { DEMO_OUTSTANDING_FEE_COUNT } from "@/data/demo/fees";

export const demoRecipientGroups: RecipientGroup[] = [
  {
    id: "grp-all-parents",
    name: "All parents",
    description: "Every parent/carer on file",
    whyIncluded: "All active parent/carer contacts in the demo member records.",
    recipientCount: 9,
    sourceModule: "Members",
    exampleRecipients: ["Sarah Thompson", "Chris Reeves", "Wei Chen"],
    isDynamic: true,
    lastContacted: "2026-06-20",
  },
  {
    id: "grp-active-parents",
    name: "Active members' parents",
    description: "Parents of active junior members",
    whyIncluded: "Parents linked to members with active status in the demo.",
    recipientCount: 7,
    sourceModule: "Members",
    exampleRecipients: ["Sarah Thompson", "Fiona Walsh", "Anna Fletcher"],
    isDynamic: true,
  },
  {
    id: "grp-whole-squad",
    name: "Whole squad",
    description: "All competitive squad members and parents",
    whyIncluded: "Competitive squad members and their parents from attendance groups.",
    recipientCount: 6,
    sourceModule: "Attendance",
    exampleRecipients: ["Jordan Reeves", "Morgan Fletcher", "Quinn Walsh"],
    isDynamic: true,
  },
  {
    id: "grp-dev-parents",
    name: "Development squad parents",
    description: "Parents in Tuesday Development Squad",
    whyIncluded: "Parents of gymnasts in the Tuesday Development Squad session.",
    recipientCount: 3,
    sourceModule: "Attendance",
    exampleRecipients: ["Sarah Thompson", "Wei Chen"],
    isDynamic: true,
  },
  {
    id: "grp-comp-parents",
    name: "Competition squad parents",
    description: "Parents in Friday/Thursday competition groups",
    whyIncluded: "Parents of gymnasts in competition training groups.",
    recipientCount: 3,
    sourceModule: "Attendance",
    exampleRecipients: ["Chris Reeves", "Fiona Walsh"],
    isDynamic: true,
  },
  {
    id: "grp-competition-update",
    name: "Competition update group",
    description: "Parents of gymnasts entered for Regional Competition",
    whyIncluded: "Gymnasts entered for Regional Competition on 12 July in the demo calendar.",
    recipientCount: 4,
    sourceModule: "Calendar",
    exampleRecipients: ["Chris Reeves", "Fiona Walsh", "Anna Fletcher"],
    isDynamic: true,
  },
  {
    id: "grp-tuesday-rec",
    name: "Tuesday Recreational class",
    description: "Recreational — Tuesday group",
    whyIncluded: "Members and parents assigned to the Tuesday recreational class.",
    recipientCount: 3,
    sourceModule: "Members",
    exampleRecipients: ["Alex Thompson", "Riley Chen"],
    isDynamic: true,
  },
  {
    id: "grp-coaches",
    name: "Coaches",
    description: "All coaching staff",
    whyIncluded: "All coaching staff on the demo rota.",
    recipientCount: 4,
    sourceModule: "Staff",
    exampleRecipients: ["Morgan Ellis", "Jamie Hart"],
    isDynamic: true,
  },
  {
    id: "grp-committee",
    name: "Committee",
    description: "Club committee members",
    whyIncluded: "Committee role holders in demo settings.",
    recipientCount: 5,
    sourceModule: "Settings",
    exampleRecipients: ["Demo Admin", "Demo Treasurer"],
    isDynamic: false,
  },
  {
    id: "grp-unpaid-fees",
    name: "Parents with unpaid fees",
    description: "Members with outstanding fees (overdue, unpaid or partial)",
    whyIncluded:
      "Their linked members have unpaid or part-paid June fees in the Finance demo.",
    recipientCount: DEMO_OUTSTANDING_FEE_COUNT,
    sourceModule: "Finance",
    exampleRecipients: ["Wei Chen", "Anna Fletcher", "Raj Singh", "Fiona Walsh"],
    isDynamic: true,
    lastContacted: "2026-06-25",
  },
  {
    id: "grp-missing-giftaid",
    name: "Parents missing Gift Aid declarations",
    description: "No valid Gift Aid declaration on file",
    whyIncluded: "No valid Gift Aid declaration recorded for eligible donations in the demo.",
    recipientCount: 3,
    sourceModule: "Gift Aid",
    exampleRecipients: ["Wei Chen", "Anna Fletcher", "Raj Singh"],
    isDynamic: true,
  },
  {
    id: "grp-missing-consent",
    name: "Missing consent forms",
    description: "Members with incomplete consent or registration forms",
    whyIncluded: "Consent or registration forms marked missing in Documents and member records.",
    recipientCount: 2,
    sourceModule: "Documents",
    exampleRecipients: ["Fiona Walsh", "Raj Singh"],
    isDynamic: true,
  },
  {
    id: "grp-low-attendance",
    name: "Low attendance follow-up",
    description: "Members with low attendance over recent weeks",
    whyIncluded: "Attendance register shows low attendance tier for these demo members.",
    recipientCount: 2,
    sourceModule: "Attendance",
    exampleRecipients: ["Avery Singh", "Riley Chen"],
    isDynamic: true,
  },
  {
    id: "grp-incomplete-emergency",
    name: "Incomplete emergency contact",
    description: "Missing or partial emergency contact details",
    whyIncluded: "Emergency contact fields incomplete on member profiles.",
    recipientCount: 2,
    sourceModule: "Members",
    exampleRecipients: ["Wei Chen", "Raj Singh"],
    isDynamic: true,
  },
  {
    id: "grp-medical-update",
    name: "Medical update needed",
    description: "Members flagged for medical/contact review",
    whyIncluded: "Medical flag or review date due on demo member profiles.",
    recipientCount: 2,
    sourceModule: "Members",
    exampleRecipients: ["Jordan Reeves", "Riley Chen"],
    isDynamic: true,
  },
  {
    id: "grp-fundraising-supporters",
    name: "Fundraising supporters",
    description: "Donors and parents who opted into fundraising updates",
    whyIncluded: "Donors and supporters linked to active fundraising campaigns in the demo.",
    recipientCount: 4,
    sourceModule: "Fundraising",
    exampleRecipients: ["Sarah Thompson", "Anonymous donor", "Taylor Brooks"],
    isDynamic: true,
  },
  {
    id: "grp-sponsors",
    name: "Sponsors/donors",
    description: "Individual donors and sponsors",
    whyIncluded: "Individual donor records in the Fundraising demo.",
    recipientCount: 2,
    sourceModule: "Fundraising",
    exampleRecipients: ["Anonymous donor", "Taylor Brooks"],
    isDynamic: true,
  },
  {
    id: "grp-business-followup",
    name: "Businesses awaiting follow-up",
    description: "Business contacts from fundraising",
    whyIncluded: "Business sponsorship contacts flagged for follow-up in Fundraising.",
    recipientCount: 1,
    sourceModule: "Fundraising",
    exampleRecipients: ["Local Business Ltd"],
    isDynamic: true,
  },
];

export const demoMessageTemplates: MessageTemplate[] = [
  {
    id: "tpl-giftaid",
    name: "Gift Aid declaration request",
    category: "Gift Aid",
    purpose: "Ask parents to complete a UK Gift Aid declaration for eligible donations.",
    whenToUse: "When Gift Aid declarations are missing or expired before preparing a claim.",
    linkedModule: "Gift Aid",
    needsReviewBeforeSend: true,
    subject: "Gift Aid declaration — {{member_first_name}}",
    body: `Dear {{parent_first_name}},

We would like to invite you to complete a Gift Aid declaration for Arbroath Gymnastics Club.

If you are a UK taxpayer, the club can claim an extra 25p for every £1 you donate at no cost to you. This only applies to genuine voluntary donations — not class fees.

Please complete the form: {{form_link}}

Kind regards,
Arbroath Gymnastics Club`,
    linkedFormId: "form-giftaid",
  },
  {
    id: "tpl-fee-reminder",
    name: "Fee reminder",
    category: "Finance",
    purpose: "Remind parents about outstanding membership fees.",
    whenToUse: "When member fees are unpaid or part-paid in Finance.",
    linkedModule: "Finance",
    needsReviewBeforeSend: true,
    subject: "Reminder about June club fees",
    body: `Dear {{parent_first_name}},

Our records show an outstanding membership fee of {{amount_due}} for {{member_first_name}}.

Please arrange payment at your earliest convenience.

Kind regards,
Arbroath Gymnastics Club`,
  },
  {
    id: "tpl-consent-request",
    name: "Missing consent form request",
    category: "Documents",
    purpose: "Request missing consent or registration forms from parents.",
    whenToUse: "When consent forms are missing on member or document records.",
    linkedModule: "Documents",
    needsReviewBeforeSend: true,
    subject: "Please return your consent form — {{member_first_name}}",
    body: `Dear {{parent_first_name}},

Our records show we are still missing a consent form for {{member_first_name}}.

Please complete and return the form: {{form_link}}

Kind regards,
Arbroath Gymnastics Club`,
    linkedFormId: "form-consent",
  },
  {
    id: "tpl-class-cancel",
    name: "Class cancellation",
    category: "Attendance",
    purpose: "Notify parents that a class or session is cancelled.",
    whenToUse: "When a scheduled session is cancelled at short notice.",
    linkedModule: "Attendance",
    needsReviewBeforeSend: true,
    subject: "{{class_name}} cancelled — {{event_date}}",
    body: `Dear {{parent_first_name}},

Please note that {{class_name}} on {{event_date}} has been cancelled.

Apologies for any inconvenience.

Kind regards,
Arbroath Gymnastics Club`,
  },
  {
    id: "tpl-competition",
    name: "Competition notice",
    category: "Calendar",
    purpose: "Share travel, timing and entry details for a competition.",
    whenToUse: "Before a competition or event with entered gymnasts.",
    linkedModule: "Calendar",
    needsReviewBeforeSend: true,
    subject: "{{event_name}} — important information",
    body: `Dear {{parent_first_name}},

This is a reminder about {{event_name}} on {{event_date}}.

Please ensure {{member_first_name}} arrives 30 minutes before the start time.

Kind regards,
Arbroath Gymnastics Club`,
  },
  {
    id: "tpl-medical",
    name: "Medical/contact update request",
    category: "Members",
    purpose: "Ask parents to review and update medical or emergency contact details.",
    whenToUse: "When medical or contact information needs refreshing on member records.",
    linkedModule: "Members",
    needsReviewBeforeSend: true,
    subject: "Please update medical and contact details",
    body: `Dear {{parent_first_name}},

Please review and update medical and emergency contact details for {{member_first_name}}.

Complete the form: {{form_link}}

Kind regards,
Arbroath Gymnastics Club`,
    linkedFormId: "form-medical",
  },
  {
    id: "tpl-sponsorship",
    name: "Sponsorship request",
    category: "Fundraising",
    purpose: "Ask local businesses or contacts about sponsorship opportunities.",
    whenToUse: "When following up business contacts from a fundraising campaign.",
    linkedModule: "Fundraising",
    needsReviewBeforeSend: true,
    subject: "Sponsorship opportunity — Arbroath Gymnastics Club",
    body: `Dear {{parent_first_name}},

We are seeking local business sponsors for our upcoming equipment fund.

If you know a business that might support us, please get in touch.

Kind regards,
Arbroath Gymnastics Club`,
  },
  {
    id: "tpl-fundraising",
    name: "Fundraising appeal",
    category: "Fundraising",
    purpose: "Invite supporters to contribute to an active fundraiser.",
    whenToUse: "When promoting a campaign to donors and engaged parents.",
    linkedModule: "Fundraising",
    needsReviewBeforeSend: true,
    subject: "Support our {{event_name}} fundraiser",
    body: `Dear {{parent_first_name}},

We are running a fundraiser and would appreciate your support.

Every donation helps — thank you!

Kind regards,
Arbroath Gymnastics Club`,
  },
  {
    id: "tpl-announcement",
    name: "General announcement",
    category: "General",
    purpose: "General club update to a broad parent or member group.",
    whenToUse: "For news, schedule changes or club-wide updates.",
    linkedModule: "Communications",
    needsReviewBeforeSend: true,
    subject: "Club announcement",
    body: `Dear {{parent_first_name}},

[Your message here]

Kind regards,
Arbroath Gymnastics Club`,
  },
  {
    id: "tpl-attendance",
    name: "Attendance follow-up",
    category: "Attendance",
    purpose: "Check in with parents when a member has missed recent sessions.",
    whenToUse: "When attendance is low and a friendly welfare check is appropriate.",
    linkedModule: "Attendance",
    needsReviewBeforeSend: true,
    subject: "Attendance follow-up — {{member_first_name}}",
    body: `Dear {{parent_first_name}},

We noticed {{member_first_name}} has missed recent sessions. Is everything okay?

Please let us know if there is anything we can help with.

Kind regards,
Arbroath Gymnastics Club`,
  },
  {
    id: "tpl-coach",
    name: "Coach availability request",
    category: "Staff",
    purpose: "Ask coaches to confirm availability for a session or event.",
    whenToUse: "When checking rota cover or event staffing.",
    linkedModule: "Staff",
    needsReviewBeforeSend: false,
    subject: "Coach availability — {{event_date}}",
    body: `Hi,

Can you confirm availability for {{event_name}} on {{event_date}}?

Please reply using the form: {{form_link}}

Thanks,
Arbroath Gymnastics Club`,
    linkedFormId: "form-coach",
  },
];

export const demoForms: DemoForm[] = [
  { id: "form-giftaid", name: "Gift Aid declaration", purpose: "Capture UK taxpayer Gift Aid declaration", linkedModule: "Gift Aid", status: "active", lastSent: "2026-06-01", responsesReceived: 4, responsesNeedingReview: 1 },
  { id: "form-medical", name: "Medical update", purpose: "Update medical information and allergies", linkedModule: "Members", status: "active", lastSent: "2026-05-15", responsesReceived: 2, responsesNeedingReview: 1 },
  { id: "form-emergency", name: "Emergency contact update", purpose: "Update emergency contact details", linkedModule: "Members", status: "active", responsesReceived: 1, responsesNeedingReview: 0 },
  { id: "form-consent", name: "Consent form", purpose: "Photo/video and general consent", linkedModule: "Members", status: "active", responsesReceived: 6, responsesNeedingReview: 0 },
  { id: "form-event", name: "Event permission", purpose: "Permission for competitions and trips", linkedModule: "Calendar", status: "active", lastSent: "2026-06-10", responsesReceived: 3, responsesNeedingReview: 0 },
  { id: "form-coach", name: "Coach availability", purpose: "Coach session availability response", linkedModule: "Staff", status: "active", responsesReceived: 2, responsesNeedingReview: 0 },
];

export const demoInboxResponses: InboxResponse[] = [
  { id: "inb-001", sender: "sarah.thompson@example.com", subject: "Re: Gift Aid declaration", detectedType: "Gift Aid declaration", matchedRecord: "Sarah Thompson → Alex Thompson", matchedMemberId: "mem-001", confidence: 96, suggestedAction: "File to Gift Aid declaration record", status: "auto-filed", linkedModule: "Gift Aid" },
  { id: "inb-002", sender: "chris.reeves@example.com", subject: "Medical update form — Jordan", detectedType: "Medical update", matchedRecord: "Jordan Reeves", matchedMemberId: "mem-002", confidence: 94, suggestedAction: "Flag sensitive review — update medical record", status: "needs-review", linkedModule: "Members" },
  { id: "inb-003", sender: "wei.chen@example.com", subject: "Emergency contact details", detectedType: "Emergency contact update", matchedRecord: "Riley Chen", matchedMemberId: "mem-005", confidence: 91, suggestedAction: "Ready to update member emergency contact", status: "auto-filed", linkedModule: "Members" },
  { id: "inb-004", sender: "fiona.walsh@example.com", subject: "Regional Competition permission", detectedType: "Event permission", matchedRecord: "Quinn Walsh → Regional Competition", matchedMemberId: "mem-009", confidence: 88, suggestedAction: "Link permission to calendar event", status: "auto-filed", linkedModule: "Calendar" },
  { id: "inb-005", sender: "raj.singh@example.com", subject: "Question about fees", detectedType: "Fee query", matchedRecord: "Avery Singh", matchedMemberId: "mem-008", confidence: 72, suggestedAction: "Route to Finance — unpaid fees", status: "needs-review", linkedModule: "Finance" },
  { id: "inb-006", sender: "info@localbusiness.example.com", subject: "Re: Sponsorship opportunity", detectedType: "Sponsor reply", matchedRecord: "Local Business Ltd", confidence: 85, suggestedAction: "Route to Fundraising", status: "auto-filed", linkedModule: "Fundraising" },
  { id: "inb-007", sender: "unknown@example.com", subject: "Form submission", detectedType: "Unknown form", matchedRecord: "Unmatched sender", confidence: 42, suggestedAction: "Manual review required", status: "unresolved", linkedModule: "Communications" },
];

export const demoMessageHistory: MessageHistoryRecord[] = [
  { id: "hist-001", dateTime: "2026-06-20T10:00:00Z", sender: "Demo Secretary", recipientGroup: "All parents", subject: "Summer term schedule update", templateUsed: "General announcement", status: "simulated", linkedModule: "Communications", auditReference: "aud-com-001" },
  { id: "hist-002", dateTime: "2026-06-18T14:30:00Z", sender: "Demo Secretary", recipientGroup: "Committee", subject: "Club AGM — save the date", status: "simulated", linkedModule: "Communications", auditReference: "aud-com-002" },
  { id: "hist-003", dateTime: "2026-06-25T09:00:00Z", sender: "Demo Treasurer", recipientGroup: "Parents with unpaid fees", subject: "Outstanding membership fees reminder", templateUsed: "Fee reminder", formsAttached: [], status: "scheduled", linkedModule: "Finance", auditReference: "aud-com-003" },
  { id: "hist-004", dateTime: "2026-06-15T11:00:00Z", sender: "Demo Secretary", recipientGroup: "Coaches", subject: "Charity bake sale volunteers needed", status: "draft", linkedModule: "Fundraising" },
];

export const demoRoutingRules: RoutingRule[] = [
  { id: "rule-001", condition: "Subject or form type is Gift Aid and sender matches parent email", action: "Link to parent/carer and Gift Aid declaration record", priority: 1 },
  { id: "rule-002", condition: "Form type is medical update", action: "Link to member profile and mark sensitive review required", priority: 2 },
  { id: "rule-003", condition: "Form type is emergency contact update", action: "Link to member and queue contact record update", priority: 3 },
  { id: "rule-004", condition: "Message mentions unpaid fees or payment", action: "Route to Finance module for treasurer review", priority: 4 },
  { id: "rule-005", condition: "Sender domain or name matches sponsor/business record", action: "Route to Fundraising module", priority: 5 },
  { id: "rule-006", condition: "Form type is event permission", action: "Link to calendar event and member record", priority: 6 },
  { id: "rule-007", condition: "Match confidence below 70%", action: "Flag for human review — do not auto-file", priority: 7 },
];

export const demoCommunicationsDashboard: CommunicationsDashboardData = {
  draftCount: 1,
  sentCount: 2,
  pendingFormResponses: 3,
  repliesNeedingReview: 2,
  bouncedPlaceholder: 0,
  giftAidCampaignPending: true,
  unpaidFeeCampaignPending: true,
  upcomingCompetitionMessage: "Regional Competition — 12 July",
};

export const demoCommunicationsPageData: CommunicationsPageData = {
  dashboard: demoCommunicationsDashboard,
  groups: demoRecipientGroups,
  templates: demoMessageTemplates,
  forms: demoForms,
  inbox: demoInboxResponses,
  history: demoMessageHistory,
  rules: demoRoutingRules,
};

/** Legacy for getCommunications() */
export const demoCommunications: Communication[] = demoMessageHistory.map((h) => ({
  id: h.id,
  subject: h.subject,
  channel: "email" as const,
  sentDate: h.dateTime.slice(0, 10),
  recipientCount: h.status === "draft" ? 0 : 42,
  status: h.status === "draft" ? "draft" : h.status === "scheduled" ? "scheduled" : "sent",
}));
