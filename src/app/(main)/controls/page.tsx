"use client";

// import { PlusIcon } from "lucide-react";

import ControlCard from "./components/control-card";
import { Badge } from "@/components/ui/badge";

// import { DeleteControlModal } from "./components/delete-modal";
// import UpdateControlModal from "./components/update-control-modal";
// import NewActionItemModal from "./components/modals/new-action-item-modal";
import NewControlSetModal from "./components/modals/new-control-set-modal";
import { useAuthContext } from "@/context/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { getFrameworksByOrganizationQueryFn } from "@/services/operations/Framework";

import ControlCardSkeleton from "./components/control-card-sekeleton";
import { InfoIcon } from "lucide-react";

const ControlsPage = () => {
  const { user } = useAuthContext();

  const { data: myFrameworks, isLoading } = useQuery({
    queryKey: ["frameworks", user?.organization],
    queryFn: () => getFrameworksByOrganizationQueryFn(user?.organization),
    enabled: !!user?.organization,
  });

  return (
    <div className="@container">
      <div className="sticky backdrop-blur top-0 z-10 border-b px-6 py-4 flex items-center justify-between ">
        <h1 className="font-semibold text-xl inline-flex items-center gap-2">
          Control Set
          <InfoIcon className="" size={16} />
          {false && <Badge className="ml-3.5">2 Control Set</Badge>}
        </h1>
        <div className="flex items-center gap-4">
          <NewControlSetModal />
        </div>
      </div>
      <div className="grid p-6 gap-4 grid-cols-1 @[550px]:grid-cols-2 @[800px]:grid-cols-3 @[1200px]:grid-cols-4 ">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <ControlCardSkeleton key={i} />
          ))}

        {myFrameworks?.frameworks?.map((framework: any) => (
          <ControlCard key={framework?._id} framework={framework} />
        ))}
      </div>
    </div>
  );
};

export default ControlsPage;
