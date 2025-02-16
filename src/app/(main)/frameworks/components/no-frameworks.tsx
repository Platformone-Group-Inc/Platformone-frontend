import { Button } from "@/components/ui/button";
import { Ram2 } from "iconsax-react";
import { PlusIcon } from "lucide-react";

const NoFrameworks = () => {
  return (
    <div className="min-h-[500px] h-full w-full flex flex-col text-center items-center justify-center gap-4">
      {/* TODO: add mask */}
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
  );
};

export default NoFrameworks;
