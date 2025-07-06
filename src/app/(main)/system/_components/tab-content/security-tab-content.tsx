import SecurityDetailsForm from "../forms/security-details-form";

const SecurityTabContent = () => {
  return (
    <div className="space-y-2 ">
      <h2 className="text-base font-semibold">Security Details</h2>
      <p className="text-sm text-gray-600">
        Provide your security&apos;s name and address that will appear on
        various reports requiring this information.
      </p>
      <SecurityDetailsForm />
    </div>
  );
};

export default SecurityTabContent;
