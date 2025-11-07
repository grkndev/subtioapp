"use client";

import * as React from "react";
import {
  IconBrandMyOppo,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Eclipse, Plus, UserRound } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Membership",
      url: "/dashboard/my",
      icon: IconBrandMyOppo,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image
                  src="/icons/icon_default.svg"
                  alt="Subtio Logo"
                  className="dark:invert"
                  width={32}
                  height={32}
                />
                <span className="text-base font-semibold">Subtio App</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem className="px-2 mt-4">
          <Link href={"/dashboard/new"}>
            <Button className="w-full p-0 " variant={"default"}>
              <Plus />
              <span>New</span>
            </Button>
          </Link>
        </SidebarMenuItem>

        <NavMain items={data.navMain} />

        <SidebarMenuItem className="mt-auto mx-2">
          <ThemeToggle shownLabel />
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
