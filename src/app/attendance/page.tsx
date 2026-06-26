import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export default async function AttendancePage() {
  const records = await dataProvider.getAttendanceRecords();

  return (
    <DashboardLayout>
      <PageHeader
        title="Attendance"
        description="Track session attendance across all groups."
      />
      <PlaceholderNotice module="Attendance" />
      <div className="mt-6">
        <DataTable headers={["Session", "Date", "Member", "Present"]}>
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{record.sessionName}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(record.sessionDate)}</td>
              <td className="px-4 py-3 text-slate-600">{record.memberName}</td>
              <td className="px-4 py-3">
                <Badge variant={record.present ? "success" : "danger"}>
                  {record.present ? "Present" : "Absent"}
                </Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
