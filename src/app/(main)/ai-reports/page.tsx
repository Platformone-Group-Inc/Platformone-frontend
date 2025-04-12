// import { Badge } from "@/components/ui/badge";
import { InfoCircle } from "iconsax-react";
import AiReportsTab from "./components/ai-reports-tab";

const AiReports = () => {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 pb-6 flex items-center justify-between ">
        <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
          AI Reports
          {/* <Badge className="ml-3.5">2 Control Set</Badge> */}
          <InfoCircle className="stroke-secondary size-4" />
        </h1>
      </div>
      <AiReportsTab />
      {/* <NoFrameworks /> */}
      {/* <FrameworksGrid /> */}
    </div>
  );
};

export default AiReports;
