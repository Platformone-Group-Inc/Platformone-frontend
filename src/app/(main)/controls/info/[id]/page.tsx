"use client";

// import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/ui/shell";
import ControlsTable from "./_components/controls-table";
import { useEffect, useState } from "react";

const DataTablePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Shell className="p-4 gap-2">
      <ControlsTable />
    </Shell>
  );
};

export default DataTablePage;
