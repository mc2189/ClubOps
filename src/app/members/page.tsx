import { Suspense } from "react";
import { MembersListClient } from "@/components/members/MembersListClient";
import { DemoLoadingCard } from "@/components/demo/DemoLoadingCard";

function MembersLoadingFallback() {
  return (
    <DemoLoadingCard
      title="Getting demo members ready…"
      description="This should only take a moment. If it does not load, refresh the page or return to the Members dashboard."
      backHref="/members"
      backLabel="Back to Members"
    />
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<MembersLoadingFallback />}>
      <MembersListClient />
    </Suspense>
  );
}
