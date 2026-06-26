"use client";

import { DECLARATION_REQUEST_PREVIEW } from "@/lib/giftAid";

export function DeclarationRequestModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Prepare Gift Aid declaration request</h3>
        <p className="mt-1 text-sm text-amber-700">
          Demo preview only — no email will be sent. Links to future Communications module.
        </p>
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="font-medium text-slate-700">Subject: {DECLARATION_REQUEST_PREVIEW.subject}</p>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-slate-600">
            {DECLARATION_REQUEST_PREVIEW.body}
          </pre>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Close preview
          </button>
          <LinkPlaceholder />
        </div>
      </div>
    </div>
  );
}

function LinkPlaceholder() {
  return (
    <span className="flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-500">
      Send via Communications (coming soon)
    </span>
  );
}
