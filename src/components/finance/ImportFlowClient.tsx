"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge, Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice, FinanceSecurityNotice } from "@/components/finance/FinanceNotices";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import type { ImportPreviewData } from "@/data/providers/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export function ImportFlowClient({
  csvPreview,
  pdfPreview,
}: {
  csvPreview: ImportPreviewData;
  pdfPreview: ImportPreviewData;
}) {
  const router = useRouter();
  const { loadImport } = useFinanceDemo();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [source, setSource] = useState<"csv" | "pdf" | null>(null);
  const [preview, setPreview] = useState<ImportPreviewData | null>(null);

  function handleSelectSource(s: "csv" | "pdf") {
    setSource(s);
    setPreview(s === "csv" ? csvPreview : pdfPreview);
    setStep(2);
  }

  function handleNormalise() {
    setStep(3);
  }

  function handleProceedToReview() {
    if (!preview || !source) return;
    loadImport(source, preview.normalizedTransactions);
    router.push("/finance/import/review");
  }

  return (
    <>
      <PageHeader
        title="Import bank statement"
        description="Guided demo flow — fake transactions only."
        action={
          <Link href="/finance" className="text-sm text-slate-500 hover:text-slate-700">
            Back to finance
          </Link>
        }
      />
      <FinanceSubNav active="Import" />
      <DemoOnlyNotice />
      <div className="mt-4">
        <FinanceSecurityNotice />
      </div>

      <div className="mt-6 flex gap-2">
        {[1, 2, 3].map((s) => (
          <Badge key={s} variant={step >= s ? "info" : "default"}>
            Step {s}
          </Badge>
        ))}
      </div>

      {step === 1 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSelectSource("csv")}
            className="rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm hover:border-indigo-300"
          >
            <h3 className="font-semibold text-slate-900">CSV example</h3>
            <p className="mt-2 text-sm text-slate-600">
              Demo CSV with {csvPreview.rawCount} normalised transactions ready to import.
            </p>
          </button>
          <button
            type="button"
            onClick={() => handleSelectSource("pdf")}
            className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-left hover:border-indigo-300"
          >
            <h3 className="font-semibold text-slate-900">PDF example (simulated)</h3>
            <p className="mt-2 text-sm text-slate-600">
              Placeholder showing how PDF extraction will work later. Uses OCR-style demo data — no
              real PDF parsing.
            </p>
          </button>
        </div>
      )}

      {step === 2 && preview && (
        <Card className="mt-6">
          <h3 className="font-semibold text-slate-900">
            Preview — {source?.toUpperCase()} ({preview.rawCount} transactions)
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Columns normalised to: date, description, reference, amount, type
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-slate-500">
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Description</th>
                  <th className="pb-2 pr-4">Reference</th>
                  <th className="pb-2 pr-4">Amount</th>
                  <th className="pb-2">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {preview.normalizedTransactions.slice(0, 6).map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-2 pr-4">{formatDate(tx.date)}</td>
                    <td className="py-2 pr-4">{tx.description}</td>
                    <td className="py-2 pr-4 text-slate-500">{tx.reference}</td>
                    <td className="py-2 pr-4">{formatCurrency(tx.amount)}</td>
                    <td className="py-2">{tx.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview.normalizedTransactions.length > 6 && (
              <p className="mt-2 text-xs text-slate-400">
                + {preview.normalizedTransactions.length - 6} more transactions
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleNormalise}
            className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Normalise &amp; auto-match
          </button>
        </Card>
      )}

      {step === 3 && preview && (
        <Card className="mt-6">
          <h3 className="font-semibold text-slate-900">Auto-match complete</h3>
          <p className="mt-2 text-sm text-slate-600">
            Transactions have been matched to members, categorised and flagged for review where
            needed. Proceed to the review screen to approve matches.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-slate-600">
            <li>• Member fee payments matched by amount and surname</li>
            <li>• Expenses categorised (hall hire, equipment, insurance)</li>
            <li>• Donations identified</li>
            <li>• Exceptions and duplicates flagged</li>
          </ul>
          <button
            type="button"
            onClick={handleProceedToReview}
            className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Proceed to review
          </button>
        </Card>
      )}
    </>
  );
}
