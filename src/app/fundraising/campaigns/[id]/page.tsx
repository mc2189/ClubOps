import { notFound } from "next/navigation";
import { CampaignDetailClient } from "@/components/fundraising/CampaignDetailClient";
import { dataProvider } from "@/data/providers";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = await dataProvider.getFundraisingCampaign(id);
  if (!campaign) notFound();
  return <CampaignDetailClient campaign={campaign} />;
}
