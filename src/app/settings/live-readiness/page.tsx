import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LiveReadinessClient } from "@/components/settings/LiveReadinessClient";

export default function LiveReadinessPage() {
  return (
    <DashboardLayout>
      <LiveReadinessClient />
    </DashboardLayout>
  );
}
