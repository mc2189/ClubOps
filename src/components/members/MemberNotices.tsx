export function DemoOnlyNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <strong>Demo data only</strong> — do not enter real child, parent, medical or contact
      information. Changes are not stored permanently; refresh the page to reset member data.
    </div>
  );
}

export function ContactSafetyNotice() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
      <strong className="text-slate-900">Contact & safeguarding (demo)</strong>
      <p className="mt-1">
        All names, emails and phone numbers are fake. Do not enter real contact details in this
        public demo. Sensitive medical and welfare information is role-restricted — switch roles in
        the top bar to preview access.
      </p>
    </div>
  );
}

export function SensitiveDataNotice({ area }: { area: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <strong>Sensitive data — {area}</strong>
      <p className="mt-1 text-red-800">
        This section contains confidential information.{" "}
        {/* TODO: RBAC — restrict access to authorised roles (welfare officer, admin) only */}
        Future role-based permissions will restrict who can view and edit this data.
      </p>
    </div>
  );
}
