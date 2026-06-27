"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { AuditDemoNotice, AuditSecurityGuidance } from "@/components/audit/AuditNotices";
import { AuditSubNav } from "@/components/audit/AuditSubNav";
import { DemoRbacNotice } from "@/components/rbac/RbacNotices";
import { auditTrail } from "@/lib/breadcrumbs";

export function AuditSecurityClient() {
  return (
    <>
      <PageHeader title="Audit & security" description="Guidance for live-mode audit and access control." breadcrumbs={auditTrail("Security")} backHref="/audit" />
      <AuditSubNav active="Security" />
      <AuditDemoNotice />
      <DemoRbacNotice />
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link href="/settings/roles" className="font-medium text-indigo-600 hover:underline">
          Demo roles →
        </Link>
        <Link href="/settings/permissions" className="font-medium text-indigo-600 hover:underline">
          Permissions matrix →
        </Link>
        <Link href="/settings/security" className="font-medium text-indigo-600 hover:underline">
          Live security requirements →
        </Link>
      </div>
      <div className="mt-6"><AuditSecurityGuidance /></div>
    </>
  );
}
