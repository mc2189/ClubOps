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
        active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
        className,
      )}
    >
      {children}
    </Link>
  );
}
