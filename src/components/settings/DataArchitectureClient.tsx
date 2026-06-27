"use client";

import { Card, PageHeader, Badge } from "@/components/ui";
import { settingsTrail } from "@/lib/breadcrumbs";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { dataClassifications, entityGroups } from "@/data/demo/architectureData";

export function DataArchitectureClient() {
  return (
    <>
      <PageHeader
        title="Data architecture"
        description="Entity groups, sensitive categories and module ownership for live mode planning."
        breadcrumbs={settingsTrail("Data architecture")}
        backHref="/settings"
      />
      <SettingsSubNav />
      <DemoRbacNotice />

      <section className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">Data classification</h2>
        <p className="mt-1 text-sm text-slate-600">
          Every live record must be classified. See DATA_MODEL.md and SECURITY_LIVE_REQUIREMENTS.md for full detail.
        </p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {dataClassifications.map((c) => (
            <Card key={c.id}>
              <h3 className="font-semibold text-slate-900">{c.name}</h3>
              <dl className="mt-3 space-y-2 text-xs text-slate-600">
                <div><dt className="font-medium text-slate-500">Examples</dt><dd>{c.examples}</dd></div>
                <div><dt className="font-medium text-slate-500">Who should access</dt><dd>{c.whoShouldAccess}</dd></div>
                <div><dt className="font-medium text-slate-500">Export restrictions</dt><dd>{c.exportRestrictions}</dd></div>
                <div><dt className="font-medium text-slate-500">Retention</dt><dd>{c.retentionConcerns}</dd></div>
                <div><dt className="font-medium text-slate-500">Audit</dt><dd>{c.auditRequirements}</dd></div>
              </dl>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-slate-900">Entity groups</h2>
        {entityGroups.map((group) => (
          <div key={group.id} className="mt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{group.title}</h3>
            <div className="mt-3 space-y-3">
              {group.entities.map((e) => (
                <Card key={e.name} className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-slate-900">{e.name}</h4>
                    <Badge variant="default">{e.ownerModule}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{e.purpose}</p>
                  <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                    <div><dt className="text-slate-500">Sensitive fields</dt><dd className="text-slate-700">{e.sensitiveFields}</dd></div>
                    <div><dt className="text-slate-500">Related</dt><dd className="text-slate-700">{e.relatedEntities}</dd></div>
                    <div><dt className="text-slate-500">Live access</dt><dd className="text-slate-700">{e.liveAccessControls}</dd></div>
                    <div><dt className="text-slate-500">Retention</dt><dd className="text-slate-700">{e.retention}</dd></div>
                  </dl>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
