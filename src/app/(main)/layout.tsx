"use client";

import AiAgent from "@/components/ai-agent";

import { AnimatePresence } from "motion/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

import Header from "@/components/dashboard/header";
import { useAiChat } from "@/store/useAiChatStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const { isOpen } = useAiChat();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px",
          // Other styles...
        } as React.CSSProperties
      }
      className="w-full"
    >
      <div className="relative w-full h-screen flex items-stretch">
        <div className="relative">
          <AppSidebar />
          <SidebarTrigger className="absolute top-0 right-0 translate-y-6 translate-x-4 z-50 bg-white border rounded-full" />
        </div>

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
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
