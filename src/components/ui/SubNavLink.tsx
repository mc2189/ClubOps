import Link from "next/link";
import { cn } from "@/lib/utils";

interface SubNavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SubNavLink({ href, active, children, className }: SubNavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-4 py-2.5 text-sm font-medium min-h-[44px] md:min-h-0 md:px-3 md:py-1.5 md:text-xs",
        active ? "bg-brand-primary text-white" : "bg-brand-soft text-brand-charcoal hover:bg-brand-primary/15",
        className,
      )}
    >
      {children}
    </Link>
  );
}
