"use client";

import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import type { PermissionModule, PermissionAction } from "@/lib/permissions";

interface RoleRestrictionPreviewProps {
  module: PermissionModule;
  action?: PermissionAction;
  title?: string;
}

export function RoleRestrictionPreview({
  module,
  action = "view",
  title = "Demo-only restriction preview",
}: RoleRestrictionPreviewProps) {
  const { shouldShowPreview, getRestrictionMessage, roleName, getAccessHint, setRole, roles, logRbacEvent } =
    useDemoRole();

  if (!shouldShowPreview(module, action)) return null;

  const message = getRestrictionMessage(module, action);
  const suggestedRole = roles.find((r) => r.id === "secretary-admin");

  return (
    <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-800">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-2">
        You are viewing as <strong>{roleName}</strong>. In live mode this section would be restricted.
      </p>
      {message && <p className="mt-2 text-slate-600">{message}</p>}
      <p className="mt-2 text-xs text-slate-500">
        Typical access: <strong>{getAccessHint(module)}</strong>. Real authentication required before
        production.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setRole("secretary-admin");
            logRbacEvent("restricted preview — switched role", `Switched to ${suggestedRole?.name} from restriction preview`, module);
          }}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
        >
          Switch to Secretary/Admin (demo)
        </button>
        <button
          type="button"
          onClick={() => logRbacEvent("restricted action previewed", message ?? title, module)}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-white"
        >
          Continue preview (demo only)
        </button>
      </div>
    </div>
  );
}
