import OrganizationDetailsForm from "./organization-details-form";

const Organization = () => {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-base font-semibold">Organization Details</h2>
        <p className="text-sm text-gray-600">
          Provide your organization&apos;s name and address that will appear on
          various reports requiring this information.
        </p>
        <OrganizationDetailsForm />
      </div>
    </>
  );
};

export default Organization;
