import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DocumentsDemoProvider } from "@/components/documents/DocumentsDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await dataProvider.getDocumentsPageData();

  return (
    <DashboardLayout>
      <DocumentsDemoProvider initialData={initialData}>{children}</DocumentsDemoProvider>
    </DashboardLayout>
  );
}
