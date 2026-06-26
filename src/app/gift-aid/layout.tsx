import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GiftAidDemoProvider } from "@/components/gift-aid/GiftAidDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function GiftAidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await dataProvider.getGiftAidPageData();

  return (
    <DashboardLayout>
      <GiftAidDemoProvider initialData={initialData}>{children}</GiftAidDemoProvider>
    </DashboardLayout>
  );
}
