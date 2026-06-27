import Link from "next/link";
import { AppBrandMark } from "@/components/branding/AppBrandMark";

export function BrandMark() {
  return (
    <Link
      href="/dashboard"
      className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <AppBrandMark layout="stacked" theme="dark" size="md" />
    </Link>
  );
}
