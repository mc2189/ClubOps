"use client";

import Link from "next/link";
import { Badge, PageHeader } from "@/components/ui";
import { TableScrollWrap } from "@/components/ui/TableScrollWrap";
import { DemoOnlyNotice } from "@/components/gift-aid/GiftAidNotices";
import { DeclarationRequestModal } from "@/components/gift-aid/DeclarationRequestModal";
import { GiftAidSubNav } from "@/components/gift-aid/GiftAidDashboardClient";
import { useGiftAidDemo } from "@/components/gift-aid/GiftAidDemoProvider";
import { declarationStatusLabel, declarationStatusVariant } from "@/lib/giftAid";
import { formatDate } from "@/lib/utils";
import { giftAidTrail } from "@/lib/breadcrumbs";

export function DeclarationsClient() {
  const { declarations, updateDeclarationStatus, simulateDeclarationRequest, showDeclarationPreview, setShowDeclarationPreview } = useGiftAidDemo();

  return (
    <>
      <PageHeader title="Gift Aid declarations" description="Parent/carer declarations and status." breadcrumbs={giftAidTrail("Declarations")} backHref="/gift-aid" />
      <GiftAidSubNav active="Declarations" />
      <DemoOnlyNotice />

      <TableScrollWrap className="mt-4">
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Parent / carer",
                "Linked member(s)",
                "Status",
                "Declared",
                "Taxpayer",
                "Covered period",
                "Actions",
              ].map((h) => (
                <th key={h} className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {declarations.map((decl) => (
              <tr key={decl.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-3 font-medium">{decl.parentCarerName}</td>
                <td className="px-3 py-3">
                  {decl.linkedMemberIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {decl.linkedMemberIds.map((id, i) => (
                        <Link key={id} href={`/members/${id}`} className="text-indigo-600 hover:underline">
                          {decl.linkedMemberNames[i]}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-500">{decl.linkedMemberNames.join(", ")}</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <Badge variant={declarationStatusVariant(decl.status)}>
                    {declarationStatusLabel[decl.status]}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                  {decl.declarationDate ? formatDate(decl.declarationDate) : "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {decl.taxpayerConfirmed ? "Yes" : "No"}
                </td>
                <td className="px-3 py-3 text-slate-600">{decl.coveredPeriod}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="flex flex-wrap gap-1">
                    {decl.status === "missing" && (
                      <ActionBtn label="Send request" onClick={() => simulateDeclarationRequest(decl.id)} />
                    )}
                    {decl.status !== "valid" && (
                      <ActionBtn label="Mark valid" onClick={() => updateDeclarationStatus(decl.id, "valid")} />
                    )}
                    <ActionBtn label="Returned" onClick={() => updateDeclarationStatus(decl.id, "returned")} />
                    <ActionBtn label="Flag review" onClick={() => updateDeclarationStatus(decl.id, "needs-review")} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </TableScrollWrap>

      {showDeclarationPreview && (
        <DeclarationRequestModal onClose={() => setShowDeclarationPreview(false)} />
      )}
    </>
  );
}

function ActionBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 md:min-h-0 md:rounded md:px-2 md:py-0.5 md:text-xs"
    >
      {label}
    </button>
  );
}
