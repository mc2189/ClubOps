import { Suspense } from "react";
import { MembersListClient } from "@/components/members/MembersListClient";

export default function MembersPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading members…</p>}>
      <MembersListClient />
    </Suspense>
  );
}
