"use client";

import Link from "next/link";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import type { DemoRoleId } from "@/lib/permissions";
import { SUGGESTED_ROLES_BY_MODULE, type PermissionModule } from "@/lib/permissions";

interface RoleAccessRequiredProps {
  module: PermissionModule;
  suggestedRoles?: DemoRoleId[];
  className?: string;
}

export function RoleAccessRequired({
  module,
  suggestedRoles,
  className = "",
}: RoleAccessRequiredProps) {
  const { roleName, getAccessHint, setRole, roles } = useDemoRole();
  const roleIds = suggestedRoles ?? SUGGESTED_ROLES_BY_MODULE[module] ?? ["secretary-admin"];

  return (
    <div className={`space-y-2 text-xs text-slate-700 ${className}`}>
      <p>
        Viewing as <strong>{roleName}</strong>. In live mode,{" "}
        <strong>{getAccessHint(module)}</strong> would typically access this area.
      </p>
      <div className="flex flex-wrap gap-2">
        {roleIds.map((roleId) => {
          const def = roles.find((r) => r.id === roleId);
          if (!def) return null;
          return (
            <button
              key={roleId}
              type="button"
              onClick={() => setRole(roleId)}
              className="min-h-[44px] rounded-md border border-indigo-200 bg-white px-3 py-2 text-xs font-medium text-indigo-800 hover:bg-indigo-50 sm:min-h-0 sm:py-1.5"
            >
              Switch to {def.name}
            </button>
          );
        })}
        <Link
          href="/demo-roles"
          className="inline-flex min-h-[44px] items-center rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:min-h-0 sm:py-1.5"
        >
          View all demo roles →
        </Link>
      </div>
    </div>
  );
}
