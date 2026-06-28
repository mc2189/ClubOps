import { Badge } from "@/components/ui";
import {
  attendanceTier,
  documentsStatusLabel,
  feeStatusLabel,
  giftAidSummaryLabel,
} from "@/lib/memberProfileSummary";
import type { MemberProfile } from "@/data/providers/types";

/** Scannable status badges for member list rows/cards — text labels, not colour-only */
export function MemberListStatusBadges({ profile }: { profile: MemberProfile }) {
  const fee = feeStatusLabel(profile);
  const attendance = attendanceTier(profile);
  const docs = documentsStatusLabel(profile);
  const giftAid =
    profile.giftAidStatus === "n/a"
      ? "Gift Aid: N/A"
      : giftAidSummaryLabel(profile).replace("Declaration ", "Gift Aid: ");

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Member status summary">
      <Badge variant="default">Class: {profile.classGroup.split(" — ")[0]}</Badge>
      <Badge
        variant={
          fee === "Paid"
            ? "success"
            : fee === "Part-paid"
              ? "warning"
              : fee === "Owes fees"
                ? "danger"
                : "default"
        }
      >
        Fees: {fee}
      </Badge>
      <Badge
        variant={
          attendance === "Good" ? "success" : attendance === "Watch" ? "warning" : "danger"
        }
      >
        Attendance: {attendance}
      </Badge>
      <Badge variant={docs === "Complete" ? "success" : "warning"}>
        Documents: {docs}
      </Badge>
      <Badge
        variant={
          profile.giftAidStatus === "declared"
            ? "success"
            : profile.giftAidStatus === "n/a"
              ? "default"
              : "warning"
        }
      >
        {giftAid}
      </Badge>
      {profile.hasMedicalFlag && (
        <Badge variant="warning">Medical flag</Badge>
      )}
    </div>
  );
}

/** Compact one-line attendance for detailed table */
export function MemberAttendanceCell({ profile }: { profile: MemberProfile }) {
  const tier = attendanceTier(profile);
  return (
    <span>
      {profile.attendance.percentage}%{" "}
      <span className="text-slate-500">({tier})</span>
    </span>
  );
}
