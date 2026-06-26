import { notFound } from "next/navigation";
import { StaffProfileClient } from "@/components/staff/StaffProfileClient";
import { dataProvider } from "@/data/providers";

export default async function StaffProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await dataProvider.getStaffProfile(id);
  if (!profile) notFound();
  return <StaffProfileClient profile={profile} />;
}
