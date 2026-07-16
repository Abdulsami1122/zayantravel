"use client";

import Link from "next/link";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavItem, NavMain } from "@/components/shadcn-space/blocks/sidebar-06/nav-main";
import { CircleUserRound, ExternalLink, Mail, Settings } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export const navData: NavItem[] = [
  // Admin Section
  { label: "Admin Panel", isSection: true },
  { title: "Users", icon: CircleUserRound, href: "/admin/users" },
  { title: "Contact Submissions", icon: Mail, href: "/admin/contacts" },
  { title: "Settings", icon: Settings, href: "/admin/settings" },

  // External Links
  { label: "Website", isSection: true },
  { title: "Switch to Website", icon: ExternalLink, href: "/" },
];

export function AppSidebar() {
  const { settings } = useSettings();
  const displayLogo = settings?.logoUrl || "/zayan_logo_new.png";

  return (
    <Sidebar 
      variant="floating" 
      className="border-r-0 h-[calc(100svh-2rem)] m-4 [&_[data-slot=sidebar-inner]]:bg-slate-100 [&_[data-slot=sidebar-inner]]:border [&_[data-slot=sidebar-inner]]:border-slate-200 [&_[data-slot=sidebar-inner]]:shadow-xl [&_[data-slot=sidebar-inner]]:shadow-slate-300/50 [&_[data-slot=sidebar-inner]]:rounded-3xl"
    >
      <div className="flex flex-col gap-2 overflow-hidden h-full">
        {/* ---------------- Brand Logo ---------------- */}
        <div className="px-6 pt-8 pb-6 mb-4 border-b border-slate-200 mx-2">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative overflow-hidden rounded-xl bg-slate-200/50 p-1 transition-transform duration-300 group-hover:scale-105 group-hover:bg-slate-200 ring-1 ring-slate-300 flex-shrink-0">
              <img
                src={displayLogo}
                alt="Zayan Travel"
                className="h-10 w-auto rounded-lg object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[14px] font-bold text-slate-900 tracking-wider group-hover:text-emerald-600 transition-colors duration-300 whitespace-nowrap">
                ZAYAN TRAVEL
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-bold mt-0.5 whitespace-nowrap">
                CONSULTANTS
              </span>
            </div>
          </Link>
        </div>

        {/* ---------------- Content ---------------- */}
        <SidebarContent className="overflow-hidden flex-1">
          <ScrollArea className="h-full">
            <div className="px-4 pb-8">
              <NavMain items={navData} />
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
