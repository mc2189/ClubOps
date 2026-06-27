import Link from "next/link";
import { SidebarBrandLogo } from "@/components/branding/LogoTile";

export function BrandMark() {
  return (
    <Link
      href="/dashboard"
      className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <SidebarBrandLogo />
    </Link>
  );
}
