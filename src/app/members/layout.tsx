import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MembersDemoProvider } from "@/components/members/MembersDemoProvider";
import { dataProvider } from "@/data/providers";

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialProfiles = await dataProvider.getMemberProfiles();

  return (
    <DashboardLayout>
      <MembersDemoProvider initialProfiles={initialProfiles}>
        {children}
      </MembersDemoProvider>
    </DashboardLayout>
  );
}
