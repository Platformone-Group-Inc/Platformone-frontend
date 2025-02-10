import Filters from "./components/filters";
import MyWorkTab from "./components/my-work-tab";
import TabView from "./components/tab-views";

const MyWorkPage = () => {
  return (
    <div className="p-6 space-y-3 bg-white rounded-xl w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-xl">My Work</h1>
        <div className="flex items-center gap-6">
          <Filters />
          <TabView />
        </div>
      </div>
      <MyWorkTab />
    </div>
  );
};

export default MyWorkPage;
