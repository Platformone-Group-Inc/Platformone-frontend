"use client";

import DataTableChipFilterHeader from "@/components/data-table/data-table-chip-filter-header";
import DataTableFilterHeader from "@/components/data-table/data-table-filter-header";

import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TableHead } from "@/components/ui/table";

import { ControlResponse, Control } from "@/services/operations/Control";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeftIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useMemo, useState } from "react";

interface ControlsDataTableProps {
  controls?: ControlResponse;
  isLoading?: boolean;
}

const ControlsDataTable: React.FC<ControlsDataTableProps> = ({
  controls,
  isLoading,
}) => {
  const columns: ColumnDef<Control>[] = useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 40,
        minSize: 40,
        maxSize: 40,
      },

      {
        id: "name",
        accessorKey: "name",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Name" />
        ),
        meta: { label: "Name" },
        maxSize: 200,

        cell: ({ row }) => (
          <p className="font-medium truncate max-w-[200px]">
            {row.original.name}
          </p>
        ),
      },
      {
        id: "description",
        accessorKey: "description",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Description" />
        ),
        meta: { label: "Description" },
        cell: ({ row }) => (
          <p className="font-medium truncate max-w-[200px]">
            {row.original.description}
          </p>
        ),
      },
      {
        id: "identifier",
        accessorKey: "identifier",

        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Identifier" />
        ),
        meta: { label: "Identifier" },
      },
      {
        id: "level",
        accessorKey: "level",
        header: ({ header }) => (
          <DataTableChipFilterHeader
            header={header}
            title="Lever"
            options={["1", "2", "3"]}
          />
        ),

        meta: { label: "Level" },
        cell: ({ getValue }) => <Badge>{getValue<number>()}</Badge>,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ header }) => (
          <DataTableChipFilterHeader
            header={header}
            title="Status"
            options={["active", "inactive"]}
          />
        ),
        meta: { label: "Status" },
        cell: ({ getValue }) => (
          <Badge variant="secondary">{getValue<string>()}</Badge>
        ),
      },
      {
        id: "controlFamilyId",
        accessorKey: "controlFamilyId",

        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Control Family ID" />
        ),
        meta: { label: "Control Family ID" },
      },
      {
        id: "assignments",
        accessorKey: "assignments",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Assignments" />
        ),

        meta: { label: "Assignments" },
        cell: ({ getValue }) => {
          const assignments = getValue<any[]>();
          return assignments && assignments.length ? (
            <span>{assignments.length} assigned</span>
          ) : (
            <span>None</span>
          );
        },
      },
      {
        id: "isOriginal",
        accessorKey: "isOriginal",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Original" />
        ),
        meta: { label: "Original" },
        cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        // header: "Created At",
        header: ({ header }) => (
          <DataTableFilterHeader header={header} title="Created At" />
        ),
        meta: { label: "Created At" },
        cell: ({ getValue }) => {
          const date = getValue<Date>();
          return date ? new Date(date).toLocaleDateString() : "";
        },
      },
      // {
      //   id: "framework_id",
      //   accessorKey: "framework_id",
      //   header: "Framework ID",
      //   meta: { label: "Framework ID" },
      // },
    ],
    []
  );
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id as string)
  );

  const [globalFilter, setGlobalFilter] = useQueryState(
    "globalFilter",
    parseAsString.withDefault("")
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(20)
  );

  const table = useReactTable({
    data: controls?.data || [],
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      setPage(newPagination.pageIndex);
      setLimit(newPagination.pageSize);
    },
    initialState: {
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
    },
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      sorting,
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
      columnOrder,
    },
    enableSortingRemoval: false,
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const allColumns = table.getAllLeafColumns();
  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;
  const isNoVisibleColumns = visibleColumns.length === 2; // assuming first 2 are control columns
  const filteredRows = table.getFilteredRowModel().rows;

  return (
    <div className="@container w-full overflow-hidden flex flex-col h-full">
      {/* Page Header */}

      <div className="py-4 px-6 border-b">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={router.back}
              // href={"/controls"}
              // className={cn(
              //   "p-2 aspect-square hover:bg-primary-100 rounded-full"
              // )}
            >
              <ArrowLeftIcon size={16} />
            </button>
            <h1 className="font-semibold text-lg">
              FedRAMP Moderate (800-53 Rev. 5)
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
                <BreadcrumbPage>
                  FedRAMP Moderate (800-53 Rev. 5)
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="p-4 flex-1 space-y-4 flex flex-col">
        {/* Filter / Search / Actions */}
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />

        {/* Scrollable Table Container */}
        <ScrollArea className="border rounded-md w-full overflow-auto h-[calc(100vh-400px)]">
          <table className="min-w-full table-auto">
            {/* Sticky Header */}
            <thead className="sticky top-0 z-10 bg-background border-b shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="relative group w-full px-3 py-2 text-left text-sm align-top"
                      style={{ width: `${header.column.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Table Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length}>
                    <DataTableLoadingSkeleton table={table} />
                  </td>
                </tr>
              ) : isNoVisibleColumns ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-[400px] text-center text-gray-500"
                  >
                    No columns are visible.&nbsp;
                    <button
                      className="underline text-blue-600"
                      onClick={() => {
                        const visibility = Object.fromEntries(
                          allColumns.map((col) => [col.id, true])
                        );
                        table.setColumnVisibility(visibility);
                      }}
                    >
                      Reset columns
                    </button>
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr className="h-[300px]">
                  <td
                    colSpan={columns.length}
                    className="h-24 text-sm text-center text-gray-500"
                  >
                    No results found for your filter criteria.{" "}
                    <button
                      className="text-primary-600 font-bold"
                      onClick={() => {
                        console.log("Clear filters clicked");

                        // Reset column filters
                        table.resetColumnFilters();
                      }}
                    >
                      Clear filter
                    </button>
                  </td>
                </tr>
              ) : hasRows && visibleColumns.length > 2 ? (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="truncate flex-shrink-0 px-4 py-2 text-sm text-gray-800"
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="h-[300px]">
                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No results available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Pagination */}
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default ControlsDataTable;
