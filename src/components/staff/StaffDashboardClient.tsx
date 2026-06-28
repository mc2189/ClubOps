"use client";

import Link from "next/link";
import { Card, StatCard, Badge } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { StaffSecurityNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import { formatStaffCurrency } from "@/lib/staff";
import { STAFF_LANDING } from "@/lib/moduleTaskFlow";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";

export function StaffDashboardClient() {
  const { dashboard, staff, alerts } = useStaffDemo();
  const openAlerts = alerts.filter((a) => a.status !== "resolved");

  return (
    <>
      <GlamPageHeader
        title="Staff & Volunteers"
        description="Coaches, rota, qualifications and operational alerts."
        breadcrumbs={moduleBreadcrumb(MODULES.staff)}
        backHref="/dashboard"
      />
      <StaffSubNav active="Dashboard" />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={STAFF_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "rota",
              value: `${dashboard.sessionsNeedingStaff} rota gap${dashboard.sessionsNeedingStaff !== 1 ? "s" : ""}`,
              label: "pending",
              tone: dashboard.sessionsNeedingStaff > 0 ? "pending" : "resolved",
            },
            {
              id: "quals",
              value: `${dashboard.qualificationsExpiringSoon} qualifications expiring`,
              label: "review",
              tone: dashboard.qualificationsExpiringSoon > 0 ? "pending" : "neutral",
            },
          ]}
        />

        {openAlerts.length > 0 && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Open alerts</h2>
            <ul className="mt-2 divide-y divide-slate-100">
              {openAlerts.slice(0, 3).map((a) => (
                <li key={a.id} className="py-2 text-sm">
                  <p className="font-medium text-slate-900">{a.title}</p>
                  <p className="text-xs text-slate-500">{a.suggestedAction}</p>
                </li>
              ))}
            </ul>
            <Link href="/staff/alerts" className="mt-2 inline-block text-sm text-indigo-600 hover:underline">
              View all alerts →
            </Link>
          </Card>
        )}

        <ModuleMoreTools title="More staff tools">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/staff/rota", label: "Rota" },
              { href: "/staff/qualifications", label: "Qualifications" },
              { href: "/staff/wages", label: "Wages" },
              { href: "/staff/venues", label: "Venues" },
              { href: "/staff/outgoings", label: "Outgoings" },
              { href: "/staff/alerts", label: "Alerts" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {staff.filter((s) => s.status === "active").slice(0, 4).map((person) => (
              <li key={person.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <Link href={`/staff/${person.id}`} className="font-medium text-indigo-600 hover:underline">
                    {person.name}
                  </Link>
                  <p className="text-xs text-slate-500">{person.role}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </li>
            ))}
          </ul>
        </ModuleMoreTools>

        <ModuleMoreTools title="Staff summary stats">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active coaches" value={dashboard.activeCoaches} />
            <StatCard label="Active volunteers" value={dashboard.activeVolunteers} />
            <StatCard label="Wage prep (month)" value={formatStaffCurrency(dashboard.wagePrepTotalThisMonth)} />
            <StatCard label="Venue bookings" value={dashboard.venueBookingsThisWeek} />
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Staff safety notes">
          <StaffSecurityNotice />
        </ModuleMoreTools>
      </div>
    </>
  );
}
