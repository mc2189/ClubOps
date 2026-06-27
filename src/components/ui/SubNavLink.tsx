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
        "rounded-full px-3 py-1.5 text-xs font-medium",
        active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
        className,
      )}
    >
      {children}
    </Link>
  );
}
