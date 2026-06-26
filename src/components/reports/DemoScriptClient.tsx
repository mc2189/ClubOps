"use client";

import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { DemoOnlyNotice } from "@/components/reports/ReportsNotices";
import type { DemoScriptStep } from "@/data/providers/types";

export function DemoScriptClient({ steps }: { steps: DemoScriptStep[] }) {

  return (
    <>
      <PageHeader
        title="Demo script"
        description="Recommended 10–15 minute walkthrough for showing ClubOps to your club."
        action={<Link href="/demo" className="text-sm font-medium text-indigo-600 hover:underline">About demo mode</Link>}
      />
      <DemoOnlyNotice />
      <p className="mt-4 text-sm text-slate-600">
        Follow these steps in order. All data is fake — safe to show publicly.
      </p>
      <ol className="mt-6 space-y-6">
        {steps.map((step) => (
          <li key={step.step}>
            <Card>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{step.step}</span>
                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
                    <Link href={step.href} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Go to step</Link>
                  </div>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div><dt className="font-medium text-slate-500">What to click</dt><dd className="text-slate-800">{step.whatToClick}</dd></div>
                    <div><dt className="font-medium text-slate-500">What to say</dt><dd className="text-slate-800">{step.whatToSay}</dd></div>
                    <div><dt className="font-medium text-slate-500">Problem it solves</dt><dd className="text-slate-800">{step.problemSolved}</dd></div>
                    <div><dt className="font-medium text-indigo-600">Emphasise</dt><dd className="text-slate-800">{step.emphasis}</dd></div>
                  </dl>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </>
  );
}
