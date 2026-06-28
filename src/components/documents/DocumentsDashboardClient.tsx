"use client";

import Link from "next/link";
import { Card, StatCard } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { DocumentsSecurityNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import { formatDate } from "@/lib/utils";
import { DOCUMENTS_LANDING } from "@/lib/moduleTaskFlow";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function DocumentsDashboardClient() {
  const { dashboard, activities } = useDocumentsDemo();

  return (
    <>
      <GlamPageHeader
        title="Documents"
        description="Scan, upload and assign club documents — demo only."
        breadcrumbs={moduleBreadcrumb(MODULES.documents)}
        backHref="/dashboard"
      />
      <DocumentsSubNav active="Dashboard" />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={DOCUMENTS_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "missing",
              value: `${dashboard.missingForms} forms missing`,
              label: "pending",
              tone: "pending",
            },
            {
              id: "unassigned",
              value: `${dashboard.unassignedDocuments} unassigned`,
              label: "to assign",
              tone: dashboard.unassignedDocuments > 0 ? "pending" : "neutral",
            },
          ]}
        />

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
          <ul className="mt-2 divide-y divide-slate-100">
            {activities.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <p className="font-medium text-slate-900">{a.action}</p>
                  <p className="text-xs text-slate-500">{a.documentTitle}</p>
                </div>
                <span className="text-xs text-slate-400">{formatDate(a.timestamp.slice(0, 10))}</span>
              </li>
            ))}
          </ul>
        </Card>

        <ModuleMoreTools title="More documents tools">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/documents/upload", label: "Upload demo document" },
              { href: "/documents/assignment", label: "Assign documents" },
              { href: "/documents/scanned-notes", label: "Scanned notes" },
              { href: "/documents/missing", label: "Missing documents" },
              { href: "/documents/archive", label: "Archive" },
              { href: "/documents/rules", label: "Rules" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Documents summary stats">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total documents" value={dashboard.totalDocuments} />
            <StatCard label="Awaiting review" value={dashboard.awaitingReview} />
            <StatCard label="Sensitive" value={dashboard.sensitiveDocuments} />
            <StatCard label="Archived" value={dashboard.archivedDocuments} />
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Documents safety notes">
          <DocumentsSecurityNotice />
        </ModuleMoreTools>
      </div>
    </>
  );
}
