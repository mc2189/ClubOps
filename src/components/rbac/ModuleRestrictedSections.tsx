"use client";

import { type ReactNode } from "react";
import { RestrictedContentPreview } from "@/components/rbac/RestrictedContentPreview";

export function FinanceRestrictedSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RestrictedContentPreview
      module="finance"
      auditOnView="restricted finance preview viewed"
      className={className}
    >
      {children}
    </RestrictedContentPreview>
  );
}

export function GiftAidRestrictedSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RestrictedContentPreview
      module="gift-aid"
      auditOnView="restricted Gift Aid preview viewed"
      className={className}
    >
      {children}
    </RestrictedContentPreview>
  );
}
