import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PermissionsClient } from "@/components/settings/PermissionsClient";

export default function SettingsPermissionsPage() {
  return (
    <DashboardLayout>
      <PermissionsClient />
    </DashboardLayout>
  );
}
