import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Export, Filter } from "iconsax-react";
import { PlusIcon } from "lucide-react";
import DemoDataTable from "../../controls/control-old/demo-data-table";

const EvidencePage = () => {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6 flex items-center justify-between ">
        <h1 className="font-semibold text-xl">
          Evidence
          <Badge className="ml-3.5" variant={"secondary"}>
            Showing 2 Evidences
          </Badge>
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

          <Button
            variant={"outline"}
            className="h-auto px-3.5 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
          >
            <Export className="size-5 stroke-secondary-400" />
            <span className="font-semibold text-sm text-secondary-400">
              Export
            </span>
          </Button>
          <Button
            variant={"outline"}
            className="h-auto px-3.5 py-2.5 rounded-lg"
          >
            <PlusIcon className="size-5 " />
            <span className="font-semibold text-sm">Add Evidence</span>
          </Button>
        </div>
      </div>

      <DemoDataTable />
    </div>
  );
};

export default EvidencePage;
