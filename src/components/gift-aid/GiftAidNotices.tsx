export { DemoOnlyNotice } from "@/components/demo/DemoOnlyNotice";

export function GiftAidSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Gift Aid data protection</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>No real declarations are used in demo mode</li>
        <li>{/* TODO: RBAC — live version must restrict Gift Aid/finance access to treasurer/admin */}Future live version must restrict Gift Aid and finance access</li>
        <li>Future live version must store declaration evidence securely</li>
        <li>Future live version must retain full audit history and support declaration withdrawal</li>
      </ul>
    </div>
  );
}

export function ComplianceWarnings() {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3">
      <p className="text-sm font-semibold text-red-900">
        Gift Aid should only be claimed on genuine voluntary donations.
      </p>
      <ul className="mt-2 space-y-1 text-sm text-red-800">
        <li>Do not claim Gift Aid on class fees, coaching or membership payments.</li>
        <li>Do not claim Gift Aid on raffle tickets, business donations or sponsorship.</li>
        <li>Do not reduce fees and replace the difference with donations.</li>
        <li>Do not claim without a valid declaration from a UK taxpayer.</li>
      </ul>
    </div>
  );
}

export function IneligibleWarning({ reason }: { reason?: string }) {
  return (
    <p className="text-xs font-medium text-red-700">
      Do not claim Gift Aid on this income type.
      {reason && <span className="block font-normal text-red-600">{reason}</span>}
    </p>
  );
}
