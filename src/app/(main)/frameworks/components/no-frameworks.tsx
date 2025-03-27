import { Ram2 } from "iconsax-react";
import AddFrameworkModal from "./modals/add-framework-modal";

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
      <AddFrameworkModal title="Framework" />
    </div>
  );
};

export default NoFrameworks;
