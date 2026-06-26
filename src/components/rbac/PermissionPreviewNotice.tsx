"use client";

import Link from "next/link";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import type { PermissionModule, PermissionAction } from "@/lib/permissions";

interface PermissionPreviewNoticeProps {
  module: PermissionModule;
  action?: PermissionAction;
  className?: string;
}

export function PermissionPreviewNotice({
  module,
  action = "view",
  className = "mt-4",
}: PermissionPreviewNoticeProps) {
  const { shouldShowPreview, getRestrictionMessage, roleName, getAccessHint, logRbacEvent } =
    useDemoRole();

  if (!shouldShowPreview(module, action)) return null;

  const message = getRestrictionMessage(module, action);
  if (!message) return null;

  return (
    <div
      role="status"
      className={`rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 ${className}`}
    >
      <p className="font-semibold">Permission preview — restricted in live mode</p>
      <p className="mt-1">{message}</p>
      <p className="mt-2 text-xs text-amber-800">
        Viewing as <strong>{roleName}</strong>. In live mode,{" "}
        <strong>{getAccessHint(module)}</strong> would typically access this area. Demo role
        switching only — not real security.
      </p>
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        <Link
          href="/settings/roles"
          className="font-medium text-indigo-700 hover:underline"
          onClick={() => logRbacEvent("permission preview viewed", message, module)}
        >
          View demo roles →
        </Link>
        <Link href="/settings/permissions" className="font-medium text-indigo-700 hover:underline">
          Permissions matrix →
        </Link>
      </div>
    </div>
  );
}
