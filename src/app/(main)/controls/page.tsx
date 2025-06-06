import { Button } from "@/components/ui/button";
import { Filter, Import } from "iconsax-react";
// import { PlusIcon } from "lucide-react";

import ControlCard from "./components/control-card";
import { Badge } from "@/components/ui/badge";

// import { DeleteControlModal } from "./components/delete-modal";
// import UpdateControlModal from "./components/update-control-modal";
// import NewActionItemModal from "./components/modals/new-action-item-modal";
import NewControlSetModal from "./components/modals/new-control-set-modal";
import { ScrollArea } from "@/components/ui/scroll-area";

const ControlsPage = () => {
  return (
    <div className="p-6 w-full">
      {/* <div className="flex gap-4">
        <DeleteControlModal />
        <UpdateControlModal />
        <NewActionItemModal />
      </div> */}
      <div className="space-y-1 border-b pb-6 flex items-center justify-between ">
        <h1 className="font-semibold text-xl">
          Control Set
          <Badge className="ml-3.5">2 Control Set</Badge>
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            className="h-auto px-3.5 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
          >
            <Import className="size-5 stroke-secondary-400" />
            <span className="font-semibold text-sm text-secondary-400">
              Import from Library
            </span>
          </Button>
          <Button
            variant={"outline"}
            className="h-auto px-3.5 py-2.5 border-primary/20 rounded-lg hover:bg-primary/10"
          >
            <Filter className="size-5 stroke-secondary-400" />
            <span className="font-semibold text-sm text-secondary-400">
              Filter
            </span>
          </Button>
          {/* <NewActionItemModal /> */}
          <NewControlSetModal />
        </div>
      </div>
      <ScrollArea className=" grid grid-cols-3 gap-6 w-full mt-8">
        {Array.from({ length: 1 }).map((_, i) => (
          <ControlCard key={i} />
        ))}
      </ScrollArea>

      {/* <NoFrameworks /> */}
      {/* <FrameworksGrid /> */}
    </div>
  );
};

export default ControlsPage;
