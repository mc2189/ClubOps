"use client";

import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import { formatDate } from "@/lib/utils";

export function ArchiveClient() {
  const { documents, restoreDocument } = useDocumentsDemo();
  const archived = documents.filter((d) => d.archived);

  return (
    <>
      <PageHeader
        title="Document archive"
        description="Soft-archived documents — restore or view audit trail. No permanent delete."
      />
      <DocumentsSubNav active="Archive" />
      <DemoOnlyNotice />
      <p className="mt-2 text-sm text-slate-600">
        Documents are archived, not deleted. Future live mode will support retention policies.
      </p>
      <Card className="mt-4 overflow-x-auto">
        <DataTable
          headers={[
            "Title",
            "Category",
            "Linked record",
            "Archived date",
            "Audit ref",
            "Actions",
          ]}
        >
          {archived.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                No archived documents.
              </td>
            </tr>
          ) : (
            archived.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{doc.title}</td>
                <td className="px-4 py-3 text-slate-600">{doc.category}</td>
                <td className="px-4 py-3 text-slate-600">{doc.linkedRecordName ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(doc.uploadedDate)}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">
                  {doc.auditReference ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => restoreDocument(doc.id)}
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Restore
                  </button>
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="text-xs text-slate-400">View audit trail (placeholder)</span>
                </td>
              </tr>
            ))
          )}
        </DataTable>
      </Card>
      <div className="mt-4">
        <Badge variant="info">Archive only — no permanent delete</Badge>
      </div>
    </>
  );
}
