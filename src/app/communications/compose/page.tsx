import { Suspense } from "react";
import { ComposeClient } from "@/components/communications/ComposeClient";

export default function ComposePage() {
  return (
    <Suspense fallback={<p className="p-4 text-sm text-slate-500">Loading composer…</p>}>
      <ComposeClient />
    </Suspense>
  );
}
