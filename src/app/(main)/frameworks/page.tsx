import { Button } from "@/components/ui/button";
import { Ram2 } from "iconsax-react";
import { PlusIcon } from "lucide-react";

const FrameworksPage = () => {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 border-b pb-6">
        <h1 className="font-medium text-xl">Available Frameworks</h1>
        <p className="text-sm text-gray-500">
          Import regulatory content from one of the following frameworks. Once
          framework content is imported, you can map policies, risks and
          controls to them.
        </p>
      </div>
      <div className="min-h-[500px] h-full w-full flex flex-col text-center items-center justify-center gap-4">
        <span className="p-3 bg-primary/10 rounded-xl">
          <Ram2 className="size-6 stroke-primary" />
        </span>
        <div className="space-y-1">
          <h2 className="font-bold text-lg">No Framework Added</h2>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Quam <br /> faucibus iaculis
            dictum diam.
          </p>
        </div>
        <Button className="h-auto gap-1.5 py-2.5 px-5">
          <PlusIcon className="text-xl" />
          <span className="font-medium">Add Framework</span>
        </Button>
      </div>
    </div>
  );
};

export default FrameworksPage;
