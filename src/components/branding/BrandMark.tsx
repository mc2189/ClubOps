import Link from "next/link";
import { SidebarLogoTile } from "@/components/branding/LogoTile";
import { clubName, productName } from "@/config/branding";

export function BrandMark() {
  return (
    <Link
      href="/dashboard"
      className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <SidebarLogoTile />
      <p className="mt-3 text-center text-sm font-semibold leading-snug text-white">{clubName}</p>
      <p className="mt-1 text-center text-xs font-medium text-emerald-200/80">{productName} demo</p>
    </Link>
  );
}
