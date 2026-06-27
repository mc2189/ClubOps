"use client";

import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { TableScrollWrap } from "@/components/ui/TableScrollWrap";
import { DemoOnlyNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { formatDate } from "@/lib/utils";

const AVAILABLE_STAFF = ["Morgan Ellis", "Jamie Hart", "Quinn Shaw"];

export function RotaClient() {
  const { rota, assignStaffToRota, flagConflict, confirmRota } = useStaffDemo();

  return (
    <>
      <PageHeader title="Staff rota" description="Session assignments, gaps and availability conflicts." />
      <StaffSubNav active="Rota" />
      <DemoOnlyNotice />

      <div className="mt-4 space-y-3 md:hidden">
        {rota.map((entry) => (
          <Card key={entry.id}>
            <p className="font-semibold text-slate-900">{entry.sessionName}</p>
            <p className="mt-1 text-sm text-slate-600">
              {formatDate(entry.date)} · {entry.time} · {entry.venue}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Assigned:{" "}
              {entry.assignedStaff.length ? entry.assignedStaff.join(", ") : "Session needs coach"}
            </p>
            {entry.gaps.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {entry.gaps.map((g) => (
                  <Badge key={g} variant="warning">
                    {g}
                  </Badge>
                ))}
              </div>
            )}
            {entry.hasConflict && (
              <div className="mt-2">
                <Badge variant="danger">Conflict</Badge>
              </div>
            )}
            <div className="mt-3 flex flex-col gap-2">
              {entry.gaps.length > 0 && (
                <select
                  className="min-h-[44px] rounded-md border border-slate-300 px-3 py-2 text-sm"
                  defaultValue=""
                  aria-label={`Assign staff to ${entry.sessionName}`}
                  onChange={(e) => {
                    if (e.target.value) assignStaffToRota(entry.id, e.target.value);
                  }}
                >
                  <option value="">Assign staff…</option>
                  {AVAILABLE_STAFF.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => flagConflict(entry.id)}
                  className="min-h-[44px] rounded-md border border-amber-300 px-3 py-2 text-sm text-amber-800"
                >
                  Flag conflict
                </button>
                {!entry.confirmed && (
                  <button
                    type="button"
                    onClick={() => confirmRota(entry.id)}
                    className="min-h-[44px] rounded-md bg-indigo-600 px-3 py-2 text-sm text-white"
                  >
                    Confirm rota
                  </button>
                )}
                {entry.confirmed && <Badge variant="success">Confirmed</Badge>}
              </div>
            </div>
            {entry.suggestedAction && (
              <p className="mt-2 text-sm text-slate-500">{entry.suggestedAction}</p>
            )}
          </Card>
        ))}
      </div>

      <Card className="mt-4 hidden md:block">
        <TableScrollWrap>
          <DataTable headers={["Session", "Date", "Time", "Venue", "Assigned", "Gaps", "Conflict", "Actions"]}>
            {rota.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{entry.sessionName}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(entry.date)}</td>
                <td className="px-4 py-3 text-slate-600">{entry.time}</td>
                <td className="px-4 py-3 text-slate-600">{entry.venue}</td>
                <td className="px-4 py-3 text-slate-600">
                  {entry.assignedStaff.length ? (
                    entry.assignedStaff.join(", ")
                  ) : (
                    <Badge variant="danger">Session needs coach</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {entry.gaps.length ? (
                    entry.gaps.map((g) => (
                      <Badge key={g} variant="warning">
                        {g}
                      </Badge>
                    ))
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  {entry.hasConflict ? <Badge variant="danger">Conflict</Badge> : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {entry.gaps.length > 0 && (
                      <select
                        className="rounded border border-slate-300 px-1 py-0.5 text-xs"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) assignStaffToRota(entry.id, e.target.value);
                        }}
                      >
                        <option value="">Assign staff…</option>
                        {AVAILABLE_STAFF.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      type="button"
                      onClick={() => flagConflict(entry.id)}
                      className="rounded border border-amber-300 px-2 py-0.5 text-xs text-amber-800"
                    >
                      Flag conflict
                    </button>
                    {!entry.confirmed && (
                      <button
                        type="button"
                        onClick={() => confirmRota(entry.id)}
                        className="rounded bg-indigo-600 px-2 py-0.5 text-xs text-white"
                      >
                        Confirm rota
                      </button>
                    )}
                    {entry.confirmed && <Badge variant="success">Confirmed</Badge>}
                  </div>
                  {entry.suggestedAction && (
                    <p className="mt-1 text-xs text-slate-500">{entry.suggestedAction}</p>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        </TableScrollWrap>
      </Card>
    </>
  );
}
