"use client";

import { motion, MotionConfig } from "framer-motion";
import { useSideBarStore } from "@/store/useSidebarStore";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_DATA } from "./sidebar-data";
import SidebarItem from "./sidebar-item";
import { ScrollArea } from "../ui/scroll-area";
import { BRAND_NAME } from "@/lib/constants";
import BrandLogo from "../icons/brand-logo";

// Variants for container and children
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const AppSidebar = () => {
  const { isExpanded, toggle } = useSideBarStore();

  return (
    <MotionConfig
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 250,
        mass: 0.8,
      }}
    >
      <motion.aside
        layout
        className="relative h-dvh border-r rounded-r-2xl text-white p-4 shrink-0"
        initial={{ x: -100 }}
        animate={{
          x: 0,
          width: isExpanded ? 300 : 80,
        }}
        style={{
          // backgroundImage: "url(/images/sidebar.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // background: "#581FB5",
          background:
            "linear-gradient(180deg,rgba(88, 31, 181, 1) 0%, rgba(127, 76, 173, 1) 86%, rgba(89, 46, 180, 1) 100%)",
        }}
      >
        {/* brand */}
        <div
          className={cn(
            "flex items-center gap-2 mb-5",

            isExpanded ? "justify-normal" : "justify-center"
          )}
        >
          <BrandLogo className="size-10 fill-white" />
          {isExpanded && (
            <motion.span
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2,
              }}
              className="font-bold text-xl"
            >
              {BRAND_NAME}
            </motion.span>
          )}
        </div>

        {/* Toggle button */}
        <motion.button
          onClick={toggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute right-[-16px] top-5 z-50 p-2 rounded-full bg-white text-black shadow",
            "hover:bg-muted/70 transition-all"
          )}
        >
          <ChevronLeftIcon
            className={cn(
              "h-4 w-4 transition-transform",
              !isExpanded && "rotate-180"
            )}
          />
        </motion.button>

        {/* Sidebar items with stagger */}
        <ScrollArea className="-mr-3">
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2 max-h-[calc(100vh-5rem)]"
          >
            {SIDEBAR_DATA.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SidebarItem item={item} />
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </motion.aside>
    </MotionConfig>
  );
};

export default AppSidebar;
