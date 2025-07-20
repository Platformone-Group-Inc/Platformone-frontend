"use client";

import { useEffect } from "react";
import ControlsInfoAction from "./components/controls-info-actions";

import ControlInfoCard from "../components/control-info-card";
import {
  getControlByControlFamiliesQueryFn,
  getControlFamiliesByOrganizationQueryFn,
} from "@/services/operations/Control";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuthContext } from "@/context/auth-provider";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const ControlInfoPage = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cloneFrameworkId = searchParams.get("id");
  const cloneFrameworkName = searchParams.get("name");
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const rowPerPage = parseInt(searchParams.get("perPage") || "10", 10);
  const currentPage = isNaN(pageParam) ? 1 : pageParam;

  useEffect(() => {
    if (!cloneFrameworkId && !authLoading) {
      router.push("/controls");
    }
  }, [cloneFrameworkId, authLoading, router]);
  const {
    data: controlFamiliesByOrg,
    isLoading: controlFamiliesByOrgLoading,
    error: controlFamiliesByOrgError,
  } = useQuery({
    queryKey: ["controlFamilies", user?.organization, cloneFrameworkId],
    queryFn: () => getControlFamiliesByOrganizationQueryFn(cloneFrameworkId),
    enabled: !!cloneFrameworkId,
  });

  const {
    data: getAllcontrol,
    isLoading: getAllcontrolLoading,
    error: getAllcontrolFamiliesError,
  } = useQuery({
    queryKey: ["getAllcontrol", cloneFrameworkId, currentPage, rowPerPage],
    queryFn: () =>
      getControlByControlFamiliesQueryFn(
        null,
        cloneFrameworkId,
        true,
        currentPage,
        rowPerPage
      ),
    enabled: !!cloneFrameworkId,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="@container w-full">
      <div className="flex items-center bg-white justify-between py-4 px-6 sticky top-0 z-10 border-b">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={"/controls"}
              className={cn(
                "p-2 aspect-square hover:bg-primary-100 rounded-full"
              )}
            >
              <ArrowLeftIcon size={16} />
            </Link>
            <h1 className="font-semibold text-lg line-clamp-1">
              {/* FedRAMP Moderate (800-53 Rev. 5) */}
              {cloneFrameworkName}
            </h1>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/controls">All Controls</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{cloneFrameworkName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-3">
          <ControlsInfoAction />
        </div>
      </div>

      <div className="grid gap-4 p-4 grid-cols-1 @[550px]:grid-cols-2 @[800px]:grid-cols-3 @[1200px]:grid-cols-4 ">
        {controlFamiliesByOrgLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-[3/4]" />
          ))}
        {controlFamiliesByOrg?.map((controlFamily: any) => (
          <ControlInfoCard
            key={controlFamily?._id}
            controlFamily={controlFamily}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlInfoPage;
