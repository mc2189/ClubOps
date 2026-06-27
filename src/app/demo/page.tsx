import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card } from "@/components/ui";
import { GlamLogoAccent, WebLogoFull } from "@/components/branding/LogoTile";
import { clubName, productName } from "@/config/branding";
import { DEMO_RESET_NOTE, DEMO_SAFETY_SUMMARY } from "@/lib/demoCopy";
import { helpTrail } from "@/lib/breadcrumbs";

const demoFacts = [
  {
    title: "All records are fake",
    description:
      `Every member, staff member, transaction and document in this ${productName} demo for ${clubName} is entirely fictional. Names, emails and amounts are made up for demonstration purposes.`,
  },
  {
    title: "No real children or parent data",
    description:
      "Demo mode never contains real child records, parent contact details, medical information or safeguarding data. It is safe to show publicly.",
  },
  {
    title: "Integrations are simulated",
    description:
      "Email sending, bank payments, Gift Aid submissions and document uploads are simulated only. No Gmail, banking, Facebook, Open Banking or payment APIs are connected.",
  },
  {
    title: "Safe for public demonstration",
    description:
      "You can share the demo URL with committee members, volunteers or stakeholders without risk of exposing real club or personal data.",
  },
];

const notIncluded = [
  "Real member, child or parent data",
  "Real Gmail or email delivery",
  "Real bank or Open Banking connections",
  "Real payment processing (Stripe, GoCardless, etc.)",
  "Real file uploads or bank statement processing",
  "HMRC Gift Aid submission",
  "Facebook or social media integrations",
  "AI or paid third-party APIs",
  "Persistent storage — refresh resets session changes",
];

export default function DemoModePage() {
  return (
    <DashboardLayout>
      <div className="brand-shimmer relative mb-6 overflow-hidden rounded-xl border border-brand-primary/15 bg-gradient-to-br from-brand-soft via-white to-brand-accent px-5 py-6">
        <GlamLogoAccent className="pointer-events-none absolute bottom-4 right-4 hidden opacity-35 md:block" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <WebLogoFull width={220} className="shrink-0 self-start" decorative />
          <div className="min-w-0">
            <span className="sr-only">{clubName}</span>
            <p className="text-sm font-medium text-brand-primary">
              Branded {productName} demonstration — fake data only, not a live system.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Safe to share with committee members and volunteers. All records, payments and
              documents in this demo are entirely fictional.
            </p>
          </div>
        </div>
      </div>

      <PageHeader
        title="About demo mode"
        description={`${productName} is running with fake data only for ${clubName}. Here's what that means.`}
        breadcrumbs={helpTrail("About Demo Mode")}
        backHref="/dashboard"
        action={
          <Link
            href="/dashboard"
            className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover"
          >
            Back to dashboard
          </Link>
        }
      />

      <Card className="border-amber-200 bg-amber-50">
        <p className="text-sm font-semibold text-amber-900">Demo mode — fake data only</p>
        <p className="mt-2 text-sm text-amber-800">
          This installation uses a demo data provider for {clubName}. {DEMO_SAFETY_SUMMARY}
        </p>
        <p className="mt-2 text-sm text-amber-800">{DEMO_RESET_NOTE}</p>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {demoFacts.map((fact) => (
          <Card key={fact.title}>
            <h3 className="text-base font-semibold text-brand-charcoal">{fact.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{fact.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="text-base font-semibold text-brand-charcoal">Not included in demo mode</h3>
        <ul className="mt-3 space-y-2">
          {notIncluded.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-0.5 text-red-500" aria-hidden="true">
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6">
        <h3 className="text-base font-semibold text-brand-charcoal">Demo roles (v1.1.0)</h3>
        <p className="mt-2 text-sm text-slate-600">
          Preview how secretary, treasurer, coach and welfare roles would restrict access — demo role
          switching only, not real security.
        </p>
        <Link
          href="/demo-roles"
          className="mt-3 inline-block rounded-md border border-brand-primary/30 bg-brand-soft px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-primary/10"
        >
          Try demo role switching
        </Link>
      </Card>

      <Card className="mt-6">
        <h3 className="text-base font-semibold text-brand-charcoal">Live-ready blueprint (v1.2.0)</h3>
        <p className="mt-2 text-sm text-slate-600">
          {productName} is demo-only today, but the architecture is documented for a future live version.
          Demo mode stays permanent for public training and sales demos.
        </p>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <Link href="/settings/live-readiness" className="font-medium text-brand-primary hover:underline">
            What must exist before real data →
          </Link>
          <Link href="/settings/production-roadmap" className="font-medium text-brand-primary hover:underline">
            Staged migration roadmap →
          </Link>
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-base font-semibold text-brand-charcoal">Present to your committee</h3>
        <p className="mt-2 text-sm text-slate-600">
          Follow the step-by-step demo script for a 10–15 minute walkthrough of {clubName}&apos;s demo.
        </p>
        <Link
          href="/demo-script"
          className="mt-3 inline-block rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover"
        >
          Open demo script
        </Link>
      </Card>
    </DashboardLayout>
  );
}
