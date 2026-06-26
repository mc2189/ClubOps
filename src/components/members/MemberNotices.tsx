export function DemoOnlyNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <strong>Demo only</strong> — changes are not stored permanently. Refresh the page to reset
      all member data.
    </div>
  );
}

export function SensitiveDataNotice({ area }: { area: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Sensitive data — {area}</strong>
      <p className="mt-1 text-red-800">
        This section contains confidential information.{" "}
        {/* TODO: RBAC — restrict access to authorised roles (welfare officer, admin) only */}
        Future role-based permissions will restrict who can view and edit this data.
      </p>
    </div>
  );
}
