import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export default async function CommunicationsPage() {
  const communications = await dataProvider.getCommunications();

  return (
    <DashboardLayout>
      <PageHeader
        title="Communications"
        description="Send emails, notices and messages to members."
      />
      <PlaceholderNotice module="Communications" />
      <div className="mt-6">
        <DataTable headers={["Subject", "Channel", "Sent", "Recipients", "Status"]}>
          {communications.map((com) => (
            <tr key={com.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{com.subject}</td>
              <td className="px-4 py-3 text-slate-600 capitalize">{com.channel}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(com.sentDate)}</td>
              <td className="px-4 py-3 text-slate-600">{com.recipientCount}</td>
              <td className="px-4 py-3">
                <Badge
                  variant={
                    com.status === "sent" ? "success" : com.status === "scheduled" ? "info" : "default"
                  }
                >
                  {com.status}
                </Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
