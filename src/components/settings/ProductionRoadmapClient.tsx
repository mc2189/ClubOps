"use client";

import { Card, PageHeader, Badge } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { migrationStages, productionRoadmap } from "@/data/demo/architectureData";

export function ProductionRoadmapClient() {
  return (
    <>
      <PageHeader
        title="Production roadmap"
        description="Staged path from demo to live — dependencies, risks and recommended build order."
      />
      <SettingsSubNav />
      <DemoRbacNotice />

      <section className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">Migration stages</h2>
        <p className="mt-1 text-sm text-slate-600">See MIGRATION_PLAN.md for full detail.</p>
        <ol className="mt-4 space-y-4">
          {migrationStages.map((stage) => (
            <li key={stage.stage}>
              <Card>
                <div className="flex items-center gap-2">
                  <Badge variant="info">Stage {stage.stage}</Badge>
                  <h3 className="font-semibold text-slate-900">{stage.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">{stage.summary}</p>
                <div className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <p className="font-semibold text-slate-500">Deliverables</p>
                    <ul className="mt-1 list-inside list-disc text-slate-700">
                      {stage.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-600">Risks</p>
                    <ul className="mt-1 list-inside list-disc text-slate-700">
                      {stage.risks.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-500">Dependencies</p>
                    <ul className="mt-1 list-inside list-disc text-slate-700">
                      {stage.dependencies.length === 0 ? (
                        <li>None</li>
                      ) : (
                        stage.dependencies.map((d) => <li key={d}>{d}</li>)
                      )}
                    </ul>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-slate-900">Recommended build order</h2>
        <div className="mt-4 space-y-3">
          {productionRoadmap.map((item) => (
            <Card key={item.order} className="p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-800">
                  {item.order}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  <p className="mt-2 text-xs text-slate-500">Depends on: {item.dependsOn}</p>
                  <p className="mt-1 text-xs text-red-700">Risk if skipped: {item.riskIfSkipped}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
