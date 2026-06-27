"use client";

import Link from "next/link";
import { Card, PageHeader, StatCard, Badge } from "@/components/ui";
import {
  DemoOnlyNotice,
  DocumentsSecurityNotice,
} from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import { formatDate } from "@/lib/utils";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function DocumentsDashboardClient() {
  const { dashboard, activities } = useDocumentsDemo();

  return (
    <>
      <PageHeader
        title="Documents"
        description="Scan, upload and assign club documents — all simulated in demo mode."
        breadcrumbs={moduleBreadcrumb(MODULES.documents)}
        backHref="/dashboard"
      />
      <DocumentsSubNav active="Dashboard" />
      <DemoOnlyNotice />
      <div className="mt-4 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total documents" value={dashboard.totalDocuments} />
          <StatCard label="Unassigned" value={dashboard.unassignedDocuments} />
          <StatCard label="Sensitive" value={dashboard.sensitiveDocuments} />
          <StatCard label="Awaiting review" value={dashboard.awaitingReview} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Missing forms" value={dashboard.missingForms} />
          <StatCard label="Archived" value={dashboard.archivedDocuments} />
          <StatCard label="Scanned notes pending" value={dashboard.scannedNotesPending} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link
                href="/documents/upload"
                className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-100"
              >
                Upload demo document
              </Link>
              <Link
                href="/documents/assignment"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Assign documents
              </Link>
              <Link
                href="/documents/scanned-notes"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Review scanned notes
              </Link>
              <Link
                href="/documents/missing"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                View missing documents
              </Link>
              <Link
                href="/documents/archive"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                View archive
              </Link>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Recent document activity</h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {activities.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <p className="font-medium text-slate-900">{a.action}</p>
                    <p className="text-slate-500">{a.documentTitle}</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {formatDate(a.timestamp.slice(0, 10))}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Document categories</h2>
          <p className="mt-1 text-sm text-slate-600">
            Medical, safeguarding, finance and qualification documents are marked sensitive in live
            mode.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "medical form",
              "consent form",
              "Gift Aid declaration",
              "bank statement",
              "receipt",
              "coach qualification",
              "progress/skill note",
            ].map((cat) => (
              <Badge key={cat} variant="default">
                {cat}
              </Badge>
            ))}
          </div>
        </Card>

        <DocumentsSecurityNotice />
      </div>
    </>
  );
}
