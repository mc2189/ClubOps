import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CommunicationsDemoProvider } from "@/components/communications/CommunicationsDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function CommunicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await dataProvider.getCommunicationsPageData();

  return (
    <DashboardLayout>
      <CommunicationsDemoProvider initialData={initialData}>{children}</CommunicationsDemoProvider>
    </DashboardLayout>
  );
}
