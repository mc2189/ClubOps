"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { applyTemplatePlaceholders, DEFAULT_PREVIEW_VARS } from "@/lib/communications";
import { communicationsTrail } from "@/lib/breadcrumbs";

export function TemplatesClient() {
  const { templates } = useCommunicationsDemo();

  return (
    <>
      <PageHeader
        title="Message templates"
        description="Reusable templates with simple placeholders for common club messages."
        breadcrumbs={communicationsTrail("Templates")}
        backHref="/communications"
      />
      <CommunicationsSubNav active="Templates" />
      <DemoOnlyNotice />
      <div className="mt-6 space-y-4">
        {templates.map((tpl) => (
          <Card key={tpl.id}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">{tpl.name}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant="default">{tpl.category}</Badge>
                  {tpl.linkedModule && (
                    <span className="text-xs text-slate-500">Linked to {tpl.linkedModule}</span>
                  )}
                  {tpl.needsReviewBeforeSend && (
                    <Badge variant="warning">Review before send</Badge>
                  )}
                </div>
              </div>
              <Link
                href={`/communications/compose?template=${tpl.id}`}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:w-auto"
              >
                Use template
              </Link>
            </div>
            {tpl.purpose && (
              <p className="mt-3 text-sm text-slate-700">
                <span className="font-medium">What it is for: </span>
                {tpl.purpose}
              </p>
            )}
            {tpl.whenToUse && (
              <p className="mt-1 text-sm text-slate-600">
                <span className="font-medium">When to use: </span>
                {tpl.whenToUse}
              </p>
            )}
            <p className="mt-3 text-sm font-medium text-slate-700">
              Sample subject: {applyTemplatePlaceholders(tpl.subject, DEFAULT_PREVIEW_VARS)}
            </p>
            <pre className="mt-2 max-h-36 overflow-auto whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-xs text-slate-600">
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
