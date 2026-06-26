export function DemoOnlyNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <strong>Demo only</strong> — no real staff data is stored. All changes are simulated locally.
      Refresh the page to reset session changes.
    </div>
  );
}

export function StaffSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Staff data protection</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>No real staff data is used in demo mode</li>
        <li>{/* TODO: RBAC — live mode must restrict staff record access */}Future live mode must restrict staff records to authorised roles</li>
        <li>PVG/DBS details must be handled carefully in live mode</li>
        <li>Safeguarding notes require strict access control</li>
        <li>Wage and payment prep requires treasurer/admin access</li>
        <li>Documents and evidence must be stored securely</li>
        <li>Audit history must be retained for all staff changes</li>
      </ul>
    </div>
  );
}

export function WagePrepWarning() {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Wage prep only</strong> — this is not payroll software and does not submit to HMRC.
      Demo export creates a local summary only.
    </div>
  );
}
