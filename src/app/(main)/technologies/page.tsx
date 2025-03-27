import { InfoCircle } from "iconsax-react";
import TechnologiesTab from "./components/tenologies-tab";

const TechnologiesPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="font-semibold text-lg inline-flex items-center gap-2">
        Technologies
        <InfoCircle className="size-4 stroke-secondary" />
      </h1>
      <TechnologiesTab />
    </div>
  );
};

export default TechnologiesPage;
