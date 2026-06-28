import { cn } from "@/lib/utils";

interface TableScrollWrapProps {
  children: React.ReactNode;
  className?: string;
  hint?: string;
  "data-layout"?: string;
}

/** Wraps wide tables with a mobile scroll hint and edge padding. */
export function TableScrollWrap({
  children,
  className,
  hint = "Swipe sideways to see more columns",
  "data-layout": dataLayout,
}: TableScrollWrapProps) {
  return (
    <div className={cn("relative", className)} data-layout={dataLayout}>
      <p className="mb-2 text-xs text-slate-500 md:hidden">{hint}</p>
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">{children}</div>
    </div>
  );
}
