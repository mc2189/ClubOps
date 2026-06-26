import type {
  FundraisingCampaignDetail,
  DonorRecord,
  BusinessLead,
  SponsorshipTier,
  FundraisingDonationRecord,
  FollowUpTask,
  FundraisingReportItem,
  FundraisingDashboardData,
  FundraisingPageData,
} from "@/data/providers/types";
import type { FundraisingCampaign } from "@/data/providers/types";

export const demoFundraisingCampaigns: FundraisingCampaignDetail[] = [
  {
    id: "fr-001",
    name: "New Equipment Appeal",
    target: 5000,
    raised: 3200,
    startDate: "2026-03-01",
    endDate: "2026-09-30",
    status: "active",
    purpose: "Replace worn floor equipment and purchase new training mats for all squads.",
    linkedDonationIds: ["don-001", "don-003", "don-006"],
    linkedSponsorNames: ["Riverside Fitness Ltd", "Local Business Ltd"],
    documentsPlaceholder: ["Equipment quote PDF", "Sponsor logo — Riverside Fitness"],
    communicationsPlaceholder: ["Campaign update — June", "Sponsorship request — Local Business"],
    recentActivity: ["£500 pledge from Riverside Fitness Ltd", "£25 parent donation — Sarah Thompson"],
  },
  {
    id: "fr-002",
    name: "Competition Travel Fund",
    target: 1500,
    raised: 890,
    startDate: "2026-04-01",
    endDate: "2026-07-15",
    status: "active",
    purpose: "Support squad travel and accommodation for Regional Competition.",
    linkedDonationIds: ["don-004"],
    linkedSponsorNames: [],
    documentsPlaceholder: ["Travel cost estimate"],
    communicationsPlaceholder: ["Competition travel appeal"],
    recentActivity: ["£150 parent donation — Chris Reeves"],
  },
  {
    id: "fr-003",
    name: "General Club Support",
    target: 2000,
    raised: 1240,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
    purpose: "General running costs and volunteer support for the club.",
    linkedDonationIds: ["don-002", "don-007"],
    linkedSponsorNames: ["Demo Community Fund"],
    documentsPlaceholder: [],
    communicationsPlaceholder: ["General fundraising appeal"],
    recentActivity: ["£50 anonymous donation", "£200 community collection"],
  },
  {
    id: "fr-004",
    name: "Hardship/Access Fund",
    target: 1000,
    raised: 350,
    startDate: "2026-02-01",
    endDate: "2026-12-31",
    status: "active",
    purpose: "Help families with membership fees and competition costs where needed.",
    linkedDonationIds: ["don-008"],
    linkedSponsorNames: [],
    documentsPlaceholder: ["Hardship fund policy"],
    communicationsPlaceholder: [],
    recentActivity: ["£50 individual donation"],
  },
  {
    id: "fr-005",
    name: "Training and Coaching Development",
    target: 800,
    raised: 200,
    startDate: "2026-05-01",
    endDate: "2026-10-31",
    status: "active",
    purpose: "Fund coach courses and continuing professional development.",
    linkedDonationIds: [],
    linkedSponsorNames: [],
    documentsPlaceholder: ["BG course fee quote"],
    communicationsPlaceholder: [],
    recentActivity: ["Grant application submitted (placeholder)"],
  },
  {
    id: "fr-006",
    name: "Christmas Raffle 2025",
    target: 1000,
    raised: 1120,
    startDate: "2025-11-01",
    endDate: "2025-12-20",
    status: "completed",
    purpose: "Annual Christmas raffle — not Gift Aid eligible.",
    linkedDonationIds: ["don-005"],
    linkedSponsorNames: [],
    documentsPlaceholder: ["Raffle ticket records"],
    communicationsPlaceholder: [],
    recentActivity: ["Campaign completed — £1,120 raised"],
  },
];

export const demoDonors: DonorRecord[] = [
  { id: "dnr-001", name: "Sarah Thompson", donorType: "parent/carer", totalDonated: 75, lastDonationDate: "2026-06-15", giftAidStatus: "Valid declaration", linkedCampaign: "New Equipment Appeal", thankYouStatus: "sent", followUpStatus: "None" },
  { id: "dnr-002", name: "Anonymous supporter", donorType: "anonymous/community", totalDonated: 50, lastDonationDate: "2026-06-10", thankYouStatus: "needed", followUpStatus: "None" },
  { id: "dnr-003", name: "Riverside Fitness Ltd", donorType: "business", totalDonated: 500, lastDonationDate: "2026-06-01", linkedCampaign: "New Equipment Appeal", thankYouStatus: "sent", followUpStatus: "Renewal due Q1 2027" },
  { id: "dnr-004", name: "Chris Reeves", donorType: "parent/carer", totalDonated: 150, lastDonationDate: "2026-06-08", giftAidStatus: "Valid declaration", linkedCampaign: "Competition Travel Fund", thankYouStatus: "pending", followUpStatus: "Follow-up due" },
  { id: "dnr-005", name: "Local Business Ltd", donorType: "sponsor", totalDonated: 0, linkedCampaign: "New Equipment Appeal", thankYouStatus: "needed", followUpStatus: "Chase pledge — £250 pledged" },
  { id: "dnr-006", name: "Demo Community Fund", donorType: "grant/funder", totalDonated: 200, lastDonationDate: "2026-05-20", linkedCampaign: "General Club Support", thankYouStatus: "sent", followUpStatus: "Send update" },
  { id: "dnr-007", name: "Taylor Brooks", donorType: "individual", totalDonated: 25, lastDonationDate: "2026-06-18", giftAidStatus: "Missing declaration", linkedCampaign: "Hardship/Access Fund", thankYouStatus: "needed", followUpStatus: "Request Gift Aid" },
];

export const demoBusinessLeads: BusinessLead[] = [
  { id: "biz-001", businessName: "Riverside Fitness Ltd", contactPerson: "Alex Morgan", contactPlaceholder: "alex@riverside-fitness.example.com", sector: "Sports & leisure", status: "donated", lastContactDate: "2026-06-01", nextFollowUpDate: "2027-01-15", potentialAmount: 500, pledgedAmount: 500, receivedAmount: 500, sponsorshipTier: "Gold Sponsor", notes: "Logo on competition leotards", suggestedNextAction: "Send renewal reminder Q1 2027" },
  { id: "biz-002", businessName: "Local Business Ltd", contactPerson: "Sam Patel", contactPlaceholder: "info@localbusiness.example.com", sector: "Retail", status: "pledged", lastContactDate: "2026-06-20", nextFollowUpDate: "2026-07-05", potentialAmount: 250, pledgedAmount: 250, receivedAmount: 0, sponsorshipTier: "Silver Sponsor", notes: "Awaiting logo and payment", suggestedNextAction: "Collect pledged donation" },
  { id: "biz-003", businessName: "Demo Print Shop", contactPerson: "Jordan Lee", contactPlaceholder: "orders@demoprint.example.com", sector: "Print & design", status: "interested", lastContactDate: "2026-06-22", nextFollowUpDate: "2026-06-28", potentialAmount: 150, sponsorshipTier: "Bronze Sponsor", suggestedNextAction: "Send sponsorship pack" },
  { id: "biz-004", businessName: "Town Cafe", contactPerson: "Maria Santos", contactPlaceholder: "maria@towncafe.example.com", sector: "Hospitality", status: "contacted", lastContactDate: "2026-06-15", nextFollowUpDate: "2026-07-01", potentialAmount: 100, suggestedNextAction: "Chase reply" },
  { id: "biz-005", businessName: "Sports Direct (local)", contactPerson: "Store manager", contactPlaceholder: "store@example.com", sector: "Retail", status: "not contacted", potentialAmount: 200, suggestedNextAction: "First contact — equipment appeal" },
  { id: "biz-006", businessName: "Old Sponsor Co", contactPerson: "Former contact", contactPlaceholder: "info@oldsponsor.example.com", sector: "Services", status: "renewal due", lastContactDate: "2025-12-01", nextFollowUpDate: "2026-07-01", potentialAmount: 300, receivedAmount: 300, sponsorshipTier: "Event Sponsor", notes: "Annual renewal overdue", suggestedNextAction: "Renew sponsorship" },
  { id: "biz-007", businessName: "Declined Ltd", contactPerson: "Finance dept", contactPlaceholder: "finance@declined.example.com", sector: "Corporate", status: "declined", lastContactDate: "2026-05-10", notes: "No budget this year", suggestedNextAction: "Revisit next year" },
];

export const demoSponsorshipTiers: SponsorshipTier[] = [
  { id: "tier-bronze", name: "Bronze Sponsor", suggestedAmount: 100, benefitsPlaceholder: "Logo on website and newsletter", currentSponsors: ["Demo Print Shop (interested)"], renewalPeriod: "Annual", acknowledgementStatus: "pending" },
  { id: "tier-silver", name: "Silver Sponsor", suggestedAmount: 250, benefitsPlaceholder: "Logo on banners and event programmes", currentSponsors: ["Local Business Ltd (pledged)"], renewalPeriod: "Annual", nextRenewalDate: "2027-06-01", acknowledgementStatus: "needed" },
  { id: "tier-gold", name: "Gold Sponsor", suggestedAmount: 500, benefitsPlaceholder: "Logo on leotards and main banner", currentSponsors: ["Riverside Fitness Ltd"], renewalPeriod: "Annual", nextRenewalDate: "2027-01-15", acknowledgementStatus: "sent" },
  { id: "tier-equipment", name: "Equipment Sponsor", suggestedAmount: 1000, benefitsPlaceholder: "Named equipment item", currentSponsors: [], renewalPeriod: "One-off or annual", acknowledgementStatus: "pending" },
  { id: "tier-event", name: "Event Sponsor", suggestedAmount: 300, benefitsPlaceholder: "Named event sponsorship", currentSponsors: ["Old Sponsor Co (renewal due)"], renewalPeriod: "Per event", nextRenewalDate: "2026-07-01", acknowledgementStatus: "needed" },
  { id: "tier-competition", name: "Competition Sponsor", suggestedAmount: 400, benefitsPlaceholder: "Competition programme and social media", currentSponsors: [], renewalPeriod: "Per competition", acknowledgementStatus: "pending" },
];

export const demoFundraisingDonations: FundraisingDonationRecord[] = [
  { id: "don-001", date: "2026-06-15", donor: "Sarah Thompson", amount: 25, campaign: "New Equipment Appeal", campaignId: "fr-001", donationType: "parent/supporter donation", paymentStatus: "received", giftAidEligibility: "eligible", giftAidDeclarationStatus: "Valid", thankYouStatus: "sent", financeLinkPlaceholder: "Finance — Donation 15/06", giftAidLinkPlaceholder: "Gift Aid — Sarah Thompson" },
  { id: "don-002", date: "2026-06-10", donor: "Anonymous", amount: 50, campaign: "General Club Support", campaignId: "fr-003", donationType: "anonymous/community collection", paymentStatus: "received", giftAidEligibility: "not-eligible", thankYouStatus: "needed", financeLinkPlaceholder: "Finance — Anonymous donation" },
  { id: "don-003", date: "2026-06-01", donor: "Riverside Fitness Ltd", amount: 500, campaign: "New Equipment Appeal", campaignId: "fr-001", donationType: "business donation", paymentStatus: "received", giftAidEligibility: "not-eligible", thankYouStatus: "sent", financeLinkPlaceholder: "Finance — Business donation", giftAidLinkPlaceholder: "Not Gift Aid eligible" },
  { id: "don-004", date: "2026-06-08", donor: "Chris Reeves", amount: 150, campaign: "Competition Travel Fund", campaignId: "fr-002", donationType: "parent/supporter donation", paymentStatus: "received", giftAidEligibility: "eligible", giftAidDeclarationStatus: "Valid", thankYouStatus: "pending", financeLinkPlaceholder: "Finance — Donation 08/06", giftAidLinkPlaceholder: "Gift Aid — Chris Reeves" },
  { id: "don-005", date: "2025-12-15", donor: "Christmas raffle", amount: 1120, campaign: "Christmas Raffle 2025", campaignId: "fr-006", donationType: "raffle income", paymentStatus: "received", giftAidEligibility: "not-eligible", thankYouStatus: "sent", financeLinkPlaceholder: "Finance — Raffle income", giftAidLinkPlaceholder: "Not Gift Aid eligible — raffle" },
  { id: "don-006", date: "2026-05-28", donor: "Sarah Thompson", amount: 50, campaign: "New Equipment Appeal", campaignId: "fr-001", donationType: "individual voluntary donation", paymentStatus: "received", giftAidEligibility: "eligible", giftAidDeclarationStatus: "Valid", thankYouStatus: "sent", financeLinkPlaceholder: "Finance — Donation 28/05" },
  { id: "don-007", date: "2026-05-20", donor: "Demo Community Fund", amount: 200, campaign: "General Club Support", campaignId: "fr-003", donationType: "grant", paymentStatus: "received", giftAidEligibility: "not-eligible", thankYouStatus: "sent", financeLinkPlaceholder: "Finance — Grant income", giftAidLinkPlaceholder: "Not Gift Aid eligible — grant" },
  { id: "don-008", date: "2026-06-18", donor: "Taylor Brooks", amount: 25, campaign: "Hardship/Access Fund", campaignId: "fr-004", donationType: "individual voluntary donation", paymentStatus: "received", giftAidEligibility: "needs-review", giftAidDeclarationStatus: "Missing", thankYouStatus: "needed", financeLinkPlaceholder: "Finance — Donation 18/06", giftAidLinkPlaceholder: "Gift Aid — needs declaration" },
  { id: "don-009", date: "2026-06-20", donor: "Local Business Ltd", amount: 250, campaign: "New Equipment Appeal", campaignId: "fr-001", donationType: "sponsorship", paymentStatus: "pledged", giftAidEligibility: "not-eligible", thankYouStatus: "needed", giftAidLinkPlaceholder: "Not Gift Aid eligible — sponsorship" },
];

export const demoFollowUps: FollowUpTask[] = [
  { id: "fu-001", donorOrBusiness: "Local Business Ltd", taskType: "collect donation", dueDate: "2026-07-05", priority: "high", status: "open", linkedCampaign: "New Equipment Appeal", suggestedAction: "Collect pledged £250" },
  { id: "fu-002", donorOrBusiness: "Demo Print Shop", taskType: "first contact", dueDate: "2026-06-28", priority: "medium", status: "open", linkedCampaign: "New Equipment Appeal", suggestedAction: "Send sponsorship pack" },
  { id: "fu-003", donorOrBusiness: "Chris Reeves", taskType: "send thank-you", dueDate: "2026-06-25", priority: "medium", status: "overdue", linkedCampaign: "Competition Travel Fund", suggestedAction: "Prepare thank-you message" },
  { id: "fu-004", donorOrBusiness: "Taylor Brooks", taskType: "confirm pledge", dueDate: "2026-07-01", priority: "medium", status: "open", linkedCampaign: "Hardship/Access Fund", suggestedAction: "Request Gift Aid declaration" },
  { id: "fu-005", donorOrBusiness: "Old Sponsor Co", taskType: "renew sponsorship", dueDate: "2026-07-01", priority: "high", status: "open", suggestedAction: "Send renewal reminder" },
  { id: "fu-006", donorOrBusiness: "Town Cafe", taskType: "chase reply", dueDate: "2026-07-01", priority: "low", status: "open", suggestedAction: "Follow up on initial contact" },
  { id: "fu-007", donorOrBusiness: "Anonymous supporter", taskType: "send thank-you", dueDate: "2026-06-20", priority: "low", status: "overdue", linkedCampaign: "General Club Support", suggestedAction: "Acknowledge anonymous donation" },
  { id: "fu-008", donorOrBusiness: "Demo Community Fund", taskType: "send update", dueDate: "2026-07-10", priority: "low", status: "open", linkedCampaign: "General Club Support", suggestedAction: "Send campaign progress update" },
];

export const demoFundraisingReports: FundraisingReportItem[] = [
  { id: "rpt-001", title: "Campaign summary", description: "Progress across all active campaigns", category: "Campaigns" },
  { id: "rpt-002", title: "Donor summary", description: "Donors by type, total given and Gift Aid status", category: "Donors" },
  { id: "rpt-003", title: "Business pipeline", description: "Leads by status — contacted, interested, pledged", category: "Businesses" },
  { id: "rpt-004", title: "Sponsorship renewal report", description: "Sponsors due for renewal in next 90 days", category: "Sponsorships" },
  { id: "rpt-005", title: "Gift Aid opportunity report", description: "Eligible donations missing declarations", category: "Gift Aid" },
  { id: "rpt-006", title: "Follow-up report", description: "Open and overdue follow-up tasks", category: "Follow-ups" },
  { id: "rpt-007", title: "Thank-you outstanding", description: "Donations and pledges needing acknowledgement", category: "Communications" },
];

export const demoFundraisingDashboard: FundraisingDashboardData = {
  raisedThisMonth: 925,
  raisedThisYear: 5880,
  activeCampaigns: 5,
  businessesContacted: 5,
  pledgesOutstanding: 1,
  followUpsDue: 6,
  thankYouOutstanding: 4,
  potentialGiftAid: 187.5,
  sponsorshipRenewalsDue: 2,
};

export const demoFundraisingPageData: FundraisingPageData = {
  dashboard: demoFundraisingDashboard,
  campaigns: demoFundraisingCampaigns,
  donors: demoDonors,
  businesses: demoBusinessLeads,
  sponsorships: demoSponsorshipTiers,
  donations: demoFundraisingDonations,
  followUps: demoFollowUps,
  reports: demoFundraisingReports,
};

function toLegacyCampaign(c: FundraisingCampaignDetail): FundraisingCampaign {
  return {
    id: c.id,
    name: c.name,
    target: c.target,
    raised: c.raised,
    startDate: c.startDate,
    endDate: c.endDate,
    status: c.status,
  };
}

/** Legacy for getFundraisingCampaigns() */
export const demoFundraising: FundraisingCampaign[] = demoFundraisingCampaigns.map(toLegacyCampaign);

export function getFundraisingCampaignById(id: string): FundraisingCampaignDetail | null {
  return demoFundraisingCampaigns.find((c) => c.id === id) ?? null;
}
