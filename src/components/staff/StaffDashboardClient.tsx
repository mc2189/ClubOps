"use client";

import Link from "next/link";
import { Card, StatCard, Badge } from "@/components/ui";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { DemoOnlyNotice, StaffSecurityNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { formatStaffCurrency } from "@/lib/staff";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function StaffDashboardClient() {
  const { dashboard, staff, alerts } = useStaffDemo();
  const openAlerts = alerts.filter((a) => a.status !== "resolved").slice(0, 4);

  return (
    <>
      <GlamPageHeader
        title="Staff & Volunteers"
        description="Coaches, volunteers, rota, qualifications, wages and operational outgoings."
        breadcrumbs={moduleBreadcrumb(MODULES.staff)}
        backHref="/dashboard"
      />
      <StaffSubNav active="Dashboard" />
      <DemoOnlyNotice />
      <div className="mt-4 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active coaches" value={dashboard.activeCoaches} />
          <StatCard label="Active volunteers" value={dashboard.activeVolunteers} />
          <StatCard label="Committee/admin" value={dashboard.committeeAdminPlaceholder} hint="Demo placeholder" />
          <StatCard label="Qualifications expiring" value={dashboard.qualificationsExpiringSoon} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="DBS review due" value={dashboard.dbsReviewDue} />
          <StatCard label="Sessions needing staff" value={dashboard.sessionsNeedingStaff} />
          <StatCard label="Wage prep this month" value={formatStaffCurrency(dashboard.wagePrepTotalThisMonth)} />
          <StatCard label="Outgoings due" value={formatStaffCurrency(dashboard.outgoingsDueThisMonth)} />
        </div>
        <StatCard label="Venue bookings this week" value={dashboard.venueBookingsThisWeek} />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link href="/staff/rota" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">View rota</Link>
              <Link href="/staff/qualifications" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">Review qualifications</Link>
              <Link href="/staff/wages" className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-100">Prepare wages</Link>
              <Link href="/staff/venues" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">View venues</Link>
              <Link href="/staff/outgoings" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">Add outgoing</Link>
              <Link href="/staff/alerts" className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">View alerts</Link>
            </div>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Open alerts</h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {openAlerts.map((a) => (
                <li key={a.id} className="py-2 text-sm">
                  <p className="font-medium text-slate-900">{a.title}</p>
                  <p className="text-slate-500">{a.suggestedAction}</p>
                </li>
              ))}
            </ul>
            <Link href="/staff/alerts" className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline">View all alerts</Link>
          </Card>
        </div>

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Staff & volunteers</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {staff.filter((s) => s.status === "active").slice(0, 5).map((person) => (
              <li key={person.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <Link href={`/staff/${person.id}`} className="font-medium text-indigo-600 hover:underline">{person.name}</Link>
                  <p className="text-slate-500">{person.role} · {person.staffType}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <StaffSecurityNotice />
      </div>
    </>
  );
}
