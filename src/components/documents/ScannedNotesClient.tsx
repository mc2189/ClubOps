"use client";

import { useState } from "react";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";
import type { ScannedNoteType } from "@/data/providers/types";
import { formatDate } from "@/lib/utils";
import { documentsTrail } from "@/lib/breadcrumbs";

const noteTypes: ScannedNoteType[] = [
  "progress note",
  "skill assessment",
  "injury/incident",
  "welfare/behaviour",
  "safeguarding concern",
  "parent communication",
  "general note",
];

export function ScannedNotesClient() {
  const { scannedNotes, confirmScannedNote } = useDocumentsDemo();
  const pending = scannedNotes.filter((n) => n.status !== "assigned");
  const [selectedId, setSelectedId] = useState(pending[0]?.id ?? "");
  const [member, setMember] = useState(pending[0]?.suggestedMember ?? "");
  const [noteType, setNoteType] = useState<ScannedNoteType>(
    pending[0]?.suggestedNoteType ?? "progress note",
  );
  const [coach, setCoach] = useState(pending[0]?.coach ?? "Morgan Ellis");
  const [confirmed, setConfirmed] = useState(false);

  const selected = scannedNotes.find((n) => n.id === selectedId);

  const handleSelect = (id: string) => {
    const note = scannedNotes.find((n) => n.id === id);
    setSelectedId(id);
    setMember(note?.suggestedMember ?? "");
    setNoteType(note?.suggestedNoteType ?? "progress note");
    setCoach(note?.coach ?? "Morgan Ellis");
    setConfirmed(false);
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    confirmScannedNote(selectedId, member, noteType, coach);
    setConfirmed(true);
  };

  const isRestricted =
    noteType === "injury/incident" ||
    noteType === "safeguarding concern" ||
    noteType === "welfare/behaviour";

  return (
    <>
      <PageHeader
        title="Scanned notes"
        description="Digitise paper gymnast notes — simulated extraction and member matching."
        breadcrumbs={documentsTrail("Scanned notes")}
        backHref="/documents"
      />
      <DocumentsSubNav active="Scanned notes" />
      <DemoOnlyNotice />

      {isRestricted && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          <strong>Restricted content</strong> — safeguarding and injury notes require restricted
          access in live mode. Demo shows summary placeholders only.
        </div>
      )}

      {confirmed && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Scanned note saved as digital note linked to member profile. Audit event recorded.
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Pending scanned notes</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {pending.map((note) => (
              <li key={note.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(note.id)}
                  className={`w-full px-2 py-3 text-left text-sm hover:bg-slate-50 ${
                    selectedId === note.id ? "bg-indigo-50" : ""
                  }`}
                >
                  <p className="font-medium text-slate-900">{note.fileName}</p>
                  <p className="text-slate-500">
                    {note.suggestedMember} · {formatDate(note.scannedDate)}
                  </p>
                  <Badge variant={note.status === "needs-review" ? "warning" : "default"}>
                    {note.status === "needs-review" ? "Needs review" : "Pending assignment"}
                  </Badge>
                </button>
              </li>
            ))}
            {pending.length === 0 && (
              <li className="py-4 text-sm text-slate-500">All scanned notes have been digitised.</li>
            )}
          </ul>
        </Card>

        {selected && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Preview & assign</h2>
            <div className="mt-3 rounded-md border border-dashed border-slate-300 bg-slate-100 p-8 text-center text-sm text-slate-500">
              [Scanned note preview placeholder — {selected.fileName}]
            </div>
            <pre className="mt-3 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-xs text-slate-700">
              {selected.extractedPreview}
            </pre>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Member match</label>
                <input
                  type="text"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Note type</label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as ScannedNoteType)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                >
                  {noteTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Coach / author</label>
                <input
                  type="text"
                  value={coach}
                  onChange={(e) => setCoach(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Confirm assignment
              </button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
