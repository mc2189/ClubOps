import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card } from "@/components/ui";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { DemoRoleSwitcher } from "@/components/rbac/DemoRoleSwitcher";
import { WebLogoIcon } from "@/components/branding/LogoTile";
import { clubName } from "@/config/branding";
import { settingsTrail } from "@/lib/breadcrumbs";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        description="Club configuration, demo roles and security guidance."
        breadcrumbs={settingsTrail("Overview")}
        backHref="/settings"
        action={<DemoRoleSwitcher />}
      />
      <SettingsSubNav />
      <DemoRbacNotice />

      <section aria-labelledby="club-settings-heading" className="mt-6">
        <h2 id="club-settings-heading" className="text-lg font-semibold text-slate-900">
          Club &amp; volunteers
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Everyday settings for secretaries, treasurers and committee members.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card className="border-brand-primary/10 bg-brand-soft/30">
            <div className="flex items-center gap-3">
              <WebLogoIcon width={40} tile tileClassName="w-11 p-1.5" />
              <div>
                <h3 className="text-base font-semibold text-brand-charcoal">Club details</h3>
                <p className="text-xs text-slate-500">Branded demo instance</p>
              </div>
            </div>
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
            <h3 className="text-base font-semibold text-slate-900">Demo roles</h3>
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
            <h3 className="text-base font-semibold text-slate-900">Security summary</h3>
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
            <h3 className="text-base font-semibold text-slate-900">Demo &amp; presentation</h3>
            <p className="mt-2 text-sm text-slate-600">
              Guided walkthrough for showing ClubOps to your committee.
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/demo-script" className="font-medium text-indigo-600 hover:underline">
                Open demo script →
              </Link>
              <Link href="/demo" className="font-medium text-indigo-600 hover:underline">
                About demo mode →
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section aria-labelledby="technical-settings-heading" className="mt-10">
        <h2 id="technical-settings-heading" className="text-lg font-semibold text-slate-700">
          Technical / going live
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-500">
          These pages are for Mike, developers and committee planning — not everyday club admin.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card className="border-slate-200 bg-slate-50/50">
            <h3 className="text-base font-semibold text-slate-800">Live readiness</h3>
            <p className="mt-2 text-sm text-slate-600">
              Blueprint for moving from demo to live — checklist, data model and migration stages.
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/settings/live-readiness" className="font-medium text-indigo-600 hover:underline">
                Live readiness checklist →
              </Link>
              <Link href="/settings/data-architecture" className="font-medium text-indigo-600 hover:underline">
                Data architecture →
              </Link>
              <Link href="/settings/provider-model" className="font-medium text-indigo-600 hover:underline">
                Demo vs live data →
              </Link>
              <Link href="/settings/production-roadmap" className="font-medium text-indigo-600 hover:underline">
                Production roadmap →
              </Link>
            </div>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50">
            <h3 className="text-base font-semibold text-slate-800">Auth &amp; stack decisions</h3>
            <p className="mt-2 text-sm text-slate-600">
              Compare options before implementing live mode — decision pack only, no real auth yet.
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/settings/auth-decision" className="font-medium text-indigo-600 hover:underline">
                Choosing a login system →
              </Link>
              <Link href="/settings/live-stack" className="font-medium text-indigo-600 hover:underline">
                Live stack matrix →
              </Link>
              <Link href="/settings/recommended-stack" className="font-medium text-indigo-600 hover:underline">
                Recommended stack →
              </Link>
              <Link href="/settings/implementation-options" className="font-medium text-indigo-600 hover:underline">
                Implementation options →
              </Link>
            </div>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50">
            <h3 className="text-base font-semibold text-slate-800">Supabase prep</h3>
            <p className="mt-2 text-sm text-slate-600">
              Draft schema, RLS, storage policies and client scaffold — not connected. Public demo still
              uses fake data only.
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/settings/supabase-prep" className="font-medium text-indigo-600 hover:underline">
                Supabase prep overview →
              </Link>
              <Link href="/settings/schema-plan" className="font-medium text-indigo-600 hover:underline">
                Database plan →
              </Link>
              <Link href="/settings/private-deployment" className="font-medium text-indigo-600 hover:underline">
                Private live deployment →
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  );
}
