import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProductionRoadmapClient } from "@/components/settings/ProductionRoadmapClient";

export default function ProductionRoadmapPage() {
  return (
    <DashboardLayout>
      <ProductionRoadmapClient />
    </DashboardLayout>
  );
}
