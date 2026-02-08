"use client";

import { Home, Users, Briefcase, Video, FilePlus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import Logo from "./Logo";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/admin",
      icon: Home,
      isActive: true,
    },
    {
      title: "Internships",
      url: "/admin/internships",
      icon: Briefcase,
    },
    {
      title: "Memberships",
      url: "/admin/memberships",
      icon: Users,
    },
    {
      title: "Webinars",
      url: "/admin/webinars",
      icon: Video,
    },
    {
      title: "Registrations",
      url: "#",
      icon: FilePlus,
      items: [
        {
          title: "Internships",
          url: "/admin/registrations/internships",
        },
        {
          title: "Webinar",
          url: "/admin/registrations/webinars",
        },
        {
          title: "Memberships",
          url: "/admin/registrations/memberships",
        },
      ],
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
