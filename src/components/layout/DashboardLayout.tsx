import { DemoBanner } from "@/components/layout/DemoBanner";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { DemoRoleProvider } from "@/components/rbac/DemoRoleProvider";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoRoleProvider>
      <div className="flex min-h-screen flex-col">
        <DemoBanner />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <TopBar />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-6">{children}</main>
          </div>
        </div>
      </div>
    </DemoRoleProvider>
  );
}
