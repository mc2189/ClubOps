"use client";

import { useEffect, type ReactNode } from "react";
import { PermissionLockedPanel, PermissionSummaryPanel } from "@/components/rbac/PermissionLockedPanel";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import {
  getPermissionPreviewLevel,
  SUGGESTED_ROLES_BY_MODULE,
  type DemoRoleId,
  type PermissionAction,
  type PermissionModule,
} from "@/lib/permissions";
import { RBAC_SUMMARY_BY_MODULE } from "@/lib/rbacCopy";

interface RestrictedContentPreviewProps {
  module: PermissionModule;
  action?: PermissionAction;
  detailAction?: PermissionAction;
  summaryTitle?: string;
  summaryLines?: string[];
  requiredAccessLabel?: string;
  education?: string;
  suggestedRoles?: DemoRoleId[];
  children: ReactNode;
  blurChildren?: boolean;
  auditOnView?: string;
  className?: string;
}

export function RestrictedContentPreview({
  module,
  action = "view",
  detailAction,
  summaryTitle,
  summaryLines,
  requiredAccessLabel,
  education,
  suggestedRoles,
  children,
  blurChildren = false,
  auditOnView,
  className = "",
}: RestrictedContentPreviewProps) {
  const { role, roleName, logRbacEvent } = useDemoRole();
  const level = getPermissionPreviewLevel(role, module, detailAction ?? action);
  const defaults = RBAC_SUMMARY_BY_MODULE[module];
  const roles = suggestedRoles ?? SUGGESTED_ROLES_BY_MODULE[module];

  useEffect(() => {
    if (level !== "full" && auditOnView) {
      logRbacEvent(auditOnView, `Viewed as ${roleName} — demo preview only`, module);
    }
  }, [level, auditOnView, roleName, module, logRbacEvent]);

  if (level === "full") {
    return <div className={className}>{children}</div>;
  }

  if (level === "summary") {
    return (
      <div className={className}>
        <PermissionSummaryPanel
          module={module}
          title={summaryTitle ?? defaults?.title ?? "Summary only"}
          lines={summaryLines ?? defaults?.lines ?? []}
          requiredAccessLabel={requiredAccessLabel ?? defaults?.requiredLabel}
          education={education ?? defaults?.education}
          suggestedRoles={roles}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <PermissionLockedPanel
        module={module}
        title={summaryTitle ?? defaults?.title ?? "Content hidden for this demo role"}
        summaryLines={summaryLines ?? defaults?.lines ?? []}
        requiredAccessLabel={requiredAccessLabel ?? defaults?.requiredLabel}
        suggestedRoles={roles}
      />
      {blurChildren && (
        <div className="relative mt-4 overflow-hidden rounded-lg" aria-hidden="true">
          <div className="pointer-events-none select-none blur-sm opacity-30">{children}</div>
        </div>
      )}
    </div>
  );
}
