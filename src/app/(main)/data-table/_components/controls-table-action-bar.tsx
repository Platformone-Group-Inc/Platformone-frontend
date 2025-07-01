// import { DataTableActionBarSelection } from "@/components/data-table/data-table-action-bar";
import { Table } from "@tanstack/react-table";
import DeleteControllersModal from "./modals/delete-controls-modal";

interface ControlsTableActionBarProps<TData>
  extends React.ComponentProps<"div"> {
  table: Table<TData>;
}

export function ControlsTableActionBar<TData>({
  table,
  children,
  className,
  ...props
}: ControlsTableActionBarProps<TData>) {
  return (
    <div className="flex items-center gap-2">
      {/* <DataTableActionBarSelection table={table} /> */}
      <DeleteControllersModal table={table} />

      {/*
        
  Delete Controls
 Assign Controls

        */}
    </div>
  );
}
