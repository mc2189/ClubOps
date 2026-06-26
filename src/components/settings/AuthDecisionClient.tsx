"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { StackDecisionSafetyNotice } from "@/components/settings/StackDecisionSafetyNotice";
import {
  authDecisionClubOpsNeeds,
  stackOptions,
  type StackOption,
} from "@/data/demo/stackDecisionData";

const badgeVariant = (badge: StackOption["badge"]) => {
  switch (badge) {
    case "recommended":
      return "success" as const;
    case "possible-alternative":
      return "info" as const;
    case "higher-burden":
      return "warning" as const;
    default:
      return "danger" as const;
  }
};

export function AuthDecisionClient() {
  return (
    <>
      <PageHeader
        title="Auth decision pack"
        description="Compare live-mode authentication foundations before any implementation — demo stays unchanged."
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <StackDecisionSafetyNotice />

      <Card className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">What ClubOps needs from live auth</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
          {authDecisionClubOpsNeeds.map((need) => (
            <li key={need}>{need}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Full comparison in AUTH_DECISION_PACK.md and LIVE_STACK_OPTIONS.md in the repo.
        </p>
      </Card>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Stack options at a glance</h2>
        <div className="mt-4 space-y-4">
          {stackOptions.map((opt) => (
            <Card key={opt.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{opt.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{opt.tagline}</p>
                </div>
                <Badge variant={badgeVariant(opt.badge)}>{opt.badgeLabel}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-700">{opt.summary}</p>
              <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-slate-500">Authentication</dt>
                  <dd className="text-slate-700">{opt.authenticationFeatures}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">RBAC approach</dt>
                  <dd className="text-slate-700">{opt.rbacApproach}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Demo stays separate</dt>
                  <dd className="text-slate-700">{opt.demoModeSeparation}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">What could go wrong</dt>
                  <dd className="text-slate-700">{opt.whatCouldGoWrong}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-slate-600">
                <span className="font-medium">Use when:</span> {opt.recommendedUse}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/recommended-stack" className="font-medium text-indigo-600 hover:underline">
          Recommended stack →
        </Link>
        <Link href="/settings/live-stack" className="font-medium text-indigo-600 hover:underline">
          Decision matrix →
        </Link>
        <Link href="/settings/implementation-options" className="font-medium text-indigo-600 hover:underline">
          Implementation options →
        </Link>
      </div>
    </>
  );
}
