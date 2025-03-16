"use client";

import CallToActionButtons from "./components/call-to-action-buttons";
import PolicyAndProceduresBreadcrumb from "./components/policy-and-procedures-breadcrumb";
import PolicyAndProceduresTabs from "./components/PolicyAndProceduresTabs";

const PolicyAndProcedures = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <h1 className="font-semibold text-lg">AC 1: Policy and Procedures</h1>
        <CallToActionButtons />
      </div>

      <PolicyAndProceduresBreadcrumb />
      <PolicyAndProceduresTabs />
    </div>
  );
};

export default PolicyAndProcedures;
