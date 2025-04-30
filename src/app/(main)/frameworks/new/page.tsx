// import Link from "next/link";
// import FrameworksGrid from "../components/frameworks-grid";
// import { PlusIcon } from "lucide-react";
import MyFrameworksList from "../components/my-frameworks-list";
import AvailableFrameworksList from "../components/available-frameworks-list";
// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

const NewFrameworkPage = () => {
  return (
    // <div className="p-6 w-full">
    //   <div className="space-y-1 border-b pb-6">
    //     <h1 className="font-medium text-xl">Available Frameworks</h1>
    //     <p className="text-sm text-gray-500">
    //       Import regulatory content from one of the following frameworks. Once
    //       framework content is imported, you can map policies, risks and
    //       controls to them.
    //     </p>
    //   </div>
    //   <FrameworksGrid />
    // </div>
    <div className="space-y-6 p-6 w-full">
      <div className="flex items-center justify-between border-b my-6 pb-6">
        <div className="space-y-1">
          <h1 className="font-medium text-xl">Frameworks already setup</h1>
          <p className="text-sm text-gray-500">
            Content for these frameworks has already been imported and setup.
          </p>
        </div>
        {/* <Link href={"/frameworks/new"} className={cn(buttonVariants())}>
          <PlusIcon size={20} />
          Add Framework
        </Link> */}
      </div>
      <MyFrameworksList />
      <AvailableFrameworksList />
    </div>
  );
};

export default NewFrameworkPage;
