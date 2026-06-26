import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card, PlaceholderNotice } from "@/components/ui";
import { clubName } from "@/config/navigation";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        description="Configure club preferences and application settings."
      />
      <PlaceholderNotice module="Settings" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold text-slate-900">Club Details</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Club Name</dt>
              <dd className="font-medium text-slate-900">{clubName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Mode</dt>
              <dd className="font-medium text-amber-700">Demo (fake data only)</dd>
            </div>
          </dl>
        </Card>
        <Card>
          <h3 className="text-base font-semibold text-slate-900">Demo & presentation</h3>
          <p className="mt-2 text-sm text-slate-600">
            Use the demo script for a guided 10–15 minute walkthrough of ClubOps.
          </p>
          <Link href="/demo-script" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline">
            Open demo script →
          </Link>
        </Card>
        <Card>
          <h3 className="text-base font-semibold text-slate-900">Security</h3>
          <p className="mt-2 text-sm text-slate-600">
            Role-based access control, authentication and data protection settings will be
            configured here in a future iteration.
          </p>
          {/* TODO: RBAC — implement role management and permission settings */}
        </Card>
      </div>
    </DashboardLayout>
  );
}
