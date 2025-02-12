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
                "rounded-full h-auto py-3 px-4 flex items-center gap-2 text-sm font-medium text-gray-600 transition-all group-focus:text-gray-800 hover:bg-primary/20 hover:text-primary hover:fill-primary",
                isActive && "bg-primary/20 text-[#5E43D8] fill-primary"
              )}
            >
              <menu.icon size={20} color={isActive ? "#5E43D8" : "#64748B"} />

              <span>{menu.label}</span>
              <ChevronRight
                className={cn(
                  "ml-auto transition-transform duration-200",
                  isActive && "rotate-90"
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {menu?.group?.map((subItem) => {
                const isSubActive = path === subItem.href;
                return (
                  <SidebarMenuSubItem key={subItem.label}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={subItem.href as string}
                        className={cn(
                          "flex items-center gap-2 text-sm px-2 py-1 transition-all",
                          isSubActive
                            ? "!text-primary"
                            : "text-gray-600 hover:text-primary"
                        )}
                      >
                        {subItem.icon && (
                          <subItem.icon
                            size={18}
                            color={isSubActive ? "#5E43D8" : "#90A3BF"}
                          />
                        )}
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
              "rounded-full h-auto py-3 px-4 flex items-center gap-2 text-sm font-medium text-gray-600 transition-all group-focus:text-gray-800 hover:bg-primary/20 hover:text-primary hover:fill-primary",
              isActive && "bg-primary/20 text-[#5E43D8] fill-primary"
            )}
          >
            <menu.icon size={20} color={isActive ? "#5E43D8" : "#90A3BF"} />

            <span>{menu.label}</span>
          </SidebarMenuButton>
        </Link>
      )}
    </SidebarMenuItem>
  );
};

export default NavItem;
