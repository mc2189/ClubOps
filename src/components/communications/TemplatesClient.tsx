"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { applyTemplatePlaceholders, DEFAULT_PREVIEW_VARS } from "@/lib/communications";

export function TemplatesClient() {
  const { templates } = useCommunicationsDemo();

  return (
    <>
      <PageHeader
        title="Message templates"
        description="Reusable templates with simple placeholders for common club messages."
      />
      <CommunicationsSubNav active="Templates" />
      <DemoOnlyNotice />
      <div className="mt-6 space-y-4">
        {templates.map((tpl) => (
          <Card key={tpl.id}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">{tpl.name}</h2>
                <p className="text-sm text-slate-500">{tpl.category}</p>
              </div>
              <Link
                href={`/communications/compose?template=${tpl.id}`}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Use template
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Subject: {applyTemplatePlaceholders(tpl.subject, DEFAULT_PREVIEW_VARS)}
            </p>
            <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-xs text-slate-600">
              {applyTemplatePlaceholders(tpl.body, DEFAULT_PREVIEW_VARS)}
            </pre>
            {tpl.linkedFormId && (
              <span className="mt-2 inline-block">
                <Badge variant="info">Includes form link</Badge>
              </span>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
