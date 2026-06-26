import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RecommendedStackClient } from "@/components/settings/RecommendedStackClient";

export default function RecommendedStackPage() {
  return (
    <DashboardLayout>
      <RecommendedStackClient />
    </DashboardLayout>
  );
}
