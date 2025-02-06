import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Header from "@/components/dashboard/header";
import { AppSidebar } from "@/components/app-sidebar";

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
        <SidebarTrigger className="absolute translate-y-6 -translate-x-4 bg-white z-10 border p-4 rounded-full" />

        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
