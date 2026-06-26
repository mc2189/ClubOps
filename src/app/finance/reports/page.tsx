import { FinanceReportsClient } from "@/components/finance/FinanceReportsClient";
import { dataProvider } from "@/data/providers";

export default async function FinanceReportsPage() {
  const reports = await dataProvider.getFinanceReports();
  return <FinanceReportsClient reports={reports} />;
}
