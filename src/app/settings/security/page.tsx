import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SecuritySettingsClient } from "@/components/settings/SecuritySettingsClient";

export default function SettingsSecurityPage() {
  return (
    <DashboardLayout>
      <SecuritySettingsClient />
    </DashboardLayout>
  );
}
