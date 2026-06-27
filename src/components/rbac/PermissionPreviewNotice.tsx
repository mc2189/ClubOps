"use client";

import Link from "next/link";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import type { PermissionModule, PermissionAction } from "@/lib/permissions";
import {
  RBAC_DEMO_ONLY_DISCLAIMER,
  RBAC_PUBLIC_DEMO_EXPLANATION,
} from "@/lib/rbacCopy";

interface PermissionPreviewNoticeProps {
  module: PermissionModule;
  action?: PermissionAction;
  className?: string;
}

/** Lightweight banner when a page is partially accessible — full lock uses RestrictedContentPreview */
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
      <p className="font-semibold">{RBAC_DEMO_ONLY_DISCLAIMER}</p>
      <p className="mt-1">{message}</p>
      <p className="mt-2 text-xs text-amber-900">{RBAC_PUBLIC_DEMO_EXPLANATION}</p>
      <p className="mt-2 text-xs text-amber-800">
        Viewing as <strong>{roleName}</strong>. In live mode,{" "}
        <strong>{getAccessHint(module)}</strong> would typically access this area.
      </p>
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        <Link
          href="/demo-roles"
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
