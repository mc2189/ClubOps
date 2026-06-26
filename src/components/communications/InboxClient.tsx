"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge, EmptyState } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { inboxStatusLabel, inboxStatusVariant } from "@/lib/communications";

export function InboxClient() {
  const { inbox, updateInboxStatus } = useCommunicationsDemo();

  return (
    <>
      <PageHeader
        title="Inbox — form responses"
        description="Simulated incoming responses with auto-matching and suggested actions."
      />
      <CommunicationsSubNav active="Inbox" />
      <DemoOnlyNotice />
      <p className="mt-2 text-sm text-slate-600">
        Uncertain matches are flagged for human review. No real mailbox is connected.
      </p>
      {inbox.length === 0 ? (
        <EmptyState
          title="No form responses in inbox"
          description="Simulated replies appear here when parents respond to demo forms. Refresh resets the inbox."
          className="mt-4"
        />
      ) : (
      <Card className="mt-4 overflow-x-auto">
        <DataTable
          headers={[
            "Sender",
            "Subject",
            "Type",
            "Matched record",
            "Confidence",
            "Suggested action",
            "Status",
            "Actions",
          ]}
        >
          {inbox.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-600">{item.sender}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{item.subject}</td>
              <td className="px-4 py-3 text-slate-600">{item.detectedType}</td>
              <td className="px-4 py-3 text-slate-600">
                {item.matchedMemberId ? (
                  <Link href={`/members/${item.matchedMemberId}`} className="text-indigo-600 hover:underline">
                    {item.matchedRecord}
                  </Link>
                ) : (
                  item.matchedRecord
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    item.confidence < 70 ? "font-medium text-red-600" : "text-slate-600"
                  }
                >
                  {item.confidence}%
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{item.suggestedAction}</td>
              <td className="px-4 py-3">
                <Badge variant={inboxStatusVariant[item.status]}>
                  {inboxStatusLabel[item.status]}
                </Badge>
              </td>
              <td className="px-4 py-3">
                {item.status === "needs-review" && (
                  <button
                    type="button"
                    onClick={() => updateInboxStatus(item.id, "auto-filed")}
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Mark reviewed
                  </button>
                )}
                {item.status === "unresolved" && (
                  <button
                    type="button"
                    onClick={() => updateInboxStatus(item.id, "needs-review")}
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Assign for review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
      )}
    </>
  );
}
