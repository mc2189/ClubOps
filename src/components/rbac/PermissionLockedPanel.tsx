"use client";

import Link from "next/link";
import { Card } from "@/components/ui";
import {
  DemoPermissionPreviewBadge,
  RequiredAccessBadge,
  RestrictedInLiveModeBadge,
  SummaryOnlyBadge,
} from "@/components/rbac/PermissionBadges";
import { RoleAccessRequired } from "@/components/rbac/RoleAccessRequired";
import {
  RBAC_DEMO_ONLY_DISCLAIMER,
  RBAC_LOCKED_SECTION_EXPLANATION,
  RBAC_PUBLIC_DEMO_EXPLANATION,
} from "@/lib/rbacCopy";
import type { DemoRoleId, PermissionModule } from "@/lib/permissions";

interface PermissionLockedPanelProps {
  module: PermissionModule;
  title?: string;
  summaryLines?: string[];
  requiredAccessLabel?: string;
  suggestedRoles?: DemoRoleId[];
  compact?: boolean;
  className?: string;
}

export function PermissionLockedPanel({
  module,
  title = "Content hidden for this demo role",
  summaryLines = [],
  requiredAccessLabel,
  suggestedRoles,
  compact = false,
  className = "",
}: PermissionLockedPanelProps) {
  return (
    <div role="status" className={className}>
    <Card
      className={`border-amber-200 bg-amber-50/80 ${compact ? "p-4" : "p-5"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <DemoPermissionPreviewBadge />
        <RestrictedInLiveModeBadge />
        {requiredAccessLabel && <RequiredAccessBadge label={requiredAccessLabel} />}
      </div>
      <h3 className={`font-semibold text-slate-900 ${compact ? "mt-2 text-sm" : "mt-3 text-base"}`}>
        {title}
      </h3>
      {summaryLines.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
          {summaryLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-sm text-amber-950">
        <strong>{RBAC_DEMO_ONLY_DISCLAIMER}</strong> {RBAC_PUBLIC_DEMO_EXPLANATION}
      </p>
      <p className="mt-2 text-xs text-amber-900">{RBAC_LOCKED_SECTION_EXPLANATION}</p>
      <RoleAccessRequired module={module} suggestedRoles={suggestedRoles} className="mt-3" />
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        <Link href="/settings/permissions" className="font-medium text-indigo-700 hover:underline">
          Permissions matrix →
        </Link>
      </div>
    </Card>
    </div>
  );
}

interface PermissionSummaryPanelProps {
  module: PermissionModule;
  title: string;
  lines: string[];
  requiredAccessLabel?: string;
  education?: string;
  suggestedRoles?: DemoRoleId[];
  className?: string;
}

export function PermissionSummaryPanel({
  module,
  title,
  lines,
  requiredAccessLabel,
  education,
  suggestedRoles,
  className = "",
}: PermissionSummaryPanelProps) {
  return (
    <div role="status" className={className}>
    <Card className="border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <DemoPermissionPreviewBadge />
        <RestrictedInLiveModeBadge />
        <SummaryOnlyBadge />
        {requiredAccessLabel && <RequiredAccessBadge label={requiredAccessLabel} />}
      </div>
      <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {education && <p className="mt-3 text-sm text-slate-600">{education}</p>}
      <p className="mt-3 text-sm text-slate-700">
        <strong>{RBAC_DEMO_ONLY_DISCLAIMER}</strong> {RBAC_PUBLIC_DEMO_EXPLANATION}
      </p>
      <RoleAccessRequired module={module} suggestedRoles={suggestedRoles} className="mt-3" />
    </Card>
    </div>
  );
}
