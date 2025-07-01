// tanstack table
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

// icons
import { Loader2Icon } from "lucide-react";

// shadcn components
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableHeader from "./data-table-header";
import { useCallback, useState } from "react";

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  state?: {
    isLoading?: boolean;
    showSkeleton?: boolean;
    showLinearProgressBar?: boolean;
    pagination?: {
      pageIndex?: number;
      pageSize?: number;
    };
  };
}

const DataTable = <TData,>({
  data,
  columns,
  state = {
    isLoading: false,
    showSkeleton: false,
    showLinearProgressBar: false,
  },
}: DataTableProps<TData>) => {
  const { isLoading, showLinearProgressBar } = state;

  const [globalFilter, setGlobalFilter] = useState("");
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [columnFiltersVisible, setColumnFiltersVisible] = useState<
    Record<string, boolean>
  >({});

  const toggleColumnFilter = useCallback((columnId: string) => {
    setColumnFiltersVisible((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === "function"
          ? updater(table.getState().columnFilters)
          : updater;
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function"
          ? updater(table.getState().sorting)
          : updater;
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility =
        typeof updater === "function"
          ? updater(table.getState().columnVisibility)
          : updater;
    },
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function"
          ? updater(table.getState().rowSelection)
          : updater;
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return (
    <div className="p-4 h-dvh bg-secondary w-full overflow-hidden">
      <div className="relative bg-background  p-2 w-full">
        {isLoading && (
          <Loader2Icon className="absolute top-1/2 left-1/2  z-20 size-10 animate-spin" />
        )}

        {showLinearProgressBar && <Progress value={56} className=" mt-4 h-1" />}

        <ScrollArea className="h-[calc(100vh-136px)] border w-full overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 left-0 z-10 w-full bg-secondary border-b border-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return <DataTableHeader key={header.id} header={header} />;
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="border-r border-border p-2 align-middle"
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default DataTable;
