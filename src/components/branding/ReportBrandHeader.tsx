import { ClubLogo } from "@/components/branding/ClubLogo";
import { clubName, clubTagline } from "@/config/branding";

interface ReportBrandHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ReportBrandHeader({ title, subtitle }: ReportBrandHeaderProps) {
  return (
    <div className="brand-shimmer rounded-lg border border-brand-primary/15 bg-gradient-to-r from-brand-soft via-white to-brand-accent px-5 py-4">
      <ClubLogo size={52} showName variant="report" />
      <p className="mt-2 text-sm text-slate-600">{clubTagline}</p>
      {(title || subtitle) && (
        <div className="mt-3 border-t border-brand-primary/10 pt-3">
          {title && <h2 className="text-lg font-semibold text-brand-charcoal">{title}</h2>}
          {subtitle && <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>}
        </div>
      )}
      <p className="mt-2 text-xs text-slate-500">{clubName} — demonstration document, fake data only</p>
    </div>
  );
}
