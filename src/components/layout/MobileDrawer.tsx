"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useMobileShell } from "@/components/layout/MobileShellContext";

export function MobileDrawer() {
  const { drawerOpen, closeDrawer } = useMobileShell();

  if (!drawerOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        aria-label="Close menu"
        onClick={closeDrawer}
      />
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col shadow-xl lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-3">
          <p className="text-sm font-semibold text-white">Menu</p>
          <button
            type="button"
            onClick={closeDrawer}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-slate-300 hover:bg-slate-800 hover:text-white"
            aria-label="Close menu"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
        <Sidebar onNavigate={closeDrawer} className="h-full flex-1 border-r-0" />
      </aside>
    </>
  );
}
