export { DemoOnlyNotice } from "@/components/demo/DemoOnlyNotice";

export function ReportsSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Export data protection</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>Exports would be restricted to authorised roles in live mode</li>
        <li>Detailed medical and safeguarding information must not be casually exported</li>
        <li>Financial exports require treasurer or admin access</li>
        <li>Audit logs should be tamper-resistant in live mode</li>
        <li>Real data retention policies are required before production use</li>
      </ul>
    </div>
  );
}

export function ExportSuccessNotice({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
      <strong>Demo export complete — {title}</strong>
      <p className="mt-1">No real file generated. Audit event recorded. Restricted in live mode.</p>
    </div>
  );
}
