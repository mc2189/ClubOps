"use client";

import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import type { DemoRoleId } from "@/lib/permissions";

interface DemoRoleSwitcherProps {
  compact?: boolean;
}

export function DemoRoleSwitcher({ compact = false }: DemoRoleSwitcherProps) {
  const { role, roleName, roleDescription, setRole, roles } = useDemoRole();

  return (
    <div
      className={
        compact
          ? "flex max-w-[52vw] flex-col items-end gap-0.5 sm:max-w-none sm:flex-row sm:items-center sm:gap-2"
          : "flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3"
      }
    >
      <div className="hidden text-right lg:block">
        <p className="text-xs font-medium text-slate-700">Current demo role</p>
        <p className="max-w-[180px] truncate text-xs text-slate-500" title={roleDescription}>
          {roleName}
        </p>
      </div>
      <label htmlFor="demo-role-switcher" className="sr-only">
        Switch demo role
      </label>
      <select
        id="demo-role-switcher"
        value={role}
        onChange={(e) => setRole(e.target.value as DemoRoleId)}
        title={`Demo role: ${roleName}. Not a real login.`}
        className={
          compact
            ? "min-h-[44px] max-w-full rounded-md border border-brand-primary/30 bg-brand-soft px-2 py-2 text-sm font-medium text-brand-primary sm:max-w-[200px] sm:text-xs sm:py-1.5"
            : "max-w-[200px] rounded-md border border-brand-primary/30 bg-brand-soft px-2 py-1.5 text-xs font-medium text-brand-primary"
        }
        aria-describedby="demo-role-switcher-note"
      >
        {roles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.shortName}
          </option>
        ))}
      </select>
      <span
        id="demo-role-switcher-note"
        className="text-[10px] font-medium leading-tight text-amber-800 sm:text-[11px]"
      >
        <span className="sm:hidden">Not a real login</span>
        <span className="hidden sm:inline">Demo role only — not a real login</span>
      </span>
    </div>
  );
}
