import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProviderModelClient } from "@/components/settings/ProviderModelClient";

export default function ProviderModelPage() {
  return (
    <DashboardLayout>
      <ProviderModelClient />
    </DashboardLayout>
  );
}
