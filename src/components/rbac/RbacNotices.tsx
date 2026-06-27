export function DemoRbacNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-950"
    >
      <strong>Demo role only — not a real login.</strong> Permissions shown here are a preview of
      how live mode would work. This is a permission preview only — in this public demo, fake data
      remains visible so you can explore the app. A live version would block or hide restricted
      sections on the server.
    </div>
  );
}
