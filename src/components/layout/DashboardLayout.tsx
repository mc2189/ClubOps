import { AppShell } from "@/components/layout/AppShell";
import { DemoRoleProvider } from "@/components/rbac/DemoRoleProvider";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoRoleProvider>
      <AppShell>{children}</AppShell>
    </DemoRoleProvider>
  );
}
