import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export default async function CalendarPage() {
  const events = await dataProvider.getCalendarEvents();

  return (
    <DashboardLayout>
      <PageHeader
        title="Calendar"
        description="View sessions, competitions, meetings and social events."
      />
      <PlaceholderNotice module="Calendar" />
      <div className="mt-6">
        <DataTable headers={["Event", "Date", "Time", "Location", "Type"]}>
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{event.title}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(event.date)}</td>
              <td className="px-4 py-3 text-slate-600">
                {event.startTime} – {event.endTime}
              </td>
              <td className="px-4 py-3 text-slate-600">{event.location}</td>
              <td className="px-4 py-3">
                <Badge variant="info">{event.type}</Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
