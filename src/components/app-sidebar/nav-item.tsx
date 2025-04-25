"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { SidebarItem } from "../dashboard/constants/sidebar-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  menu: SidebarItem;
  isCollapsed?: boolean;
  close?: () => void;
}

const NavItem: React.FC<Props> = ({ menu, isCollapsed, close = () => {} }) => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const hasSubItems = menu.group && menu.group.length > 0;
  const isActive =
    path === menu.href ||
    (hasSubItems && menu.group?.some((subItem) => path === subItem.href));

  useEffect(() => {
    if (!isCollapsed) {
      setOpen(false);
    }
  }, [isCollapsed]);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="relative">
      {isActive && (
        <motion.div
          layoutId="active-menu"
          className={cn(
            "absolute top-0 left-0 rounded-3xl pointer-events-none  p-4",
            isCollapsed ? "h-full w-full" : "h-full w-auto aspect-square",
            hasSubItems ? "bg-white/10" : "bg-white"
          )}
        />
      )}
      {hasSubItems ? (
        <>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "rounded-full h-auto flex items-center gap-2 text-sm font-medium text-white transition-all group-focus:text-gray-800 stroke-white  w-full",
                "hover:bg-white/20 hover:text-white hover:stroke-white",
                isCollapsed ? " py-3 px-4  " : " p-3 aspect-square "
              )}
              onClick={() => {
                close();
                setOpen((s) => !s);
              }}
            >
              <menu.icon size={20} />
              {isCollapsed && (
                <>
                  <span>{menu.label}</span>
                  <ChevronRight
                    size={15}
                    className={cn("ml-auto  transition-transform duration-200")}
                  />
                </>
              )}
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent className="ml-10">
            <div className="space-y-2 py-2 border-white/30">
              {menu?.group?.map((subItem) => {
                const isSubActive = path === subItem.href;
                return (
                  <div key={subItem.label}>
                    <Link
                      href={subItem.href as string}
                      className={cn(
                        "flex items-center gap-2 text-sm px-2 py-1 transition-all text-primary-200 stroke-primary-200 hover:bg-white/20 rounded-l-md",
                        isSubActive && "text-white stroke-white bg-white/10 "
                        //   ? "!text-white"
                        //   : "text-white hover:text-white"
                      )}
                    >
                      {subItem.icon && <subItem.icon size={18} />}
                      <span>{subItem.label}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </>
      ) : (
        <Link href={(menu.href as string) || ""} className="relative">
          <button
            className={cn(
              "rounded-full h-auto flex items-center gap-2 text-sm font-medium text-primary-100 transition-all group-focus:text-gray-800 hover:bg-white/20 hover:text-white stroke-white w-full",
              isActive &&
                "text-primary stroke-primary hover:text-primary hover:stroke-primary",
              isCollapsed ? " py-3 px-4  " : " p-3 aspect-square "
            )}
          >
            <menu.icon size={20} />
            {isCollapsed && <span>{menu.label}</span>}
          </button>
        </Link>
      )}
    </Collapsible>
  );
};

export default NavItem;
