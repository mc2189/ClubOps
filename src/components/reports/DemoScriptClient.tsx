"use client";

import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/reports/ReportsNotices";
import { DEMO_RESET_NOTE } from "@/lib/demoCopy";
import type { DemoScriptStep } from "@/data/providers/types";

function ScriptStepCard({ step }: { step: DemoScriptStep }) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        {step.optional ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-400 text-sm font-bold text-white">
            +
          </span>
        ) : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
            {step.step}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href={step.href}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Go to step
              </Link>
              {step.secondaryHref && step.secondaryLinkLabel && (
                <Link
                  href={step.secondaryHref}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {step.secondaryLinkLabel}
                </Link>
              )}
            </div>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">What to click</dt>
              <dd className="text-slate-800">{step.whatToClick}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">What to say</dt>
              <dd className="text-slate-800">{step.whatToSay}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Problem it solves</dt>
              <dd className="text-slate-800">{step.problemSolved}</dd>
            </div>
            <div>
              <dt className="font-medium text-indigo-600">Emphasise</dt>
              <dd className="text-slate-800">{step.emphasis}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Card>
  );
}

export function DemoScriptClient({
  steps,
  optionalSteps = [],
}: {
  steps: DemoScriptStep[];
  optionalSteps?: DemoScriptStep[];
}) {
  return (
    <>
      <PageHeader
        title="Demo script"
        description="Recommended 10–15 minute walkthrough for showing ClubOps to your club."
        action={
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/demo" className="font-medium text-indigo-600 hover:underline">
              About demo mode
            </Link>
            <Link href="/demo-roles" className="font-medium text-indigo-600 hover:underline">
              Demo roles
            </Link>
          </div>
        }
      />
      <DemoOnlyNotice />
      <p className="mt-4 text-sm text-slate-600">
        Follow these steps in order. {DEMO_RESET_NOTE}
      </p>
      <ol className="mt-6 space-y-6">
        {steps.map((step) => (
          <li key={step.step}>
            <ScriptStepCard step={step} />
          </li>
        ))}
      </ol>
      {optionalSteps.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Optional aside</h2>
          <p className="mt-2 text-sm text-slate-600">
            Add 2–5 minutes if the committee asks about data protection, permissions or going live.
          </p>
          <ol className="mt-4 space-y-6">
            {optionalSteps.map((step) => (
              <li key={`opt-${step.title}`}>
                <ScriptStepCard step={step} />
              </li>
            ))}
          </ol>
        </section>
      )}
    </>
  );
}
