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
      <div className="flex min-h-[100dvh] flex-col">
        {/* Desktop: demo banner stays above the shell column */}
        <div className="hidden shrink-0 lg:block">
          <DemoBanner />
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="hidden lg:block lg:sticky lg:top-0 lg:h-[calc(100dvh-2.5rem)] lg:min-h-0">
            <Sidebar />
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            {/*
              Mobile: single scroll column — demo banner, top bar and page content scroll together.
              Desktop: sticky top bar + scrolling main only.
            */}
            <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto lg:overflow-hidden">
              <div className="shrink-0 lg:hidden">
                <DemoBanner />
              </div>
              <TopBar />
              <main
                id="main-content"
                className="flex-1 bg-slate-50 p-3 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:p-4 md:p-6 lg:min-h-0 lg:overflow-y-auto lg:pb-6"
              >
                {children}
              </main>
            </div>
          </div>
        </div>
        <MobileDrawer />
        <MobileBottomNav />
      </div>
    </MobileShellProvider>
  );
}
