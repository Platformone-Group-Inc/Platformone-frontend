// import Link from "next/link";
// import FrameworksGrid from "../components/frameworks-grid";
// import { PlusIcon } from "lucide-react";
import MyFrameworksList from "../components/my-frameworks-list";
import AvailableFrameworksList from "../components/available-frameworks-list";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useAuthContext } from "@/context/auth-provider";
const NewFrameworkPage = () => {
  //   const { user,isLoading: authLoading } = useAuthContext();
  // console.log(user, "server")
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
  
      <MyFrameworksList />
      <AvailableFrameworksList />
    </div>
  );
};

export default NewFrameworkPage;
