import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export default async function DocumentsPage() {
  const documents = await dataProvider.getDocuments();

  return (
    <DashboardLayout>
      <PageHeader
        title="Documents"
        description="Store and manage club policies, forms and files."
      />
      <PlaceholderNotice module="Documents" />
      <div className="mt-6">
        <DataTable headers={["Title", "Category", "Uploaded", "Uploaded By"]}>
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{doc.title}</td>
              <td className="px-4 py-3 text-slate-600">{doc.category}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(doc.uploadedDate)}</td>
              <td className="px-4 py-3 text-slate-600">{doc.uploadedBy}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
