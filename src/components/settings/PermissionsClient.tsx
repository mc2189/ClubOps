"use client";

import { PageHeader, Badge } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { DemoRoleSwitcher } from "@/components/rbac/DemoRoleSwitcher";
import {
  ALL_DEMO_ROLE_IDS,
  MATRIX_MODULES,
  MODULE_LABELS,
  getModuleLevel,
  type MatrixLevel,
} from "@/lib/permissions";
import { demoRoles } from "@/data/demo/rolesData";
import { settingsTrail } from "@/lib/breadcrumbs";

const levelVariant: Record<MatrixLevel, "success" | "warning" | "danger" | "info" | "default"> = {
  allowed: "success",
  limited: "info",
  restricted: "danger",
  sensitive: "warning",
  "export-restricted": "warning",
};

const levelLabel: Record<MatrixLevel, string> = {
  allowed: "Allowed",
  limited: "Limited",
  restricted: "Restricted",
  sensitive: "Sensitive",
  "export-restricted": "Export restricted",
};

export function PermissionsClient() {
  return (
    <>
      <PageHeader
        title="Permissions matrix"
        description="Role-by-module preview — plain English guide for committee discussions."
        breadcrumbs={settingsTrail("Permissions")}
        backHref="/settings"
        action={<DemoRoleSwitcher />}
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <p className="mt-4 text-sm text-slate-600">
        Rows are modules. Columns are demo roles. This shows what would be allowed in a future live
        version — the public demo remains open for presentation purposes.
      </p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="sticky left-0 z-10 bg-slate-50 px-3 py-3 text-left font-semibold text-slate-700">
                Module
              </th>
              {ALL_DEMO_ROLE_IDS.map((roleId) => {
                const role = demoRoles.find((r) => r.id === roleId);
                return (
                  <th key={roleId} className="px-2 py-3 text-center font-semibold text-slate-700">
                    <span className="block max-w-[88px]">{role?.shortName ?? roleId}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MATRIX_MODULES.map((module) => (
              <tr key={module} className="hover:bg-slate-50/50">
                <td className="sticky left-0 z-10 bg-white px-3 py-2 font-medium text-slate-900">
                  {MODULE_LABELS[module]}
                </td>
                {ALL_DEMO_ROLE_IDS.map((roleId) => {
                  const level = getModuleLevel(roleId, module);
                  return (
                    <td key={roleId} className="px-2 py-2 text-center">
                      <Badge variant={levelVariant[level]}>{levelLabel[level]}</Badge>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.entries(levelLabel) as [MatrixLevel, string][]).map(([key, label]) => (
          <div key={key} className="rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
            <Badge variant={levelVariant[key]}>{label}</Badge>
            <p className="mt-2">
              {key === "allowed" && "Full access for this module in live mode."}
              {key === "limited" && "View or summary access — edits or exports may be blocked."}
              {key === "restricted" && "Module hidden or read-blocked for this role in live mode."}
              {key === "sensitive" && "Welfare/medical detail — enhanced logging and training required."}
              {key === "export-restricted" && "Can view summaries in app but cannot download exports."}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
