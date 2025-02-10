import Filters from "../my-work/components/filters";
import MyWorkTab from "../my-work/components/my-work-tab";
import TabView from "../my-work/components/tab-views";

const TeamWorkPage = () => {
  return (
    <div className="p-6 space-y-3 bg-white rounded-xl w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-xl">Team Work</h1>
        <div className="flex items-center gap-6">
          <Filters />
          <TabView />
        </div>
      </div>
      <MyWorkTab />
    </div>
  );
};

export default TeamWorkPage;
