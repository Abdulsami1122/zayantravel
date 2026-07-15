"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { isAdminRole } from "@/utils/authRole";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

// Dynamically import AppSidebar to prevent SSR
const AppSidebar = dynamic(
  () => import("@/components/shadcn-space/blocks/sidebar-06/app-sidebar").then(mod => ({ default: mod.AppSidebar })),
  { 
    ssr: false,
    loading: () => <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  }
);

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run redirects after component is mounted
    if (!mounted) return;

    // Check if user is logged in
    if (!user) {
      router.replace("/login");
      return;
    }

    // Redirect if not admin
    if (!isAdminRole(user.role)) {
      router.replace("/");
      return;
    }
  }, [user, router, mounted]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Show loading state while checking authentication or not mounted
  if (!mounted || !user || !isAdminRole(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <SidebarProvider className="p-3 sm:p-5 bg-slate-50 min-h-screen" style={{ "--sidebar-width": "280px" } as React.CSSProperties}>
      <AppSidebar />
      <div className="flex flex-1 flex-col gap-5 min-w-0 overflow-hidden sm:pl-3">
        {/* Modern Admin Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 rounded-2xl bg-white px-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-slate-200 w-full">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="cursor-pointer hover:bg-slate-100 p-2 rounded-lg transition-colors" />
            <div className="h-5 w-[1px] bg-slate-200 mx-1" />
            <h1 className="text-[15px] font-bold text-slate-800 tracking-wide truncate">ADMIN PANEL</h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <span className="text-sm font-medium text-slate-500 hidden sm:inline-block truncate max-w-[200px]">
              Welcome, <strong className="text-slate-800">{user.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-slate-200 hover:border-red-100 shadow-sm whitespace-nowrap shrink-0"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 rounded-2xl bg-transparent sm:bg-white sm:border sm:border-slate-200 sm:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] p-2 sm:p-6 overflow-x-hidden overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
