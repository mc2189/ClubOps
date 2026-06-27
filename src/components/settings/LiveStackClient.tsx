"use client";

import Link from "next/link";
import { Card, PageHeader, Badge } from "@/components/ui";
import { settingsTrail } from "@/lib/breadcrumbs";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { StackDecisionSafetyNotice } from "@/components/settings/StackDecisionSafetyNotice";
import {
  decisionCriteria,
  decisionMatrix,
  stackOptions,
  getStackAverageScore,
} from "@/data/demo/stackDecisionData";

const scoreColor = (score: number) => {
  if (score >= 4) return "text-green-700 bg-green-50";
  if (score >= 3) return "text-amber-800 bg-amber-50";
  return "text-red-800 bg-red-50";
};

export function LiveStackClient() {
  const stackIds = stackOptions.map((s) => s.id);

  return (
    <>
      <PageHeader
        title="Live stack comparison"
        description="Decision matrix scoring each option 1–5 for ClubOps — justification included."
        breadcrumbs={settingsTrail("Live stack comparison")}
        backHref="/settings"
      />
      <SettingsSubNav />
      <DemoRbacNotice />
      <StackDecisionSafetyNotice />

      <Card className="mt-6">
        <h2 className="text-base font-semibold text-slate-900">Average scores (1–5)</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {stackOptions.map((opt) => (
            <div
              key={opt.id}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${scoreColor(getStackAverageScore(opt.id))}`}
            >
              {opt.name.split("+")[0].trim()}: {getStackAverageScore(opt.id)}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Not final legal/security advice. See LIVE_STACK_OPTIONS.md for full narrative.
        </p>
      </Card>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="sticky left-0 bg-white py-2 pr-4 font-semibold text-slate-900">Criterion</th>
              {stackOptions.map((opt) => (
                <th key={opt.id} className="px-2 py-2 font-semibold text-slate-700">
                  <span className="block max-w-[8rem] text-xs">{opt.id === "supabase" ? "Supabase" : opt.id === "authjs" ? "Auth.js" : opt.name.split(" ")[0]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {decisionCriteria.map((criterion) => (
              <tr key={criterion.id} className="border-b border-slate-100">
                <td className="sticky left-0 bg-white py-3 pr-4">
                  <p className="font-medium text-slate-900">{criterion.name}</p>
                  <p className="text-xs text-slate-500">{criterion.description}</p>
                </td>
                {stackIds.map((stackId) => {
                  const entry = decisionMatrix.find(
                    (m) => m.stackId === stackId && m.criterionId === criterion.id,
                  );
                  return (
                    <td key={stackId} className="px-2 py-3 align-top">
                      {entry && (
                        <>
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${scoreColor(entry.score)}`}
                          >
                            {entry.score}
                          </span>
                          <p className="mt-1 max-w-[10rem] text-xs text-slate-600">{entry.justification}</p>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-10 lg:hidden">
        <h2 className="text-base font-semibold text-slate-900">Scores by stack (mobile view)</h2>
        {stackOptions.map((opt) => (
          <Card key={opt.id} className="mt-4">
            <h3 className="font-semibold text-slate-900">{opt.name}</h3>
            <Badge variant="info">
              Avg: {getStackAverageScore(opt.id)}
            </Badge>
            <ul className="mt-3 space-y-2 text-xs">
              {decisionCriteria.map((c) => {
                const entry = decisionMatrix.find(
                  (m) => m.stackId === opt.id && m.criterionId === c.id,
                );
                if (!entry) return null;
                return (
                  <li key={c.id}>
                    <span className="font-medium">{c.name}:</span> {entry.score}/5 — {entry.justification}
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </section>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/recommended-stack" className="font-medium text-indigo-600 hover:underline">
          Recommended stack →
        </Link>
        <Link href="/settings/auth-decision" className="font-medium text-indigo-600 hover:underline">
          Auth decision pack →
        </Link>
      </div>
    </>
  );
}
