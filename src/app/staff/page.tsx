import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export default async function StaffPage() {
  const staff = await dataProvider.getStaffMembers();

  return (
    <DashboardLayout>
      <PageHeader
        title="Staff & Volunteers"
        description="Manage coaches, volunteers and safeguarding records."
      />
      <PlaceholderNotice module="Staff & Volunteers" />
      <div className="mt-6">
        <DataTable headers={["Name", "Role", "Email", "DBS Expiry", "Status"]}>
          {staff.map((person) => (
            <tr key={person.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{person.name}</td>
              <td className="px-4 py-3 text-slate-600">{person.role}</td>
              <td className="px-4 py-3 text-slate-600">{person.email}</td>
              <td className="px-4 py-3 text-slate-600">
                {person.dbsExpiry ? formatDate(person.dbsExpiry) : "—"}
              </td>
              <td className="px-4 py-3">
                <Badge variant={person.status === "active" ? "success" : "warning"}>
                  {person.status}
                </Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
