"use client";

import { Collapsible } from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";

import BrandLogo from "../icons/brand-logo";
import { BRAND_NAME } from "@/lib/constants";
import { sidebarData } from "../dashboard/constants/sidebar-data";

import NavItem from "./nav-item";
import Link from "next/link";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <div
      className="rounded-xl"
      style={{
        backgroundImage: "url('/images/water.jpeg')",
        backgroundSize: "2000px 1290px",
        backgroundPosition: "-250px -450px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar
        className="bg-primary-500/50 backdrop-blur rounded-r-xl overflow-hidden"
        {...props}
      >
        <div className="absolute inset-0 bg-black/30 z-[-1]" />
        {/* <div className="bg-black/10 z-[-1] h-full w-full" /> */}
        {/* Sidebar Header */}
        <Link href={"/"}>
          <SidebarHeader className="p-0 h-20 w-full flex-row gap-2 items-center justify-center">
            <BrandLogo className="size-8" />
            <span className="font-semibold text-xl text-white">
              {BRAND_NAME}
            </span>
          </SidebarHeader>
        </Link>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-white">
              Main Menu
            </SidebarGroupLabel>
            <SidebarMenu>
              {/* TODO arrow direction */}
              {sidebarData.map((item) => (
                <Collapsible
                  key={item.label}
                  asChild
                  className="group/collapsible"
                >
                  <NavItem menu={item} />
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
