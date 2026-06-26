"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge, Card, EmptyState, PageHeader, StatCard } from "@/components/ui";
import { MemberTabs, useMemberTab, type MemberTabId } from "@/components/members/MemberTabs";
import { DemoOnlyNotice, SensitiveDataNotice } from "@/components/members/MemberNotices";
import { PermissionPreviewNotice } from "@/components/rbac/PermissionPreviewNotice";
import { useMembersDemo } from "@/components/members/MembersDemoProvider";
import {
  calculateAge,
  getMemberDisplayName,
  getMemberInitials,
  statusBadgeVariant,
} from "@/lib/members";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { MemberProfile } from "@/data/providers/types";

interface MemberProfileClientProps {
  memberId: string;
}

export function MemberProfileClient({ memberId }: MemberProfileClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getProfile, archiveMember, localAuditEvents } = useMembersDemo();
  const profile = getProfile(memberId);
  const [activeTab, setActiveTab] = useMemberTab("overview");
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [archiveSuccess, setArchiveSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("archive") === "1" && profile && profile.status !== "archived") {
      setShowArchiveConfirm(true);
    }
  }, [searchParams, profile]);

  if (!profile) {
    return (
      <EmptyState
        title="Member not found"
        description="This member record does not exist in the demo data."
      />
    );
  }

  function handleArchive() {
    archiveMember(memberId);
    setShowArchiveConfirm(false);
    setArchiveSuccess(true);
  }

  const name = getMemberDisplayName(profile);
  const allAudit = dedupeAuditEvents([
    ...localAuditEvents.filter((e) => e.details.includes(name)),
    ...profile.auditEvents,
  ]);

  return (
    <>
      <PageHeader
        title={name}
        description={`${profile.classGroup} · Joined ${formatDate(profile.joinedDate)}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/members/${memberId}/edit`}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Edit
            </Link>
            {profile.status !== "archived" && (
              <button
                type="button"
                onClick={() => setShowArchiveConfirm(true)}
                className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100"
              >
                Archive
              </button>
            )}
            <Link
              href="/members"
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              Back to list
            </Link>
          </div>
        }
      />

      <DemoOnlyNotice />

      {archiveSuccess && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Member archived (demo session only — soft archive, not deleted).
        </div>
      )}

      {showArchiveConfirm && (
        <ArchiveConfirmDialog
          name={name}
          onConfirm={handleArchive}
          onCancel={() => {
            setShowArchiveConfirm(false);
            router.replace(`/members/${memberId}`);
          }}
        />
      )}

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600"
          aria-hidden="true"
        >
          {getMemberInitials(profile)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={statusBadgeVariant(profile.status)}>{profile.status}</Badge>
          {profile.hasMedicalFlag && <Badge variant="warning">Medical flag</Badge>}
          <Badge variant="info">Age {calculateAge(profile.dateOfBirth)}</Badge>
          <Badge variant="default">{profile.consentStatus} consent</Badge>
        </div>
      </div>

      <div className="mt-6">
        <MemberTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6" role="tabpanel">
          <TabContent tab={activeTab} profile={profile} auditEvents={allAudit} />
        </div>
      </div>
    </>
  );
}

function ArchiveConfirmDialog({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Archive member?</h3>
        <p className="mt-2 text-sm text-slate-600">
          Archive <strong>{name}</strong>? This is a soft archive — the record is marked as
          archived, not permanently deleted. Demo changes reset on page refresh.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            Archive member
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function TabContent({
  tab,
  profile,
  auditEvents,
}: {
  tab: MemberTabId;
  profile: MemberProfile;
  auditEvents: MemberProfile["auditEvents"];
}) {
  switch (tab) {
    case "overview":
      return <OverviewTab profile={profile} />;
    case "parents":
      return <ParentsTab profile={profile} />;
    case "medical":
      return <MedicalTab profile={profile} />;
    case "attendance":
      return <AttendanceTab profile={profile} />;
    case "finance":
      return <FinanceTab profile={profile} />;
    case "documents":
      return <DocumentsTab profile={profile} />;
    case "notes":
      return <NotesTab profile={profile} />;
    case "audit":
      return <AuditTab events={auditEvents} />;
    default:
      return null;
  }
}

function OverviewTab({ profile }: { profile: MemberProfile }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Age" value={calculateAge(profile.dateOfBirth)} hint={`DOB: ${formatDate(profile.dateOfBirth)}`} />
      <StatCard label="Class / group" value={profile.classGroup} />
      <StatCard label="Attendance" value={`${profile.attendance.percentage}%`} hint={`${profile.attendance.sessionsAttended} of ${profile.attendance.sessionsTotal} sessions`} />
      <StatCard label="Gift Aid" value={profile.giftAidStatus} />
      <StatCard
        label="Finance"
        value={profile.finance.status}
        hint={profile.finance.outstandingAmount > 0 ? formatCurrency(profile.finance.outstandingAmount) + " outstanding" : undefined}
      />
      <StatCard label="Emergency contact" value={profile.emergencyContactComplete} />
      <Card className="sm:col-span-2 lg:col-span-3">
        <h3 className="text-sm font-semibold text-slate-900">Parent / carer</h3>
        <p className="mt-2 text-sm text-slate-600">
          {profile.parentCarer.name !== "N/A" ? (
            <>
              {profile.parentCarer.name} · {profile.parentCarer.email || "No email"} ·{" "}
              {profile.parentCarer.phone || "No phone"}
            </>
          ) : (
            "Self (adult member)"
          )}
        </p>
      </Card>
    </div>
  );
}

function ParentsTab({ profile }: { profile: MemberProfile }) {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Primary parent / carer</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <Row label="Name" value={profile.parentCarer.name} />
          <Row label="Email" value={profile.parentCarer.email || "—"} />
          <Row label="Phone" value={profile.parentCarer.phone || "—"} />
          <Row label="Relationship" value={profile.parentCarer.relationship} />
        </dl>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Emergency contact</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <Row label="Name" value={profile.emergencyContact.name || "—"} />
          <Row label="Phone" value={profile.emergencyContact.phone || "—"} />
          <Row label="Completeness" value={profile.emergencyContactComplete} />
        </dl>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Authorised pickup</h3>
        {profile.authorisedPickup.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No authorised pickup people recorded.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {profile.authorisedPickup.map((p) => (
              <li key={p.name} className="text-sm text-slate-600">
                {p.name}
                {p.notes && <span className="text-slate-400"> — {p.notes}</span>}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function MedicalTab({ profile }: { profile: MemberProfile }) {
  return (
    <div className="space-y-4">
      <SensitiveDataNotice area="Medical & welfare" />
      <PermissionPreviewNotice module="members-sensitive" action="view-sensitive-detail" />
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Medical summary</h3>
        <p className="mt-2 text-sm text-slate-600">{profile.medicalSummary}</p>
        {profile.allergies.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Allergies</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {profile.allergies.map((a) => (
                <Badge key={a} variant="warning">
                  {a}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {profile.medicalNotes && (
          <div className="mt-4 rounded-md border border-red-100 bg-red-50/50 p-3">
            <p className="text-xs font-semibold uppercase text-red-700">Detailed notes</p>
            <p className="mt-1 text-sm text-red-900">{profile.medicalNotes}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function AttendanceTab({ profile }: { profile: MemberProfile }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-900">Attendance summary</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <Row label="Attendance rate" value={`${profile.attendance.percentage}%`} />
        <Row label="Sessions attended" value={profile.attendance.sessionsAttended} />
        <Row label="Total sessions" value={profile.attendance.sessionsTotal} />
      </dl>
    </Card>
  );
}

function FinanceTab({ profile }: { profile: MemberProfile }) {
  return (
    <div className="space-y-4">
      <SensitiveDataNotice area="Finance" />
      {/* TODO: RBAC — finance data restricted to treasurer/admin roles */}
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Finance summary</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <Row label="Status" value={profile.finance.status} />
          <Row
            label="Outstanding"
            value={
              profile.finance.outstandingAmount > 0
                ? formatCurrency(profile.finance.outstandingAmount)
                : "None"
            }
          />
          {profile.finance.lastPaymentDate && (
            <Row label="Last payment" value={formatDate(profile.finance.lastPaymentDate)} />
          )}
        </dl>
      </Card>
    </div>
  );
}

function DocumentsTab({ profile }: { profile: MemberProfile }) {
  if (profile.documents.length === 0) {
    return (
      <EmptyState
        title="No documents linked"
        description="Documents linked to this member will appear here."
      />
    );
  }
  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {profile.documents.map((doc) => (
        <li key={doc.id} className="flex items-center justify-between px-4 py-3 text-sm">
          <div>
            <p className="font-medium text-slate-900">{doc.title}</p>
            <p className="text-slate-500">{doc.category}</p>
          </div>
          <time className="text-xs text-slate-400">{formatDate(doc.uploadedDate)}</time>
        </li>
      ))}
    </ul>
  );
}

function NotesTab({ profile }: { profile: MemberProfile }) {
  if (profile.notes.length === 0) {
    return (
      <EmptyState
        title="No notes"
        description="Internal notes about this member will appear here."
      />
    );
  }
  return (
    <ul className="space-y-3">
      {profile.notes.map((note) => (
        <Card key={note.id}>
          <p className="text-sm text-slate-700">{note.content}</p>
          <p className="mt-2 text-xs text-slate-400">
            {note.author} · {formatDate(note.date)}
          </p>
        </Card>
      ))}
    </ul>
  );
}

function AuditTab({ events }: { events: MemberProfile["auditEvents"] }) {
  return (
    <div className="space-y-4">
      <SensitiveDataNotice area="Audit log" />
      {/* TODO: RBAC — audit logs restricted to admin roles */}
      {events.length === 0 ? (
        <EmptyState title="No audit events" description="Changes to this member will be logged here." />
      ) : (
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {events.map((event) => (
            <li key={event.id} className="px-4 py-3 text-sm">
              <p className="font-medium text-slate-900">{event.details}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {event.actor} · {event.action} ·{" "}
                {new Date(event.timestamp).toLocaleString("en-GB")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}

function dedupeAuditEvents(events: MemberProfile["auditEvents"]) {
  const seen = new Set<string>();
  return events.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}
