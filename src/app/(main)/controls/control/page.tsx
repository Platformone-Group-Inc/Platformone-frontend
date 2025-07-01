"use client";

import { getControlByControlFamiliesQueryFn } from "@/services/operations/Control";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ControlsDataTable from "./_components/controls-data-table";

const ControlInfo = () => {
  const searchParams = useSearchParams();
  const controlFamilyId = searchParams.get("id");
  const perPage = searchParams.get("perPage");

  const { data, isLoading } = useQuery({
    queryKey: ["controlByControlFamilies", controlFamilyId],
    queryFn: () =>
      getControlByControlFamiliesQueryFn(
        controlFamilyId,
        null,
        false,
        1,
        perPage ? parseInt(perPage) : 10
      ),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  }

  return <ControlsDataTable controls={data} isLoading={isLoading} />;
};

export default ControlInfo;
