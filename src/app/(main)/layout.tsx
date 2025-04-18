"use client";

import AiAgent from "@/components/ai-agent";

import { AnimatePresence } from "motion/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

import Header from "@/components/dashboard/header";
import { useAiChat } from "@/store/useAiChatStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadixSidebarDemo } from "@/components/app-sidebar/sidebar-demo";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const { isOpen } = useAiChat();

  return (
    <>
<div className="rounded-lg bg-primary-100 h-full flex-1 mx-auto ">
          <Header />
          <div className="bg-primary-100 w-full min-h-[calc(100vh-5.5rem)] p-4 flex items-stretch gap-4 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              <div
                key={"tab"}
                className="rounded-xl flex-grow bg-white shadow-md w-full h-full transition-all"
              >
                <ScrollArea className="w-full overflow-y-scroll max-h-[calc(100vh-120px)]">
                  {children}
                </ScrollArea>
              </div>
              {isOpen && <AiAgent key={"ai-agent"} />}
            </AnimatePresence>
          </div>
        </div>

    </>
  );
};

export default DashboardLayout;
