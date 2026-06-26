"use client";

import { Card, Badge } from "@/components/ui";
import {
  supabasePrepSafetyBanner,
  supabasePrepNotActive,
} from "@/data/demo/supabasePrepData";
import { providerModeLabel, providerSafetyNotes } from "@/lib/providerMode";

export function SupabasePrepSafetyNotice() {
  return (
    <Card className="mt-4 border-amber-200 bg-amber-50">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-amber-900">Supabase prep only — not live</p>
        <Badge variant="warning">Not connected</Badge>
        <Badge variant="success">Demo remains separate</Badge>
      </div>
      <p className="mt-2 text-sm font-medium text-amber-900">{supabasePrepSafetyBanner}</p>
      <p className="mt-2 text-sm text-amber-800">{providerModeLabel}</p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-amber-900">
        {supabasePrepNotActive.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul className="mt-4 space-y-1 text-xs text-amber-800">
        {providerSafetyNotes.map((note) => (
          <li key={note}>• {note}</li>
        ))}
      </ul>
    </Card>
  );
}
