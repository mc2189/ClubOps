"use client";

import { Card, Badge } from "@/components/ui";
import { stackDecisionSafetyWarnings } from "@/data/demo/stackDecisionData";
import { providerModeLabel } from "@/lib/providerMode";

export function StackDecisionSafetyNotice() {
  return (
    <Card className="mt-4 border-amber-200 bg-amber-50">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-amber-900">Decision pack — not implemented yet</p>
        <Badge variant="warning">No real auth</Badge>
        <Badge variant="warning">No database</Badge>
      </div>
      <p className="mt-2 text-sm text-amber-800">{providerModeLabel}</p>
      <ul className="mt-4 space-y-2">
        {stackDecisionSafetyWarnings.map((w) => (
          <li key={w.id} className="text-sm text-amber-900">
            <span className="font-medium">{w.title}:</span> {w.body}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-amber-800">
        This is technical guidance only — not legal or security certification. Requires live security
        review before any real data.
      </p>
    </Card>
  );
}
