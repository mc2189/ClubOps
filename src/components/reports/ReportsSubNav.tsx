"use client";

import Link from "next/link";
import { reportsSubNav } from "@/lib/reports";

export function ReportsSubNav({ active }: { active?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" aria-label="Reports sections">
      <Link href="/reports" className={`rounded-full px-3 py-1 text-xs font-medium ${active === "Dashboard" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Dashboard</Link>
      {reportsSubNav.map((item) => (
        <Link key={item.href} href={item.href} className={`rounded-full px-3 py-1 text-xs font-medium ${active === item.label ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{item.label}</Link>
      ))}
    </nav>
  );
}
