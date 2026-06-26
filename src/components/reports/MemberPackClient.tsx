"use client";

import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { DemoOnlyNotice, ExportSuccessNotice } from "@/components/reports/ReportsNotices";
import { ReportsSubNav } from "@/components/reports/ReportsSubNav";
import { useReportsAuditDemo } from "@/components/reports/ReportsAuditDemoProvider";

export function MemberPackClient() {
  const { memberPack, simulateExport, lastExportTitle } = useReportsAuditDemo();
  const p = memberPack;

  return (
    <>
      <PageHeader title="Member Admin Pack" description="Membership summary — sensitive summary only, no detailed medical notes." />
      <ReportsSubNav active="Member Pack" />
      <DemoOnlyNotice />
      {lastExportTitle === "Member Admin Pack" && <ExportSuccessNotice title="Member Admin Pack" />}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active members" value={p.activeMembers} />
        <StatCard label="Inactive/archived" value={p.inactiveMembers} />
        <StatCard label="Incomplete emergency contacts" value={p.incompleteEmergencyContacts} />
        <StatCard label="Missing consent" value={p.missingConsent} />
        <StatCard label="Medical flags (summary)" value={p.medicalFlags} hint="No detailed notes exported" />
        <StatCard label="Attendance concerns" value={p.attendanceConcerns} />
        <StatCard label="Unpaid fees" value={p.unpaidFees} />
        <StatCard label="Documents missing" value={p.documentsMissing} />
      </div>
      <Card className="mt-6">
        <p className="text-sm text-amber-800"><strong>Sensitive summary only</strong> — detailed medical and safeguarding notes are not included in this demo export.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/members" className="text-sm text-indigo-600 hover:underline">Members list</Link>
          <Link href="/finance/fees" className="text-sm text-indigo-600 hover:underline">Unpaid fees</Link>
          <Link href="/documents/missing" className="text-sm text-indigo-600 hover:underline">Missing documents</Link>
          <Link href="/communications/forms" className="text-sm text-indigo-600 hover:underline">Form actions</Link>
        </div>
        <button type="button" onClick={() => simulateExport("Member Admin Pack")} className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">Generate demo export</button>
      </Card>
    </>
  );
}
