import Link from "next/link";
import { Badge } from "@/components/ui";
import type { ComposeContext } from "@/lib/communicationsCompose";
import type { MessageTemplate, RecipientGroup } from "@/data/providers/types";

interface ComposeReasonPanelProps {
  context: ComposeContext;
  template: MessageTemplate | undefined;
  group: RecipientGroup | undefined;
}

export function ComposeReasonPanel({ context, template, group }: ComposeReasonPanelProps) {
  const templateName = context.preset?.label ?? template?.name ?? "None selected";
  const groupName = group?.name ?? "None selected";
  const recipientCount = group?.recipientCount ?? 0;
  const linkedModule = context.sourceModule;

  return (
    <section
      aria-labelledby="compose-reason-heading"
      className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50/60 p-4"
    >
      <h2 id="compose-reason-heading" className="text-sm font-semibold text-slate-900">
        Why this message
      </h2>
      <p className="mt-1 text-xs text-slate-600">
        Demo only — recipient names and counts are fake. No real contact data is used.
      </p>

      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-white/80 bg-white/70 px-3 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Template</dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-900">{templateName}</dd>
        </div>
        <div className="rounded-md border border-white/80 bg-white/70 px-3 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Recipient group
          </dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-900">{groupName}</dd>
        </div>
        <div className="rounded-md border border-white/80 bg-white/70 px-3 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Recipients</dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-900">
            {recipientCount} demo parent{recipientCount !== 1 ? "s" : ""}
          </dd>
        </div>
        <div className="rounded-md border border-white/80 bg-white/70 px-3 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Linked area
          </dt>
          <dd className="mt-0.5">
            <Badge variant="info">{linkedModule}</Badge>
          </dd>
        </div>
      </dl>

      <div className="mt-3 space-y-2 text-sm text-slate-700">
        <p>
          <span className="font-medium text-slate-900">Why these recipients: </span>
          {context.whyIncluded}
        </p>
        <p>
          <span className="font-medium text-slate-900">Suggested next action: </span>
          {context.suggestedNextAction}
        </p>
      </div>

      {context.linkedAdminTask && (
        <p className="mt-3 text-xs text-slate-600">
          <span className="font-medium text-slate-800">Source: </span>
          {context.linkedAdminTask}
          {context.preset?.sourceModule === "Finance" && (
            <>
              {" "}
              ·{" "}
              <Link href="/finance/fees" className="font-medium text-indigo-700 hover:underline">
                View Finance fees
              </Link>
            </>
          )}
          {context.preset?.sourceModule === "Gift Aid" && (
            <>
              {" "}
              ·{" "}
              <Link href="/gift-aid" className="font-medium text-indigo-700 hover:underline">
                View Gift Aid
              </Link>
            </>
          )}
          {context.preset?.sourceModule === "Documents" && (
            <>
              {" "}
              ·{" "}
              <Link href="/documents/missing" className="font-medium text-indigo-700 hover:underline">
                View missing documents
              </Link>
            </>
          )}
        </p>
      )}

      <div
        role="status"
        className="mt-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950"
      >
        <strong>Simulated send only.</strong> No real emails or texts are sent. Do not enter real
        parent, child or contact information.
      </div>
    </section>
  );
}
