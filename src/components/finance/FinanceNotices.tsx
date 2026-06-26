export function DemoOnlyNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <strong>Demo only</strong> — no real bank data is processed or stored. Refresh the page to
      reset all finance changes.
    </div>
  );
}

export function FinanceSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Finance data protection</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>No real bank statements are used in demo mode</li>
        <li>{/* TODO: RBAC — live version must restrict finance access to treasurer/admin roles */}Future live version must restrict finance access to authorised roles</li>
        <li>Future live version must protect bank data and store uploads securely</li>
        <li>Future live version must provide export controls and full audit logs</li>
      </ul>
    </div>
  );
}
