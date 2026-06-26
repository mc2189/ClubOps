import { Suspense } from "react";
import { MemberProfileClient } from "@/components/members/MemberProfileClient";

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading member…</p>}>
      <MemberProfileClient memberId={id} />
    </Suspense>
  );
}
