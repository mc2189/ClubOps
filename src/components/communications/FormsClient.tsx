"use client";

import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { formatDate } from "@/lib/utils";

export function FormsClient() {
  const { forms } = useCommunicationsDemo();

  return (
    <>
      <PageHeader
        title="Digital forms"
        description="Forms that can be attached to messages and receive simulated responses."
      />
      <CommunicationsSubNav active="Forms" />
      <DemoOnlyNotice />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {forms.map((form) => (
          <Card key={form.id}>
            <div className="flex items-start justify-between">
              <h2 className="font-semibold text-slate-900">{form.name}</h2>
              <Badge variant={form.status === "active" ? "success" : "default"}>
                {form.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-600">{form.purpose}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <dt className="font-medium text-slate-500">Linked module</dt>
                <dd>{form.linkedModule}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Last sent</dt>
                <dd>{form.lastSent ? formatDate(form.lastSent) : "Not yet sent"}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Responses received</dt>
                <dd>{form.responsesReceived}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Needs review</dt>
                <dd>
                  {form.responsesNeedingReview > 0 ? (
                    <Badge variant="warning">{form.responsesNeedingReview}</Badge>
                  ) : (
                    "0"
                  )}
                </dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </>
  );
}
