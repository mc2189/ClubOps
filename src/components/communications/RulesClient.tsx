"use client";

import { Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";

export function RulesClient() {
  const { rules } = useCommunicationsDemo();

  return (
    <>
      <PageHeader
        title="Routing rules"
        description="Plain-English rules showing how incoming responses would be routed in live mode."
      />
      <CommunicationsSubNav active="Rules" />
      <DemoOnlyNotice />
      <p className="mt-2 text-sm text-slate-600">
        Display only — no real mailbox scanning. Rules demonstrate intended automation behaviour.
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
