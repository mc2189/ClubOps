"use client";

import { PageHeader } from "@/components/ui";
import { AuditDemoNotice, AuditSecurityGuidance } from "@/components/audit/AuditNotices";
import { AuditSubNav } from "@/components/audit/AuditSubNav";

export function AuditSecurityClient() {
  return (
    <>
      <PageHeader title="Audit & security" description="Guidance for live-mode audit and access control." />
      <AuditSubNav active="Security" />
      <AuditDemoNotice />
      <div className="mt-6"><AuditSecurityGuidance /></div>
    </>
  );
}
