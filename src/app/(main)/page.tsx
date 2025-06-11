import DashboardTab from "@/components/dashboard/dashboard-tabs";
// import AddFramework from "./frameworks/components/add-framework";
// import NoFrameworks from "./frameworks/components/no-frameworks";

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
    // <AddFramework />

    // <NoFrameworks />

    <DashboardTab />
  );
};

export default Dashboard;
