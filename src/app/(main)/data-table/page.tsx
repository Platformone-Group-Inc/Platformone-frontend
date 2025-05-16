import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/ui/shell";
import ControlsTable from "./_components/controls-table";

const DataTablePage = () => {
  return (
    <Shell className="p-4 gap-2">
      {/* <DataTableSkeleton
        columnCount={7}
        filterCount={2}
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
      /> */}
      {/* {JSON.stringify(data)} */}
      <ControlsTable />
    </Shell>
  );
};

export default DataTablePage;
