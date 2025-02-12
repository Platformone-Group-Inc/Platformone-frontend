import DashboardTab from "@/components/dashboard/dashboard-tabs";

const Dashboard = () => {
  return (
    // <AnimatePresence mode="popLayout">
    //   <motion.div
    //     layout
    //     key={"tab"}
    //     className="rounded-xl flex-grow bg-white h-full"
    //   >
    //   </motion.div>
    //   {isOpen && <AiAgent key={"ai-agent"} />}
    // </AnimatePresence>
    <DashboardTab />
  );
};

export default Dashboard;
