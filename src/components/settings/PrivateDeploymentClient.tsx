"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { settingsTrail } from "@/lib/breadcrumbs";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { SupabasePrepSafetyNotice } from "@/components/settings/SupabasePrepSafetyNotice";
import {
  privateDeploymentSteps,
  liveProviderBuildOrder,
} from "@/data/demo/supabasePrepData";

export function PrivateDeploymentClient() {
  return (
    <>
      <PageHeader
        title="Private deployment checklist"
        description="Steps for a future live Vercel + Supabase deployment — public demo stays demo-only."
        breadcrumbs={settingsTrail("Private live deployment")}
        backHref="/settings"
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <SupabasePrepSafetyNotice />

      <Card className="mt-6 border-red-200 bg-red-50">
        <p className="text-sm font-semibold text-red-900">Requires live security review</p>
        <p className="mt-2 text-sm text-red-800">
          Do not add Supabase environment variables to the public demo Vercel project. Real club data
          only after RLS testing, backups, and committee sign-off.
        </p>
      </Card>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Deployment steps</h2>
        <ol className="mt-4 space-y-3">
          {privateDeploymentSteps.map((step) => (
            <li key={step.order}>
              <Card className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info">Step {step.order}</Badge>
                  {step.demoSafe && <Badge variant="success">Public demo unaffected</Badge>}
                </div>
                <h3 className="mt-2 font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-slate-900">liveProvider build order</h2>
        <p className="mt-1 text-sm text-slate-600">See LIVE_PROVIDER_IMPLEMENTATION_PLAN.md</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {liveProviderBuildOrder.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/supabase-prep" className="font-medium text-indigo-600 hover:underline">
          Supabase prep →
        </Link>
        <Link href="/settings/live-readiness" className="font-medium text-indigo-600 hover:underline">
          Live readiness →
        </Link>
      </div>
    </>
  );
}
