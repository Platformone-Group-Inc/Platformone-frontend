import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Header from "@/components/dashboard/header";
import { AppSidebar } from "@/components/app-sidebar";
// TODO kuchh to krna hai pta nhi kya
// import { ScrollArea } from "@/components/ui/scroll-area";
import AiAgentProvider from "@/components/providers/ai-agent-provider";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px",
          // Other styles...
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="absolute translate-y-6 -translate-x-4 z-50 bg-white border p-4 rounded-full" />
        <Header />
        <div className="p-8 bg-[#EEF2FF] flex min-h-svh gap-4">
          <AiAgentProvider>{children}</AiAgentProvider>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
