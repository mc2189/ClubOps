import { cn } from "@/lib/utils";

interface ModuleSubNavProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

/** Horizontal sub-navigation — scrolls on mobile, wraps on desktop. */
export function ModuleSubNav({ children, label, className }: ModuleSubNavProps) {
  return (
    <nav
      className={cn(
        "mb-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
      aria-label={label}
    >
      {children}
    </nav>
  );
}
