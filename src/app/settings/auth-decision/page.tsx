import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AuthDecisionClient } from "@/components/settings/AuthDecisionClient";

export default function AuthDecisionPage() {
  return (
    <DashboardLayout>
      <AuthDecisionClient />
    </DashboardLayout>
  );
}
