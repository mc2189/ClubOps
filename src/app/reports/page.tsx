import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export default async function ReportsPage() {
  const reports = await dataProvider.getReportSummaries();

  return (
    <DashboardLayout>
      <PageHeader
        title="Reports"
        description="Generate and view membership, finance and attendance reports."
      />
      <PlaceholderNotice module="Reports" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id}>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {report.category}
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">{report.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{report.description}</p>
            <p className="mt-3 text-xs text-slate-400">
              Generated {formatDate(report.generatedDate)}
            </p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
