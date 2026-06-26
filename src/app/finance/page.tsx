import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function FinancePage() {
  const transactions = await dataProvider.getFinanceTransactions();

  return (
    <DashboardLayout>
      <PageHeader
        title="Finance"
        description="Track income, expenses and membership fees."
      />
      <PlaceholderNotice module="Finance" />
      <div className="mt-6">
        <DataTable headers={["Date", "Description", "Category", "Type", "Amount"]}>
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-600">{formatDate(tx.date)}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
              <td className="px-4 py-3 text-slate-600">{tx.category}</td>
              <td className="px-4 py-3">
                <Badge variant={tx.type === "income" ? "success" : "warning"}>
                  {tx.type}
                </Badge>
              </td>
              <td className="px-4 py-3 font-medium text-slate-900">
                {formatCurrency(tx.amount)}
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
