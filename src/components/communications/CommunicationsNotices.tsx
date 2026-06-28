export { DemoOnlyNotice } from "@/components/demo/DemoOnlyNotice";

export function CommunicationsSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Communications data protection</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>No real email is sent in demo mode</li>
        <li>{/* TODO: RBAC — live version must restrict bulk messaging to authorised roles */}Future live mode must restrict who can send bulk messages</li>
        <li>Future live mode must protect parent and member contact details</li>
        <li>Future live mode must handle consent, preferences and unsubscribe</li>
        <li>Future live mode must securely process form responses</li>
        <li>Medical and safeguarding form responses require restricted access</li>
        <li>Audit history must be retained for all outbound messages</li>
      </ul>
    </div>
  );
}
