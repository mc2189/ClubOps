import Link from "next/link";
import { ClubLogo } from "@/components/branding/ClubLogo";
import { productName } from "@/config/branding";

export function BrandMark() {
  return (
    <Link
      href="/dashboard"
      className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <ClubLogo size={72} variant="onDark" className="justify-center" />
      <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wider text-emerald-200/70">
        {productName} demo
      </p>
    </Link>
  );
}
