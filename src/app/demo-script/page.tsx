import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DemoScriptClient } from "@/components/reports/DemoScriptClient";
import { dataProvider } from "@/data/providers";

export default async function DemoScriptPage() {
  const data = await dataProvider.getReportsAuditPageData();
  return (
    <DashboardLayout>
      <DemoScriptClient steps={data.demoScript} />
    </DashboardLayout>
  );
}
