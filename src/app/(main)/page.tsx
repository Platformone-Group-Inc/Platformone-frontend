// TODO: change page to a server component
"use client";

import AiAgent from "@/components/ai-agent";
import DashboardTab from "@/components/dashboard/dashboard-tabs";
import { motion } from "motion/react";
// import { Metadata } from "next";

import { AnimatePresence } from "motion/react";
import { useAiChat } from "@/store/useAiChatStore";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

const Dashboard = () => {
  const { isOpen } = useAiChat();
  return (
    <div className="p-8 bg-[#EEF2FF] flex gap-4 min-h-svh">
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          key={"tab"}
          className="rounded-xl flex-grow bg-white h-full"
        >
          <DashboardTab />
        </motion.div>
        {isOpen && <AiAgent key={"ai-agent"} />}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
