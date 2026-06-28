"use client";

import Link from "next/link";
import { Card, StatCard, Badge } from "@/components/ui";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import {
  DemoOnlyNotice,
  CommunicationsSecurityNotice,
} from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { formatDate } from "@/lib/utils";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";
import { COMMUNICATIONS_START_HERE } from "@/lib/communicationsCompose";

export function CommunicationsDashboardClient() {
  const { dashboard, history, drafts } = useCommunicationsDemo();

  const recentDrafts = history.filter((h) => h.status === "draft").slice(0, 3);
  const recentSent = history
    .filter((h) => h.status === "simulated" || h.status === "sent")
    .slice(0, 3);

  return (
    <>
      <GlamPageHeader
        title="Communications"
        description="Compose messages, manage templates and track form responses — all simulated in demo mode."
        breadcrumbs={moduleBreadcrumb(MODULES.communications)}
        backHref="/dashboard"
      />
      <CommunicationsSubNav active="Dashboard" />
      <DemoOnlyNotice />

      <div className="mt-4 space-y-6">
        <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-soft/80 via-white to-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Start here</p>
          <h2 className="mt-1 text-xl font-bold text-brand-charcoal sm:text-2xl">
            {COMMUNICATIONS_START_HERE.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            {COMMUNICATIONS_START_HERE.description}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href="/communications/compose"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-hover sm:w-auto"
            >
              {COMMUNICATIONS_START_HERE.primaryCta}
            </Link>
            <Link
              href="/communications/groups"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-charcoal shadow-sm hover:bg-slate-50 sm:w-auto"
            >
              {COMMUNICATIONS_START_HERE.secondaryCta}
            </Link>
          </div>
          <p className="mt-3 text-xs font-medium text-amber-800">
            {COMMUNICATIONS_START_HERE.safetyLine}
          </p>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Draft messages" value={dashboard.draftCount + drafts.length} />
          <StatCard label="Simulated sent" value={dashboard.sentCount} />
          <StatCard label="Pending form responses" value={dashboard.pendingFormResponses} />
          <StatCard label="Replies needing review" value={dashboard.repliesNeedingReview} />
        </div>

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Reason-based demo messages</h2>
          <p className="mt-1 text-xs text-slate-500">
            Each preset shows who would receive a message, why they are included, and which admin
            task triggered it.
          </p>
          <ul className="mt-3 space-y-2">
            {dashboard.giftAidCampaignPending && (
              <li className="flex flex-col gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Gift Aid declarations missing</p>
                  <p className="text-xs text-slate-600">Source: Gift Aid · 3 demo parents</p>
                </div>
                <Link
                  href="/communications/compose?preset=gift-aid"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 sm:w-auto"
                >
                  Open preset
                </Link>
              </li>
            )}
            {dashboard.unpaidFeeCampaignPending && (
              <li className="flex flex-col gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Fee reminder</p>
                  <p className="text-xs text-slate-600">Source: Finance unpaid fees</p>
                </div>
                <Link
                  href="/communications/compose?preset=unpaid-fees"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 sm:w-auto"
                >
                  Open preset
                </Link>
              </li>
            )}
            <li className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Missing consent forms</p>
                <p className="text-xs text-slate-600">Source: Documents missing forms</p>
              </div>
              <Link
                href="/communications/compose?preset=missing-forms"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
              >
                Open preset
              </Link>
            </li>
            <li className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{dashboard.upcomingCompetitionMessage}</p>
                <p className="text-xs text-slate-600">Source: Calendar competition</p>
              </div>
              <Link
                href="/communications/compose?preset=competition"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
              >
                Open preset
              </Link>
            </li>
          </ul>
        </Card>

        <details className="rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Templates, groups, history and more
          </summary>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/communications/templates"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Templates
            </Link>
            <Link
              href="/communications/groups"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Recipient groups
            </Link>
            <Link
              href="/communications/history"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Message history
            </Link>
            <Link
              href="/communications/forms"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Forms
            </Link>
            <Link
              href="/communications/inbox"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Inbox
            </Link>
            <Link
              href="/communications/rules"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Routing rules
            </Link>
          </div>
        </details>

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
              <div className="mt-2">
                <p className="text-sm text-slate-500">No simulated sends yet.</p>
                <Link
                  href="/communications/compose"
                  className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:underline"
                >
                  Compose message →
                </Link>
              </div>
            ) : (
              <ul className="mt-2 divide-y divide-slate-100">
                {recentSent.map((m) => (
                  <li key={m.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                    <div>
                      <p className="font-medium text-slate-900">{m.subject}</p>
                      <p className="text-slate-500">
                        {m.recipientGroup} · {formatDate(m.dateTime.slice(0, 10))}
                      </p>
                    </div>
                    <Badge variant="success">Simulated</Badge>
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
