import { EditMemberClient } from "@/components/members/MemberFormPages";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditMemberClient memberId={id} />;
}
