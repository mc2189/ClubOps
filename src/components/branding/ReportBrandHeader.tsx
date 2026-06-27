import { WebLogoFull } from "@/components/branding/LogoTile";
import { clubName, productName } from "@/config/branding";
import { cn } from "@/lib/utils";

interface ReportBrandHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ReportBrandHeader({ title, subtitle, className }: ReportBrandHeaderProps) {
  return (
    <div
      className={cn(
        "brand-shimmer rounded-lg border border-brand-primary/15 bg-gradient-to-r from-brand-soft via-white to-brand-accent px-5 py-4",
        className,
      )}
    >
      <WebLogoFull width={200} className="max-w-[240px]" decorative />
      <span className="sr-only">{clubName}</span>
      <p className="mt-2 text-xs text-slate-500">
        {productName} demo — demonstration document, fake data only
      </p>
      {(title || subtitle) && (
        <div className="mt-3 border-t border-brand-primary/10 pt-3">
          {title && <h2 className="text-base font-semibold text-brand-charcoal">{title}</h2>}
          {subtitle && <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
