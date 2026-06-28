"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { TableScrollWrap } from "@/components/ui/TableScrollWrap";
import { DemoOnlyNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { COMMUNICATIONS_LINKS } from "@/lib/fundraising";
import { BUSINESS_FOLLOWUP_HELP, PLEDGE_HELP } from "@/lib/terminologyHelp";
import { formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function FollowUpsClient() {
  const { followUps, completeFollowUp } = useFundraisingDemo();
  const open = followUps.filter((f) => f.status !== "completed");

  return (
    <>
      <PageHeader title="Follow-ups" description="Tasks to chase pledges, send thank-yous and renew sponsorships." breadcrumbs={moduleBreadcrumb(MODULES.fundraising, "Follow-ups")} backHref={moduleBackHref(MODULES.fundraising, "Follow-ups")} />
      <FundraisingSubNav active="Follow-ups" />
      <DemoOnlyNotice />
      <p className="mt-4 text-xs text-slate-500">{BUSINESS_FOLLOWUP_HELP}</p>
      <p className="mt-1 text-xs text-slate-500">{PLEDGE_HELP}</p>
      <TableScrollWrap className="mt-4">
        <Card className="overflow-x-auto">
          <DataTable headers={["Donor/business", "Task", "Due", "Priority", "Campaign", "Suggested action", "Status", "Actions"]}>
          {open.map((f) => (
            <tr key={f.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{f.donorOrBusiness}</td>
              <td className="px-4 py-3 capitalize text-slate-600">{f.taskType}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(f.dueDate)}</td>
              <td className="px-4 py-3"><Badge variant={f.priority === "high" ? "danger" : f.priority === "medium" ? "warning" : "default"}>{f.priority}</Badge></td>
              <td className="px-4 py-3 text-sm text-slate-600">{f.linkedCampaign ?? "—"}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{f.suggestedAction}</td>
              <td className="px-4 py-3"><Badge variant={f.status === "overdue" ? "danger" : "warning"}>{f.status === "overdue" ? "Follow-up due" : f.status}</Badge></td>
              <td className="px-4 py-3">
                <button type="button" onClick={() => completeFollowUp(f.id)} className="text-xs font-medium text-indigo-600 hover:underline">Mark complete</button>
                <Link href={f.taskType.includes("thank") ? COMMUNICATIONS_LINKS.thankYou : COMMUNICATIONS_LINKS.sponsorshipRequest} className="ml-2 text-xs text-indigo-600 hover:underline">Prepare message</Link>
              </td>
            </tr>
          ))}
        </DataTable>
        </Card>
      </TableScrollWrap>
    </>
  );
}
