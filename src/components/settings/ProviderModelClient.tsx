"use client";

import { Card, PageHeader, Badge } from "@/components/ui";
import { settingsTrail } from "@/lib/breadcrumbs";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { providerModelExplanation } from "@/data/demo/architectureData";
import { providerModeLabel } from "@/lib/providerMode";

export function ProviderModelClient() {
  const { demoProvider, liveProvider, contract } = providerModelExplanation;

  return (
    <>
      <PageHeader
        title="Provider model"
        description="How demo and live data providers share one contract — Demo Mode stays permanent."
        breadcrumbs={settingsTrail("Demo vs live data")}
        backHref="/settings"
      />
      <SettingsSubNav />
      <DemoRbacNotice />

      <Card className="mt-4">
        <p className="text-sm font-medium text-slate-900">Active mode</p>
        <p className="mt-1 text-sm text-slate-600">{providerModeLabel}</p>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="border-green-200">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">{demoProvider.name}</h2>
            <Badge variant="success">{demoProvider.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-600">{demoProvider.description}</p>
          <p className="mt-2 text-xs text-slate-500">Used by: {demoProvider.usedBy}</p>
          {demoProvider.permanent && (
            <p className="mt-2 text-xs font-medium text-green-800">Permanent — keep for public demo and training.</p>
          )}
        </Card>

        <Card className="border-slate-300 border-dashed">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">{liveProvider.name}</h2>
            <Badge variant="default">{liveProvider.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-600">{liveProvider.description}</p>
          <p className="mt-2 text-xs text-slate-500">File: src/data/providers/liveProvider.stub.ts</p>
          <p className="mt-2 text-xs text-amber-800">Throws if called — not wired to index.ts.</p>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">{contract.name}</h2>
        <p className="mt-2 text-sm text-slate-600">{contract.description}</p>
        <p className="mt-2 text-xs text-slate-500">{contract.methods}</p>
      </Card>

      <Card className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">Rules for developers</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700">
          <li>UI components call <code className="text-xs">dataProvider</code> only — never import src/data/demo/* in components.</li>
          <li>Module session state (attendance marks, inbox status) stays in *DemoProvider contexts until live mutations exist.</li>
          <li>Public Vercel deployment must always use demoProvider.</li>
          <li>liveProvider requires auth, server-side RBAC, and database — see MIGRATION_PLAN.md.</li>
          <li>Shared types live in src/data/providers/types.ts — extend there before implementing live tables.</li>
        </ul>
      </Card>
    </>
  );
}
