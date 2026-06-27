import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card, StatCard } from "@/components/ui";
import {
  HealthScoreCard,
  ProgressCard,
  SnapshotCard,
  SnapshotRow,
  RecentActivityList,
  QuickActionCard,
  DashboardPriorities,
} from "@/components/dashboard";
import { dataProvider } from "@/data/providers";
import { GlamDashboardHero } from "@/components/branding/GlamDashboardHero";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const data = await dataProvider.getDashboardData();

  return (
    <DashboardLayout>
      <GlamDashboardHero />

      <div className="hidden sm:block">
        <PageHeader
          title="Today's overview"
          description="Here's what needs your attention today."
        />
      </div>

      <DashboardPriorities tasks={data.tasks} />

      <section aria-labelledby="health-heading" className="mt-8">
        <h2 id="health-heading" className="mb-1 text-lg font-semibold text-slate-900">
          Club health
        </h2>
        <p className="mb-3 text-sm text-slate-600">
          A quick check on each area — tap a card to open that module.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.healthMetrics.map((metric) => (
            <HealthScoreCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      <details className="mt-8 rounded-lg border border-slate-200 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-900">
          More on the dashboard (snapshots, fundraising, quick actions)
        </summary>
        <div className="mt-4 space-y-8">
          <section aria-labelledby="snapshots-heading">
            <h2 id="snapshots-heading" className="mb-3 text-base font-semibold text-slate-900">
              Snapshots
            </h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <SnapshotCard title="Finance">
                <SnapshotRow label="Payments to review" value={data.finance.paymentsNeedReview} highlight />
                <SnapshotRow label="Unpaid fees" value={data.finance.unpaidFees} highlight />
                <SnapshotRow label="Monthly income" value={formatCurrency(data.finance.monthlyIncome)} />
                <SnapshotRow label="Monthly expenses" value={formatCurrency(data.finance.monthlyExpenses)} />
                <SnapshotRow label="Net position" value={formatCurrency(data.finance.netPosition)} highlight />
              </SnapshotCard>

              <SnapshotCard title="Attendance">
                <SnapshotRow label="Sessions this week" value={data.attendance.sessionsThisWeek} />
                <SnapshotRow
                  label="Average attendance"
                  value={`${data.attendance.averageAttendanceRate}%`}
                  highlight
                />
                <SnapshotRow
                  label="Absent without notice"
                  value={data.attendance.absentWithoutNotice}
                />
                <SnapshotRow label="Next session" value={data.attendance.nextSession} />
              </SnapshotCard>

              <SnapshotCard title="Gift Aid">
                <SnapshotRow
                  label="Estimated claim ready"
                  value={formatCurrency(data.giftAid.estimatedClaim)}
                  highlight
                />
                <SnapshotRow
                  label="Declarations returned"
                  value={data.giftAid.declarationsReturned}
                  highlight
                />
                <SnapshotRow
                  label="Active declarations"
                  value={data.giftAid.activeDeclarations}
                />
              </SnapshotCard>
            </div>
          </section>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Upcoming event" value={data.highlights.upcomingEvent} />
            <StatCard label="Compliance alert" value={data.highlights.complianceAlert} />
            <StatCard
              label="Documents waiting"
              value={`${data.highlights.documentsWaiting} to assign`}
            />
          </div>

          <section aria-labelledby="fundraising-heading">
            <h2 id="fundraising-heading" className="mb-3 text-base font-semibold text-slate-900">
              Fundraising progress
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.fundraising.map((item) => (
                <ProgressCard
                  key={item.id}
                  title={item.name}
                  raised={item.raised}
                  target={item.target}
                  href={item.href}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="actions-heading">
            <h2 id="actions-heading" className="mb-3 text-base font-semibold text-slate-900">
              Quick actions
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {data.quickActions.map((action) => (
                <QuickActionCard key={action.id} action={action} />
              ))}
            </div>
          </section>
        </div>
      </details>

      <section aria-labelledby="activity-heading" className="mt-8">
        <h2 id="activity-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Recent activity
        </h2>
        <Card>
          <RecentActivityList events={data.recentActivity} friendly />
        </Card>
      </section>
    </DashboardLayout>
  );
}
