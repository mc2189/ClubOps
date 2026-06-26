import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataArchitectureClient } from "@/components/settings/DataArchitectureClient";

export default function DataArchitecturePage() {
  return (
    <DashboardLayout>
      <DataArchitectureClient />
    </DashboardLayout>
  );
}
