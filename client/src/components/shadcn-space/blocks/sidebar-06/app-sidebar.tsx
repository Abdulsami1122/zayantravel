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
    <Sidebar variant="floating" className="p-4 h-full [&_[data-slot=sidebar-inner]]:h-full">
      <div className="flex flex-col gap-6 overflow-hidden">
        {/* ---------------- Brand Logo ---------------- */}
        <div className="px-4 pt-4 pb-0">
          <Link href="/" className="flex items-center gap-3">
            <img
              src={displayLogo}
              alt="Zayan Travel"
              className="h-10 w-auto rounded-lg object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-slate-900 tracking-[0.1em]">
                ZAYAN TRAVEL
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                CONSULTANTS
              </span>
            </div>
          </Link>
        </div>

        {/* ---------------- Content ---------------- */}
        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-4 pt-4">
              <NavMain items={navData} />
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
