"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { formatStaffCurrency, paymentStatusVariant } from "@/lib/staff";
import { staffTrail } from "@/lib/breadcrumbs";

export function VenuesClient() {
  const { venues } = useStaffDemo();

  return (
    <>
      <PageHeader title="Venues & hall hire" description="Training halls, competition venues and recurring bookings." breadcrumbs={staffTrail("Venues")} backHref="/staff" />
      <StaffSubNav active="Venues" />
      <DemoOnlyNotice />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {venues.map((v) => (
          <Card key={v.id}>
            <div className="flex items-start justify-between">
              <h2 className="font-semibold text-slate-900">{v.name}</h2>
              <Badge variant={paymentStatusVariant[v.paymentStatus]}>{v.paymentStatus}</Badge>
            </div>
            <dl className="mt-3 space-y-2 text-sm text-slate-600">
              <div><dt className="font-medium text-slate-500">Address</dt><dd>{v.address}</dd></div>
              <div><dt className="font-medium text-slate-500">Contact</dt><dd>{v.contact}</dd></div>
              <div><dt className="font-medium text-slate-500">Hire rate</dt><dd>{formatStaffCurrency(v.hireRate)}/session</dd></div>
              <div><dt className="font-medium text-slate-500">Recurring pattern</dt><dd>{v.recurringPattern}</dd></div>
              <div><dt className="font-medium text-slate-500">Monthly est. cost</dt><dd>{formatStaffCurrency(v.monthlyEstimatedCost)}</dd></div>
              <div>
                <dt className="font-medium text-slate-500">Linked calendar</dt>
                <dd>
                  {v.linkedCalendarItems.map((c) => (
                    <span key={c} className="mr-1 inline-block">
                      <Link href="/calendar" className="text-indigo-600 hover:underline">{c}</Link>
                    </span>
                  ))}
                </dd>
              </div>
              {v.notes && <div><dt className="font-medium text-slate-500">Notes</dt><dd>{v.notes}</dd></div>}
            </dl>
          </Card>
        ))}
      </div>
    </>
  );
}
