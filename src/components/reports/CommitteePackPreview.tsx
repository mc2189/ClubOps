"use client";

import Link from "next/link";
import { Card } from "@/components/ui";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import { getPermissionPreviewLevel } from "@/lib/permissions";
import type { PermissionModule } from "@/lib/permissions";
import {
  buildCommitteePackPreview,
  type CommitteePackPreviewData,
} from "@/lib/committeePackPreview";
import { moduleStatusToneClass } from "@/lib/moduleTaskFlow";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";

interface CommitteePackPreviewProps {
  /** Show compact version on reports landing */
  compact?: boolean;
  data?: CommitteePackPreviewData;
}

function sectionRestricted(
  role: ReturnType<typeof useDemoRole>["role"],
  module?: PermissionModule,
): boolean {
  if (!module) return false;
  if (module === "finance" || module === "gift-aid") {
    return getPermissionPreviewLevel(role, module) === "restricted";
  }
  if (module === "members" && getPermissionPreviewLevel(role, "members-sensitive") === "restricted") {
    return false;
  }
  return getPermissionPreviewLevel(role, module) === "restricted";
}

function sectionSummaryOnly(
  role: ReturnType<typeof useDemoRole>["role"],
  module?: PermissionModule,
): boolean {
  if (!module) return false;
  return getPermissionPreviewLevel(role, module) === "summary";
}

export function CommitteePackPreview({ compact = false, data }: CommitteePackPreviewProps) {
  const { role } = useDemoRole();
  const { lastExportTitle } = useReportsAuditDemo();
  const preview =
    data ?? buildCommitteePackPreview(lastExportTitle != null);

  return (
    <div className="space-y-4">
      <Card className="border-indigo-100 bg-indigo-50/40">
        <h2 className="text-sm font-semibold text-slate-900">{preview.summaryTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{preview.summaryText}</p>
        <p className="mt-2 text-xs text-slate-500">Demo only. No real files are created or sent.</p>
      </Card>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">Export readiness</h2>
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
              preview.readyForPreview
                ? moduleStatusToneClass("resolved")
                : moduleStatusToneClass("pending")
            }`}
          >
            {preview.readyForPreview ? "Ready for demo preview" : "Not ready yet"}
          </span>
        </div>
        <ul className="mt-2 space-y-1.5" aria-label="Export readiness checklist">
          {preview.readiness.map((item) => (
            <li key={item.id} className="flex items-start gap-2 text-sm text-slate-700">
              <span aria-hidden="true" className="mt-0.5 shrink-0">
                {item.complete ? "✓" : "○"}
              </span>
              <span>
                {item.label}
                <span className="sr-only">{item.complete ? " — done" : " — not done"}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-900">Module summaries</h2>
        <div className={`mt-3 grid gap-3 ${compact ? "sm:grid-cols-2" : "lg:grid-cols-2"}`}>
          {preview.sections.map((section) => {
            const restricted = sectionRestricted(role, section.permissionModule);
            const summaryOnly = sectionSummaryOnly(role, section.permissionModule);

            return (
              <Card key={section.id} className="flex flex-col">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{section.title}</h3>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${moduleStatusToneClass(section.statusTone)}`}
                  >
                    {section.status}
                  </span>
                </div>
                {restricted ? (
                  <p className="mt-2 text-sm text-slate-600">
                    Summary hidden for your demo role. Switch to Treasurer or Secretary/Admin to
                    preview this section.
                  </p>
                ) : (
                  <>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      {section.highlights.map((line) => (
                        <li key={line}>• {line}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">Needs attention: </span>
                      {section.attention}
                    </p>
                  </>
                )}
                {summaryOnly && !restricted && (
                  <p className="mt-2 text-xs text-slate-500">
                    Your current demo role can see the summary but not the detailed export.
                  </p>
                )}
                {!restricted && (
                  <Link
                    href={section.moduleHref}
                    className="mt-auto inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:mt-3"
                  >
                    {section.actionLabel}
                  </Link>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {!compact && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Things committee should note</h2>
          <ul className="mt-2 space-y-2">
            {preview.notes.map((note) => (
              <li key={note.id} className="text-sm text-slate-700">
                {note.href ? (
                  <Link href={note.href} className="text-indigo-700 hover:underline">
                    {note.text}
                  </Link>
                ) : (
                  note.text
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {compact && (
        <details className="rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Things committee should note
          </summary>
          <ul className="mt-3 space-y-2">
            {preview.notes.map((note) => (
              <li key={note.id} className="text-sm text-slate-700">
                {note.href ? (
                  <Link href={note.href} className="text-indigo-700 hover:underline">
                    {note.text}
                  </Link>
                ) : (
                  note.text
                )}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
