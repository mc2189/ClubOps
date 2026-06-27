"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { settingsTrail } from "@/lib/breadcrumbs";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { StackDecisionSafetyNotice } from "@/components/settings/StackDecisionSafetyNotice";
import {
  recommendedStackItems,
  supabaseImplementationPlan,
  getStackAverageScore,
} from "@/data/demo/stackDecisionData";

export function RecommendedStackClient() {
  return (
    <>
      <PageHeader
        title="Recommended live stack"
        description="Provisional technical recommendation — not implemented. Public demo stays on demoProvider."
        breadcrumbs={settingsTrail("Recommended stack")}
        backHref="/settings"
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <StackDecisionSafetyNotice />

      <Card className="mt-6 border-green-200 bg-green-50">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-semibold text-green-900">Provisional recommendation</h2>
          <Badge variant="success">Recommended</Badge>
          <Badge variant="warning">Not implemented yet</Badge>
        </div>
        <p className="mt-2 text-sm text-green-900">
          Supabase Auth + Postgres + RLS + Storage on a <strong>private</strong> live Vercel deployment;
          Vercel hosts Next.js; public demo keeps <code className="text-xs">demoProvider</code> with fake
          data only. Average matrix score: {getStackAverageScore("supabase")}/5 vs alternatives.
        </p>
        <p className="mt-2 text-xs text-green-800">
          Technical recommendation only — not legal advice. Final go-live still needs secure configuration,
          RLS review, backups, testing and committee sign-off.
        </p>
      </Card>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Stack layers</h2>
        <div className="mt-4 space-y-3">
          {recommendedStackItems.map((item) => (
            <Card key={item.layer} className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-900">{item.layer}</h3>
                <Badge variant={item.status === "recommended" ? "success" : "warning"}>
                  {item.status === "recommended" ? "Demo remains separate" : "Not implemented yet"}
                </Badge>
              </div>
              <p className="mt-1 text-sm font-medium text-indigo-800">{item.choice}</p>
              <p className="mt-2 text-sm text-slate-600">{item.rationale}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-slate-900">Supabase implementation plan (future)</h2>
        <p className="mt-1 text-sm text-slate-600">
          Do not create a Supabase project or add SDK packages in this release. See AUTH_IMPLEMENTATION_PLAN.md
          and RECOMMENDED_LIVE_STACK.md.
        </p>
        <ol className="mt-4 space-y-3">
          {supabaseImplementationPlan.map((step) => (
            <li key={step.order}>
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-800">
                    {step.order}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                    <p className="mt-2 text-xs text-amber-800">{step.notes}</p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <Card className="mt-8 border-red-200 bg-red-50">
        <h2 className="text-base font-semibold text-red-900">Before any real data</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-red-800">
          <li>Requires live security review</li>
          <li>RLS and server-side checks verified on every route</li>
          <li>Private file storage — no public child/member files</li>
          <li>Persistent append-only audit log</li>
          <li>Secrets in Vercel / .env.local only — never committed</li>
          <li>Public demo URL unchanged — fake data only</li>
        </ul>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/supabase-prep" className="font-medium text-indigo-600 hover:underline">
          Supabase prep (v1.4.0) →
        </Link>
        <Link href="/settings/live-stack" className="font-medium text-indigo-600 hover:underline">
          Decision matrix →
        </Link>
        <Link href="/settings/live-readiness" className="font-medium text-indigo-600 hover:underline">
          Live readiness →
        </Link>
        <Link href="/settings/production-roadmap" className="font-medium text-indigo-600 hover:underline">
          Production roadmap →
        </Link>
      </div>
    </>
  );
}
