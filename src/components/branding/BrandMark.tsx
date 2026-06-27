import Link from "next/link";
import { ClubLogo } from "@/components/branding/ClubLogo";
import { productName } from "@/config/branding";

export function BrandMark() {
  return (
    <Link href="/dashboard" className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
      <ClubLogo size={44} showName nameClassName="min-w-0" variant="onDark" />
      <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-emerald-200/70">
        {productName} demo
      </p>
    </Link>
  );
}
