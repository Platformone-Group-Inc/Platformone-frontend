import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Filter } from "iconsax-react";

import DemoDataTable from "../../controls/control-old/demo-data-table";
import SelectProcedureTemplateModal from "./components/modal/select-procedure-template-modal";
import NewProcedureModal from "./components/modal/new-procedure-modal";

const Procedures = () => {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6 flex items-center justify-between ">
        <h1 className="font-semibold text-xl">
          Procedures
          <Badge className="ml-3.5">Showing 1 Document</Badge>
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            className="h-auto px-3.5 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
          >
            <Filter className="size-5 stroke-secondary-400" />
            <span className="font-semibold text-sm text-secondary-400">
              Filter
            </span>
          </Button>
        </div>
      </div>
      <div className="min-h-dvh flex items-start gap-6 w-full mt-8">
        {/* <ControlsDataTable /> */}
        <DemoDataTable />
      </div>

      <SelectProcedureTemplateModal />
      <NewProcedureModal />
      {/* <NoFrameworks /> */}
      {/* <FrameworksGrid /> */}
    </div>
  );
};

export default Procedures;
