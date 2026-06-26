import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card } from "@/components/ui";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { DemoRoleSwitcher } from "@/components/rbac/DemoRoleSwitcher";

export default function DemoRolesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Demo role switching"
        description="Preview how ClubOps would restrict access by volunteer role — not real security."
        action={<DemoRoleSwitcher />}
      />
      <DemoRbacNotice />

      <Card className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">Why role switching matters</h2>
        <p className="mt-2 text-sm text-slate-600">
          Not every volunteer should see everything. Treasurers need finance. Welfare officers need
          medical detail. Coaches need attendance — not bank statements. Committee members may only
          need read-only summaries.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Use the role switcher in the top bar to preview restrictions. Then visit finance, member
          medical tabs or exports to see permission preview messages.
        </p>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Try as Coach</h3>
          <p className="mt-2 text-sm text-slate-600">
            Switch to Coach, open Finance — see how access would be restricted in live mode.
          </p>
          <Link href="/finance" className="mt-3 inline-block text-sm text-indigo-600 hover:underline">
            Open Finance →
          </Link>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Try as Treasurer</h3>
          <p className="mt-2 text-sm text-slate-600">
            Switch to Treasurer for finance and Gift Aid access previews.
          </p>
          <Link href="/gift-aid" className="mt-3 inline-block text-sm text-indigo-600 hover:underline">
            Open Gift Aid →
          </Link>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Try as Welfare Officer</h3>
          <p className="mt-2 text-sm text-slate-600">
            Switch to Welfare Officer and open a member medical tab.
          </p>
          <Link href="/members/mem-002" className="mt-3 inline-block text-sm text-indigo-600 hover:underline">
            Jordan Reeves profile →
          </Link>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/settings/roles"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          All demo roles
        </Link>
        <Link
          href="/settings/permissions"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Permissions matrix
        </Link>
        <Link href="/demo-script" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Demo script
        </Link>
      </div>
    </DashboardLayout>
  );
}
