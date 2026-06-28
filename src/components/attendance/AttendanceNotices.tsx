export { DemoOnlyNotice } from "@/components/demo/DemoOnlyNotice";

export function MedicalFlagNotice() {
  return (
    <p className="text-xs text-red-700">
      Medical information available — restricted access required in live mode.
      {/* TODO: RBAC — detailed medical notes must not be shown on attendance register without welfare officer role */}
    </p>
  );
}
