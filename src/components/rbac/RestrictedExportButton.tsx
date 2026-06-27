"use client";

import { PermissionLockedPanel } from "@/components/rbac/PermissionLockedPanel";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import { RBAC_SUMMARY_BY_MODULE } from "@/lib/rbacCopy";

interface RestrictedExportButtonProps {
  label: string;
  onExport: () => void;
  className?: string;
}

export function RestrictedExportButton({
  label,
  onExport,
  className = "rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50",
}: RestrictedExportButtonProps) {
  const { can, logRbacEvent, roleName } = useDemoRole();
  const allowed = can("exports", "export");
  const defaults = RBAC_SUMMARY_BY_MODULE.exports;

  function handleClick() {
    if (allowed) {
      onExport();
      return;
    }
    logRbacEvent(
      "restricted export attempted",
      `${label} blocked for ${roleName} — demo preview only`,
      "exports",
    );
  }

  return (
    <div className="space-y-3">
      {!allowed && (
        <PermissionLockedPanel
          module="exports"
          compact
          title={defaults?.title ?? "Export locked for this demo role"}
          summaryLines={defaults?.lines}
          requiredAccessLabel={defaults?.requiredLabel}
        />
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={!allowed}
        className={className}
        aria-disabled={!allowed}
      >
        {allowed ? label : `${label} (locked in this demo role)`}
      </button>
    </div>
  );
}
