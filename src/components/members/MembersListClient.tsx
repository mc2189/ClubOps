"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, EmptyState, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/members/MemberNotices";
import { useMembersDemo } from "@/components/members/MembersDemoProvider";
import {
  calculateAge,
  getMemberDisplayName,
  matchesFilter,
  matchesSearch,
  statusBadgeVariant,
  type MemberFilterKey,
} from "@/lib/members";
import { formatCurrency } from "@/lib/utils";
import type { MemberProfile } from "@/data/providers/types";
import { cn } from "@/lib/utils";

const filters: { key: MemberFilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "archived", label: "Archived" },
  { key: "medical", label: "Medical flag" },
  { key: "unpaid", label: "Unpaid fees" },
  { key: "missing-gift-aid", label: "Missing Gift Aid" },
  { key: "incomplete-emergency", label: "Incomplete emergency" },
];

function EmergencyBadge({ profile }: { profile: MemberProfile }) {
  const map = {
    complete: { label: "Complete", variant: "success" as const },
    partial: { label: "Partial", variant: "warning" as const },
    missing: { label: "Missing", variant: "danger" as const },
  };
  const { label, variant } = map[profile.emergencyContactComplete];
  return <Badge variant={variant}>{label}</Badge>;
}

function FinanceBadge({ profile }: { profile: MemberProfile }) {
  const map = {
    paid: { label: "Paid", variant: "success" as const },
    unpaid: { label: "Unpaid", variant: "danger" as const },
    overdue: { label: "Overdue", variant: "danger" as const },
    partial: { label: "Partial", variant: "warning" as const },
    "n/a": { label: "N/A", variant: "default" as const },
  };
  const { label, variant } = map[profile.finance.status];
  return (
    <span title={profile.finance.outstandingAmount > 0 ? formatCurrency(profile.finance.outstandingAmount) : undefined}>
      <Badge variant={variant}>{label}</Badge>
    </span>
  );
}

function GiftAidBadge({ profile }: { profile: MemberProfile }) {
  const map = {
    declared: { label: "Declared", variant: "success" as const },
    missing: { label: "Missing", variant: "danger" as const },
    expired: { label: "Expired", variant: "warning" as const },
    "n/a": { label: "N/A", variant: "default" as const },
  };
  const { label, variant } = map[profile.giftAidStatus];
  return <Badge variant={variant}>{label}</Badge>;
}

export function MembersListClient() {
  const { profiles } = useMembersDemo();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MemberFilterKey>("all");

  const filtered = useMemo(
    () =>
      profiles
        .filter((p) => matchesFilter(p, filter))
        .filter((p) => matchesSearch(p, search))
        .sort((a, b) => getMemberDisplayName(a).localeCompare(getMemberDisplayName(b))),
    [profiles, filter, search],
  );

  return (
    <>
      <PageHeader
        title="Members"
        description="Manage gymnasts and linked parent/carer records."
        action={
          <Link
            href="/members/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add member
          </Link>
        }
      />

      <DemoOnlyNotice />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search by name, class or parent/carer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:max-w-sm"
          aria-label="Search members"
        />
        <p className="text-sm text-slate-500">
          {filtered.length} member{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === f.key
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState
            title="No members found"
            description="Try adjusting your search or filter, or add a new member."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Name",
                    "Age",
                    "Class",
                    "Status",
                    "Parent/Carer",
                    "Emergency",
                    "Medical",
                    "Finance",
                    "Gift Aid",
                    "Attendance",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((profile) => (
                  <tr key={profile.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-900">
                      {getMemberDisplayName(profile)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                      {calculateAge(profile.dateOfBirth)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                      {profile.classGroup}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <Badge variant={statusBadgeVariant(profile.status)}>
                        {profile.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                      {profile.parentCarer.name !== "N/A" ? profile.parentCarer.name : "—"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <EmergencyBadge profile={profile} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {profile.hasMedicalFlag ? (
                        <Badge variant="warning">Flag</Badge>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <FinanceBadge profile={profile} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <GiftAidBadge profile={profile} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                      {profile.attendance.percentage}%
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/members/${profile.id}`}
                          className="text-indigo-600 hover:underline"
                        >
                          View
                        </Link>
                        <Link
                          href={`/members/${profile.id}/edit`}
                          className="text-slate-600 hover:underline"
                        >
                          Edit
                        </Link>
                        {profile.status !== "archived" && (
                          <Link
                            href={`/members/${profile.id}?archive=1`}
                            className="text-amber-600 hover:underline"
                          >
                            Archive
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
