import { AttendanceReportsClient } from "@/components/attendance/AttendanceReportsClient";
import { dataProvider } from "@/data/providers";

export default async function AttendanceReportsPage() {
  const reports = await dataProvider.getAttendanceReports();
  return <AttendanceReportsClient reports={reports} />;
}
