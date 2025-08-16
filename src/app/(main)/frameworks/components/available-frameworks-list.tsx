"use client";

import FrameworksGrid from "./frameworks-grid";

const AvailableFrameworksList = ({ availableFrameworks }: any) => {
  return (
    <div className="@container">
      <div className="space-y-1 border-b pb-6">
        <h1 className="font-medium text-xl">Available Frameworks</h1>
        <p className="text-sm text-gray-500">
          Import regulatory content from one of the following frameworks. Once
          framework content is imported, you can map policies, risks and
          controls to them.
        </p>
      </div>
      <FrameworksGrid availableFrameworks={availableFrameworks} />
    </div>
  );
};

export default AvailableFrameworksList;
