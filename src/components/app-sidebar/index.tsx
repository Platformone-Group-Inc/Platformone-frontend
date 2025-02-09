import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import BrandLogo from "../icons/brand-logo";
import { BRAND_NAME } from "@/lib/constants";
import { sidebarData, SidebarItem } from "../dashboard/constants/sidebar-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      {/* Sidebar Header */}
      <SidebarHeader className="p-0 h-20 w-full flex-row gap-2 items-center justify-center">
        <BrandLogo className="size-8" />
        <span className="font-semibold text-xl text-black">{BRAND_NAME}</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarData.map((item) => renderSidebarItem(item))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

// Helper function to render a sidebar item
const renderSidebarItem = (item: SidebarItem) => {
  const hasSubItems = item.group && item.group.length > 0;

  const path = "/dashboard";

  return (
    <Collapsible
      key={item.label}
      asChild
      defaultOpen
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.label}
            // TODO: Add active state for the current route and hover
            className={cn(
              "rounded-full h-auto py-3 px-4 flex items-center gap-2 text-sm font-medium text-gray-600  group-focus:text-gray-800 hover:bg-primary/20 hover:text-primary hover:fill-primary",
              path === item.href
                ? // TODO: change this
                  "bg-primary/20 text-[#5E43D8] fill-primary"
                : ""
            )}
          >
            {<item.icon color={path === item.href ? "#5E43D8" : "#90A3BF"} />}
            <span>{item.label}</span>
            {hasSubItems && (
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {hasSubItems && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item?.group?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.label}>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href={subItem.href as string}
                      className="flex items-center gap-2 text-sm px-2 py-1"
                    >
                      {<subItem.icon color={"#90A3BF"} />}
                      <span>{subItem.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};
