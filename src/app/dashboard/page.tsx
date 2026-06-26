import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard, Card, PageHeader } from "@/components/ui";
import { dataProvider } from "@/data/providers";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const stats = await dataProvider.getDashboardStats();
  const recentAudit = (await dataProvider.getAuditEvents()).slice(0, 5);

  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
        description="Overview of club activity and key metrics."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Active Members" value={stats.activeMembers} />
        <StatCard label="Sessions This Week" value={stats.sessionsThisWeek} />
        <StatCard
          label="Outstanding Fees"
          value={formatCurrency(stats.outstandingFees)}
        />
        <StatCard
          label="Gift Aid Eligible"
          value={formatCurrency(stats.giftAidEligible)}
        />
        <StatCard label="Upcoming Events" value={stats.upcomingEvents} />
        <StatCard
          label="Recent Communications"
          value={stats.recentCommunications}
        />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Activity</h2>
        <Card>
          <ul className="divide-y divide-slate-100">
            {recentAudit.map((event) => (
              <li key={event.id} className="flex items-start justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{event.details}</p>
                  <p className="text-xs text-slate-500">
                    {event.actor} · {event.resource}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-slate-400">
                  {new Date(event.timestamp).toLocaleString("en-GB")}
                </time>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
