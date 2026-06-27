"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { formatDate } from "@/lib/utils";
import { communicationsTrail } from "@/lib/breadcrumbs";

export function GroupsClient() {
  const { groups } = useCommunicationsDemo();

  return (
    <>
      <PageHeader
        title="Recipient groups"
        description="Dynamic groups built from members, finance, Gift Aid and other demo data."
        breadcrumbs={communicationsTrail("Groups")}
        backHref="/communications"
      />
      <CommunicationsSubNav active="Groups" />
      <DemoOnlyNotice />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.id}>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold text-slate-900">{group.name}</h2>
              <Badge variant="info">{group.recipientCount} recipients</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-600">{group.description}</p>
            <dl className="mt-3 space-y-1 text-xs text-slate-500">
              <div className="flex gap-2">
                <dt className="font-medium">Source:</dt>
                <dd>{group.sourceModule}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Examples:</dt>
                <dd>{group.exampleRecipients.join(", ")}</dd>
              </div>
              {group.lastContacted && (
                <div className="flex gap-2">
                  <dt className="font-medium">Last contacted:</dt>
                  <dd>{formatDate(group.lastContacted)}</dd>
                </div>
              )}
            </dl>
            <Link
              href={`/communications/compose?group=${group.id}`}
              className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
            >
              Message this group
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
