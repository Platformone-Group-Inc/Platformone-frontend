"use client";

import { useSideBarStore } from "@/store/useSidebarStore";
import { SideBarGroup, SideBarItem as ItemType } from "./sidebar-data";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface SidebarItemProps {
  item: ItemType;
}

const SidebarSubItems = ({ item }: { item: SideBarGroup }) => {
  const pathname = usePathname();

  const { isExpanded } = useSideBarStore();
  const [itemExpanded, setItemExpanded] = useState(false);

  const content = (
    <motion.button
      onClick={() => setItemExpanded((s) => !s)}
      className={cn(
        "w-full flex items-center text-sm justify-between rounded-full text-left stroke-white",
        "transition-all hover:bg-white/20 ",
        isExpanded ? " px-4 py-3" : "size-12 justify-center",

        item.subItems.map((i) => i.href).includes(pathname as string) &&
          // isExpanded &&
          "bg-white hover:bg-white/80 text-primary-600 stroke-primary-600 "
      )}
    >
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <span className={"relative"}>
            <item.icon className="h-5 w-5 " />
            {/* <ChevronRight
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-0 text-white",
              item.subItems.map((i) => i.href).includes(pathname as string)
                ? "hidden"
                : "translate-x-6"
            )}
          /> */}
          </span>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </TooltipTrigger>
      <TooltipContent hidden={isExpanded} sideOffset={25} side="right">
        {item.label}
      </TooltipContent>

      {isExpanded && (
        <motion.span
          initial={{ opacity: 0, rotate: -90 }}
          animate={{
            opacity: 1,
            rotate: itemExpanded ? 0 : -90,
          }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      )}
    </motion.button>
  );

  return (
    <motion.div className="space-y-3">
      {isExpanded ? (
        content
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{content}</DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            className="w-48 rounded-xl translate-x-1 bg-white/60 backdrop-blur border-border/70 shadow-xl"
          >
            {item.subItems.map((sub) => (
              <DropdownMenuItem asChild key={sub.href}>
                <Link
                  href={sub.href as string}
                  className={cn(
                    "flex items-center gap-2 text-sm rounded-xl stroke-black",

                    pathname === sub.href &&
                      "bg-primary focus:bg-primary/90 text-white stroke-white"
                  )}
                >
                  <sub.icon className="size-4" />
                  {sub.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AnimatePresence>
        {itemExpanded && isExpanded && (
          <motion.div
            className="ml-7 mt-1 space-y-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            {item.subItems.map((i) => (
              <Link
                key={i.href}
                href={i.href as string}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm stroke-white",
                  "hover:bg-white/20 transition ",
                  pathname === i.href && "bg-white/30"
                )}
              >
                <i.icon className="h-4 w-4" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                    >
                      {i.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const { isExpanded } = useSideBarStore();
  const pathname = usePathname();

  const isActive =
    (item.href === "/" && pathname === "/") ||
    (item.href !== "/" &&
      (pathname === item.href || pathname.startsWith(item.href + "/")));

  return item.subItems ? (
    <SidebarSubItems item={item} />
  ) : (
    <motion.div>
      <TooltipTrigger asChild>
        <Link
          href={item.href as string}
          className={cn(
            "flex items-center text-sm gap-2 rounded-full font-medium stroke-white transition hover:bg-white/20",
            isExpanded ? "px-4 py-3" : "size-12 justify-center",
            isActive &&
              "bg-white text-primary-600 stroke-primary-600 hover:bg-white/80"
          )}
        >
          <item.icon className="size-5" />
          <AnimatePresence>
            {useSideBarStore.getState().isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </TooltipTrigger>
      <TooltipContent hidden={isExpanded} sideOffset={25} side="right">
        {item.label}
      </TooltipContent>
    </motion.div>
  );
};

export default SidebarItem;
