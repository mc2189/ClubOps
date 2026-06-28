"use client";

import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import type { DemoRoleId } from "@/lib/permissions";

interface DemoRoleSwitcherProps {
  compact?: boolean;
}

export function DemoRoleSwitcher({ compact = false }: DemoRoleSwitcherProps) {
  const { role, roleName, setRole, roles } = useDemoRole();

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <label
          htmlFor="demo-role-switcher"
          className="shrink-0 text-[11px] font-medium text-slate-500 sm:text-xs"
        >
          Demo role
        </label>
        <select
          id="demo-role-switcher"
          value={role}
          onChange={(e) => setRole(e.target.value as DemoRoleId)}
          title={`Demo role: ${roleName}. Not a real login.`}
          aria-describedby="demo-role-switcher-note"
          className="min-h-[40px] max-w-[38vw] rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-700 sm:max-w-[11rem] sm:text-sm"
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.shortName}
            </option>
          ))}
        </select>
        <span id="demo-role-switcher-note" className="sr-only">
          Demo role only — not a real login
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
      <div className="hidden text-right lg:block">
        <p className="text-xs font-medium text-slate-700">Demo role</p>
        <p className="max-w-[180px] truncate text-xs text-slate-500" title={roleName}>
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
        className="max-w-[200px] rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-700"
        aria-describedby="demo-role-switcher-note"
      >
        {roles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.shortName}
          </option>
        ))}
      </select>
      <span id="demo-role-switcher-note" className="sr-only">
        Demo role only — not a real login
      </span>
    </div>
  );
}
