import { DemoBanner } from "@/components/layout/DemoBanner";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { DemoRoleProvider } from "@/components/rbac/DemoRoleProvider";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoRoleProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-indigo-700 focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="flex min-h-screen flex-col">
        <DemoBanner />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <TopBar />
            <main id="main-content" className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </DemoRoleProvider>
  );
}
