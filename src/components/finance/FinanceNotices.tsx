import { MATCHING_STEPS } from "@/lib/financeImportCopy";

export { DemoOnlyNotice } from "@/components/demo/DemoOnlyNotice";

export function FinanceSecurityNotice() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>No real bank connected</strong>
      <ul className="mt-2 list-inside list-disc space-y-1 text-red-800">
        <li>Do not upload real bank statements into this demo</li>
        <li>No Open Banking, payment processing or real reconciliation</li>
        <li>Sample data only — for demonstration and volunteer training</li>
        <li>
          Future live version must restrict finance access to authorised roles and protect bank
          data securely
        </li>
      </ul>
    </div>
  );
}

export function ImportUploadWarning() {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
    >
      Do not upload real bank statements into this demo. File upload is disabled — use the sample
      statement only.
    </div>
  );
}

export function HowMatchingWorksPanel({ className }: { className?: string }) {
  return (
    <aside
      className={`rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 ${className ?? ""}`}
      aria-labelledby="how-matching-works-heading"
    >
      <h2 id="how-matching-works-heading" className="font-semibold text-slate-900">
        How matching works
      </h2>
      <ol className="mt-2 list-inside list-decimal space-y-1">
        {MATCHING_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-slate-500">
        Every suggested match must be reviewed by a volunteer — nothing is applied automatically in
        this demo.
      </p>
    </aside>
  );
}
