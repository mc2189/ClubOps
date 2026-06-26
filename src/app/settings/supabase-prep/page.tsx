import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SupabasePrepClient } from "@/components/settings/SupabasePrepClient";

export default function SupabasePrepPage() {
  return (
    <DashboardLayout>
      <SupabasePrepClient />
    </DashboardLayout>
  );
}
