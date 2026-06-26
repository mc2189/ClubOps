import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";

export default async function AuditPage() {
  const events = await dataProvider.getAuditEvents();

  return (
    <DashboardLayout>
      <PageHeader
        title="Audit Log"
        description="View activity and change history across the club."
      />
      <PlaceholderNotice module="Audit Log" />
      <div className="mt-6">
        <DataTable headers={["Timestamp", "Actor", "Action", "Resource", "Details"]}>
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-600">
                {new Date(event.timestamp).toLocaleString("en-GB")}
              </td>
              <td className="px-4 py-3 font-medium text-slate-900">{event.actor}</td>
              <td className="px-4 py-3">
                <Badge variant="info">{event.action}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-600">{event.resource}</td>
              <td className="px-4 py-3 text-slate-600">{event.details}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
