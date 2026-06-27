"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { TableScrollWrap } from "@/components/ui/TableScrollWrap";
import { DemoOnlyNotice } from "@/components/fundraising/FundraisingNotices";
import { FundraisingSubNav } from "@/components/fundraising/FundraisingSubNav";
import { useFundraisingDemo } from "@/components/fundraising/FundraisingDemoProvider";
import { businessStatusVariant, COMMUNICATIONS_LINKS, formatFundraisingCurrency } from "@/lib/fundraising";
import type { BusinessLeadStatus } from "@/data/providers/types";
import { formatDate } from "@/lib/utils";
import { MODULES, moduleBackHref, moduleBreadcrumb } from "@/lib/breadcrumbs";

const statuses: BusinessLeadStatus[] = ["not contacted", "contacted", "interested", "pledged", "donated", "declined", "renewal due"];

export function BusinessesClient() {
  const { businesses, updateBusinessStatus, recordPledge, recordDonation } = useFundraisingDemo();

  return (
    <>
      <PageHeader title="Business CRM" description="Local businesses, sponsors and follow-up pipeline." breadcrumbs={moduleBreadcrumb(MODULES.fundraising, "Businesses")} backHref={moduleBackHref(MODULES.fundraising, "Businesses")} />
      <FundraisingSubNav active="Businesses" />
      <DemoOnlyNotice />
      <TableScrollWrap className="mt-4">
        <Card className="overflow-x-auto">
          <DataTable headers={["Business", "Contact", "Sector", "Status", "Potential", "Pledged", "Received", "Next follow-up", "Actions"]}>
          {businesses.map((b) => (
            <tr key={b.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{b.businessName}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{b.contactPerson ?? "—"}<br /><span className="text-xs">{b.contactPlaceholder}</span></td>
              <td className="px-4 py-3 text-slate-600">{b.sector}</td>
              <td className="px-4 py-3"><Badge variant={businessStatusVariant(b.status)}>{b.status}</Badge></td>
              <td className="px-4 py-3">{b.potentialAmount ? formatFundraisingCurrency(b.potentialAmount) : "—"}</td>
              <td className="px-4 py-3">{b.pledgedAmount ? formatFundraisingCurrency(b.pledgedAmount) : "—"}</td>
              <td className="px-4 py-3">{b.receivedAmount ? formatFundraisingCurrency(b.receivedAmount) : "—"}</td>
              <td className="px-4 py-3 text-sm">{b.nextFollowUpDate ? formatDate(b.nextFollowUpDate) : "—"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  <select className="rounded border border-slate-300 px-1 py-0.5 text-xs" defaultValue="" onChange={(e) => e.target.value && updateBusinessStatus(b.id, e.target.value as BusinessLeadStatus)}>
                    <option value="">Status…</option>
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button type="button" onClick={() => recordPledge(b.id, b.potentialAmount ?? 250)} className="text-xs text-indigo-600 hover:underline">Record pledge</button>
                  <button type="button" onClick={() => recordDonation(b.id, b.pledgedAmount ?? 250)} className="text-xs text-indigo-600 hover:underline">Record donation</button>
                  <Link href={COMMUNICATIONS_LINKS.sponsorshipRequest} className="text-xs text-slate-500 hover:underline">Message</Link>
                </div>
                {b.suggestedNextAction && <p className="mt-1 text-xs text-slate-500">{b.suggestedNextAction}</p>}
              </td>
            </tr>
          ))}
        </DataTable>
        </Card>
      </TableScrollWrap>
    </>
  );
}
