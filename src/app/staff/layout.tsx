import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StaffDemoProvider } from "@/components/staff/StaffDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await dataProvider.getStaffPageData();

  return (
    <DashboardLayout>
      <StaffDemoProvider initialData={initialData}>{children}</StaffDemoProvider>
    </DashboardLayout>
  );
}
