"use client";

import Link from "next/link";
import { Card, PageHeader, DataTable, Badge } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/staff/StaffNotices";
import { StaffSubNav } from "@/components/staff/StaffSubNav";
import { useStaffDemo } from "@/components/staff/StaffDemoProvider";
import type { StaffProfileRecord } from "@/data/providers/types";
import { statusVariant } from "@/lib/staff";
import { formatDate } from "@/lib/utils";

export function StaffListClient() {
  const { staff } = useStaffDemo();

  return (
    <>
      <PageHeader title="All staff & volunteers" description="Coaches, helpers, committee and admin — demo data only." />
      <StaffSubNav active="Dashboard" />
      <DemoOnlyNotice />
      <Card className="mt-4 overflow-x-auto">
        <DataTable headers={["Name", "Role", "Type", "Sessions", "DBS", "Status"]}>
          {staff.map((person) => (
            <tr key={person.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <Link href={`/staff/${person.id}`} className="font-medium text-indigo-600 hover:underline">{person.name}</Link>
              </td>
              <td className="px-4 py-3 text-slate-600">{person.role}</td>
              <td className="px-4 py-3 capitalize text-slate-600">{person.staffType}</td>
              <td className="px-4 py-3 text-slate-600">{person.assignedSessions.length || "—"}</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(person.dbsStatus)}>{person.dbsStatus}</Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant={person.status === "active" ? "success" : "default"}>{person.status}</Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </>
  );
}

export function StaffProfileClient({ profile }: { profile: StaffProfileRecord }) {
  return (
    <>
      <PageHeader
        title={profile.name}
        description={`${profile.role} · ${profile.staffType}`}
        action={<Link href="/staff" className="text-sm font-medium text-indigo-600 hover:underline">← Back to staff</Link>}
      />
      <StaffSubNav />
      <DemoOnlyNotice />
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Contact</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div><dt className="text-slate-500">Email</dt><dd>{profile.email}</dd></div>
            {profile.phone && <div><dt className="text-slate-500">Phone</dt><dd>{profile.phone}</dd></div>}
            <div><dt className="text-slate-500">Availability</dt><dd>{profile.availability}</dd></div>
            {profile.sessionRate !== undefined && profile.sessionRate > 0 && (
              <div><dt className="text-slate-500">Session rate</dt><dd>£{profile.sessionRate}/session</dd></div>
            )}
          </dl>
        </Card>
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Compliance</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">DBS/PVG</dt><dd><Badge variant={statusVariant(profile.dbsStatus)}>{profile.dbsStatus}</Badge>{profile.dbsExpiry && <span className="ml-2 text-slate-500">exp {formatDate(profile.dbsExpiry)}</span>}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Safeguarding</dt><dd><Badge variant={statusVariant(profile.safeguardingStatus)}>{profile.safeguardingStatus}</Badge></dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">First aid</dt><dd><Badge variant={statusVariant(profile.firstAidStatus)}>{profile.firstAidStatus}</Badge></dd></div>
          </dl>
        </Card>
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Assigned sessions</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-slate-700">
            {profile.assignedSessions.length ? profile.assignedSessions.map((s) => <li key={s}>{s}</li>) : <li className="list-none text-slate-500">No sessions assigned</li>}
          </ul>
          <Link href="/staff/rota" className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline">View rota</Link>
        </Card>
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Qualifications</h2>
          <ul className="mt-2 space-y-2">
            {profile.qualifications.length ? profile.qualifications.map((q) => (
              <li key={q.id} className="flex justify-between text-sm">
                <span>{q.name}</span>
                <Badge variant={statusVariant(q.status)}>{q.status}</Badge>
              </li>
            )) : <li className="text-sm text-slate-500">No qualifications on file</li>}
          </ul>
          <Link href="/staff/qualifications" className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline">View all qualifications</Link>
        </Card>
        {profile.documentsLinked.length > 0 && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Linked documents</h2>
            <ul className="mt-2 text-sm text-slate-700">
              {profile.documentsLinked.map((d) => (
                <li key={d}><Link href="/documents" className="text-indigo-600 hover:underline">{d}</Link></li>
              ))}
            </ul>
          </Card>
        )}
        {profile.notes && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Notes</h2>
            <p className="mt-2 text-sm text-slate-600">{profile.notes}</p>
          </Card>
        )}
        {profile.recentActivity && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
            <p className="mt-2 text-sm text-slate-600">{profile.recentActivity}</p>
            <p className="mt-1 text-xs text-slate-400">Audit trail placeholder</p>
          </Card>
        )}
      </div>
    </>
  );
}
