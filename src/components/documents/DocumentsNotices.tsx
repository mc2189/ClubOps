export function DemoOnlyNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <strong>Demo only — no real files are uploaded or stored.</strong> All uploads and scans
      are simulated locally. Refresh the page to reset session changes.
    </div>
  );
}

export function DocumentsSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Documents data protection</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>No real files are stored in demo mode</li>
        <li>{/* TODO: RBAC — live mode must encrypt and protect sensitive uploads */}Future live mode must encrypt and protect sensitive uploads</li>
        <li>Future live mode must restrict medical and safeguarding documents</li>
        <li>Future live mode must virus-scan all uploads</li>
        <li>Future live mode must control exports and downloads</li>
        <li>Future live mode must retain full audit history</li>
        <li>Future live mode must support retention and archive policies</li>
      </ul>
    </div>
  );
}
