"use client";

import { useAiChat } from "@/store/useAiChatStore";
import AiIcon from "../icons/ai-icon";
import HeaderSearch from "./header-search";
import NotificationPopover from "./notification-popover";
import UserDropdownMenu from "./user-dropdown-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

const Header = () => {
  const { toggleChat } = useAiChat();

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-dark-900 backdrop-blur flex items-center justify-between w-full border-b py-4 px-10">
      <HeaderSearch />
      <div className="flex items-center gap-4">
        <button
          onClick={toggleChat}
          className={cn(
            "bg-primary/10 rounded-2xl p-2.5 hover:bg-primary/20 border border-transparent hover:border-black/10 transition-all"

            // isOpen ? "bg-primary" : ""
          )}
        >
          <AiIcon />
        </button>
        <ThemeToggle />
        <NotificationPopover />
        <UserDropdownMenu />
      </div>
    </div>
  );
};

export default Header;
