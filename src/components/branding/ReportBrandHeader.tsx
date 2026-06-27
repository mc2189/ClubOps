import { LogoTile } from "@/components/branding/LogoTile";
import { clubName, clubTagline, productName } from "@/config/branding";

interface ReportBrandHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ReportBrandHeader({ title, subtitle }: ReportBrandHeaderProps) {
  return (
    <div className="brand-shimmer rounded-lg border border-brand-primary/15 bg-gradient-to-r from-brand-soft via-white to-brand-accent px-5 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <LogoTile size="report" className="shrink-0" />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-brand-charcoal">{clubName}</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            {productName} demo — demonstration document, fake data only
          </p>
          <p className="mt-2 text-sm text-slate-600">{clubTagline}</p>
        </div>
      </div>
      {(title || subtitle) && (
        <div className="mt-4 border-t border-brand-primary/10 pt-3">
          {title && <h3 className="text-base font-semibold text-brand-charcoal">{title}</h3>}
          {subtitle && <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
