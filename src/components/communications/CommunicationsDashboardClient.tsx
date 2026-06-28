"use client";

import Link from "next/link";
import { Card, Badge } from "@/components/ui";
import { ModuleMoreTools, ModulePrimaryPanel, ModuleStatusStrip } from "@/components/ui/ModuleTaskFlow";
import { GlamPageHeader } from "@/components/branding/GlamPageHeader";
import { CommunicationsSecurityNotice } from "@/components/communications/CommunicationsNotices";
import { CommunicationsSubNav } from "@/components/communications/CommunicationsSubNav";
import { useCommunicationsDemo } from "@/components/communications/CommunicationsDemoProvider";
import { MODULES, moduleBreadcrumb } from "@/lib/breadcrumbs";
import { COMMUNICATIONS_LANDING } from "@/lib/moduleTaskFlow";

export function CommunicationsDashboardClient() {
  const { dashboard, history, drafts } = useCommunicationsDemo();

  const recentSent = history
    .filter((h) => h.status === "simulated" || h.status === "sent")
    .slice(0, 2);

  return (
    <>
      <GlamPageHeader
        title="Communications"
        description="Prepare demo messages and track simulated sends."
        breadcrumbs={moduleBreadcrumb(MODULES.communications)}
        backHref="/dashboard"
      />
      <CommunicationsSubNav active="Dashboard" />

      <div className="mt-4 space-y-4 pb-24 lg:pb-6">
        <ModulePrimaryPanel config={COMMUNICATIONS_LANDING} />
        <ModuleStatusStrip
          items={[
            {
              id: "drafts",
              value: `${dashboard.draftCount + drafts.length} draft messages`,
              label: "pending",
              tone: "pending",
            },
            {
              id: "sent",
              value: `${dashboard.sentCount} simulated sends`,
              label: "reviewed",
              tone: "reviewed",
            },
            {
              id: "inbox",
              value: `${dashboard.repliesNeedingReview} replies need review`,
              label: "inbox",
              tone: dashboard.repliesNeedingReview > 0 ? "pending" : "neutral",
            },
          ]}
        />

        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Suggested message presets</h2>
          <p className="mt-1 text-xs text-slate-500">
            Start from a common volunteer task — each preset fills the composer for you.
          </p>
          <ul className="mt-3 space-y-2">
            {dashboard.unpaidFeeCampaignPending && (
              <li className="flex flex-col gap-2 rounded-md border border-slate-200 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Fee reminder</p>
                  <p className="text-xs text-slate-500">Source: Finance unpaid fees</p>
                </div>
                <Link
                  href="/communications/compose?preset=unpaid-fees"
                  className="inline-flex min-h-[44px] items-center text-sm font-medium text-indigo-600 hover:underline"
                >
                  Open preset →
                </Link>
              </li>
            )}
            {dashboard.giftAidCampaignPending && (
              <li className="flex flex-col gap-2 rounded-md border border-slate-200 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Gift Aid declaration request</p>
                  <p className="text-xs text-slate-500">Source: Gift Aid</p>
                </div>
                <Link
                  href="/communications/compose?preset=gift-aid"
                  className="inline-flex min-h-[44px] items-center text-sm font-medium text-indigo-600 hover:underline"
                >
                  Open preset →
                </Link>
              </li>
            )}
            <li className="flex flex-col gap-2 rounded-md border border-slate-200 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Missing consent forms</p>
                <p className="text-xs text-slate-500">Source: Documents</p>
              </div>
              <Link
                href="/communications/compose?preset=missing-forms"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-indigo-600 hover:underline"
              >
                Open preset →
              </Link>
            </li>
          </ul>
        </Card>

        {recentSent.length > 0 && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Recent simulated sends</h2>
            <ul className="mt-2 divide-y divide-slate-100">
              {recentSent.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                  <div>
                    <p className="font-medium text-slate-900">{m.subject}</p>
                    <p className="text-xs text-slate-500">{m.recipientGroup}</p>
                  </div>
                  <Badge variant="success">Simulated</Badge>
                </li>
              ))}
            </ul>
            <Link href="/communications/history" className="mt-2 inline-block text-sm text-indigo-600 hover:underline">
              View history →
            </Link>
          </Card>
        )}

        <ModuleMoreTools
          title="More communications tools"
          itemCount={6}
          helperText="Open this for templates, groups, forms, inbox and message history."
        >
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/communications/templates", label: "Templates" },
              { href: "/communications/groups", label: "Groups" },
              { href: "/communications/forms", label: "Forms" },
              { href: "/communications/inbox", label: "Inbox" },
              { href: "/communications/history", label: "History" },
              { href: "/communications/rules", label: "Rules" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
          </div>
        </ModuleMoreTools>

        <ModuleMoreTools title="Communications safety notes">
          <CommunicationsSecurityNotice />
        </ModuleMoreTools>
      </div>
    </>
  );
}
