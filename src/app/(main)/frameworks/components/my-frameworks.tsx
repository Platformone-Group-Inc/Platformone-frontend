"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InfoIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import FrameworksCard from "./frameworks-card";
import { useQuery } from "@tanstack/react-query";
import { getFrameworksByOrganizationQueryFn } from "@/services/operations/Framework";
import { useAuthContext } from "@/context/auth-provider";
import NoFrameworks from "./no-frameworks";
const MyFrameworks = () => {
  const { user, isLoading: authLoading } = useAuthContext();

  const {
    data: myFrameworks,
    isLoading: myFrameworksLoading,
    error: myFrameworksError,
  } = useQuery({
    queryKey: ["frameworks", user?.organization],
    queryFn: () => getFrameworksByOrganizationQueryFn(user?.organization),
    enabled: !!user?.organization,
  });

  if (myFrameworksLoading) {
    return <p> Loading Frameworks</p>;
  }
  return (
    <>
      {myFrameworks?.frameworks?.length > 0 && (
        <div className="space-y-6 @container">
          <div className="border-b pb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="font-semibold inline-flex items-center gap-2 text-xl">
                My Frameworks
                <InfoIcon className="" size={16} />
                <Badge className="rounded-md" variant={"secondary"}>
                  {myFrameworks?.frameworks?.length} Framework
                </Badge>
              </h1>

              <p className="text-sm text-secondary-400">
                Keep track of vendor and their security ratings.
              </p>
            </div>
            <Link href={"/frameworks/new"} className={cn(buttonVariants())}>
              <PlusIcon size={20} />
              Add Framework
            </Link>
          </div>
          <div className="grid gap-4 grid-cols-1 @[550px]:grid-cols-2 @[800px]:grid-cols-3 @[1200px]:grid-cols-4">
            {myFrameworks?.frameworks?.map((framework: any) => (
              <FrameworksCard key={framework?._id} framework={framework} />
            ))}
          </div>
        </div>
      )}
      {myFrameworks?.frameworks?.length === 0 ||
        (myFrameworksError && <NoFrameworks />)}
    </>
  );
};

export default MyFrameworks;
