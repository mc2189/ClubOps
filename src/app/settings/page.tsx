import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { DemoRoleSwitcher } from "@/components/rbac/DemoRoleSwitcher";
import { clubName } from "@/config/navigation";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        description="Club configuration, demo roles and security guidance."
        action={<DemoRoleSwitcher />}
      />
      <SettingsSubNav />
      <DemoRbacNotice />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold text-slate-900">Club details</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Club name</dt>
              <dd className="font-medium text-slate-900">{clubName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Mode</dt>
              <dd className="font-medium text-amber-700">Demo (fake data only)</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-slate-900">Demo roles (v1.1.0)</h3>
          <p className="mt-2 text-sm text-slate-600">
            Switch demo roles to preview how permissions would work for secretaries, treasurers,
            coaches and welfare officers — not real authentication.
          </p>
          <Link
            href="/settings/roles"
            className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
          >
            Manage demo roles →
          </Link>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-slate-900">Permissions matrix</h3>
          <p className="mt-2 text-sm text-slate-600">
            See which modules each role can access in a future live version.
          </p>
          <Link
            href="/settings/permissions"
            className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
          >
            View permissions →
          </Link>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-slate-900">Security & live mode</h3>
          <p className="mt-2 text-sm text-slate-600">
            Plain-English requirements for authentication, RBAC and data protection before going live.
          </p>
          <Link
            href="/settings/security"
            className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
          >
            Security requirements →
          </Link>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-slate-900">Demo & presentation</h3>
          <p className="mt-2 text-sm text-slate-600">
            Guided walkthrough for showing ClubOps to your committee.
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/demo-script" className="font-medium text-indigo-600 hover:underline">
              Open demo script →
            </Link>
            <Link href="/demo-roles" className="font-medium text-indigo-600 hover:underline">
              Demo roles intro →
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
