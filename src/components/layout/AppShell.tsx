"use client";

import { DemoBanner } from "@/components/layout/DemoBanner";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { MobileShellProvider } from "@/components/layout/MobileShellContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MobileShellProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-indigo-700 focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="flex min-h-screen flex-col">
        <DemoBanner />
        <div className="flex flex-1">
          <div className="hidden lg:block lg:sticky lg:top-0 lg:h-[calc(100dvh-2.5rem)] lg:min-h-0">
            <Sidebar />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main
              id="main-content"
              className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:p-6 lg:pb-6"
            >
              {children}
            </main>
          </div>
        </div>
        <MobileDrawer />
        <MobileBottomNav />
      </div>
    </MobileShellProvider>
  );
}
