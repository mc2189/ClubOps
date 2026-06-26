"use client";

import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { SupabasePrepSafetyNotice } from "@/components/settings/SupabasePrepSafetyNotice";
import { schemaMigrationFiles } from "@/data/demo/supabasePrepData";

export function SchemaPlanClient() {
  return (
    <>
      <PageHeader
        title="Schema plan"
        description="Draft Supabase SQL migrations — not applied to any project."
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <SupabasePrepSafetyNotice />

      <Card className="mt-6">
        <p className="text-sm text-slate-600">
          Files live in <code className="text-xs">supabase/migrations/</code>. Each file is marked
          draft only. See SUPABASE_SCHEMA_PLAN.md and SUPABASE_RLS_PLAN.md in the repo.
        </p>
      </Card>

      <div className="mt-6 space-y-3">
        {schemaMigrationFiles.map((m) => (
          <Card key={m.file} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{m.title}</h3>
              <code className="text-xs text-slate-500">{m.file}</code>
            </div>
            <p className="mt-2 text-sm text-slate-600">{m.tables}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <h2 className="text-base font-semibold text-slate-900">Design notes</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
          <li>UUID primary keys; <code className="text-xs">club_id</code> on tenant tables</li>
          <li>Soft archive: archived_at, archived_by, archive_reason where appropriate</li>
          <li>audit_events append-only — no app UPDATE/DELETE in live mode</li>
          <li>Document binaries in Storage; metadata in documents table</li>
        </ul>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/supabase-prep" className="font-medium text-indigo-600 hover:underline">
          Supabase prep overview →
        </Link>
        <Link href="/settings/private-deployment" className="font-medium text-indigo-600 hover:underline">
          Private deployment checklist →
        </Link>
      </div>
    </>
  );
}
