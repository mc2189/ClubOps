import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card } from "@/components/ui";

const demoFacts = [
  {
    title: "All records are fake",
    description:
      "Every member, staff member, transaction and document in ClubOps demo mode is entirely fictional. Names, emails and amounts are made up for demonstration purposes.",
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
  "Real Gmail or email delivery",
  "Real bank or Open Banking connections",
  "Real payment processing (Stripe, GoCardless, etc.)",
  "Facebook or social media integrations",
  "AI or paid third-party APIs",
  "Real member, child or parent data",
];

export default function DemoModePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="About demo mode"
        description="ClubOps is running with fake data only. Here's what that means."
        action={
          <Link
            href="/dashboard"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Back to dashboard
          </Link>
        }
      />

      <Card className="border-amber-200 bg-amber-50">
        <p className="text-sm font-semibold text-amber-900">Demo Mode — fake data only</p>
        <p className="mt-2 text-sm text-amber-800">
          This installation of ClubOps uses a demo data provider. All information displayed across
          every module is generated for demonstration and must not be treated as real club data.
        </p>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {demoFacts.map((fact) => (
          <Card key={fact.title}>
            <h3 className="text-base font-semibold text-slate-900">{fact.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{fact.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="text-base font-semibold text-slate-900">Not included in demo mode</h3>
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
        <h3 className="text-base font-semibold text-slate-900">Demo club</h3>
        <p className="mt-2 text-sm text-slate-600">
          The demo uses <strong>Riverside Gymnastics Club</strong> as a fictional example. When
          ClubOps moves to live mode, a real data provider will replace the demo provider without
          requiring changes to the user interface.
        </p>
        {/* TODO: RBAC — live mode will require authentication and role-based access */}
      </Card>
    </DashboardLayout>
  );
}
