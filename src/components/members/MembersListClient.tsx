"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge, EmptyState } from "@/components/ui";
import { LocalSafetyNote } from "@/components/demo/LocalSafetyNote";
import { ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";
import { TableScrollWrap } from "@/components/ui/TableScrollWrap";
import { useMembersDemo } from "@/components/members/MembersDemoProvider";
import {
  calculateAge,
  getMemberDisplayName,
  matchesFilter,
  matchesSearch,
  statusBadgeVariant,
  type MemberFilterKey,
} from "@/lib/members";
import { profileNeedsAttention } from "@/lib/memberProfileSummary";
import { MEMBERS_LANDING } from "@/lib/moduleTaskFlow";
import { formatCurrency } from "@/lib/utils";
import type { MemberProfile } from "@/data/providers/types";
import { MemberListStatusBadges, MemberAttendanceCell } from "@/components/members/MemberListStatusBadges";
import { cn } from "@/lib/utils";

type ViewMode = "simple" | "detailed";

const filters: { key: MemberFilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "needs-attention", label: "Needs attention" },
  { key: "missing-forms", label: "Missing forms" },
  { key: "unpaid", label: "Owes fees" },
  { key: "low-attendance", label: "Low attendance" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "archived", label: "Archived" },
  { key: "medical", label: "Medical flag" },
  { key: "missing-gift-aid", label: "Missing Gift Aid" },
  { key: "incomplete-emergency", label: "Incomplete emergency" },
];

function parseFilterParam(value: string | null): MemberFilterKey {
  if (!value) return "all";
  return filters.some((f) => f.key === value) ? (value as MemberFilterKey) : "all";
}

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

function SimpleStatusBadges({ profile }: { profile: MemberProfile }) {
  return <MemberListStatusBadges profile={profile} />;
}

export function MembersListClient() {
  const { profiles } = useMembersDemo();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MemberFilterKey>(() =>
    parseFilterParam(searchParams.get("filter")),
  );
  const [viewMode, setViewMode] = useState<ViewMode>("simple");

  const needsAttentionCount = useMemo(
    () => profiles.filter((p) => profileNeedsAttention(p)).length,
    [profiles],
  );

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
      <GlamPageHeader
        title="Members"
        description="Manage gymnasts and linked parent/carer records."
        breadcrumbs={moduleBreadcrumb(MODULES.members)}
        backHref="/dashboard"
        action={
          <Link
            href="/members/new"
            className="hidden min-h-[44px] items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:inline-flex"
          >
            Add member
          </Link>
        }
      />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={MEMBERS_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "attention",
              value: `${needsAttentionCount} records need attention`,
              label: "pending",
              tone: needsAttentionCount > 0 ? "pending" : "resolved",
            },
          ]}
        />

        <LocalSafetyNote className="mt-2">
          Demo data only. Do not enter real child, parent or contact information.
        </LocalSafetyNote>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            placeholder="Search members"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:max-w-sm"
            aria-label="Search members"
          />
          <p className="text-sm text-slate-500">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="hidden rounded-md border border-slate-200 p-0.5 sm:flex" role="group" aria-label="List view">
          <button
            type="button"
            onClick={() => setViewMode("simple")}
            aria-pressed={viewMode === "simple"}
            className={cn(
              "rounded px-3 py-1.5 text-xs font-medium",
              viewMode === "simple" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50",
            )}
          >
            Simple
          </button>
          <button
            type="button"
            onClick={() => setViewMode("detailed")}
            aria-pressed={viewMode === "detailed"}
            className={cn(
              "rounded px-3 py-1.5 text-xs font-medium",
              viewMode === "detailed" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50",
            )}
          >
            Detailed
          </button>
        </div>
      </div>

      <label htmlFor="member-filter-mobile" className="sr-only">
        Filter members
      </label>
      <select
        id="member-filter-mobile"
        value={filter}
        onChange={(e) => setFilter(e.target.value as MemberFilterKey)}
        className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm md:hidden"
      >
        {filters.map((f) => (
          <option key={f.key} value={f.key}>
            {f.label}
          </option>
        ))}
      </select>

      <div className="hidden flex-wrap gap-2 md:flex">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium",
              filter === f.key
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Link
        href="/members/new"
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:hidden"
      >
        Add member
      </Link>

      {filtered.length === 0 ? (
        <EmptyState title="No members match" description="Try a different filter or search term." />
      ) : (
        <>
          <ul className="min-w-0 space-y-3 md:hidden" data-layout="members-mobile-cards">
            {filtered.map((profile) => (
              <li
                key={profile.id}
                className="min-w-0 max-w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/members/${profile.id}`}
                        className="text-base font-semibold text-slate-900 hover:text-indigo-600"
                      >
                        {getMemberDisplayName(profile)}
                      </Link>
                      {profileNeedsAttention(profile) && (
                        <Badge variant="warning">Needs attention</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">
                      {profile.classGroup} · Age {calculateAge(profile.dateOfBirth)}
                    </p>
                    <div className="mt-2">
                      <SimpleStatusBadges profile={profile} />
                    </div>
                  </div>
                  <Link
                    href={`/members/${profile.id}`}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    View profile
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {viewMode === "simple" ? (
            <ul className="hidden min-w-0 space-y-3 md:block" data-layout="members-desktop-simple">
              {filtered.map((profile) => (
                <li
                  key={profile.id}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/members/${profile.id}`}
                          className="text-base font-semibold text-slate-900 hover:text-indigo-600"
                        >
                          {getMemberDisplayName(profile)}
                        </Link>
                        {profileNeedsAttention(profile) && (
                          <Badge variant="warning">Needs attention</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">
                        {profile.classGroup} · Age {calculateAge(profile.dateOfBirth)}
                      </p>
                      <div className="mt-2">
                        <SimpleStatusBadges profile={profile} />
                      </div>
                    </div>
                    <Link
                      href={`/members/${profile.id}`}
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:w-auto"
                    >
                      View profile
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <TableScrollWrap className="hidden min-w-0 md:block" data-layout="members-desktop-table">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                <th className="pb-2 pr-4">Member</th>
                <th className="pb-2 pr-4">Class</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Fees</th>
                <th className="pb-2 pr-4">Attendance</th>
                <th className="pb-2 pr-4">Emergency</th>
                <th className="pb-2 pr-4">Gift Aid</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((profile) => (
                <tr key={profile.id}>
                  <td className="py-3 pr-4">
                    <Link href={`/members/${profile.id}`} className="font-medium text-indigo-600 hover:underline">
                      {getMemberDisplayName(profile)}
                    </Link>
                    <p className="text-xs text-slate-500">{profile.parentCarer.name}</p>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{profile.classGroup}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={statusBadgeVariant(profile.status)}>{profile.status}</Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <FinanceBadge profile={profile} />
                  </td>
                  <td className="py-3 pr-4">
                    <MemberAttendanceCell profile={profile} />
                  </td>
                  <td className="py-3 pr-4">
                    <EmergencyBadge profile={profile} />
                  </td>
                  <td className="py-3 pr-4">
                    <GiftAidBadge profile={profile} />
                  </td>
                  <td className="py-3">
                    <Link href={`/members/${profile.id}`} className="text-indigo-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScrollWrap>
          )}
        </>
      )}
      </div>
    </>
  );
}
