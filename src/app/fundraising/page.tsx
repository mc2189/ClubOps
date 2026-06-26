import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function FundraisingPage() {
  const campaigns = await dataProvider.getFundraisingCampaigns();

  return (
    <DashboardLayout>
      <PageHeader
        title="Fundraising"
        description="Track fundraising campaigns and donations."
      />
      <PlaceholderNotice module="Fundraising" />
      <div className="mt-6">
        <DataTable headers={["Campaign", "Target", "Raised", "Period", "Status"]}>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{campaign.name}</td>
              <td className="px-4 py-3 text-slate-600">{formatCurrency(campaign.target)}</td>
              <td className="px-4 py-3 font-medium text-slate-900">
                {formatCurrency(campaign.raised)}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
              </td>
              <td className="px-4 py-3">
                <Badge variant={campaign.status === "active" ? "success" : "default"}>
                  {campaign.status}
                </Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
