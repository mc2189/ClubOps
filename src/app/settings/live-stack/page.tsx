import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LiveStackClient } from "@/components/settings/LiveStackClient";

export default function LiveStackPage() {
  return (
    <DashboardLayout>
      <LiveStackClient />
    </DashboardLayout>
  );
}
