"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import Link from "next/link";
import BrandLogo from "../icons/brand-logo";
import { BRAND_NAME } from "@/lib/constants";
import { sidebarData } from "../dashboard/constants/sidebar-data";

import NavItem from "./nav-item";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <motion.div
      className={cn(
        "relative  p-4 rounded-r-xl shadow",
        "bg-gradient-to-b from-[#623ad9] to-[#5b21b6]"
      )}
      style={{
        // backgroundImage: "url(/images/sidebar.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      animate={{
        width: isCollapsed ? "300px" : "auto",
      }}
    >
      <Button
        variant={"outline"}
        radius={"full"}
        size={"icon"}
        onClick={() => setIsCollapsed((s) => !s)}
        className="absolute size-9 top-6 -right-5 z-50"
      >
        <ChevronLeftIcon
          size={15}
          className={cn(isCollapsed ? "rotate-0" : "rotate-180")}
        />
      </Button>

      <Link href={"/"} className="flex text-white my-4 items-center gap-2">
        <BrandLogo />
        {isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
            exit={{ opacity: 0 }}
            className="text-2xl font-bold"
          >
            {BRAND_NAME}
          </motion.span>
        )}
      </Link>
      <div className="space-y-2">
        {isCollapsed && <div className="text-white text-sm">Main Menu</div>}
        <div className="space-y-4">
          {sidebarData.map((item, i) => (
            <NavItem
              key={i}
              menu={item}
              isCollapsed={isCollapsed}
              close={() => setIsCollapsed(true)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export const AppSidebarShell = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex">
      <AppSidebar />
      {children}
    </div>
  );
};
