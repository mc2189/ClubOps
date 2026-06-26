import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, DataTable, Badge, PlaceholderNotice } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export default async function MembersPage() {
  const members = await dataProvider.getMembers();

  return (
    <DashboardLayout>
      <PageHeader
        title="Members"
        description="Manage member records, membership types and status."
      />
      <PlaceholderNotice module="Members" />
      <div className="mt-6">
        <DataTable headers={["Name", "Email", "Type", "Status", "Joined"]}>
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">
                {member.firstName} {member.lastName}
              </td>
              <td className="px-4 py-3 text-slate-600">{member.email}</td>
              <td className="px-4 py-3 text-slate-600">{member.membershipType}</td>
              <td className="px-4 py-3">
                <Badge variant={member.status === "active" ? "success" : "warning"}>
                  {member.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-slate-600">{formatDate(member.joinedDate)}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
