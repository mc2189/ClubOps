import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function GiftAidPage() {
  const declarations = await dataProvider.getGiftAidDeclarations();

  return (
    <DashboardLayout>
      <PageHeader
        title="Gift Aid"
        description="Manage Gift Aid declarations and claim eligibility."
      />
      <PlaceholderNotice module="Gift Aid" />
      <div className="mt-6">
        <DataTable headers={["Member", "Declared", "Status", "Eligible Amount"]}>
          {declarations.map((decl) => (
            <tr key={decl.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{decl.memberName}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(decl.declaredDate)}</td>
              <td className="px-4 py-3">
                <Badge variant={decl.status === "active" ? "success" : "warning"}>
                  {decl.status}
                </Badge>
              </td>
              <td className="px-4 py-3 font-medium text-slate-900">
                {formatCurrency(decl.amountEligible)}
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
