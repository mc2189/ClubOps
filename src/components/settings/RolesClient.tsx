"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { DemoRoleSwitcher } from "@/components/rbac/DemoRoleSwitcher";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";

export function RolesClient() {
  const { roles, role, setRole } = useDemoRole();

  return (
    <>
      <PageHeader
        title="Demo roles"
        description="Preview how volunteer roles would restrict access in live mode."
        action={<DemoRoleSwitcher />}
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <p className="mt-4 text-sm text-slate-600">
        Select a role card to switch your demo preview. Role persists in this browser tab until you
        close it (session storage) — refresh keeps your selection. Not production security.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {roles.map((r) => (
          <Card
            key={r.id}
            className={r.id === role ? "ring-2 ring-indigo-500" : undefined}
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">{r.name}</h2>
              {r.id === role && <Badge variant="info">Current demo role</Badge>}
            </div>
            <p className="mt-1 text-sm text-slate-600">{r.purpose}</p>
            <p className="mt-2 text-xs text-slate-500">Typical user: {r.typicalUser}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-slate-500">Can access (live mode)</dt>
                <dd className="text-slate-700">{r.allowedModules}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Restricted</dt>
                <dd className="text-slate-700">{r.restrictedModules}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Sensitive access</dt>
                <dd className="text-slate-700">{r.sensitiveAccess}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Exports</dt>
                <dd className="text-slate-700">{r.exportPermissions}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Communications</dt>
                <dd className="text-slate-700">{r.communicationPermissions}</dd>
              </div>
            </dl>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-green-700">Can do</p>
                <ul className="mt-1 list-inside list-disc text-xs text-slate-600">
                  {r.canDoExamples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-red-700">Should not do</p>
                <ul className="mt-1 list-inside list-disc text-xs text-slate-600">
                  {r.cannotDoExamples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">{r.liveModeRequirements}</p>
            {r.id !== role && (
              <button
                type="button"
                onClick={() => setRole(r.id)}
                className="mt-4 rounded-md border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-800 hover:bg-indigo-100"
              >
                Switch to this demo role
              </button>
            )}
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-600">
        <Link href="/settings/permissions" className="font-medium text-indigo-600 hover:underline">
          View full permissions matrix →
        </Link>
      </p>
    </>
  );
}
