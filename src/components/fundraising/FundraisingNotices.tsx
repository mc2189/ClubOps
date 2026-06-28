export { DemoOnlyNotice } from "@/components/demo/DemoOnlyNotice";

export function FundraisingSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Fundraising data protection</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>No real donor or business data in demo mode</li>
        <li>{/* TODO: RBAC — live mode must restrict finance/fundraising access */}Future live mode must protect contact details</li>
        <li>Future live mode must restrict finance and fundraising access</li>
        <li>Future live mode must handle consent and preferences for communications</li>
        <li>Future live mode must retain full audit history</li>
        <li>Future live mode must keep Gift Aid and finance records consistent</li>
      </ul>
    </div>
  );
}

export function GiftAidGuidanceNotice() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Gift Aid guidance</strong>
      <ul className="mt-2 list-inside list-disc space-y-1">
        <li>Business sponsorship and business donations are not Gift Aid eligible.</li>
        <li>Individual voluntary donations from UK taxpayers may be eligible if conditions are met.</li>
        <li>Raffle income, class fees and grants are not Gift Aid eligible.</li>
      </ul>
    </div>
  );
}
