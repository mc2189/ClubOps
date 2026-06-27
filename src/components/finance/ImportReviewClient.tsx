"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Card, EmptyState, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/finance/FinanceNotices";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import {
  categoryLabels,
  confidenceLabel,
  confidenceVariant,
  TRANSACTION_CATEGORIES,
} from "@/lib/financeMatching";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ImportReviewItem, TransactionCategory } from "@/data/providers/types";
import { financeImportReviewTrail } from "@/lib/breadcrumbs";

export function ImportReviewClient() {
  const {
    importItems,
    importSource,
    importApproved,
    approveMatch,
    setCategory,
    approveImport,
  } = useFinanceDemo();
  const [success, setSuccess] = useState(false);

  const autoMatched = importItems.filter((i) => i.match.reviewStatus === "auto-matched");
  const suggested = importItems.filter((i) => i.match.reviewStatus === "suggested");
  const unmatched = importItems.filter((i) => i.match.reviewStatus === "unmatched");
  const donations = importItems.filter(
    (i) => i.match.category === "voluntary donation" || i.description.toUpperCase().includes("DONATION"),
  );
  const expensesNoReceipt = importItems.filter(
    (i) => i.type === "debit" && i.match.category !== "unknown",
  );

  function handleApproveImport() {
    approveImport();
    setSuccess(true);
  }

  if (importItems.length === 0) {
    return (
      <>
        <PageHeader title="Review import" description="No import loaded yet." breadcrumbs={financeImportReviewTrail()} backHref="/finance/import" />
        <FinanceSubNav active="Import" />
        <EmptyState
          title="No statement loaded"
          description="Start the import flow to load demo transactions for review."
        />
        <Link
          href="/finance/import"
          className="mt-4 inline-block text-indigo-600 hover:underline"
        >
          Go to import →
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Review import"
        description={`${importSource?.toUpperCase()} statement — ${importItems.length} transactions`}
        breadcrumbs={financeImportReviewTrail()}
        backHref="/finance/import"
        action={
          <Link href="/finance/import" className="text-sm text-slate-500 hover:text-slate-700">
            Re-import
          </Link>
        }
      />
      <FinanceSubNav active="Import" />
      <DemoOnlyNotice />

      <FinanceRestrictedSection className="mt-4">
      {success && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Import approved (demo session only). Dashboard updated.
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <StatPill label="Auto-matched" value={autoMatched.length} />
        <StatPill label="Needs review" value={suggested.length} />
        <StatPill label="Unmatched" value={unmatched.length} />
        <StatPill label="Donations" value={donations.length} />
      </div>

      <ReviewSection title="Auto-matched payments" items={autoMatched} onApprove={approveMatch} onCategory={setCategory} />
      <ReviewSection title="Suggested matches — needs review" items={suggested} onApprove={approveMatch} onCategory={setCategory} />
      <ReviewSection title="Unmatched transactions" items={unmatched} onApprove={approveMatch} onCategory={setCategory} />
      <ReviewSection title="Possible donations" items={donations} onApprove={approveMatch} onCategory={setCategory} />
      <ReviewSection title="Expenses" items={expensesNoReceipt} onApprove={approveMatch} onCategory={setCategory} />

      {!importApproved && (
        <div className="mt-6">
          <button
            type="button"
            onClick={handleApproveImport}
            className="min-h-[48px] rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Approve demo import
          </button>
        </div>
      )}
      </FinanceRestrictedSection>
    </>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function ReviewSection({
  title,
  items,
  onApprove,
  onCategory,
}: {
  title: string;
  items: ImportReviewItem[];
  onApprove: (id: string) => void;
  onCategory: (id: string, cat: TransactionCategory) => void;
}) {
  if (items.length === 0) return null;

  return (
    <Card className="mt-6">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-slate-900">{item.description}</p>
                <p className="text-sm text-slate-500">
                  {formatDate(item.date)} · {formatCurrency(item.amount)} · {item.reference}
                </p>
                {item.match.suggestedMemberName && (
                  <p className="mt-1 text-sm text-indigo-600">
                    Suggested: {item.match.suggestedMemberName}
                    {item.match.suggestedMemberId && (
                      <>
                        {" "}
                        <Link href={`/members/${item.match.suggestedMemberId}`} className="underline">
                          View profile
                        </Link>
                      </>
                    )}
                  </p>
                )}
                <p className="mt-1 text-xs text-slate-500">{item.match.reason}</p>
                {item.match.warnings.map((w) => (
                  <Badge key={w} variant="warning">
                    {w}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={confidenceVariant(item.match.confidence)}>
                  {item.match.confidence}% — {confidenceLabel(item.match.confidence)}
                </Badge>
                <Badge variant="default">{categoryLabels[item.match.category]}</Badge>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onApprove(item.id)}
                className="min-h-[44px] rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Approve match
              </button>
              <select
                value={item.match.category}
                onChange={(e) => onCategory(item.id, e.target.value as TransactionCategory)}
                className="min-h-[44px] rounded-md border border-slate-300 px-3 py-2 text-sm"
                aria-label="Change category"
              >
                {TRANSACTION_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {categoryLabels[c]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
