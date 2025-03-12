"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarItem } from "../dashboard/constants/sidebar-data";
import { cn } from "@/lib/utils";

interface Props {
  menu: SidebarItem;
}

const NavItem: React.FC<Props> = ({ menu }) => {
  const path = usePathname();
  const hasSubItems = menu.group && menu.group.length > 0;
  const isActive =
    path === menu.href ||
    (hasSubItems && menu.group?.some((subItem) => path === subItem.href));

  return (
    <SidebarMenuItem>
      {hasSubItems ? (
        <>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={menu.label}
              className={cn(
                "rounded-full h-auto py-3 px-4 flex items-center gap-2 text-sm font-medium text-white transition-all group-focus:text-gray-800 stroke-white hover:bg-white/20 hover:text-white hover:stroke-white",
                isActive && "bg-white/20 text-white"
              )}
            >
              <menu.icon size={20} />
              <span>{menu.label}</span>
              <ChevronRight
                className={cn("ml-auto transition-transform duration-200")}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub className="space-y-2 py-2 border-white/30">
              {menu?.group?.map((subItem) => {
                const isSubActive = path === subItem.href;
                return (
                  <SidebarMenuSubItem key={subItem.label}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={subItem.href as string}
                        className={cn(
                          "flex items-center gap-2 text-sm px-2 py-1 transition-all text-primary-200 stroke-primary-200 hover:bg-white/20",
                          isSubActive && "text-white stroke-white "
                          //   ? "!text-white"
                          //   : "text-white hover:text-white"
                        )}
                      >
                        {subItem.icon && <subItem.icon size={18} />}
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </>
      ) : (
        <Link href={(menu.href as string) || ""} passHref>
          <SidebarMenuButton
            tooltip={menu.label}
            className={cn(
              "rounded-full h-auto py-3 px-4 flex items-center gap-2 text-sm font-medium text-primary-100 transition-all group-focus:text-gray-800 hover:bg-white/20 hover:text-white stroke-white",
              isActive &&
                "bg-white hover:bg-white stroke-primary text-primary hover:text-primary"
            )}
          >
            <menu.icon size={20} />
            <span>{menu.label}</span>
          </SidebarMenuButton>
        </Link>
      )}
    </SidebarMenuItem>
  );
};

export default NavItem;
