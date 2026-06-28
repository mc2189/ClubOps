"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, Card, EmptyState, PageHeader } from "@/components/ui";
import {
  DemoOnlyNotice,
  HowMatchingWorksPanel,
} from "@/components/finance/FinanceNotices";
import { FinanceImportStepper } from "@/components/finance/FinanceImportStepper";
import { FinanceRestrictedSection } from "@/components/rbac/ModuleRestrictedSections";
import { FinanceSubNav } from "@/components/finance/FinanceDashboardClient";
import { useFinanceDemo } from "@/components/finance/FinanceDemoProvider";
import {
  computeImportSummary,
  confidenceTier,
  formatMatchReason,
  matchTypeLabel,
} from "@/lib/financeMatching";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { FeeRecord, ImportReviewItem } from "@/data/providers/types";
import { financeImportReviewTrail } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

type ReviewTab = "ready" | "checking" | "unmatched" | "confirmed";

export function ImportReviewClient() {
  const {
    importItems,
    importSource,
    importApproved,
    fees,
    approveMatch,
    rejectMatch,
    markUnknown,
    approveImport,
    localAuditEvents,
  } = useFinanceDemo();

  const [tab, setTab] = useState<ReviewTab>("ready");
  const [actionMessages, setActionMessages] = useState<Record<string, string>>({});
  const [importSuccess, setImportSuccess] = useState(false);
  const [demoActionNote, setDemoActionNote] = useState<string | null>(null);

  const summary = useMemo(
    () => (importItems.length > 0 ? computeImportSummary(importItems) : null),
    [importItems],
  );

  const readyToConfirm = importItems.filter(
    (i) =>
      i.match.reviewStatus !== "approved" &&
      (i.match.reviewStatus === "auto-matched" ||
        (i.match.reviewStatus === "suggested" && i.match.confidence >= 95)),
  );
  const needsChecking = importItems.filter(
    (i) =>
      i.match.reviewStatus !== "approved" &&
      (i.match.reviewStatus === "flagged" ||
        (i.match.reviewStatus === "suggested" && i.match.confidence < 95)),
  );
  const unmatchedQueue = importItems.filter(
    (i) => i.match.reviewStatus !== "approved" && i.match.reviewStatus === "unmatched",
  );
  const confirmed = importItems.filter((i) => i.match.reviewStatus === "approved");

  const tabItems: Record<ReviewTab, ImportReviewItem[]> = {
    ready: readyToConfirm,
    checking: needsChecking,
    unmatched: unmatchedQueue,
    confirmed,
  };

  function setMessage(id: string, message: string) {
    setActionMessages((prev) => ({ ...prev, [id]: message }));
  }

  function handleConfirm(item: ImportReviewItem) {
    approveMatch(item.id);
    const name = item.match.suggestedMemberName ?? "member record";
    if (item.match.category === "member fee") {
      setMessage(
        item.id,
        `Matched to ${name}. June fee marked as paid in this demo.`,
      );
    } else {
      setMessage(item.id, `Match confirmed for ${formatCurrency(item.amount)} (demo session only).`);
    }
  }

  function handleReject(item: ImportReviewItem) {
    rejectMatch(item.id);
    setMessage(item.id, "Suggestion rejected. Payment remains in review.");
    setTab("checking");
  }

  function handleUnknown(item: ImportReviewItem) {
    markUnknown(item.id);
    setMessage(item.id, "Payment marked unknown. It will stay in the unmatched queue.");
    setTab("unmatched");
  }

  function handleApproveImport() {
    approveImport();
    setImportSuccess(true);
  }

  if (importItems.length === 0) {
    return (
      <>
        <PageHeader
          title="Review payments"
          description="Confirm suggested matches — sample statement only."
          breadcrumbs={financeImportReviewTrail()}
          backHref="/finance/import"
        />
        <FinanceSubNav active="Import" />
        <EmptyState
          title="No sample statement loaded"
          description="Start with the guided import wizard to load the demo bank statement."
        />
        <Link
          href="/finance/import"
          className="mt-4 inline-flex min-h-[48px] items-center font-medium text-indigo-600 hover:underline"
        >
          Use sample statement →
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Review payments"
        description={`${importSource?.toUpperCase() ?? "Sample"} statement — volunteer confirms each match`}
        breadcrumbs={financeImportReviewTrail()}
        backHref="/finance/import"
        action={
          <Link href="/finance/import" className="text-sm text-slate-500 hover:text-slate-700">
            Choose another sample
          </Link>
        }
      />
      <FinanceSubNav active="Import" />
      <DemoOnlyNotice />

      <FinanceRestrictedSection className="mt-4 space-y-4">
        <FinanceImportStepper currentStep={4} />
        <HowMatchingWorksPanel />

        {summary && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Statement summary</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <SummaryPill label="Payments found" value={String(summary.totalPayments)} />
              <SummaryPill label="High-confidence" value={String(summary.highConfidence)} />
              <SummaryPill label="Needs checking" value={String(summary.possibleMatches)} />
              <SummaryPill label="Unmatched" value={String(summary.unmatched)} />
              <SummaryPill
                label="Est. member fees"
                value={formatCurrency(summary.matchedToFeesAmount)}
              />
              <SummaryPill
                label="Est. donations"
                value={formatCurrency(summary.possibleDonationsAmount)}
              />
            </ul>
          </Card>
        )}

        <div
          className="flex gap-1 overflow-x-auto border-b border-slate-200 pb-px"
          role="tablist"
          aria-label="Review queues"
        >
          {(
            [
              ["ready", "Ready to confirm", readyToConfirm.length],
              ["checking", "Needs checking", needsChecking.length],
              ["unmatched", "Unmatched", unmatchedQueue.length],
              ["confirmed", "Confirmed", confirmed.length],
            ] as const
          ).map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "shrink-0 rounded-t-lg px-3 py-2.5 text-sm font-medium",
                tab === id
                  ? "border border-b-white border-slate-200 bg-white text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50",
              )}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {importSuccess && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Demo import confirmed — matched payments applied for this session only. See recent
            activity below.
          </div>
        )}

        {demoActionNote && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
            {demoActionNote}
          </div>
        )}

        <div className="space-y-3 pb-4">
          {tabItems[tab].length === 0 ? (
            <p className="text-sm text-slate-500">No payments in this queue.</p>
          ) : (
            tabItems[tab].map((item) => (
              <TransactionReviewCard
                key={item.id}
                item={item}
                fees={fees}
                message={actionMessages[item.id]}
                isUnmatchedTab={tab === "unmatched"}
                onConfirm={() => handleConfirm(item)}
                onReject={() => handleReject(item)}
                onUnknown={() => handleUnknown(item)}
                onDemoAction={(note) => setDemoActionNote(note)}
              />
            ))
          )}
        </div>

        <Card className="border-indigo-100 bg-indigo-50/50">
          <h2 className="text-sm font-semibold text-indigo-900">Follow up (simulated)</h2>
          <p className="mt-1 text-sm text-indigo-800">
            Links to Communications demo — no real messages are sent.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href="/communications/compose?preset=unpaid-fees"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              Send fee reminder (simulated)
            </Link>
            <Link
              href="/communications/compose"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              Message parent (simulated)
            </Link>
            <Link
              href="/finance/fees"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              Review unpaid fees
            </Link>
          </div>
        </Card>

        {!importApproved && confirmed.length > 0 && (
          <div className="pb-6">
            <button
              type="button"
              onClick={handleApproveImport}
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 sm:w-auto"
            >
              Apply confirmed matches (demo)
            </button>
            <p className="mt-2 text-xs text-slate-500">
              Session only — no real payments processed. Refresh resets demo data.
            </p>
          </div>
        )}

        {localAuditEvents.length > 0 && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">What changed (demo audit)</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {localAuditEvents.slice(0, 5).map((ev) => (
                <li key={ev.id}>• {ev.details}</li>
              ))}
            </ul>
          </Card>
        )}
      </FinanceRestrictedSection>
    </>
  );
}

function SummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <li className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <p className="font-semibold text-slate-900">{value}</p>
    </li>
  );
}

function TransactionReviewCard({
  item,
  fees,
  message,
  isUnmatchedTab,
  onConfirm,
  onReject,
  onUnknown,
  onDemoAction,
}: {
  item: ImportReviewItem;
  fees: FeeRecord[];
  message?: string;
  isUnmatchedTab: boolean;
  onConfirm: () => void;
  onReject: () => void;
  onUnknown: () => void;
  onDemoAction: (note: string) => void;
}) {
  const tier = confidenceTier(item.match.confidence);
  const type = matchTypeLabel(item.match.category, item.match.warnings);
  const fee = item.match.suggestedMemberId
    ? fees.find((f) => f.memberId === item.match.suggestedMemberId)
    : undefined;
  const isApproved = item.match.reviewStatus === "approved";
  const isMemberFee = item.match.category === "member fee" && fee;

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-lg font-bold text-slate-900">{formatCurrency(item.amount)}</p>
          <p className="text-sm text-slate-600">{formatDate(item.date)}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="default">{type}</Badge>
          <Badge
            variant={
              tier === "High" ? "success" : tier === "Medium" ? "warning" : "danger"
            }
          >
            Confidence: {tier}
          </Badge>
          {isApproved && <Badge variant="success">Confirmed</Badge>}
        </div>
      </div>

      <dl className="mt-3 space-y-1.5 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Reference / payer</dt>
          <dd className="text-slate-800">{item.reference}</dd>
        </div>
        {item.match.suggestedMemberName && (
          <div>
            <dt className="text-xs font-medium uppercase text-slate-400">Suggested match</dt>
            <dd className="text-slate-800">
              {item.match.suggestedMemberName}
              {item.match.suggestedMemberId && (
                <>
                  {" "}
                  <Link
                    href={`/members/${item.match.suggestedMemberId}`}
                    className="text-indigo-600 underline"
                  >
                    View profile
                  </Link>
                </>
              )}
            </dd>
          </div>
        )}
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Reason</dt>
          <dd className="text-slate-700">{formatMatchReason(item.match.reason)}</dd>
        </div>
      </dl>

      {item.match.warnings.map((w) => (
        <p key={w} className="mt-2 text-xs font-medium text-amber-800">
          ⚠ {w}
        </p>
      ))}

      {isMemberFee && (
        <div className="mt-3 rounded-md border border-emerald-100 bg-emerald-50/80 px-3 py-2 text-sm">
          <p className="font-medium text-emerald-900">Fee impact preview (simulated)</p>
          <div className="mt-1 grid gap-1 sm:grid-cols-3">
            <p>
              <span className="text-emerald-700">Before:</span> June fee{" "}
              {fee.status === "paid" ? "paid" : "unpaid"}
            </p>
            <p>
              <span className="text-emerald-700">After confirm:</span> June fee paid
            </p>
            <p>
              <span className="text-emerald-700">Remaining balance:</span>{" "}
              {isApproved ? formatCurrency(0) : formatCurrency(fee.amountOutstanding)}
            </p>
          </div>
        </div>
      )}

      {message && (
        <p className="mt-3 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-800" role="status">
          {message}
        </p>
      )}

      {isUnmatchedTab && (
        <div className="mt-3 rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <p className="font-medium">Why unmatched</p>
          <p className="mt-1">
            Reference does not match a current member name or expected fee amount.
          </p>
          <p className="mt-2 font-medium">Suggested next steps (demo)</p>
          <div className="mt-2 flex flex-col gap-2">
            {[
              "Check with treasurer",
              "Ask parent to confirm reference",
              "Keep in review",
            ].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onDemoAction(`${label} — demo action only, no message sent.`)}
                className="min-h-[44px] rounded-md border border-amber-200 bg-white px-3 py-2 text-left text-sm font-medium text-amber-900 hover:bg-amber-50"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isApproved && item.match.reviewStatus !== "unmatched" && (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-[48px] w-full rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
          >
            Confirm match
          </button>
          <button
            type="button"
            onClick={onReject}
            className="min-h-[48px] w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
          >
            Not this member
          </button>
          <button
            type="button"
            onClick={onUnknown}
            className="min-h-[48px] w-full rounded-md border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-100 sm:w-auto"
          >
            Mark unknown
          </button>
        </div>
      )}

      {isUnmatchedTab && !isApproved && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onUnknown}
            className="min-h-[48px] w-full rounded-md border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900 sm:w-auto"
          >
            Keep in unmatched queue
          </button>
        </div>
      )}
    </Card>
  );
}
