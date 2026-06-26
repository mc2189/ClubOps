"use client";

import { Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/documents/DocumentsNotices";
import { DocumentsSubNav } from "@/components/documents/DocumentsSubNav";
import { useDocumentsDemo } from "@/components/documents/DocumentsDemoProvider";

export function RulesClient() {
  const { rules } = useDocumentsDemo();

  return (
    <>
      <PageHeader
        title="Document routing rules"
        description="Plain-English rules showing how documents would be routed in live mode."
      />
      <DocumentsSubNav active="Rules" />
      <DemoOnlyNotice />
      <p className="mt-2 text-sm text-slate-600">
        Display only — no automatic processing in demo mode.
      </p>
      <div className="mt-6 space-y-3">
        {rules
          .slice()
          .sort((a, b) => a.priority - b.priority)
          .map((rule) => (
            <Card key={rule.id}>
              <p className="text-xs font-medium text-slate-400">Priority {rule.priority}</p>
              <p className="mt-1 text-sm text-slate-800">
                <strong>If</strong> {rule.condition.toLowerCase()}
              </p>
              <p className="mt-1 text-sm text-indigo-800">
                <strong>Then</strong> {rule.action}
              </p>
            </Card>
          ))}
      </div>
    </>
  );
}
