"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { settingsTrail } from "@/lib/breadcrumbs";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { StackDecisionSafetyNotice } from "@/components/settings/StackDecisionSafetyNotice";
import { stackOptions } from "@/data/demo/stackDecisionData";

export function ImplementationOptionsClient() {
  const alternatives = stackOptions.filter((s) => s.id !== "supabase");
  const primary = stackOptions.find((s) => s.id === "supabase");

  return (
    <>
      <PageHeader
        title="Implementation options"
        description="When to choose Clerk, Auth.js, Firebase or custom auth — and what each still requires."
        breadcrumbs={settingsTrail("Implementation options")}
        backHref="/settings"
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <StackDecisionSafetyNotice />

      {primary && (
        <Card className="mt-6 border-green-200">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">Provisional default: {primary.name}</h2>
            <Badge variant="success">Recommended</Badge>
            <Badge variant="warning">Not implemented yet</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-600">{primary.summary}</p>
          <Link href="/settings/recommended-stack" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline">
            Full recommended stack →
          </Link>
        </Card>
      )}

      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Alternatives — when each might win</h2>
        <div className="mt-4 space-y-4">
          {alternatives.map((opt) => (
            <Card key={opt.id}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-900">{opt.name}</h3>
                <Badge
                  variant={
                    opt.badge === "possible-alternative"
                      ? "info"
                      : opt.badge === "higher-burden"
                        ? "warning"
                        : "danger"
                  }
                >
                  {opt.badgeLabel}
                </Badge>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Server-side auth</dt>
                  <dd className="text-slate-700">{opt.serverSideAuth}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Database fit</dt>
                  <dd className="text-slate-700">{opt.databaseFit}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Audit logging</dt>
                  <dd className="text-slate-700">{opt.auditLoggingFit}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Multi-club tenancy</dt>
                  <dd className="text-slate-700">{opt.multiClubTenancy}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Local dev</dt>
                  <dd className="text-slate-700">{opt.localDevComplexity}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Vercel deploy</dt>
                  <dd className="text-slate-700">{opt.vercelDeployment}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Cost profile</dt>
                  <dd className="text-slate-700">{opt.costProfile}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Vendor lock-in</dt>
                  <dd className="text-slate-700">{opt.vendorLockIn}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Youth/safeguarding data</dt>
                  <dd className="text-slate-700">{opt.youthDataSuitability}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Mobile / tablet</dt>
                  <dd className="text-slate-700">{opt.mobileTabletFit}</dd>
                </div>
              </dl>
              <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm">
                <p>
                  <span className="font-medium text-slate-900">Prefer when:</span> {opt.recommendedUse}
                </p>
                <p className="mt-2">
                  <span className="font-medium text-red-800">Avoid when:</span> {opt.avoidRationale}
                </p>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                <span className="font-medium">Demo remains separate:</span> {opt.demoModeSeparation}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Evaluation docs in repo</h2>
        <ul className="mt-3 space-y-1 text-sm text-indigo-600">
          <li>SUPABASE_EVALUATION.md</li>
          <li>CLERK_EVALUATION.md</li>
          <li>AUTHJS_EVALUATION.md</li>
          <li>FIREBASE_EVALUATION.md</li>
          <li>AUTH_IMPLEMENTATION_PLAN.md</li>
        </ul>
      </Card>
    </>
  );
}
