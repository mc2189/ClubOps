import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, Card } from "@/components/ui";
import { DEMO_RESET_NOTE, DEMO_SAFETY_SUMMARY } from "@/lib/demoCopy";

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
        <p className="text-sm font-semibold text-amber-900">Demo mode — fake data only</p>
        <p className="mt-2 text-sm text-amber-800">
          This installation of ClubOps uses a demo data provider. {DEMO_SAFETY_SUMMARY}
        </p>
        <p className="mt-2 text-sm text-amber-800">{DEMO_RESET_NOTE}</p>
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
        <h3 className="text-base font-semibold text-slate-900">Present ClubOps to your club</h3>
        <p className="mt-2 text-sm text-slate-600">
          Follow the step-by-step demo script for a 10–15 minute walkthrough.
        </p>
        <Link href="/demo-script" className="mt-3 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Open demo script
        </Link>
      </Card>
    </DashboardLayout>
  );
}
