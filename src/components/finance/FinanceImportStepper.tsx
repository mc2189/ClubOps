import { IMPORT_WIZARD_STEPS } from "@/lib/financeImportCopy";
import { cn } from "@/lib/utils";

export function FinanceImportStepper({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  return (
    <nav aria-label="Import progress" className="mt-4">
      <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
        {IMPORT_WIZARD_STEPS.map((label, index) => {
          const step = (index + 1) as 1 | 2 | 3 | 4;
          const active = step === currentStep;
          const complete = step < currentStep;
          return (
            <li
              key={label}
              className={cn(
                "flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-xs sm:text-sm",
                active && "border-brand-primary bg-brand-soft font-semibold text-brand-charcoal",
                complete && "border-emerald-200 bg-emerald-50/80 text-emerald-900",
                !active && !complete && "border-slate-200 bg-white text-slate-500",
              )}
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  active && "bg-brand-primary text-white",
                  complete && "bg-emerald-600 text-white",
                  !active && !complete && "bg-slate-100 text-slate-500",
                )}
                aria-hidden="true"
              >
                {complete ? "✓" : step}
              </span>
              <span className="min-w-0 leading-tight">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
