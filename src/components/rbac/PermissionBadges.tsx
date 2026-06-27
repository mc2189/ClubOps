import { Badge } from "@/components/ui";

export function DemoPermissionPreviewBadge() {
  return (
    <Badge variant="info">
      <span className="text-[11px]">Demo permission preview</span>
    </Badge>
  );
}

export function RestrictedInLiveModeBadge() {
  return (
    <Badge variant="warning">
      <span className="text-[11px]">Restricted in live mode</span>
    </Badge>
  );
}

export function SummaryOnlyBadge() {
  return (
    <Badge variant="default">
      <span className="text-[11px]">Summary only</span>
    </Badge>
  );
}

export function RequiredAccessBadge({ label }: { label: string }) {
  return (
    <Badge variant="warning">
      <span className="text-[11px]">{label}</span>
    </Badge>
  );
}
