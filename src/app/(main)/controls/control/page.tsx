"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/ui/shell";
import ControlsTable from "./_components/controls-table";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getControlByControlFamiliesQueryFn } from "@/services/operations/Control";
import { useSearchParams } from "next/navigation";

const DataTablePage = () => {
  const searchParams = useSearchParams()
  const controlFamilyId = searchParams.get('id')
  const controlFamilyName = searchParams.get('name')
  const rowperPage = searchParams.get('perPage')
  console.log(rowperPage)
  const {
    data: controlByControlFamilies,
    isLoading: controlByControlFamiliesLoading,
    error: controlByControlFamiliesError
  } = useQuery({
    queryKey: ["controlByControlFamilies", controlFamilyId],
    queryFn: () => getControlByControlFamiliesQueryFn(controlFamilyId, null, false, 1, rowperPage ? parseInt(rowperPage) : 10),
  });

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 300);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Shell className="p-4 gap-2">
      {controlByControlFamiliesLoading ? (
        <DataTableSkeleton
          columnCount={10}
          filterCount={0}
          cellWidths={[
            "10rem",
            "30rem",
            "10rem",
            "10rem",
            "6rem",
            "6rem",
            "6rem",
          ]}
          shrinkZero
        />
      ) : (
        <ControlsTable controlByControlFamilies={controlByControlFamilies} />
      )}
    </Shell>
  );
};

export default DataTablePage;
