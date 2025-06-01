"use client";

import { useEffect, useState } from "react";
import ControlsInfoAction from "./components/controls-info-actions";
import { Button } from "@/components/ui/button";
import { Grid3X3Icon, Rows3Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import DemoDataTable from "../control-old/demo-data-table";
import ControlInfoCard from "../components/control-info-card";
import { getControlByControlFamiliesQueryFn, getControlFamiliesByOrganizationQueryFn } from "@/services/operations/Control";
import { useRouter, useSearchParams } from 'next/navigation'

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
import ControlsTable from "../control/_components/controls-table";
import { get } from "http";

const ControlInfoPage = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  const { user, isLoading: authLoading } = useAuthContext();
  const searchParams = useSearchParams()
  const router = useRouter();
  const cloneFrameworkId = searchParams.get('id')
  const cloneFrameworkName = searchParams.get('name')
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const rowPerPage = parseInt(searchParams.get("perPage") || "10", 10);
  const currentPage = isNaN(pageParam) ? 1 : pageParam;

  useEffect(() => {
    if (!cloneFrameworkId && !authLoading) {
      router.push('/controls');
    }
  }, [cloneFrameworkId, authLoading, router]);
  const {
    data: controlFamiliesByOrg,
    isLoading: controlFamiliesByOrgLoading,
    error: controlFamiliesByOrgError
  } = useQuery({
    queryKey: ["controlFamilies", user?.organization, cloneFrameworkId],
    queryFn: () => getControlFamiliesByOrganizationQueryFn(cloneFrameworkId),
    enabled: !!cloneFrameworkId
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
    <div className="p-6 space-y-6 min-h-screen overflow-y-scroll">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-lg">
            {/* FedRAMP Moderate (800-53 Rev. 5) */}
            {cloneFrameworkName}
          </h1>
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
                <BreadcrumbPage>
                  {/* FedRAMP Moderate (800-53 Rev. 5) */}
                  {cloneFrameworkName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            onClick={() => setView((s) => (s === "grid" ? "table" : "grid"))}
            className="p-1"
          >
            <span
              className={cn(
                "p-2 rounded-md aspect-square ",
                view === "grid" && "bg-primary text-primary-100"
              )}
            >
              <Grid3X3Icon size={18} />
            </span>
            <span
              className={cn(
                "p-2 rounded-md aspect-square ",
                view === "table" && "bg-primary text-primary-100"
              )}
            >
              <Rows3Icon size={18} />
            </span>
          </Button>
          <ControlsInfoAction />
        </div>
      </div>
      {view === "grid" && (
        <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {controlFamiliesByOrg?.map((controlFamily: any) => (
            <ControlInfoCard key={controlFamily?._id} controlFamily={controlFamily} />
          ))}
        </div>
      )}
      {view === "table" && <ControlsTable controlByControlFamilies={getAllcontrol}           onPageChange={handlePageChange}
 />
      }
    </div>
  );
};

export default ControlInfoPage;
