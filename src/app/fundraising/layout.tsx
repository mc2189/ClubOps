import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FundraisingDemoProvider } from "@/components/fundraising/FundraisingDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function FundraisingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await dataProvider.getFundraisingPageData();

  return (
    <DashboardLayout>
      <FundraisingDemoProvider initialData={initialData}>{children}</FundraisingDemoProvider>
    </DashboardLayout>
  );
}
