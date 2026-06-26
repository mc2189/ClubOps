"use client";

import Link from "next/link";
import { Card, PageHeader, StatCard, Badge } from "@/components/ui";
import {
  DemoOnlyNotice,
  CommunicationsSecurityNotice,
} from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { formatDate } from "@/lib/utils";

export function CommunicationsDashboardClient() {
  const { dashboard, history, drafts } = useCommunicationsDemo();

  const recentDrafts = history.filter((h) => h.status === "draft").slice(0, 3);
  const recentSent = history
    .filter((h) => h.status === "simulated" || h.status === "sent")
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title="Communications"
        description="Compose messages, manage templates and track form responses — all simulated in demo mode."
      />
      <CommunicationsSubNav active="Dashboard" />
      <DemoOnlyNotice />
      <div className="mt-4 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Draft messages" value={dashboard.draftCount + drafts.length} />
          <StatCard label="Simulated sent" value={dashboard.sentCount} />
          <StatCard label="Pending form responses" value={dashboard.pendingFormResponses} />
          <StatCard label="Replies needing review" value={dashboard.repliesNeedingReview} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Campaign reminders</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {dashboard.giftAidCampaignPending && (
                <li className="flex items-center justify-between rounded-md bg-amber-50 px-3 py-2">
                  <span>Missing Gift Aid declaration campaign</span>
                  <Link
                    href="/communications/compose?preset=gift-aid"
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Send request
                  </Link>
                </li>
              )}
              {dashboard.unpaidFeeCampaignPending && (
                <li className="flex items-center justify-between rounded-md bg-amber-50 px-3 py-2">
                  <span>Unpaid fee reminder campaign</span>
                  <Link
                    href="/communications/compose?preset=unpaid-fees"
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Send reminder
                  </Link>
                </li>
              )}
              <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Upcoming: {dashboard.upcomingCompetitionMessage}</span>
                <Link
                  href="/communications/compose?template=tpl-competition"
                  className="text-xs font-medium text-indigo-600 hover:underline"
                >
                  Compose notice
                </Link>
              </li>
              <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Failed/bounced (placeholder)</span>
                <Badge variant="default">{dashboard.bouncedPlaceholder}</Badge>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link
                href="/communications/compose"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Compose message
              </Link>
              <Link
                href="/communications/templates"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Use template
              </Link>
              <Link
                href="/communications/compose?preset=gift-aid"
                className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-100"
              >
                Request Gift Aid declarations
              </Link>
              <Link
                href="/communications/compose?preset=unpaid-fees"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Message unpaid fees group
              </Link>
              <Link
                href="/communications/inbox"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                View inbox
              </Link>
              <Link
                href="/communications/history"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                View message history
              </Link>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Recent drafts</h2>
            {recentDrafts.length === 0 && drafts.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No drafts yet.</p>
            ) : (
              <ul className="mt-2 divide-y divide-slate-100">
                {recentDrafts.map((d) => (
                  <li key={d.id} className="py-2 text-sm">
                    <p className="font-medium text-slate-900">{d.subject}</p>
                    <p className="text-slate-500">{d.recipientGroup}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Simulated sent messages</h2>
            {recentSent.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No simulated sends yet — compose a message to see history here.</p>
            ) : (
            <ul className="mt-2 divide-y divide-slate-100">
              {recentSent.map((m) => (
                <li key={m.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <p className="font-medium text-slate-900">{m.subject}</p>
                    <p className="text-slate-500">
                      {m.recipientGroup} · {formatDate(m.dateTime.slice(0, 10))}
                    </p>
                  </div>
                  <Badge variant="success">Simulated send</Badge>
                </li>
              ))}
            </ul>
            )}
          </Card>
        </div>

        <CommunicationsSecurityNotice />
      </div>
    </>
  );
}
