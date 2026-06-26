import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PrivateDeploymentClient } from "@/components/settings/PrivateDeploymentClient";

export default function PrivateDeploymentPage() {
  return (
    <DashboardLayout>
      <PrivateDeploymentClient />
    </DashboardLayout>
  );
}
