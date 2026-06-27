"use client";

import { useState } from "react";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import { sensitivityLabel, sensitivityVariant } from "@/lib/documents";
import { documentsTrail } from "@/lib/breadcrumbs";

export function UploadClient() {
  const { uploadExamples, simulateUpload } = useDocumentsDemo();
  const [selectedId, setSelectedId] = useState(uploadExamples[0]?.id ?? "");
  const [uploadedRef, setUploadedRef] = useState<string | null>(null);

  const selected = uploadExamples.find((e) => e.id === selectedId);

  const handleUpload = () => {
    if (!selected) return;
    const ref = simulateUpload(selected);
    setUploadedRef(ref);
  };

  return (
    <>
      <PageHeader
        title="Upload document"
        description="Choose a demo document example — no real files are uploaded or stored."
        breadcrumbs={documentsTrail("Upload")}
        backHref="/documents"
      />
      <DocumentsSubNav active="Upload" />
      <DemoOnlyNotice />

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <label className="block text-xs font-medium text-slate-500">
          File upload (disabled — demo only)
        </label>
        <input
          type="file"
          disabled
          className="mt-1 w-full cursor-not-allowed rounded-md border border-dashed border-slate-300 bg-white px-3 py-2 text-sm text-slate-400"
          aria-label="File upload disabled in demo mode"
        />
        <p className="mt-1 text-xs text-amber-700">No real file stored — use demo examples below.</p>
      </div>

      {uploadedRef && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Demo upload complete. Document added to assignment queue. Audit reference recorded.
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Choose demo document</h2>
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setUploadedRef(null);
            }}
            className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {uploadExamples.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title}
              </option>
            ))}
          </select>
          {selected && (
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="font-medium text-slate-500">File name</dt>
                <dd className="text-slate-800">{selected.fileName}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Type</dt>
                <dd className="text-slate-800">{selected.fileType}</dd>
              </div>
            </dl>
          )}
          <button
            type="button"
            onClick={handleUpload}
            className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Demo upload
          </button>
        </Card>

        {selected && (
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Simulated extraction</h2>
              <Badge variant="warning">No real file stored</Badge>
            </div>
            <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-xs text-slate-700">
              {selected.extractedText}
            </pre>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="font-medium text-slate-500">Suggested category</dt>
                <dd>{selected.suggestedCategory}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Suggested record</dt>
                <dd>{selected.suggestedLinkedRecord}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Module</dt>
                <dd>{selected.suggestedModule}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Confidence</dt>
                <dd>{selected.confidence}%</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Sensitivity</dt>
                <dd>
                  <Badge variant={sensitivityVariant(selected.sensitivity)}>
                    {sensitivityLabel[selected.sensitivity]}
                  </Badge>
                </dd>
              </div>
            </dl>
          </Card>
        )}
      </div>
    </>
  );
}
