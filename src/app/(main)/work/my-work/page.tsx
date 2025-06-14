import MyWorkDataTable from "./_components/tables/my-work-data-table";

import TabView from "./components/tab-views";

// export const tabData = [
//   {
//     label: "Documents",
//     value: "documents",
//   },
//   {
//     label: "Controls",
//     value: "controls",
//   },
//   {
//     label: "Evidence",
//     value: "evidence",
//   },
//   {
//     label: "Action Items",
//     value: "actions",
//   },
// ];

const MyWorkPage = () => {
  return (
    <div>
      <div className="p-6 sticky top-0 z-10 backdrop-blur bg-white/50 space-y-3 w-full border-b">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-xl">My Work</h1>
          <div className="flex items-center gap-6">
            {/* <Filters /> */}
            <TabView />
          </div>
        </div>
      </div>
      <MyWorkDataTable />
    </div>
  );
};

export default MyWorkPage;
