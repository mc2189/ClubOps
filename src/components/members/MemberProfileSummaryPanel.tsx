"use client";

import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import { ContactSafetyNotice } from "@/components/members/MemberNotices";
import { useDemoRole } from "@/components/rbac/DemoRoleProvider";
import {
  buildRecentActivity,
  getLastUpdateLine,
  getNeedsAttentionItems,
  getStatusTiles,
  type AttentionItem,
} from "@/lib/memberProfileSummary";
import {
  calculateAge,
  getMemberDisplayName,
  getMemberInitials,
  statusBadgeVariant,
} from "@/lib/members";
import { formatDate } from "@/lib/utils";
import type { AuditEvent, MemberProfile } from "@/data/providers/types";
import type { MemberTabId } from "@/components/members/MemberTabs";

interface MemberProfileSummaryPanelProps {
  profile: MemberProfile;
  auditEvents: AuditEvent[];
  onNavigateTab?: (tab: MemberTabId) => void;
}

export function MemberProfileSummaryPanel({
  profile,
  auditEvents,
  onNavigateTab,
}: MemberProfileSummaryPanelProps) {
  const { can } = useDemoRole();
  const canViewMedical = can("members-sensitive", "view-sensitive-detail");
  const name = getMemberDisplayName(profile);
  const attention = getNeedsAttentionItems(profile);
  const tiles = getStatusTiles(profile, canViewMedical);
  const activity = buildRecentActivity(profile, auditEvents);
  const lastUpdate = getLastUpdateLine(profile, auditEvents);

  return (
    <div className="mt-4 space-y-4">
      <Card className="border-brand-primary/15 bg-gradient-to-br from-white via-white to-brand-soft/30 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600"
            aria-hidden="true"
          >
            {getMemberInitials(profile)}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">{name}</h2>
            <p className="mt-0.5 text-sm text-slate-600">{profile.classGroup}</p>
            <p className="text-sm text-slate-500">
              {profile.membershipType} · Age {calculateAge(profile.dateOfBirth)} · Joined{" "}
              {formatDate(profile.joinedDate)}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge variant={statusBadgeVariant(profile.status)}>
                Status: {profile.status}
              </Badge>
              {profile.hasMedicalFlag && (
                <Badge variant="warning">Medical flag</Badge>
              )}
            </div>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase text-slate-400">
                  Primary parent/contact
                </dt>
                <dd className="text-slate-800">
                  {profile.parentCarer.name !== "N/A"
                    ? profile.parentCarer.name
                    : "Self (adult member)"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-400">
                  Emergency contact
                </dt>
                <dd className="text-slate-800">
                  Emergency: {profile.emergencyContactComplete}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium uppercase text-slate-400">
                  Medical / welfare
                </dt>
                <dd className="text-slate-800">
                  {profile.hasMedicalFlag
                    ? canViewMedical
                      ? profile.medicalSummary
                      : "Restricted — Welfare Officer can view detailed notes"
                    : "No medical flag"}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-slate-500">
              <span className="font-medium text-slate-600">Last update:</span> {lastUpdate}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {tile.label}
            </p>
            <p className="mt-0.5 text-sm font-medium text-slate-900">{tile.value}</p>
            {tile.hint && <p className="mt-0.5 text-xs text-slate-500">{tile.hint}</p>}
          </div>
        ))}
      </div>

      {attention.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <h2 className="text-sm font-semibold text-amber-950">Needs attention</h2>
          <ul className="mt-3 space-y-3">
            {attention.map((item) => (
              <AttentionRow key={item.id} item={item} onNavigateTab={onNavigateTab} />
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h2 className="text-sm font-semibold text-slate-900">Quick links</h2>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <QuickLink href="/finance/fees" label="View fee record" />
          <QuickLink href="/attendance" label="Review attendance" />
          <QuickLink
            href={`/communications/compose?preset=unpaid-fees`}
            label="Draft parent message (simulated)"
          />
          <QuickLink href="/documents" label="Check documents" />
          <QuickLink
            href="/communications/compose?preset=gift-aid"
            label="Gift Aid declaration (simulated)"
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
        <ul className="mt-3 space-y-2">
          {activity.map((item) => (
            <li key={item.id} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" aria-hidden />
              <span>
                {item.text}
                {item.date && (
                  <span className="ml-1 text-xs text-slate-400">
                    · {formatDate(item.date)}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <ContactSafetyNotice />
    </div>
  );
}

function AttentionRow({
  item,
  onNavigateTab,
}: {
  item: AttentionItem;
  onNavigateTab?: (tab: MemberTabId) => void;
}) {
  return (
    <li className="rounded-md border border-amber-100 bg-white px-3 py-2.5">
      <p className="font-medium text-amber-950">{item.title}</p>
      <p className="mt-1 text-sm text-amber-900">{item.action}</p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        {item.href && (
          <Link
            href={item.href}
            className="inline-flex min-h-[44px] items-center text-sm font-medium text-indigo-700 hover:underline"
          >
            Open related page →
          </Link>
        )}
        {item.tab && onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab(item.tab!)}
            className="inline-flex min-h-[44px] items-center text-sm font-medium text-indigo-700 hover:underline"
          >
            View {item.tab} tab →
          </button>
        )}
      </div>
    </li>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 sm:w-auto sm:justify-start"
    >
      {label}
    </Link>
  );
}
