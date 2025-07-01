"use client";

import AppSidebar from "@/components/app-sidebar";
import AiChatBox from "@/components/ai-agent";
import DashboardHeader from "@/components/dashboard/header";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useAiChatBoxStore } from "@/store/useAiChatBoxStore";
import { motion, AnimatePresence } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const { isOpen } = useAiChatBoxStore();
  return (
    <div className="w-full h-dvh flex overflow-hidden">
      <AppSidebar />

      <div className="flex flex-col flex-1 h-full">
        <DashboardHeader />

        {/* <ScrollArea className="flex-1"> */}
        <div
          className={cn(
            "flex flex-1 overflow-hidden bg-primary-100 p-4",
            isOpen && "gap-4"
          )}
        >
          <ScrollArea className="flex-1 max-w-[calc (100vw-800px)] overflow-y-auto bg-white border shadow-xl rounded-2xl">
            {children}
          </ScrollArea>

          <motion.div
            animate={{ width: isOpen ? 400 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden h-full"
          >
            <AnimatePresence>{isOpen && <AiChatBox />}</AnimatePresence>
          </motion.div>
        </div>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
};

export default MainLayout;
