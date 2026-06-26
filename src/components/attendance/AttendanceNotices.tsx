export function DemoOnlyNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <strong>Demo only</strong> — attendance changes are not stored permanently. Refresh the
      page to reset all registers.
    </div>
  );
}

export function MedicalFlagNotice() {
  return (
    <p className="text-xs text-red-700">
      Medical information available — restricted access required in live mode.
      {/* TODO: RBAC — detailed medical notes must not be shown on attendance register without welfare officer role */}
    </p>
  );
}
