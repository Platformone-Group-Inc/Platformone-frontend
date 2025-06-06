"use client";

import AiIcon from "../icons/ai-icon";
import HeaderSearch from "./header-search";
import NotificationPopover from "./notification-popover";
import UserDropdownMenu from "./user-dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { useAiChatBoxStore } from "@/store/useAiChatBoxStore";
// import { ThemeToggle } from "../theme-toggle";

const DashboardHeader = () => {
  const { isOpen, toggleChat } = useAiChatBoxStore();

  return (
    <motion.div
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      className="sticky top-0 z-10 bg-white dark:bg-dark-900 backdrop-blur flex items-center justify-between w-full border-b py-4 px-10"
    >
      <HeaderSearch />
      <div className="flex items-center gap-4">
        <button
          onClick={toggleChat}
          className={cn(
            "rounded-2xl p-2.5 hover:bg-primary/20 border border-transparent hover:border-black/10 transition-all",

            isOpen ? "bg-primary/15" : "bg-transparent "
          )}
        >
          <AiIcon />
        </button>
        {/* <ThemeToggle /> */}
        <NotificationPopover />
        <UserDropdownMenu />
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
