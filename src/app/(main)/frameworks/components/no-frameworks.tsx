import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ram2 } from "iconsax-react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
// import AddFrameworkModal from "./modals/add-framework-modal";

const NoFrameworks = () => {
  return (
    <>
      <div className="space-y-1 border-b pb-6">
        <h1 className="font-medium text-xl">Available Frameworks</h1>
        <p className="text-sm text-gray-500">
          Import regulatory content from one of the following frameworks. Once
          framework content is imported, you can map policies, risks and
          controls to them.
        </p>
      </div>
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
        <Link
          href={"/frameworks/new"}
          className={cn([buttonVariants(), "h-auto gap-1.5 py-2.5 px-5"])}
        >
          <PlusIcon className="text-xl" />
          <span className="font-medium">Add framework</span>
        </Link>
        {/* <AddFrameworkModal title="Framework" /> */}
      </div>
    </>
  );
};

export default NoFrameworks;
