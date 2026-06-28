"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge, EmptyState } from "@/components/ui";
import { LocalSafetyNote } from "@/components/demo/LocalSafetyNote";
import { DemoOnlyNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import { priorityVariant } from "@/lib/documents";
import {
  missingDocumentActionHref,
  missingDocumentActionLabel,
  missingDocumentSecondaryHref,
} from "@/lib/missingDocumentCompose";
import { documentsTrail } from "@/lib/breadcrumbs";
import type { MissingDocumentItem } from "@/data/providers/types";

function MissingDocumentMobileCard({ item }: { item: MissingDocumentItem }) {
  const actionHref = missingDocumentActionHref(item);
  const actionLabel = missingDocumentActionLabel(item);
  const secondaryHref = missingDocumentSecondaryHref(item);

  return (
    <Card className="p-4">
      <p className="font-semibold text-slate-900">{item.linkedPerson}</p>
      <p className="mt-1 text-sm text-slate-700">{item.missingDocument}</p>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Priority</dt>
          <dd className="mt-0.5">
            <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Source module</dt>
          <dd className="text-slate-700">{item.linkedModule}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">Suggested action</dt>
          <dd className="text-slate-700">{item.suggestedAction}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-col gap-2">
        <Link
          href={actionHref}
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {actionLabel}
        </Link>
        {secondaryHref && (
          <Link
            href={secondaryHref}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Assign demo document
          </Link>
        )}
      </div>
    </Card>
  );
}

export function MissingClient() {
  const { missing } = useDocumentsDemo();

  return (
    <>
      <PageHeader
        title="Missing documents"
        description="Documents and forms that are missing or incomplete across the club."
        breadcrumbs={documentsTrail("Missing")}
        backHref="/documents"
      />
      <DocumentsSubNav active="Missing" />
      <DemoOnlyNotice />
      <LocalSafetyNote className="mt-4">Demo only. Real uploads are disabled.</LocalSafetyNote>
      {missing.length === 0 ? (
        <EmptyState
          title="No missing documents"
          description="All required forms and documents are complete in the demo data."
          actionLabel="Upload demo document"
          actionHref="/documents/upload"
          className="mt-4"
        />
      ) : (
        <>
          <div className="mt-4 space-y-3 pb-24 md:hidden">
            {missing.map((item) => (
              <MissingDocumentMobileCard key={item.id} item={item} />
            ))}
          </div>

          <Card className="mt-4 hidden overflow-x-auto md:block">
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
                    <Link
                      href={missingDocumentActionHref(item)}
                      className="ml-2 text-xs font-medium text-indigo-600 hover:underline"
                    >
                      {missingDocumentActionLabel(item)}
                    </Link>
                  </td>
                </tr>
              ))}
            </DataTable>
          </Card>
        </>
      )}
    </>
  );
}
