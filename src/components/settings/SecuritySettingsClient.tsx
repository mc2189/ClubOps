"use client";

import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { demoSecurityRequirements } from "@/data/demo/rolesData";

export function SecuritySettingsClient() {
  return (
    <>
      <PageHeader
        title="Security & live mode"
        description="What a real ClubOps deployment would require — educational guide for committees."
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <Card className="mt-4 border-red-200 bg-red-50">
        <p className="text-sm font-semibold text-red-900">Not production security</p>
        <p className="mt-2 text-sm text-red-800">
          The public demo has no login, no passwords and no server-side permission enforcement. Demo
          role switching is a presentation tool only. Do not use real member, medical or financial
          data until authentication, RBAC, secure storage and audit persistence are implemented.
        </p>
      </Card>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {demoSecurityRequirements.map((req) => (
          <Card key={req.title}>
            <h2 className="text-base font-semibold text-slate-900">{req.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{req.description}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">Related pages</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/settings/roles" className="text-indigo-600 hover:underline">
              Demo roles — switch preview role
            </Link>
          </li>
          <li>
            <Link href="/settings/permissions" className="text-indigo-600 hover:underline">
              Permissions matrix
            </Link>
          </li>
          <li>
            <Link href="/audit/security" className="text-indigo-600 hover:underline">
              Audit security guidance
            </Link>
          </li>
          <li>
            <Link href="/demo-roles" className="text-indigo-600 hover:underline">
              Demo roles quick intro
            </Link>
          </li>
          <li>
            <Link href="/settings/live-readiness" className="text-indigo-600 hover:underline">
              Live readiness checklist (v1.2.0)
            </Link>
          </li>
          <li>
            <Link href="/settings/data-architecture" className="text-indigo-600 hover:underline">
              Data architecture blueprint
            </Link>
          </li>
          <li>
            <Link href="/settings/provider-model" className="text-indigo-600 hover:underline">
              Provider model — demo vs live
            </Link>
          </li>
          <li>
            <Link href="/settings/production-roadmap" className="text-indigo-600 hover:underline">
              Production roadmap
            </Link>
          </li>
        </ul>
      </Card>
    </>
  );
}
