/**
 * Demo-only RBAC preview — not real authentication or server-side authorisation.
 * Real live mode requires backend auth, server-side checks and secure storage.
 */

export type DemoRoleId =
  | "secretary-admin"
  | "treasurer"
  | "coach"
  | "welfare-officer"
  | "fundraising-lead"
  | "committee-readonly"
  | "demo-super-admin";

export type PermissionModule =
  | "dashboard"
  | "members"
  | "members-sensitive"
  | "attendance"
  | "finance"
  | "gift-aid"
  | "communications"
  | "documents"
  | "documents-sensitive"
  | "staff"
  | "wage-prep"
  | "fundraising"
  | "reports"
  | "exports"
  | "audit"
  | "settings";

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "archive"
  | "approve"
  | "export"
  | "send"
  | "view-sensitive-summary"
  | "view-sensitive-detail"
  | "manage-settings";

export type MatrixLevel = "allowed" | "limited" | "restricted" | "sensitive" | "export-restricted";

export const DEFAULT_DEMO_ROLE: DemoRoleId = "secretary-admin";

export const DEMO_ROLE_STORAGE_KEY = "clubops-demo-role";

/** Module labels for the permissions matrix UI */
export const MODULE_LABELS: Record<PermissionModule, string> = {
  dashboard: "Dashboard",
  members: "Members",
  "members-sensitive": "Medical / welfare detail",
  attendance: "Attendance",
  finance: "Finance",
  "gift-aid": "Gift Aid",
  communications: "Communications",
  documents: "Documents",
  "documents-sensitive": "Sensitive documents",
  staff: "Staff & volunteers",
  "wage-prep": "Wage preparation",
  fundraising: "Fundraising",
  reports: "Reports",
  exports: "Exports",
  audit: "Audit log",
  settings: "Settings",
};

const ALL_ACTIONS: PermissionAction[] = [
  "view",
  "create",
  "edit",
  "archive",
  "approve",
  "export",
  "send",
  "view-sensitive-summary",
  "view-sensitive-detail",
  "manage-settings",
];

type RolePermissionMap = Partial<Record<PermissionModule, PermissionAction[]>>;

/** Demo permission grants per role — preview only, not enforced server-side */
const ROLE_PERMISSIONS: Record<DemoRoleId, RolePermissionMap> = {
  "secretary-admin": {
    dashboard: ["view"],
    members: ["view", "create", "edit", "archive"],
    "members-sensitive": ["view-sensitive-summary"],
    attendance: ["view", "create", "edit"],
    finance: ["view", "approve"],
    "gift-aid": ["view"],
    communications: ["view", "create", "send"],
    documents: ["view", "create", "edit"],
    "documents-sensitive": ["view-sensitive-summary"],
    staff: ["view"],
    "wage-prep": ["view"],
    fundraising: ["view"],
    reports: ["view"],
    exports: ["export"],
    audit: ["view"],
    settings: ["view", "manage-settings"],
  },
  treasurer: {
    dashboard: ["view"],
    members: ["view"],
    "members-sensitive": [],
    attendance: ["view"],
    finance: ["view", "create", "edit", "approve", "export"],
    "gift-aid": ["view", "export", "approve"],
    communications: ["view"],
    documents: ["view"],
    staff: ["view"],
    "wage-prep": ["view", "export"],
    fundraising: ["view"],
    reports: ["view", "export"],
    exports: ["export"],
    audit: ["view"],
    settings: ["view"],
  },
  coach: {
    dashboard: ["view"],
    members: ["view"],
    "members-sensitive": [],
    attendance: ["view", "create", "edit"],
    finance: [],
    "gift-aid": [],
    communications: ["view"],
    documents: ["view"],
    staff: ["view"],
    fundraising: [],
    reports: [],
    exports: [],
    audit: [],
    settings: ["view"],
  },
  "welfare-officer": {
    dashboard: ["view"],
    members: ["view", "edit"],
    "members-sensitive": ["view-sensitive-summary", "view-sensitive-detail"],
    attendance: ["view"],
    finance: [],
    communications: ["view", "send"],
    documents: ["view", "edit"],
    "documents-sensitive": ["view-sensitive-summary", "view-sensitive-detail"],
    staff: ["view"],
    reports: ["view"],
    audit: ["view"],
    settings: ["view"],
  },
  "fundraising-lead": {
    dashboard: ["view"],
    members: ["view"],
    attendance: ["view"],
    finance: ["view"],
    communications: ["view", "create", "send"],
    documents: ["view"],
    fundraising: ["view", "create", "edit"],
    reports: ["view"],
    exports: ["export"],
    audit: ["view"],
    settings: ["view"],
  },
  "committee-readonly": {
    dashboard: ["view"],
    members: ["view"],
    "members-sensitive": [],
    attendance: ["view"],
    finance: [],
    "gift-aid": [],
    communications: ["view"],
    documents: ["view"],
    staff: ["view"],
    fundraising: ["view"],
    reports: ["view"],
    exports: [],
    audit: ["view"],
    settings: ["view"],
  },
  "demo-super-admin": Object.fromEntries(
    (
      [
        "dashboard",
        "members",
        "members-sensitive",
        "attendance",
        "finance",
        "gift-aid",
        "communications",
        "documents",
        "documents-sensitive",
        "staff",
        "wage-prep",
        "fundraising",
        "reports",
        "exports",
        "audit",
        "settings",
      ] as PermissionModule[]
    ).map((m) => [m, [...ALL_ACTIONS]]),
  ) as RolePermissionMap,
};

const RESTRICTION_MESSAGES: Partial<
  Record<PermissionModule, Partial<Record<PermissionAction | "default", string>>>
> = {
  finance: {
    default:
      "Finance access would be restricted in live mode. Treasurer or Club Secretary/Admin roles typically handle bank data and fees.",
    view: "Finance access would be restricted in live mode for this demo role.",
    export: "Finance exports would require Treasurer or Admin permission in live mode.",
  },
  "members-sensitive": {
    default:
      "Detailed medical and safeguarding information would require Welfare Officer or authorised Admin access in live mode.",
    "view-sensitive-detail":
      "Detailed sensitive information would require Welfare Officer or authorised Admin access in live mode.",
  },
  "documents-sensitive": {
    default: "Sensitive safeguarding documents would be restricted to Welfare Officer or Admin in live mode.",
  },
  exports: {
    default: "Exports would require Admin or Treasurer permission in live mode.",
    export: "Export would require Admin/Treasurer permission in live mode.",
  },
  communications: {
    send: "Bulk messaging would require Secretary/Admin permission in live mode.",
  },
  "wage-prep": {
    default:
      "Wage/payment preparation would require Treasurer or Admin permission in live mode.",
    export: "Wage exports would require Treasurer or Admin permission in live mode.",
  },
  "gift-aid": {
    default: "Gift Aid claim preparation would require Treasurer or Admin permission in live mode.",
  },
};

const ROLE_ACCESS_HINTS: Partial<Record<PermissionModule, string>> = {
  finance: "Treasurer or Club Secretary/Admin",
  "members-sensitive": "Welfare Officer or Admin",
  "documents-sensitive": "Welfare Officer or Admin",
  exports: "Club Secretary/Admin or Treasurer",
  communications: "Club Secretary/Admin",
  "wage-prep": "Treasurer or Admin",
  "gift-aid": "Treasurer or Admin",
};

function roleActions(role: DemoRoleId, module: PermissionModule): PermissionAction[] {
  return ROLE_PERMISSIONS[role]?.[module] ?? [];
}

/** Check whether a demo role would have permission in live mode (preview only) */
export function can(
  role: DemoRoleId,
  module: PermissionModule,
  action: PermissionAction = "view",
): boolean {
  if (role === "demo-super-admin") return true;
  return roleActions(role, module).includes(action);
}

/** Matrix cell level for permissions page */
export function getModuleLevel(role: DemoRoleId, module: PermissionModule): MatrixLevel {
  if (role === "demo-super-admin") return "allowed";
  const actions = roleActions(role, module);
  if (actions.length === 0) return "restricted";
  if (module === "members-sensitive" || module === "documents-sensitive") {
    if (actions.includes("view-sensitive-detail")) return "sensitive";
    if (actions.includes("view-sensitive-summary")) return "limited";
    return "restricted";
  }
  if (module === "exports" && !actions.includes("export")) {
    return actions.includes("view") ? "export-restricted" : "restricted";
  }
  if (actions.includes("export") || actions.includes("approve")) return "allowed";
  if (actions.includes("view") && actions.length === 1) return "limited";
  if (actions.includes("send") || actions.includes("create")) return "allowed";
  return "allowed";
}

export function getRolePermissions(role: DemoRoleId): RolePermissionMap {
  return ROLE_PERMISSIONS[role] ?? {};
}

export function getRoleRestrictionMessage(
  role: DemoRoleId,
  module: PermissionModule,
  action: PermissionAction = "view",
): string | null {
  if (can(role, module, action)) return null;
  const moduleMessages = RESTRICTION_MESSAGES[module];
  return (
    moduleMessages?.[action] ??
    moduleMessages?.default ??
    `${MODULE_LABELS[module]} would be restricted in live mode for this demo role.`
  );
}

export function getRolesWithAccess(
  module: PermissionModule,
  action: PermissionAction = "view",
): DemoRoleId[] {
  return (Object.keys(ROLE_PERMISSIONS) as DemoRoleId[]).filter((r) => can(r, module, action));
}

export function getRoleAccessHint(module: PermissionModule): string {
  return ROLE_ACCESS_HINTS[module] ?? "Club Secretary/Admin";
}

export function shouldShowPermissionPreview(
  role: DemoRoleId,
  module: PermissionModule,
  action: PermissionAction = "view",
): boolean {
  if (role === "demo-super-admin") return false;
  return !can(role, module, action);
}

export const ALL_DEMO_ROLE_IDS: DemoRoleId[] = [
  "secretary-admin",
  "treasurer",
  "coach",
  "welfare-officer",
  "fundraising-lead",
  "committee-readonly",
  "demo-super-admin",
];

export const MATRIX_MODULES: PermissionModule[] = [
  "dashboard",
  "members",
  "members-sensitive",
  "attendance",
  "finance",
  "gift-aid",
  "communications",
  "documents",
  "documents-sensitive",
  "staff",
  "wage-prep",
  "fundraising",
  "reports",
  "exports",
  "audit",
  "settings",
];
