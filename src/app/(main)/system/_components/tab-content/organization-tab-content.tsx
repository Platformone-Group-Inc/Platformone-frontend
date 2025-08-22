import { InfoIcon } from "lucide-react";
import OrganizationDetailsForm from "../../organization/organization-details-form";

const OrganizationTabContent = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-base inline-flex items-center gap-2 font-semibold">
        Organization Details
        <InfoIcon className="" size={16} />
      </h2>
      <p className="text-sm text-gray-600">
        Provide your organization&apos;s name and address that will appear on
        various reports requiring this information.
      </p>
      <OrganizationDetailsForm />
    </div>
  );
};

export default OrganizationTabContent;
