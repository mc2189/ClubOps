"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "parents", label: "Parents/Carers" },
  { id: "medical", label: "Medical" },
  { id: "attendance", label: "Attendance" },
  { id: "finance", label: "Finance" },
  { id: "documents", label: "Documents" },
  { id: "notes", label: "Notes" },
  { id: "audit", label: "Audit" },
] as const;

export type MemberTabId = (typeof tabs)[number]["id"];

interface MemberTabsProps {
  activeTab: MemberTabId;
  onTabChange: (tab: MemberTabId) => void;
}

export function MemberTabs({ activeTab, onTabChange }: MemberTabsProps) {
  return (
    <div className="border-b border-slate-200">
      <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Member profile tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
            className={cn(
              "whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function useMemberTab(initial: MemberTabId = "overview") {
  return useState<MemberTabId>(initial);
}
