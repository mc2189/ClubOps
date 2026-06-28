"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/ui";
import {
  DemoOnlyNotice,
  FinanceSecurityNotice,
  HowMatchingWorksPanel,
  ImportUploadWarning,
} from "@/components/finance/FinanceNotices";
import { FinanceImportStepper } from "@/components/finance/FinanceImportStepper";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import type { ImportPreviewData, MemberProfile } from "@/data/providers/types";
import { PDF_STATEMENT_DEMO } from "@/lib/financeImportCopy";
import {
  computeImportSummary,
  matchAllTransactions,
  matchTypeLabel,
  confidenceTier,
  formatMatchReason,
} from "@/lib/financeMatching";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function ImportFlowClient({
  csvPreview,
  pdfPreview,
  members,
}: {
  csvPreview: ImportPreviewData;
  pdfPreview: ImportPreviewData;
  members: MemberProfile[];
}) {
  const router = useRouter();
  const { loadImport, fees, importItems } = useFinanceDemo();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [source, setSource] = useState<"csv" | "pdf" | null>(null);
  const [preview, setPreview] = useState<ImportPreviewData | null>(null);

  const previewMatches = useMemo(() => {
    if (!preview) return [];
    return matchAllTransactions(preview.normalizedTransactions, fees, members);
  }, [preview, fees, members]);

  const summary = useMemo(() => {
    if (previewMatches.length > 0) return computeImportSummary(previewMatches);
    if (importItems.length > 0) return computeImportSummary(importItems);
    return null;
  }, [previewMatches, importItems]);

  function handleSelectSample(s: "csv" | "pdf") {
    setSource(s);
    setPreview(s === "csv" ? csvPreview : pdfPreview);
    setStep(2);
  }

  function handleRunMatching() {
    if (!preview || !source) return;
    loadImport(source, preview.normalizedTransactions);
    setStep(3);
  }

  function handleProceedToReview() {
    router.push("/finance/import/review");
  }

  return (
    <>
      <PageHeader
        title="Review bank statement"
        description="Guided demo — sample statement only, no real bank connected."
        breadcrumbs={moduleBreadcrumb(MODULES.finance, "Import")}
        backHref={moduleBackHref(MODULES.finance, "Import")}
        action={
          <Link href="/finance" className="text-sm text-slate-500 hover:text-slate-700">
            Back to finance
          </Link>
        }
      />
      <FinanceSubNav active="Import" />
      <DemoOnlyNotice />

      <FinanceRestrictedSection className="mt-4 space-y-4">
        <FinanceSecurityNotice />
        <ImportUploadWarning />
        <FinanceImportStepper currentStep={step} />
        <HowMatchingWorksPanel />

        {step === 1 && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-lg font-semibold text-slate-900">{PDF_STATEMENT_DEMO.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{PDF_STATEMENT_DEMO.description}</p>
              <p className="mt-2 text-sm font-medium text-red-800" role="alert">
                {PDF_STATEMENT_DEMO.warning}
              </p>
              <button
                type="button"
                onClick={() => handleSelectSample("pdf")}
                className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-hover sm:w-auto"
              >
                Use sample PDF statement ({pdfPreview.rawCount} payments)
              </button>
            </Card>

            <Card className="border-dashed border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-900">CSV sample (alternative)</h3>
              <p className="mt-1 text-sm text-slate-600">
                Same demo payments in CSV format — {csvPreview.rawCount} rows, no file upload.
              </p>
              <button
                type="button"
                onClick={() => handleSelectSample("csv")}
                className="mt-3 min-h-[44px] rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Use sample CSV instead
              </button>
            </Card>

            <div className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500">
              <strong className="text-slate-700">File upload disabled</strong> — this public demo does
              not accept real bank files. Use a sample statement above.
            </div>
          </div>
        )}

        {step === 2 && preview && summary && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-lg font-semibold text-slate-900">Payments found in sample statement</h2>
              <p className="mt-1 text-sm text-slate-500">
                Source: {source?.toUpperCase()} demo — {preview.rawCount} payment rows extracted
                (simulated).
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                <SummaryRow label="Payments found" value={String(summary.totalPayments)} />
                <SummaryRow label="High-confidence matches" value={String(summary.highConfidence)} />
                <SummaryRow label="Possible matches" value={String(summary.possibleMatches)} />
                <SummaryRow label="Unmatched payments" value={String(summary.unmatched)} />
                <SummaryRow
                  label="Matched to member fees (est.)"
                  value={formatCurrency(summary.matchedToFeesAmount)}
                />
                <SummaryRow
                  label="Possible donations (est.)"
                  value={formatCurrency(summary.possibleDonationsAmount)}
                />
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold text-slate-900">Payment preview</h3>
              <div className="mt-3 space-y-2">
                {preview.normalizedTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-medium text-slate-900">{formatCurrency(tx.amount)}</span>
                      <span className="text-xs text-slate-500">{formatDate(tx.date)}</span>
                    </div>
                    <p className="mt-0.5 text-slate-600">{tx.reference}</p>
                    <p className="text-xs text-slate-400">{tx.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            <button
              type="button"
              onClick={handleRunMatching}
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 sm:w-auto"
            >
              Run suggested matching →
            </button>
          </div>
        )}

        {step === 3 && preview && summary && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-lg font-semibold text-slate-900">Suggested matches ready for review</h2>
              <p className="mt-2 text-sm text-slate-600">
                The demo has compared references and amounts against member fees and donations. A
                volunteer must confirm or reject each suggestion — nothing is applied automatically.
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                <SummaryRow label="Ready to confirm" value={String(summary.highConfidence)} />
                <SummaryRow label="Needs checking" value={String(summary.possibleMatches)} />
                <SummaryRow label="Unmatched" value={String(summary.unmatched)} />
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold text-slate-900">Sample suggestions</h3>
              <div className="mt-3 space-y-2">
                {preview.normalizedTransactions.slice(0, 4).map((tx) => {
                  const matched = previewMatches.find((m) => m.id === tx.id);
                  return (
                    <div key={tx.id} className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm">
                      <p className="font-medium text-slate-900">
                        {formatCurrency(tx.amount)} · {tx.reference}
                      </p>
                      {matched && (
                        <p className="mt-1 text-xs text-slate-600">
                          {matchTypeLabel(matched.match.category, matched.match.warnings)} ·
                          Confidence: {confidenceTier(matched.match.confidence)} ·{" "}
                          {formatMatchReason(matched.match.reason)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            <button
              type="button"
              onClick={handleProceedToReview}
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 sm:w-auto"
            >
              Continue to review matches →
            </button>
          </div>
        )}
      </FinanceRestrictedSection>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between rounded-md border border-slate-100 bg-white px-3 py-2 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </li>
  );
}
