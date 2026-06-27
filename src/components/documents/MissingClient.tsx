"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge, EmptyState } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import { priorityVariant } from "@/lib/documents";

export function MissingClient() {
  const { missing } = useDocumentsDemo();

  return (
    <>
      <PageHeader
        title="Missing documents"
        description="Documents and forms that are missing or incomplete across the club."
      />
      <DocumentsSubNav active="Missing" />
      <DemoOnlyNotice />
      {missing.length === 0 ? (
        <EmptyState
          title="No missing documents"
          description="All required forms and documents are complete in the demo data."
          actionLabel="Upload demo document"
          actionHref="/documents/upload"
          className="mt-4"
        />
      ) : (
      <Card className="mt-4 overflow-x-auto">
        <DataTable
          headers={[
            "Person / record",
            "Missing document",
            "Priority",
            "Module",
            "Suggested action",
          ]}
        >
          {missing.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{item.linkedPerson}</td>
              <td className="px-4 py-3 text-slate-600">{item.missingDocument}</td>
              <td className="px-4 py-3">
                <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-600">{item.linkedModule}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.suggestedAction}
                {item.linkedModule === "Communications" ||
                item.suggestedAction.includes("Communications") ||
                item.suggestedAction.includes("form") ? (
                  <Link
                    href="/communications/compose"
                    className="ml-2 text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Open Communications
                  </Link>
                ) : item.linkedModule === "Gift Aid" ? (
                  <Link
                    href="/communications/compose?preset=gift-aid"
                    className="ml-2 text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Request declaration
                  </Link>
                ) : item.linkedModule === "Finance" ? (
                  <Link
                    href="/documents/upload"
                    className="ml-2 text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Upload demo
                  </Link>
                ) : null}
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
      )}
    </>
  );
}
