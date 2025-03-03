import NoFrameworks from "./components/no-frameworks";

import FrameworksGrid from "./components/frameworks-grid";

const FrameworksPage = () => {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6">
        <h1 className="font-medium text-xl">Available Frameworks</h1>
        <p className="text-sm text-gray-500">
          Import regulatory content from one of the following frameworks. Once
          framework content is imported, you can map policies, risks and
          controls to them.
        </p>
      </div>
      <NoFrameworks />
      <FrameworksGrid />
    </div>
  );
};

export default FrameworksPage;
