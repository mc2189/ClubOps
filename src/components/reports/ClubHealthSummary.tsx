"use client";

import Link from "next/link";
import { Card, Badge } from "@/components/ui";
import type { ClubHealthMetric } from "@/data/providers/types";

export function ClubHealthSummary({ metrics }: { metrics: ClubHealthMetric[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m) => (
        <Card key={m.id}>
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-slate-900">{m.label}</h3>
            <Badge variant={m.status === "good" ? "success" : m.status === "critical" ? "danger" : "warning"}>{m.score}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">{m.summary}</p>
          {m.suggestedAction && m.linkedHref && (
            <Link href={m.linkedHref} className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline">
              {m.suggestedAction} →
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
