import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

import Header from "@/components/dashboard/header";
import AiAgentProvider from "@/components/providers/ai-agent-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
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

        <ScrollArea className="rounded-lg bg-primary-100 flex-1 mx-auto overflow-y-auto">
          <Header />
          <div className="bg-primary-100 w-full p-4 flex items-stretch gap-4">
            <AiAgentProvider>{children}</AiAgentProvider>
          </div>
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
