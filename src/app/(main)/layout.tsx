import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Header from "@/components/dashboard/header";
import { AppSidebar } from "@/components/app-sidebar";
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
    >
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="absolute translate-y-6 -translate-x-4 z-50 bg-white border p-4 rounded-full" />
        <ScrollArea className="h-dvh w-full">
          <Header />
          <div className="p-8 bg-[#EEF2FF] flex gap-4 min-h-svh">
            {children}
          </div>
        </ScrollArea>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
