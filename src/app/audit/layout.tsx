import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsAuditDemoProvider } from "@/components/reports/ReportsAuditDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function AuditLayout({ children }: { children: React.ReactNode }) {
  const initialData = await dataProvider.getReportsAuditPageData();
  return (
    <DashboardLayout>
      <ReportsAuditDemoProvider initialData={initialData}>{children}</ReportsAuditDemoProvider>
    </DashboardLayout>
  );
}
