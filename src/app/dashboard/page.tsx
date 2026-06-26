import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card, StatCard } from "@/components/ui";
import {
  TaskCard,
  HealthScoreCard,
  ProgressCard,
  SnapshotCard,
  SnapshotRow,
  RecentActivityList,
  QuickActionCard,
} from "@/components/dashboard";
import { dataProvider } from "@/data/providers";
import { clubName } from "@/config/navigation";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const data = await dataProvider.getDashboardData();

  return (
    <DashboardLayout>
      <PageHeader
        title={`Good morning — ${clubName}`}
        description="Here's what needs your attention today."
        action={
          <Link
            href="/demo"
            className="rounded-md border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100"
          >
            About demo mode
          </Link>
        }
      />

      {/* Today's tasks */}
      <section aria-labelledby="tasks-heading">
        <h2 id="tasks-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Today&apos;s tasks
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* Club health summary */}
      <section aria-labelledby="health-heading" className="mt-8">
        <h2 id="health-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Club health
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.healthMetrics.map((metric) => (
            <HealthScoreCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      {/* Snapshots row */}
      <section aria-labelledby="snapshots-heading" className="mt-8">
        <h2 id="snapshots-heading" className="mb-3 text-lg font-semibold text-slate-900">
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

      {/* Highlights strip */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="Upcoming event" value={data.highlights.upcomingEvent} />
        <StatCard label="Compliance alert" value={data.highlights.complianceAlert} />
        <StatCard
          label="Documents waiting"
          value={`${data.highlights.documentsWaiting} to assign`}
        />
      </div>

      {/* Fundraising progress */}
      <section aria-labelledby="fundraising-heading" className="mt-8">
        <h2 id="fundraising-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Fundraising progress
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.fundraising.map((item) => (
            <ProgressCard
              key={item.id}
              title={item.name}
              raised={item.raised}
              target={item.target}
            />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section aria-labelledby="actions-heading" className="mt-8">
        <h2 id="actions-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Quick actions
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {data.quickActions.map((action) => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section aria-labelledby="activity-heading" className="mt-8">
        <h2 id="activity-heading" className="mb-3 text-lg font-semibold text-slate-900">
          Recent activity
        </h2>
        <Card>
          <RecentActivityList events={data.recentActivity} />
        </Card>
      </section>
    </DashboardLayout>
  );
}
