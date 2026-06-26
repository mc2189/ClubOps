"use client";

import Link from "next/link";
import { auditSubNav } from "@/lib/reports";

export function AuditSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Audit sections">
      <Link href="/audit" className={`rounded-full px-3 py-1 text-xs font-medium ${active === "Overview" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Overview</Link>
      {auditSubNav.map((item) => (
        <Link key={item.href} href={item.href} className={`rounded-full px-3 py-1 text-xs font-medium ${active === item.label ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{item.label}</Link>
      ))}
    </nav>
  );
}
