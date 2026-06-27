"use client";

import { Card, PageHeader, DataTable, Badge, EmptyState } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { formatDate } from "@/lib/utils";

const statusVariant = (status: string) => {
  switch (status) {
    case "simulated":
    case "sent":
      return "success" as const;
    case "scheduled":
      return "info" as const;
    case "draft":
      return "default" as const;
    default:
      return "default" as const;
  }
};

export function HistoryClient() {
  const { history } = useCommunicationsDemo();

  return (
    <>
      <PageHeader
        title="Message history"
        description="Audit trail of simulated sends, drafts and scheduled messages."
      />
      <CommunicationsSubNav active="History" />
      <DemoOnlyNotice />
      {history.length === 0 ? (
        <EmptyState
          title="No message history yet"
          description="Simulated sends and drafts appear here after you compose messages. No real emails are sent."
          actionLabel="Compose message"
          actionHref="/communications/compose"
          secondaryActionLabel="View templates"
          secondaryActionHref="/communications/templates"
          className="mt-6"
        />
      ) : (
      <Card className="mt-6 overflow-x-auto">
        <DataTable
          headers={[
            "Date",
            "Sender",
            "Group",
            "Subject",
            "Template",
            "Forms",
            "Status",
            "Module",
            "Audit ref",
          ]}
        >
          {history.map((h) => (
            <tr key={h.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-600">{formatDate(h.dateTime.slice(0, 10))}</td>
              <td className="px-4 py-3 text-slate-600">{h.sender}</td>
              <td className="px-4 py-3 text-slate-600">{h.recipientGroup}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{h.subject}</td>
              <td className="px-4 py-3 text-slate-600">{h.templateUsed ?? "—"}</td>
              <td className="px-4 py-3 text-slate-600">
                {h.formsAttached?.join(", ") ?? "—"}
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(h.status)}>
                  {h.status === "simulated" ? "Simulated send" : h.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-slate-600">{h.linkedModule}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-500">
                {h.auditReference ?? "—"}
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
      )}
    </>
  );
}
