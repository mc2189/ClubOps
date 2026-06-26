export function AuditDemoNotice() {
  return (
    <div role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Demo only</strong> — audit events are simulated. Refresh the page to reset session changes.
    </div>
  );
}

export function AuditSecurityGuidance() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Why audit logs matter</h2>
        <p className="mt-2 text-sm text-slate-600">
          Audit logs provide evidence of who changed what and when. For a volunteer-run club, this helps
          treasurers, secretaries and welfare officers demonstrate accountability.
        </p>
      </div>
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-900">
        <strong>Future live mode requirements</strong>
        <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
          <li>{/* TODO: RBAC — immutable audit history */}Retain immutable audit history — no silent deletion</li>
          <li>Role-based access controls for sensitive modules</li>
          <li>Log all access to sensitive data (medical, safeguarding, finance)</li>
          <li>Log all exports and downloads</li>
          <li>Log archive and restore actions on documents</li>
          <li>Log failed login and security events</li>
          <li>Define and enforce data retention policies</li>
        </ul>
      </div>
    </div>
  );
}
