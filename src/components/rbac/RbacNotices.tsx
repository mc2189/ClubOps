export function DemoRbacNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-950"
    >
      <strong>Demo role switching only — not real security.</strong> Permissions shown here are a
      preview of how live mode would work. Real authentication, server-side authorisation and secure
      storage are required before any real club data is used.
    </div>
  );
}
