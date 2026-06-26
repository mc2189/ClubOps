import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CalendarClient } from "@/components/calendar/CalendarClient";
import { dataProvider } from "@/data/providers";

export default async function CalendarPage() {
  const data = await dataProvider.getCalendarPageData();

  return (
    <DashboardLayout>
      <CalendarClient data={data} />
    </DashboardLayout>
  );
}
