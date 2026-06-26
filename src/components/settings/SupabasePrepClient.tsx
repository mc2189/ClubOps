"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { SupabasePrepSafetyNotice } from "@/components/settings/SupabasePrepSafetyNotice";
import {
  supabasePrepCompleted,
  supabasePrepNotYet,
  publicDemoSafetyChecks,
  type PrepCheckItem,
} from "@/data/demo/supabasePrepData";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const statusVariant = (s: PrepCheckItem["status"]) => {
  switch (s) {
    case "ready":
      return "success" as const;
    case "partial":
      return "warning" as const;
    case "not-active":
      return "info" as const;
    default:
      return "default" as const;
  }
};

export function SupabasePrepClient() {
  const envConfigured = isSupabaseConfigured();

  return (
    <>
      <PageHeader
        title="Supabase foundation prep"
        description="v1.4.0 preparation for a future private live deployment — public demo unchanged."
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <SupabasePrepSafetyNotice />

      <Card className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">Runtime status</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Supabase env vars (this build)</dt>
            <dd className="font-medium text-slate-900">
              {envConfigured ? "Present (private dev only)" : "Not set — public demo safe"}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Scaffold wired to demo routes</dt>
            <dd className="font-medium text-slate-900">No</dd>
          </div>
          <div>
            <dt className="text-slate-500">Packages installed</dt>
            <dd className="font-medium text-slate-900">@supabase/supabase-js, @supabase/ssr</dd>
          </div>
          <div>
            <dt className="text-slate-500">Env template</dt>
            <dd className="font-medium text-slate-900">.env.example (placeholders only)</dd>
          </div>
        </dl>
      </Card>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Prepared in v1.4.0</h2>
        <ul className="mt-4 space-y-3">
          {supabasePrepCompleted.map((item) => (
            <li key={item.id} className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.notes}</p>
              </div>
              <Badge variant={statusVariant(item.status)}>Ready</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Not activated yet</h2>
        <ul className="mt-4 space-y-3">
          {supabasePrepNotYet.map((item) => (
            <li key={item.id} className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.notes}</p>
              </div>
              <Badge variant="default">Not started</Badge>
            </li>
          ))}
        </ul>
      </section>

      <Card className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Public demo safety checks</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
          {publicDemoSafetyChecks.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/schema-plan" className="font-medium text-indigo-600 hover:underline">
          Schema plan →
        </Link>
        <Link href="/settings/private-deployment" className="font-medium text-indigo-600 hover:underline">
          Private deployment →
        </Link>
        <Link href="/settings/recommended-stack" className="font-medium text-indigo-600 hover:underline">
          Recommended stack →
        </Link>
      </div>
    </>
  );
}
