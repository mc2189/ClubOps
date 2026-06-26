import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RolesClient } from "@/components/settings/RolesClient";

export default function SettingsRolesPage() {
  return (
    <DashboardLayout>
      <RolesClient />
    </DashboardLayout>
  );
}
