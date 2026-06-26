"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import {
  demoModeStatus,
  liveReadinessChecklist,
  type LiveReadinessCheckItem,
} from "@/data/demo/architectureData";
import { providerModeLabel } from "@/lib/providerMode";

const statusVariant = (s: LiveReadinessCheckItem["status"]) => {
  switch (s) {
    case "ready":
      return "success" as const;
    case "partial":
      return "warning" as const;
    default:
      return "default" as const;
  }
};

const statusLabel = { ready: "Ready", partial: "Partial", "not-started": "Not started" };

export function LiveReadinessClient() {
  const ready = liveReadinessChecklist.filter((i) => i.status === "ready").length;
  const total = liveReadinessChecklist.length;

  return (
    <>
      <PageHeader
        title="Live readiness"
        description="What is safe in demo mode and what must exist before real club data."
      />
      <SettingsSubNav />
      <DemoRbacNotice />

      <Card className="mt-4 border-amber-200 bg-amber-50">
        <p className="text-sm font-semibold text-amber-900">Current status: Demo only — not live</p>
        <p className="mt-2 text-sm text-amber-800">{providerModeLabel}</p>
      </Card>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(demoModeStatus).map(([key, value]) => (
          <Card key={key}>
            <dt className="text-xs font-medium uppercase text-slate-500">{key.replace(/([A-Z])/g, " $1")}</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{value}</dd>
          </Card>
        ))}
      </dl>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Production readiness checklist</h2>
          <Badge variant="info">
            {ready}/{total} ready
          </Badge>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Complete these before loading real member, medical or financial data. See MIGRATION_PLAN.md in the repo.
        </p>
        <ul className="mt-4 space-y-3">
          {liveReadinessChecklist.map((item) => (
            <li key={item.id} className="flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.notes}</p>
              </div>
              <Badge variant={statusVariant(item.status)}>{statusLabel[item.status]}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/auth-decision" className="font-medium text-indigo-600 hover:underline">
          Auth decision pack (v1.3.0) →
        </Link>
        <Link href="/settings/supabase-prep" className="font-medium text-indigo-600 hover:underline">
          Supabase prep (v1.4.0) →
        </Link>
        <Link href="/settings/recommended-stack" className="font-medium text-indigo-600 hover:underline">
          Recommended stack →
        </Link>
        <Link href="/settings/production-roadmap" className="font-medium text-indigo-600 hover:underline">
          Production roadmap →
        </Link>
        <Link href="/settings/security" className="font-medium text-indigo-600 hover:underline">
          Security requirements →
        </Link>
      </div>
    </>
  );
}
