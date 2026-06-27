"use client";

import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { TableScrollWrap } from "@/components/ui/TableScrollWrap";
import { DemoOnlyNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import { sensitivityLabel, sensitivityVariant } from "@/lib/documents";
import type { DocumentCategory } from "@/data/providers/types";
import { documentsTrail } from "@/lib/breadcrumbs";

const categories: DocumentCategory[] = [
  "medical form",
  "emergency contact form",
  "consent form",
  "Gift Aid declaration",
  "bank statement",
  "receipt",
  "invoice",
  "coach qualification",
  "safeguarding note",
  "progress/skill note",
  "incident/injury note",
  "parent communication",
  "sponsor document",
  "general note",
];

export function AssignmentClient() {
  const {
    unassigned,
    assignDocument,
    changeCategory,
    markSensitive,
    leaveUnresolved,
    archiveDocument,
  } = useDocumentsDemo();

  return (
    <>
      <PageHeader
        title="Document assignment"
        description="Review unassigned documents and confirm where they belong."
        breadcrumbs={documentsTrail("Assignment")}
        backHref="/documents"
      />
      <DocumentsSubNav active="Assignment" />
      <DemoOnlyNotice />
      <TableScrollWrap className="mt-4">
        <Card className="overflow-x-auto">
        <DataTable
          headers={[
            "File",
            "Suggested category",
            "Suggested record",
            "Confidence",
            "Match reason",
            "Sensitivity",
            "Actions",
          ]}
        >
          {unassigned.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                No unassigned documents — all caught up!
              </td>
            </tr>
          ) : (
            unassigned.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{item.fileName}</td>
                <td className="px-4 py-3">
                  <select
                    value={item.suggestedCategory}
                    onChange={(e) =>
                      changeCategory(item.id, e.target.value as DocumentCategory)
                    }
                    className="rounded border border-slate-300 px-2 py-1 text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-600">{item.suggestedLinkedRecord}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      item.confidence < 70 ? "font-medium text-red-600" : "text-slate-600"
                    }
                  >
                    {item.confidence}%
                  </span>
                </td>
                <td className="max-w-xs px-4 py-3 text-sm text-slate-600">{item.matchReason}</td>
                <td className="px-4 py-3">
                  <Badge variant={sensitivityVariant(item.sensitivity)}>
                    {sensitivityLabel[item.sensitivity]}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => assignDocument(item.id)}
                      className="rounded bg-indigo-600 px-2 py-1 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Assign
                    </button>
                    <button
                      type="button"
                      onClick={() => markSensitive(item.id)}
                      className="rounded border border-amber-300 px-2 py-1 text-xs text-amber-800 hover:bg-amber-50"
                    >
                      Mark sensitive
                    </button>
                    <button
                      type="button"
                      onClick={() => leaveUnresolved(item.id)}
                      className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      Leave unresolved
                    </button>
                    <button
                      type="button"
                      onClick={() => archiveDocument(item.id)}
                      className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </DataTable>
        </Card>
      </TableScrollWrap>
    </>
  );
}
