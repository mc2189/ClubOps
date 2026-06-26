import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinanceDemoProvider } from "@/components/finance/FinanceDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dashboard, fees, expenses, transactions, members] = await Promise.all([
    dataProvider.getFinanceDashboard(),
    dataProvider.getFeeRecords(),
    dataProvider.getExpenseRecords(),
    dataProvider.getFinanceTransactions(),
    dataProvider.getMemberProfiles(),
  ]);

  return (
    <DashboardLayout>
      <FinanceDemoProvider
        initialDashboard={dashboard}
        initialFees={fees}
        initialExpenses={expenses}
        initialTransactions={transactions}
        members={members}
      >
        {children}
      </FinanceDemoProvider>
    </DashboardLayout>
  );
}
