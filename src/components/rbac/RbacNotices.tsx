export function DemoRbacNotice() {
  return (
    <div
      role="status"
      className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-950"
    >
      <strong>Demo role only — not a real login.</strong> Demo permission preview only — not real
      security. In this public demo, fake data may still be visible so you can explore the app. In
      live mode, restricted sections would be blocked server-side with authentication and RBAC.
    </div>
  );
}
