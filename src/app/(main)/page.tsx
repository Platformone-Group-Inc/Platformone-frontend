import DashboardTab from "@/components/dashboard/dashboard-tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="rounded-xl bg-white min-h-svh">
        <DashboardTab />
      </div>
    </div>
  );
};

export default Dashboard;
