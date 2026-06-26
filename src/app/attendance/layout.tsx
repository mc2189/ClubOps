import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AttendanceDemoProvider } from "@/components/attendance/AttendanceDemoProvider";
import { dataProvider } from "@/data/providers";
import { buildSessionRegister, demoCompletedRegisterMarks } from "@/data/demo/attendanceData";

export default async function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessions, dashboard] = await Promise.all([
    dataProvider.getSessionClasses(),
    dataProvider.getAttendanceDashboard(),
  ]);

  const initialRegisters: Record<string, ReturnType<typeof buildSessionRegister>> = {};
  for (const session of sessions) {
    initialRegisters[session.id] = buildSessionRegister(
      session.id,
      demoCompletedRegisterMarks[session.id],
    );
  }

  return (
    <DashboardLayout>
      <AttendanceDemoProvider
        initialSessions={sessions}
        initialDashboard={dashboard}
        initialRegisters={initialRegisters}
      >
        {children}
      </AttendanceDemoProvider>
    </DashboardLayout>
  );
}
